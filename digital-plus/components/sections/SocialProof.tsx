'use client';

import { useReveal } from '@/hooks/useReveal';
import { FEATURED_TESTIMONIAL, TESTIMONIALS } from '@/lib/content';
import ScrollFloatHeading from '../ui/ScrollFloatHeading';

function Stars({ count }: { count: number }) {
  return (
    <div className="testimonial-stars" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          {i < count ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default function SocialProof() {
  const ref = useReveal<HTMLSpanElement>();

  return (
    <section className="section">
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
          <span ref={ref} className="eyebrow reveal">
            Stimmen
          </span>
          <div style={{ marginTop: '1rem' }}>
            <ScrollFloatHeading text="Was Kunden sagen" />
          </div>
        </div>

        <div className="grid-testimonials">
          <div className="card testimonial-featured">
            <Stars count={FEATURED_TESTIMONIAL.rating} />
            <p className="quote">{FEATURED_TESTIMONIAL.quote}</p>
            <p className="attribution">
              {FEATURED_TESTIMONIAL.author} — {FEATURED_TESTIMONIAL.role}
            </p>
            <span className="placeholder-flag">Platzhalter — echte Google-Bewertung einsetzen</span>
          </div>

          <div className="testimonial-list">
            {TESTIMONIALS.map((testimonial, i) => (
              <div className="card testimonial-card" key={`testimonial-${i}`}>
                <Stars count={testimonial.rating} />
                <p className="quote">{testimonial.quote}</p>
                <p className="attribution">
                  {testimonial.author} — {testimonial.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
