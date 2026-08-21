'use client';

import { useReveal } from '@/hooks/useReveal';
import { FAQS } from '@/lib/content';

export default function FAQ() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section className="section section-alt">
      <div className="container">
        <div ref={headingRef} className="reveal" style={{ maxWidth: 640, marginBottom: '2.5rem' }}>
          <span className="eyebrow">Häufige Fragen</span>
          <h2 className="h2-section" style={{ marginTop: '1rem' }}>
            Bevor Sie fragen müssen
          </h2>
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
