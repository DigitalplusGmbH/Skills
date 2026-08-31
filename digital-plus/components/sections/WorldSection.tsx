'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';
import DotDiamond from '../ui/DotDiamond';
import LeadsCalculator from './LeadsCalculator';
import type { ServiceDetail, World } from '@/lib/content';
import { usePerfFlags } from '@/hooks/usePerfFlags';
import { useReveal } from '@/hooks/useReveal';
import { handleSpotlightMove } from '@/lib/spotlight';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function ServiceDetailCard({ detail }: { detail: ServiceDetail }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="card card-spotlight reveal" onPointerMove={handleSpotlightMove}>
      <h3 className="h3-card" style={{ fontSize: '1.0625rem' }}>
        {detail.name}
      </h3>
      <p className="body-lg" style={{ marginTop: '0.6rem', fontSize: '0.9375rem' }}>
        {detail.description}
      </p>
    </div>
  );
}

export default function WorldSection({ world }: { world: World }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const detailHeadingRef = useReveal<HTMLDivElement>();
  const { reduceMotion, isMobile, ready } = usePerfFlags();

  useEffect(() => {
    if (!ready || reduceMotion || isMobile) return;
    const pin = pinRef.current;
    if (!pin) return;

    const cards = Array.from(pin.querySelectorAll<HTMLElement>('.world-scene-card'));
    const count = cards.length;
    if (!count) return;

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const applyProgress = (p: number) => {
      cards.forEach((card, i) => {
        // entry: the card drops in from above into the foreground.
        // recede: it starts pushing back the instant the *next* card
        // begins entering, so the two motions stay in lockstep — the
        // last card has no successor, so it never recedes.
        const entry = clamp01(p * count - i + 1);
        const recede = i === count - 1 ? 0 : clamp01(p * count - i);

        const translateY = (1 - entry) * -70 + recede * 10;
        const scale = 0.9 + entry * 0.1 - recede * 0.06;
        const opacity = entry - recede * 0.45;
        // The receding card only fades to 0.55 opacity (by design, so the stack
        // still reads as a stack) — at that opacity its own title/description
        // text stayed crisp enough to visibly overlap the incoming card's text
        // for a wide scroll band, reading as garbled double-exposed copy on
        // every transition. Blurring it as it recedes keeps the depth effect
        // but makes the outgoing text illegible-on-purpose instead of
        // illegible-by-accident.
        const blur = recede * 6;

        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : 'none';
        card.style.zIndex = String(100 + i);
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => applyProgress(self.progress),
    });

    // onUpdate only fires on a scroll event within the trigger's range —
    // seed the initial state immediately so cards aren't left at their
    // CSS-default (fully opaque, stacked) appearance before the user scrolls.
    applyProgress(trigger.progress);

    return () => trigger.kill();
  }, [ready, reduceMotion, isMobile]);

  return (
    <section id={world.key} className="section world-section" data-world={world.key}>
      <div className="pin-swap" ref={pinRef}>
        <div className="pin-swap-inner">
          <div className="pin-swap-left">
            <div className="world-eyebrow-row">
              <span className="world-number">{world.number}</span>
              <span className="eyebrow">{world.eyebrow}</span>
            </div>
            <h2 className="h2-section ghost-title" data-ghost={world.ghostWord} style={{ marginTop: '1rem' }}>
              {world.headline.map((line) => (
                <span key={line} style={{ display: 'block' }}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="body-lg" style={{ marginTop: '1.25rem' }}>
              {world.body}
            </p>
            <div className="pin-swap-services">
              {world.services.map((service) => (
                <span key={service} className="tag">
                  {service}
                </span>
              ))}
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Button href={world.ctaHref} variant="world" magnetic>
                {world.ctaLabel}
              </Button>
            </div>
          </div>

          <div className="pin-swap-right">
            <div className="world-scene-stack">
              {world.scenes.map((scene, i) => (
                <div className="world-scene-card" key={scene.title} style={{ zIndex: 100 + i }}>
                  <span className="world-scene-card-number" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="world-scene-card-title">{scene.title}</h4>
                  <p className="world-scene-card-desc">{scene.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* pin-swap-inner is a sticky, 100vh-tall box that only fully clears the
          viewport right at the exact scroll position where this container
          begins — a zero-tolerance boundary. Sub-pixel rounding (e.g. from
          fractional OS display scaling) can tip that over into a visible
          overlap of the still-departing button/tags and this text. A modest
          buffer absorbs that without adding a noticeable "dead" gap. */}
      <div className="container" style={{ marginTop: 'clamp(6rem, 12vw, 12rem)' }}>
        {/* The pin-swap hero directly above is a confident two-column
            composition (copy left, animated card stack right) — dropping
            straight into a single narrow text column here left roughly half
            the 1360px container empty beside it once the pin released. This
            decorative panel gives every world (not just Leads, which used to
            get its visual weight from the calculator alone) a matching
            right-hand anchor instead of an abandoned column. */}
        <div className="world-detail-grid">
          <div className="world-detail-text">
            <div ref={detailHeadingRef} className="reveal">
              <p className="body-lg">{world.bodyExtra}</p>
            </div>
            {world.key === 'leads' && <LeadsCalculator />}
          </div>
          <div className="world-detail-visual" data-world={world.key} aria-hidden="true">
            <span className="world-detail-visual-index">{world.number}</span>
            <DotDiamond className="world-detail-visual-motif" />
            <span className="world-detail-visual-caption">{world.ghostWord}</span>
          </div>
        </div>

        <div style={{ marginTop: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <span className="eyebrow">Angebot</span>
          <h3 className="h3-card" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            Leistungen im Detail
          </h3>
          <div className="grid-features grid-features-services">
            {world.serviceDetails.map((detail) => (
              <ServiceDetailCard key={detail.name} detail={detail} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
