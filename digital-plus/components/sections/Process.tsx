'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '@/lib/content';
import { usePerfFlags } from '@/hooks/usePerfFlags';
import { useReveal } from '@/hooks/useReveal';
import ScrollFloatHeading from '../ui/ScrollFloatHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useReveal<HTMLSpanElement>();
  const { reduceMotion, ready } = usePerfFlags();

  useEffect(() => {
    if (!ready) return;
    const track = trackRef.current;
    if (!track) return;
    const signal = track.querySelector<HTMLElement>('.process-signal');
    const steps = Array.from(track.querySelectorAll<HTMLElement>('.process-step'));
    if (!signal) return;

    if (reduceMotion) {
      signal.style.transform = 'scaleX(1)';
      steps.forEach((s) => s.classList.add('active'));
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(signal, { scaleX: self.progress });
        const activeCount = Math.ceil(self.progress * steps.length);
        steps.forEach((step, i) => step.classList.toggle('active', i < activeCount));
      },
    });

    return () => trigger.kill();
  }, [ready, reduceMotion]);

  return (
    <section className="section section-alt">
      <div className="container">
        <div style={{ maxWidth: 640 }}>
          <span ref={headingRef} className="eyebrow reveal">
            Ablauf
          </span>
          <div style={{ marginTop: '1rem' }}>
            <ScrollFloatHeading text="Vier Schritte, ein System" />
          </div>
        </div>

        <div className="process-track" ref={trackRef}>
          <div className="process-line">
            <div className="process-signal" />
          </div>
          <div className="process-steps">
            {PROCESS_STEPS.map((step) => (
              <div key={step.index} className="process-step">
                <span className="process-step-index">{step.index}</span>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
