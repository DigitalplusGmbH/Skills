'use client';

import { useReveal } from '@/hooks/useReveal';
import { FAQS } from '@/lib/content';
import ScrollFloatHeading from '../ui/ScrollFloatHeading';

export default function FAQ() {
  const headingRef = useReveal<HTMLSpanElement>();

  return (
    <section className="section section-alt">
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: '2.5rem' }}>
          <span ref={headingRef} className="eyebrow reveal">
            Häufige Fragen
          </span>
          <div style={{ marginTop: '1rem' }}>
            <ScrollFloatHeading text="Bevor Sie fragen müssen" />
          </div>
        </div>

        <div className="faq-list" style={{ maxWidth: 760 }}>
          {FAQS.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary className="faq-question">
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
