'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './HelloPage.module.css';

interface HelloResponse {
  message: string;
  source: string;
  timestamp: string;
}

const STACK = [
  { label: 'React 19', detail: 'Next.js UI' },
  { label: '.NET 8', detail: 'Self-hosted API' },
  { label: 'PostgreSQL', detail: 'Persistent store' },
  { label: 'PWA', detail: 'Installable offline' },
];

export function HelloPage() {
  const [hello, setHello] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/hello')
      .then((res) => {
        if (!res.ok) throw new Error(`API responded with ${res.status}`);
        return res.json();
      })
      .then((data: HelloResponse) => setHello(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={`${styles.app} ${mounted ? styles.mounted : ''}`}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroMedia}>
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=80"
            alt="Server racks in a data center with cool ambient lighting"
            fill
            priority
            className={styles.heroPhoto}
            sizes="100vw"
          />
          <div className={styles.heroVeil} aria-hidden="true" />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Self-hosted application</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            Hello
          </h1>
          <p className={styles.heroSubtitle}>
            A .NET web application with React, PostgreSQL, and progressive web app support — ready to run on your infrastructure.
          </p>
        </div>
      </section>

      <section className={styles.stack} aria-labelledby="stack-title">
        <div className={styles.stackInner}>
          <h2 id="stack-title" className={styles.stackTitle}>
            Built with
          </h2>
          <ul className={styles.stackGrid}>
            {STACK.map((item, index) => (
              <li
                key={item.label}
                className={styles.stackItem}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className={styles.stackLabel}>{item.label}</span>
                <span className={styles.stackDetail}>{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.status} aria-labelledby="status-title">
        <div className={styles.statusInner}>
          <h2 id="status-title" className={styles.statusTitle}>
            Live connection
          </h2>
          <div className={styles.statusPanel} role="status" aria-live="polite">
            {loading && <p className={styles.statusText}>Connecting to backend…</p>}
            {!loading && error && (
              <p className={`${styles.statusText} ${styles.statusError}`}>
                Backend unavailable — start PostgreSQL and the .NET API to see live data.
              </p>
            )}
            {!loading && hello && (
              <>
                <p className={styles.statusMessage}>{hello.message}</p>
                <p className={styles.statusMeta}>
                  Source: <code>{hello.source}</code>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
