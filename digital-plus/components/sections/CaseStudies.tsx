'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '@/hooks/useReveal';
import { usePerfFlags } from '@/hooks/usePerfFlags';
import { CASE_STUDIES, type CaseStudy, type WorldKey } from '@/lib/content';
import ScrollFloatHeading from '../ui/ScrollFloatHeading';
import Button from '../ui/Button';
import ProductMockup from '../ui/ProductMockup';
import { handleSpotlightMove } from '@/lib/spotlight';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function worldFromCategory(category: string): WorldKey {
  if (category.startsWith('Creative')) return 'creative';
  if (category.startsWith('IT')) return 'it';
  return 'leads';
}

function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div
      className={`card art-card card-spotlight h-scroll-card${caseStudy.placeholder ? ' is-placeholder' : ''}`}
      onPointerMove={handleSpotlightMove}
    >
      <div className="art-top" data-world={worldFromCategory(caseStudy.category)}>
        <ProductMockup world={worldFromCategory(caseStudy.category)} />
      </div>
      {caseStudy.placeholder && <span className="art-card-badge">Bald verfügbar</span>}
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
            <span key={service} className="tag tag-outline">
              {service}
            </span>
          ))}
        </div>
        {caseStudy.placeholder && <span className="placeholder-flag">Platzhalter-Case — durch echtes Projekt ersetzen</span>}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const headingRef = useReveal<HTMLSpanElement>();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { isMobile, isLowCore, reduceMotion, ready } = usePerfFlags();

  useEffect(() => {
    if (!ready || reduceMotion || isMobile || isLowCore) return;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const getDistance = () => Math.max(track.scrollWidth - pin.offsetWidth, 0);

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ready, reduceMotion, isMobile, isLowCore]);

  return (
    <section id="projekte" className="section" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
          <span ref={headingRef} className="eyebrow reveal">
            Ausgewählte Arbeiten
          </span>
          <div style={{ marginTop: '1rem' }}>
            <ScrollFloatHeading text="Ausgewählte Projekte" />
          </div>
        </div>
      </div>

      <div className="h-scroll-pin" ref={pinRef}>
        <div className="h-scroll-track" ref={trackRef}>
          {CASE_STUDIES.map((caseStudy) => (
            <CaseCard key={caseStudy.client + caseStudy.category} caseStudy={caseStudy} />
          ))}
          <div className="h-scroll-end">
            <p className="h3-card">Ihr Projekt könnte das nächste sein.</p>
            <Button href="#kontakt" variant="primary" magnetic>
              Projekt starten
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
