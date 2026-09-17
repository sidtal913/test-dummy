'use client';

import { useMemo, useState } from 'react';
import styles from './OrdersPage.module.css';

export interface BrownieProduct {
  id: string;
  name: string;
  description: string;
  priceCad: number;
}

const CATALOG: BrownieProduct[] = [
  {
    id: 'classic-fudge',
    name: 'Classic fudge',
    description: 'Dense dark chocolate — our signature batch.',
    priceCad: 4.5,
  },
  {
    id: 'salted-caramel',
    name: 'Salted caramel',
    description: 'Burnt sugar swirl with flaky sea salt.',
    priceCad: 5.25,
  },
  {
    id: 'maple-pecan',
    name: 'Maple pecan',
    description: 'Québec maple syrup and toasted pecans.',
    priceCad: 5.75,
  },
];

export function OrdersPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const lineItems = useMemo(
    () =>
      CATALOG.filter((item) => (quantities[item.id] ?? 0) > 0).map((item) => ({
        ...item,
        qty: quantities[item.id] ?? 0,
      })),
    [quantities],
  );

  const total = useMemo(
    () => lineItems.reduce((sum, line) => sum + line.priceCad * line.qty, 0),
    [lineItems],
  );

  function adjust(id: string, delta: number) {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      return { ...prev, [id]: next };
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Factory direct</p>
        <h1 className={styles.title}>Order brownies</h1>
        <p className={styles.lead}>
          Pick your trays for pickup or delivery across Montréal. Checkout connects when billing API
          lands — this page is live for catalog and cart totals.
        </p>
      </header>

      <ul className={styles.grid}>
        {CATALOG.map((item) => {
          const qty = quantities[item.id] ?? 0;
          return (
            <li key={item.id} className={styles.card}>
              <div>
                <h2 className={styles.cardTitle}>{item.name}</h2>
                <p className={styles.cardCopy}>{item.description}</p>
                <p className={styles.price}>{item.priceCad.toFixed(2)} CAD</p>
              </div>
              <div className={styles.stepper} aria-label={`Quantity for ${item.name}`}>
                <button type="button" className={styles.stepBtn} onClick={() => adjust(item.id, -1)} aria-label={`Decrease ${item.name}`}>
                  −
                </button>
                <span className={styles.qty} aria-live="polite">
                  {qty}
                </span>
                <button type="button" className={styles.stepBtn} onClick={() => adjust(item.id, 1)} aria-label={`Increase ${item.name}`}>
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <section className={styles.summary} aria-labelledby="order-summary-title">
        <h2 id="order-summary-title" className={styles.summaryTitle}>
          Order summary
        </h2>
        {lineItems.length === 0 ? (
          <p className={styles.summaryEmpty}>Add at least one brownie to preview your total.</p>
        ) : (
          <ul className={styles.summaryList}>
            {lineItems.map((line) => (
              <li key={line.id}>
                {line.qty} × {line.name}{' '}
                <span className={styles.summaryAmount}>{(line.qty * line.priceCad).toFixed(2)} CAD</span>
              </li>
            ))}
          </ul>
        )}
        <p className={styles.total}>
          Total: <strong>{total.toFixed(2)} CAD</strong>
        </p>
        <button type="button" className={styles.cta} disabled={lineItems.length === 0}>
          Place order (coming soon)
        </button>
      </section>
    </div>
  );
}
