'use client';

import { useReveal } from '@/hooks/useReveal';
import { FEATURED_TESTIMONIAL, TESTIMONIALS } from '@/lib/content';
import ScrollFloatHeading from '../ui/ScrollFloatHeading';
import { handleSpotlightMove } from '@/lib/spotlight';

// Neither Inter nor the body font stack define ★/☆, so both fell back to the
// platform symbol font, where the filled glyph renders visibly bolder/larger
// than the empty one — a single SVG path toggling fill vs. stroke keeps both
// states the same geometry and weight.
function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
      />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="testimonial-stars" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < count} />
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
            <div>
              <Stars count={FEATURED_TESTIMONIAL.rating} />
              <p className="quote">{FEATURED_TESTIMONIAL.quote}</p>
            </div>
            <div>
              <p className="attribution">
                {FEATURED_TESTIMONIAL.author} — {FEATURED_TESTIMONIAL.role}
              </p>
              <span className="placeholder-flag">Platzhalter — echte Google-Bewertung einsetzen</span>
            </div>
          </div>

          <div className="testimonial-list">
            {TESTIMONIALS.map((testimonial, i) => (
              <div className="card testimonial-card card-spotlight" onPointerMove={handleSpotlightMove} key={`testimonial-${i}`}>
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
