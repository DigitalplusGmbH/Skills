'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';
import type { ServiceDetail, World } from '@/lib/content';
import { usePerfFlags } from '@/hooks/usePerfFlags';
import { useReveal } from '@/hooks/useReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function ServiceDetailCard({ detail }: { detail: ServiceDetail }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="card card-spotlight reveal">
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

    const scenes = Array.from(pin.querySelectorAll<HTMLElement>('.scene'));
    const dots = Array.from(pin.querySelectorAll<HTMLElement>('.scene-dot'));

    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const idx = Math.min(Math.floor(self.progress * scenes.length), scenes.length - 1);
        scenes.forEach((scene, i) => {
          scene.style.opacity = i === idx ? '1' : '0';
        });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
      },
    });

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
            {world.scenes.map((scene) => (
              <div className="scene" key={scene.title}>
                <span className="scene-index">{String(world.scenes.indexOf(scene) + 1).padStart(2, '0')}</span>
                <span className="scene-title">{scene.title}</span>
                <p className="scene-desc">{scene.description}</p>
              </div>
            ))}
            <div className="scene-dots">
              {world.scenes.map((scene, i) => (
                <span key={scene.title} className={`scene-dot ${i === 0 ? 'active' : ''}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div ref={detailHeadingRef} className="reveal" style={{ maxWidth: 680, marginBottom: '2rem' }}>
          <p className="body-lg">{world.bodyExtra}</p>
        </div>
        <h3 className="h3-card" style={{ marginBottom: '1.5rem' }}>
          Leistungen im Detail
        </h3>
        <div className="grid-features">
          {world.serviceDetails.map((detail) => (
            <ServiceDetailCard key={detail.name} detail={detail} />
          ))}
        </div>
      </div>
    </section>
  );
}
