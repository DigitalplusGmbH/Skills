'use client';

import { useReveal } from '@/hooks/useReveal';
import { useLenis } from '@/hooks/useLenis';
import { WORLDS } from '@/lib/content';
import Button from '../ui/Button';

export default function FinalCTA() {
  const ref = useReveal<HTMLDivElement>();
  const { scrollTo } = useLenis();

  return (
    <section id="kontakt" className="section" style={{ paddingBlock: 'clamp(3rem, 6vw, 6rem)' }}>
      <div ref={ref} className="reveal final-cta">
        <div className="final-cta-content">
          <span className="eyebrow">Nächster Schritt</span>
          <h2 className="h2-section">Welche Welt bringt Ihr Unternehmen weiter?</h2>
          <p className="body-lg" style={{ textAlign: 'center', alignSelf: 'stretch' }}>
            Ihr nächstes Projekt beginnt mit einem Gespräch — nicht mit einem Formular.
          </p>

          <div className="final-cta-actions">
            <Button href="mailto:kontakt@digitalplus-platzhalter.ch" variant="primary" magnetic>
              Projekt besprechen
            </Button>
            <Button href="#kontakt-formular" variant="secondary">
              Kontakt aufnehmen
            </Button>
          </div>

          <div className="final-cta-worlds">
            <span className="final-cta-worlds-label">Oder direkt zu einer Welt:</span>
            {WORLDS.map((world) => (
              <button
                key={world.key}
                type="button"
                className="tag"
                data-world={world.key}
                onClick={() => scrollTo(`#${world.key}`)}
                style={{ cursor: 'pointer' }}
              >
                {world.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
