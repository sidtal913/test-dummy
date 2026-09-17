import Link from 'next/link';
import styles from './SiteHeader.module.css';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/orders', label: 'Orders' },
] as const;

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Brownies Factory
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
