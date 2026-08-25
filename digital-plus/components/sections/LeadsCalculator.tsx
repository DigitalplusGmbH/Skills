'use client';

import { useId, useState } from 'react';
import { STATS } from '@/lib/content';

const UPLIFT_STAT = STATS.find((stat) => stat.suffix === '%') ?? STATS[0];
const UPLIFT_PERCENT = UPLIFT_STAT.end;

const MIN_REQUESTS = 5;
const MAX_REQUESTS = 200;
const DEFAULT_REQUESTS = 40;

export default function LeadsCalculator() {
  const [requests, setRequests] = useState(DEFAULT_REQUESTS);
  const sliderId = useId();

  const projected = Math.round(requests * (1 + UPLIFT_PERCENT / 100));
  const delta = projected - requests;
  const fillPercent = ((requests - MIN_REQUESTS) / (MAX_REQUESTS - MIN_REQUESTS)) * 100;

  return (
    <div className="card leads-calculator" style={{ marginTop: '2rem' }}>
      <span className="eyebrow">Live-Anfragen-Rechner</span>
      <label htmlFor={sliderId} className="body-lg leads-calculator-label">
        Wie viele Anfragen erhalten Sie aktuell pro Monat?
      </label>
      <input
        id={sliderId}
        type="range"
        className="range-input"
        min={MIN_REQUESTS}
        max={MAX_REQUESTS}
        step={5}
        value={requests}
        onChange={(e) => setRequests(Number(e.target.value))}
        style={{ '--fill': `${fillPercent}%` } as React.CSSProperties}
        aria-valuetext={`${requests} Anfragen pro Monat`}
      />
      <div className="leads-calculator-scale">
        <span>{MIN_REQUESTS}</span>
        <span>{MAX_REQUESTS}+</span>
      </div>

      <div className="leads-calculator-result">
        <div>
          <span className="leads-calculator-figure">{requests}</span>
          <span className="leads-calculator-figure-label">aktuell / Monat</span>
        </div>
        <span className="leads-calculator-arrow" aria-hidden="true">
          →
        </span>
        <div>
          <span className="leads-calculator-figure leads-calculator-figure-accent">{projected}</span>
          <span className="leads-calculator-figure-label">möglich mit System</span>
        </div>
        <div className="leads-calculator-delta">
          +{delta} / Monat
        </div>
      </div>

      <span className="placeholder-flag">
        Illustrative Rechnung auf Basis der Platzhalter-Kennzahl „{UPLIFT_PERCENT}% mehr qualifizierte Anfragen” —
        kein Versprechen realer Ergebnisse.
      </span>
    </div>
  );
}
