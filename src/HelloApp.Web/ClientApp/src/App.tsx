import { useEffect, useState } from 'react';
import './App.css';

interface HelloResponse {
  message: string;
  source: string;
  timestamp: string;
}

const STACK = [
  { label: 'React 18', detail: 'Component UI' },
  { label: '.NET 8', detail: 'Self-hosted API' },
  { label: 'PostgreSQL', detail: 'Persistent store' },
  { label: 'PWA', detail: 'Installable offline' },
];

export default function App() {
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
    <div className={`app ${mounted ? 'app--mounted' : ''}`}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=80"
            alt="Server racks in a data center with cool ambient lighting"
            className="hero__photo"
          />
          <div className="hero__veil" aria-hidden="true" />
        </div>
        <div className="hero__content">
          <p className="hero__eyebrow">Self-hosted application</p>
          <h1 id="hero-title" className="hero__title">
            Hello
          </h1>
          <p className="hero__subtitle">
            A .NET web application with React, PostgreSQL, and progressive web app support — ready to run on your infrastructure.
          </p>
        </div>
      </section>

      <section className="stack" aria-labelledby="stack-title">
        <div className="stack__inner">
          <h2 id="stack-title" className="stack__title">Built with</h2>
          <ul className="stack__grid">
            {STACK.map((item, index) => (
              <li
                key={item.label}
                className="stack__item"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="stack__label">{item.label}</span>
                <span className="stack__detail">{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="status" aria-labelledby="status-title">
        <div className="status__inner">
          <h2 id="status-title" className="status__title">Live connection</h2>
          <div className="status__panel" role="status" aria-live="polite">
            {loading && <p className="status__text">Connecting to backend…</p>}
            {!loading && error && (
              <p className="status__text status__text--error">
                Backend unavailable — start PostgreSQL and the .NET API to see live data.
              </p>
            )}
            {!loading && hello && (
              <>
                <p className="status__message">{hello.message}</p>
                <p className="status__meta">
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
