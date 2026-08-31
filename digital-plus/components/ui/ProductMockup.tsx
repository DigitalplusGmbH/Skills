'use client';

import { useReveal } from '@/hooks/useReveal';
import type { WorldKey } from '@/lib/content';

/**
 * A generic "product UI" mockup — browser-chrome frame around an abstract
 * dashboard, not a screenshot of a real client tool — used as the world
 * panels' visual instead of a decorative motif, per the "technischer/
 * moderner SaaS-Look" direction. Content varies per world (metrics for
 * Leads, a moodboard grid for Creative, status rows for IT) but the frame
 * and glass treatment are shared.
 */
export default function ProductMockup({ world }: { world: WorldKey }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="product-mockup reveal-scale">
      <div className="product-mockup-chrome">
        <span />
        <span />
        <span />
        <div className="product-mockup-addr" />
      </div>
      <div className="product-mockup-body">
        {world === 'leads' && (
          <>
            <div className="product-mockup-row">
              <div className="product-mockup-stat">
                <span className="product-mockup-stat-value">1,284</span>
                <span className="product-mockup-stat-label">Qualifizierte Anfragen</span>
              </div>
              <div className="product-mockup-stat">
                <span className="product-mockup-stat-value">+32%</span>
                <span className="product-mockup-stat-label">vs. Vormonat</span>
              </div>
            </div>
            <div className="product-mockup-chart">
              {[38, 52, 44, 61, 58, 74, 69, 88].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </>
        )}
        {world === 'creative' && (
          <div className="product-mockup-grid">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={`product-mockup-swatch swatch-${i % 3}`} />
            ))}
          </div>
        )}
        {world === 'it' && (
          <div className="product-mockup-list">
            {['API Gateway', 'Datenbank-Cluster', 'Backup-Job', 'CDN-Edge'].map((label) => (
              <div key={label} className="product-mockup-list-row">
                <span className="product-mockup-status-dot" />
                <span>{label}</span>
                <span className="product-mockup-list-value">Online</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
