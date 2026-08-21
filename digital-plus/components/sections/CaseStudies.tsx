'use client';

import { useReveal } from '@/hooks/useReveal';
import { CASE_STUDIES } from '@/lib/content';

function CaseCard({ caseStudy }: { caseStudy: (typeof CASE_STUDIES)[number] }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="reveal card art-card card-spotlight">
      <div className="art-top">
        <span className="rivet-tl" />
        <span className="rivet-tr" />
        <span className="rivet-bl" />
        <span className="rivet-br" />
      </div>
      <div style={{ padding: '1.5rem' }}>
        <span className="tag">{caseStudy.category}</span>
        <h3 className="h3-card" style={{ marginTop: '1rem' }}>
          {caseStudy.client}
        </h3>
        <p className="body-lg" style={{ marginTop: '0.75rem', fontSize: '0.9375rem' }}>
          <strong style={{ color: 'var(--text)' }}>Herausforderung: </strong>
          {caseStudy.challenge}
        </p>
        <p className="body-lg" style={{ marginTop: '0.5rem', fontSize: '0.9375rem' }}>
          <strong style={{ color: 'var(--text)' }}>Lösung: </strong>
          {caseStudy.solution}
        </p>
        <p className="body-lg" style={{ marginTop: '0.5rem', fontSize: '0.9375rem' }}>
          <strong style={{ color: 'var(--text)' }}>Resultat: </strong>
          {caseStudy.result}
        </p>
        <div className="pin-swap-services" style={{ marginTop: '1rem' }}>
          {caseStudy.services.map((service) => (
            <span key={service} className="tag" style={{ background: 'transparent' }}>
              {service}
            </span>
          ))}
        </div>
        <span className="placeholder-flag">Platzhalter-Case — durch echtes Projekt ersetzen</span>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section id="projekte" className="section">
      <div className="container">
        <div ref={headingRef} className="reveal" style={{ maxWidth: 640, marginBottom: '3rem' }}>
          <span className="eyebrow">Selected Work</span>
          <h2 className="h2-section" style={{ marginTop: '1rem' }}>
            Ausgewählte Projekte
          </h2>
        </div>
        <div className="grid-cases">
          {CASE_STUDIES.map((caseStudy) => (
            <CaseCard key={caseStudy.client + caseStudy.category} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}
