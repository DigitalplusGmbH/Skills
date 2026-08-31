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
      <span className="eyebrow leads-calculator-eyebrow">
        <svg className="leads-calculator-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 17l5-5 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 8h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Live-Anfragen-Rechner
      </span>
      <label htmlFor={sliderId} className="body-lg leads-calculator-label">
        Wie viele Anfragen erhalten Sie aktuell pro Monat?
      </label>
      <div className="range-input-wrap">
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
        <div className="range-input-bubble" style={{ left: `${fillPercent}%` }} aria-hidden="true">
          {requests}
        </div>
      </div>
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
          <div className="leads-calculator-figure-row">
            <span className="leads-calculator-figure-label">möglich mit System</span>
            <span className="leads-calculator-delta">+{delta} / Monat</span>
          </div>
        </div>
      </div>

      <span className="placeholder-flag leads-calculator-disclaimer">
        Illustrative Rechnung auf Basis der Platzhalter-Kennzahl „{UPLIFT_PERCENT}% mehr qualifizierte Anfragen” —
        kein Versprechen realer Ergebnisse.
      </span>
    </div>
  );
}
