'use client';

import { useReveal } from '@/hooks/useReveal';
import { ABOUT } from '@/lib/content';

function ValueCard({ value }: { value: (typeof ABOUT.values)[number] }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="card reveal">
      <h3 className="h3-card">{value.title}</h3>
      <p className="body-lg" style={{ marginTop: '0.75rem', fontSize: '0.9375rem' }}>
        {value.text}
      </p>
    </div>
  );
}

export default function Intro() {
  const headingRef = useReveal<HTMLDivElement>();
  const textRef = useReveal<HTMLDivElement>();

  return (
    <section id="ueber-uns" className="section">
      <div className="container">
        <div ref={headingRef} className="reveal" style={{ maxWidth: 640, marginBottom: '2.5rem' }}>
          <span className="eyebrow">Über uns</span>
          <h2 className="h2-section" style={{ marginTop: '1rem' }}>
            Drei Welten. <span className="gradient-text">Eine Strategie.</span>
          </h2>
        </div>

        <div ref={textRef} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="body-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid-features" style={{ marginTop: '3rem' }}>
          {ABOUT.values.map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}
