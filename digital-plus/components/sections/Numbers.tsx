'use client';

import { useEffect, useRef, useState } from 'react';
import { STATS, type Stat } from '@/lib/content';
import { usePerfFlags } from '@/hooks/usePerfFlags';

function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const { reduceMotion } = usePerfFlags();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in-view');
          if (reduceMotion) {
            setValue(stat.end);
            observer.unobserve(entry.target);
            return;
          }
          const duration = 1600;
          const start = performance.now();
          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * stat.end));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.end, reduceMotion]);

  return (
    <div ref={ref} className="stat-card reveal">
      <span className="stat-value">
        {value}
        {stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

export default function Numbers() {
  return (
    <section className="section section-alt numbers-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <span className="placeholder-flag">
            Platzhalter-Kennzahlen — vor Livegang durch reale Werte ersetzen
          </span>
        </div>
        <div className="grid-stats">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
