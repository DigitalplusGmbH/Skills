'use client';

import { useReveal } from '@/hooks/useReveal';

export default function Intro() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="ueber-uns" className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <div ref={ref} className="reveal intro-panel" style={{ maxWidth: 760, margin: '0 auto' }}>
          <span className="eyebrow">Digital Plus</span>
          <h2 className="h2-section" style={{ marginTop: '1.25rem' }}>
            Drei Welten. <span className="gradient-text">Eine Strategie.</span>
          </h2>
          <p className="body-lg" style={{ margin: '1.5rem auto 0' }}>
            Die meisten Unternehmen jonglieren Werbeagentur, Designstudio und IT-Dienstleister als drei getrennte
            Verträge — und tragen die Reibung dazwischen selbst. Digital Plus bündelt Performance-Marketing,
            Markenführung und technische Infrastruktur in einem gemeinsamen System: eine Strategie, ein
            Ansprechpartner, ein konsistentes Ergebnis über alle drei Welten hinweg.
          </p>
        </div>
      </div>
    </section>
  );
}
