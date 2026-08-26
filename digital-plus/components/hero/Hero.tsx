'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Constellation from './Constellation';
import WebGLScene from '../WebGLScene';
import { usePerfFlags } from '@/hooks/usePerfFlags';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const { reduceMotion, ready } = usePerfFlags();

  useEffect(() => {
    const id = requestAnimationFrame(() => titleRef.current?.classList.add('in-view'));
    return () => cancelAnimationFrame(id);
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
      </div>

      <div className="hero-scroll-cue">
        <span>Scrollen</span>
        <span className="line" />
      </div>
    </section>
  );
}
