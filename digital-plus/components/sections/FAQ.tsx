'use client';

import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { FAQS } from '@/lib/content';
import ScrollFloatHeading from '../ui/ScrollFloatHeading';
import Button from '../ui/Button';

function FaqRow({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="faq-item">
      <button type="button" className="faq-question" aria-expanded={open} onClick={onToggle}>
        <span>{question}</span>
        <span className="faq-icon" aria-hidden="true">
          +
        </span>
      </button>
      {/* grid-template-rows 0fr -> 1fr is the standard CSS-only way to animate
          height-to-auto — a plain max-height transition would either clip a
          long answer or leave a jump for a short one. */}
      <div className="faq-answer-wrap" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="faq-answer-inner">
          <p className="faq-answer">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const headingRef = useReveal<HTMLSpanElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section section-alt faq-section">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-heading">
            <span ref={headingRef} className="eyebrow reveal">
              Häufige Fragen
            </span>
            <div style={{ marginTop: '1rem' }}>
              <ScrollFloatHeading text="Bevor Sie fragen müssen" />
            </div>
            <p className="body-lg" style={{ marginTop: '1.5rem' }}>
              Ihre Frage ist nicht dabei? Schreiben Sie uns direkt — wir melden uns persönlich zurück.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Button href="#kontakt" variant="secondary">
                Frage stellen
              </Button>
            </div>
          </div>

          <div className="faq-list">
            {FAQS.map((item, i) => (
              <FaqRow
                key={item.question}
                question={item.question}
                answer={item.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
