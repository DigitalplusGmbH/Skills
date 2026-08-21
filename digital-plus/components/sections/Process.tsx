'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS, type ProcessStep } from '@/lib/content';
import { usePerfFlags } from '@/hooks/usePerfFlags';
import { useReveal } from '@/hooks/useReveal';
import ScrollFloatHeading from '../ui/ScrollFloatHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Step({ step }: { step: ProcessStep }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal process-step">
      <span className="process-step-index">{step.index}</span>
      <h3 className="process-step-title">{step.title}</h3>
      <p className="process-step-desc">{step.description}</p>
    </div>
  );
}

export default function Process() {
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useReveal<HTMLSpanElement>();
  const { reduceMotion, ready } = usePerfFlags();

  useEffect(() => {
    if (!ready) return;
    const line = lineRef.current;
    const signal = line?.querySelector<HTMLElement>('.process-signal');
    if (!line || !signal) return;

    if (reduceMotion) {
      signal.style.transform = 'scaleX(1)';
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: line,
      start: 'top 75%',
      end: 'bottom 45%',
      scrub: 0.8,
      onUpdate: (self) => gsap.set(signal, { scaleX: self.progress }),
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

        <div className="process-track">
          <div className="process-line" ref={lineRef}>
            <div className="process-signal" />
          </div>
          <div className="process-steps">
            {PROCESS_STEPS.map((step) => (
              <Step key={step.index} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
