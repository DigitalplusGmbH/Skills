'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '@/hooks/useReveal';
import { useLenis } from '@/hooks/useLenis';
import { usePerfFlags } from '@/hooks/usePerfFlags';
import { handleSpotlightMove } from '@/lib/spotlight';
import { WORLDS, WORLDS_SHOWCASE_INTRO } from '@/lib/content';
import ScrollFloatHeading from '../ui/ScrollFloatHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WORLD_IMAGES: Record<string, string> = {
  leads: 'images/showcase-leads.webp',
  creative: 'images/showcase-creative.webp',
  it: 'images/showcase-it.webp',
};

function WorldCard({ world, index }: { world: (typeof WORLDS)[number]; index: number }) {
  const ref = useReveal<HTMLAnchorElement>();
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();
  const { reduceMotion, isMobile, ready } = usePerfFlags();

  useEffect(() => {
    if (!ready || reduceMotion || isMobile) return;
    const wrap = imageWrapRef.current;
    const card = ref.current;
    if (!wrap || !card) return;

    // A gentle vertical drift as each card crosses the viewport — this is the
    // page's opening section, so it gets its own small scroll flourish rather
    // than sitting completely static while everything below it scrub-animates.
    const tween = gsap.fromTo(
      wrap,
      { yPercent: -6 },
      { yPercent: 6, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ready, reduceMotion, isMobile, ref]);

  return (
    <a
      ref={ref}
      href={`#${world.key}`}
      data-world={world.key}
      className="card card-spotlight worlds-showcase-card reveal"
      style={{ transitionDelay: `${index * 0.1}s` }}
      onPointerMove={handleSpotlightMove}
      onClick={(e) => {
        e.preventDefault();
        scrollTo(`#${world.key}`);
      }}
    >
      <div className="worlds-showcase-image-wrap" ref={imageWrapRef}>
        <img className="worlds-showcase-image" src={WORLD_IMAGES[world.key]} alt="" />
      </div>
      <div className="worlds-showcase-content">
        <span className="worlds-showcase-pill">
          <i className="worlds-showcase-dot" aria-hidden="true" />
          {world.showcase.pill}
        </span>
        <h3 className="worlds-showcase-name">{world.name}</h3>
        <p className="worlds-showcase-desc">{world.showcase.description}</p>
        <div className="worlds-showcase-tags">
          {world.showcase.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="worlds-showcase-go">
          <span>{world.showcase.goLabel}</span>
          <i className="worlds-showcase-arrow" aria-hidden="true">
            →
          </i>
        </div>
      </div>
    </a>
  );
}

export default function WorldsShowcase() {
  const eyebrowRef = useReveal<HTMLSpanElement>();
  const leadRef = useReveal<HTMLParagraphElement>();

  return (
    <section id="top" className="section worlds-showcase-section" aria-label="Digital Plus Leistungswelten">
      <div className="container">
        <div style={{ maxWidth: 780, marginBottom: '2.5rem' }}>
          <span ref={eyebrowRef} className="eyebrow reveal">
            {WORLDS_SHOWCASE_INTRO.eyebrow}
          </span>
          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <ScrollFloatHeading text={WORLDS_SHOWCASE_INTRO.heading} gradientFrom={5} />
          </div>
          <p ref={leadRef} className="body-lg reveal">
            {WORLDS_SHOWCASE_INTRO.lead}
          </p>
        </div>

        <div className="worlds-showcase-grid">
          {WORLDS.map((world, index) => (
            <WorldCard key={world.key} world={world} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
