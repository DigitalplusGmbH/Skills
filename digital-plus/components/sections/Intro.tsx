'use client';

import { useReveal } from '@/hooks/useReveal';
import { ABOUT } from '@/lib/content';
import ScrollFloatHeading from '../ui/ScrollFloatHeading';

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
  const headingRef = useReveal<HTMLSpanElement>();
  const textRef = useReveal<HTMLDivElement>();

  return (
    <section id="ueber-uns" className="section">
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: '2.5rem' }}>
          <span ref={headingRef} className="eyebrow reveal">
            Über uns
          </span>
          <div style={{ marginTop: '1rem' }}>
            <ScrollFloatHeading text="Drei Welten. Eine Strategie." gradientFrom={2} />
          </div>
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
