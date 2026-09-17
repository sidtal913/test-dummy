import Link from 'next/link';

import { OrdersPanel } from '@/components/OrdersPanel';

export const dynamic = 'force-dynamic';

export default function OrdersPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
          Brownies factory
        </p>
        <h1 style={{ margin: '0 0 0.75rem', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>Order brownies</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: '42rem', lineHeight: 1.6 }}>
          Place a batch order from the catalog below. Orders persist through the .NET API and PostgreSQL backend.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <Link href="/" style={{ color: 'var(--accent)' }}>
            ← Back to home
          </Link>
        </p>
      </header>
      <OrdersPanel />
    </main>
  );
}
