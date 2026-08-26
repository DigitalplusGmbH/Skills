'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Constellation from './Constellation';
import WorldIcon from './WorldIcon';
import WebGLScene from '../WebGLScene';
import { WORLDS } from '@/lib/content';
import { useLenis } from '@/hooks/useLenis';
import { usePerfFlags } from '@/hooks/usePerfFlags';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Real photo/illustration per world, where available — falls back to the
// line icon (WorldIcon) for worlds that don't have one yet. Relative (no
// leading slash) so the offline static export still finds them under file://,
// where there's no domain root for an absolute path to resolve against.
const WORLD_IMAGES: Partial<Record<string, string>> = {
  leads: 'images/world-leads.webp',
  creative: 'images/world-creative.webp',
  it: 'images/world-it.webp',
};

function SplitWords({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <span className="split-word" key={i} style={{ marginRight: '0.28em' }}>
          <span style={{ transitionDelay: `${i * 60}ms` }}>{word}</span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollTo } = useLenis();
  const { reduceMotion, ready } = usePerfFlags();
  const [activeWorld, setActiveWorld] = useState<string | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => titleRef.current?.classList.add('in-view'));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const sections = WORLDS.map((world) => document.getElementById(world.key)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    // Narrow the observed viewport to a thin band around its vertical center,
    // so "active" tracks whichever world section is actually centered on
    // screen rather than merely present anywhere in the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveWorld(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const hero = heroRef.current;
    if (!hero) return;

    const cards = gsap.utils.toArray<HTMLElement>('.hero .star-card');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'bottom 90%',
        end: 'bottom top',
        scrub: 1,
      },
    });
    tl.to(cards, {
      scale: 0,
      opacity: 0,
      stagger: { amount: 0.6, from: 'random' },
      ease: 'power2.in',
    });
    const introPanel = document.querySelector('.intro-panel');
    if (introPanel) {
      tl.from(introPanel, { scale: 0.7, opacity: 0, ease: 'power3.out' }, '-=0.4');
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [ready, reduceMotion]);

  return (
    <section ref={heroRef} className="hero" data-world="leads">
      <WebGLScene className="webgl-layer" fallbackClassName="webgl-fallback" />
      <Constellation />
      <div className="hero-vignette" />

      <div className="hero-content">
        <span className="hero-eyebrow">Digital Plus — Leads · Creative · IT &amp; Sicherheit</span>
        <h1 ref={titleRef} className="h1-display hero-title hero-glow">
          <SplitWords text="Drei Welten." />
          <br />
          <span className="gradient-text">
            <SplitWords text="Ein digitaler Partner." />
          </span>
        </h1>
        <p className="hero-sub">
          Digital Plus verbindet Performance-Marketing, kreative Kommunikation und moderne IT-Lösungen zu einem
          System — statt drei Anbieter zu koordinieren, erhalten Sie Strategie, Umsetzung und Infrastruktur aus
          einer Hand.
        </p>

        <div className="world-selector" role="group" aria-label="Welt wählen">
          {WORLDS.map((world) => (
            <button
              key={world.key}
              type="button"
              className="world-orb"
              data-world={world.key}
              data-cursor="OPEN"
              aria-pressed={activeWorld === world.key}
              onClick={() => scrollTo(`#${world.key}`)}
            >
              {WORLD_IMAGES[world.key] ? (
                <img className="world-orb-image" src={WORLD_IMAGES[world.key]} alt="" />
              ) : (
                <WorldIcon world={world.key} />
              )}
              <span className="world-orb-number">{world.eyebrow}</span>
              <span className="world-orb-name">{world.name}</span>
              <span className="world-orb-micro">{world.microcopy}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="hero-scroll-cue">
        <span>Scrollen</span>
        <span className="line" />
      </div>
    </section>
  );
}
