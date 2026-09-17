'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

type CatalogItem = {
  sku: string;
  name: string;
  unitPriceCents: number;
};

type OrderItem = {
  id: number;
  productName: string;
  quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type OrdersPayload = {
  catalog: CatalogItem[];
  orders: OrderItem[];
};

function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(cents / 100);
}

export function OrdersPanel() {
  const [payload, setPayload] = useState<OrdersPayload | null>(null);
  const [selectedSku, setSelectedSku] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/orders', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Orders API responded with ${response.status}`);
      }
      const data = (await response.json()) as OrdersPayload;
      setPayload(data);
      if (!selectedSku && data.catalog.length > 0) {
        setSelectedSku(data.catalog[0].sku);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [selectedSku]);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!payload) return;

    const product = payload.catalog.find((item) => item.sku === selectedSku);
    if (!product) return;

    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: product.name, quantity }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `Create order failed (${response.status})`);
      }

      setMessage(`Added ${quantity} × ${product.name} to the queue.`);
      setQuantity(1);
      await loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="orders-panel-title">
      <h2 id="orders-panel-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
        Catalog &amp; queue
      </h2>

      {loading && <p role="status">Loading orders…</p>}
      {!loading && error && (
        <p role="alert" style={{ color: 'var(--error)' }}>
          {error}. Start PostgreSQL and the .NET API, then refresh.
        </p>
      )}

      {!loading && payload && (
        <>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              <span>Brownie</span>
              <select
                value={selectedSku}
                onChange={(event) => setSelectedSku(event.target.value)}
                style={{ padding: '0.65rem 0.75rem', borderRadius: 8, border: '1px solid var(--surface-elevated)', background: 'var(--surface)', color: 'var(--text)' }}
              >
                {payload.catalog.map((item) => (
                  <option key={item.sku} value={item.sku}>
                    {item.name} — {formatPrice(item.unitPriceCents)}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: 'grid', gap: '0.35rem', maxWidth: 160 }}>
              <span>Quantity</span>
              <input
                type="number"
                min={1}
                max={99}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                style={{ padding: '0.65rem 0.75rem', borderRadius: 8, border: '1px solid var(--surface-elevated)', background: 'var(--surface)', color: 'var(--text)' }}
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: 'fit-content',
                padding: '0.75rem 1.25rem',
                borderRadius: 999,
                border: 'none',
                background: 'var(--accent)',
                color: '#0a0e17',
                fontWeight: 600,
                cursor: submitting ? 'wait' : 'pointer',
              }}
            >
              {submitting ? 'Submitting…' : 'Place order'}
            </button>
          </form>

          {message && (
            <p role="status" style={{ color: 'var(--accent)' }}>
              {message}
            </p>
          )}

          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Recent orders</h3>
            {payload.orders.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No orders yet — place the first batch above.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
                {payload.orders.map((order) => (
                  <li
                    key={order.id}
                    style={{
                      padding: '1rem 1.1rem',
                      borderRadius: 12,
                      background: 'var(--surface)',
                      border: '1px solid var(--surface-elevated)',
                    }}
                  >
                    <strong>{order.productName}</strong> × {order.quantity}
                    <span style={{ color: 'var(--text-muted)', marginLeft: '0.75rem' }}>{order.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  );
}
