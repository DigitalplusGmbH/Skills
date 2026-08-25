'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORLDS } from '@/lib/content';
import { usePerfFlags } from '@/hooks/usePerfFlags';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const NODE_X = [150, 600, 1050];

const PATH_D =
  'M0,170 C75,170 75,50 150,50 C225,50 300,190 375,190 C450,190 525,50 600,50 C675,50 750,190 825,190 C900,190 975,50 1050,50 C1125,50 1125,170 1200,170';

export default function Journey() {
  const pinRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGCircleElement>(null);
  const { reduceMotion, isMobile, ready } = usePerfFlags();

  useEffect(() => {
    if (!ready) return;
    const pin = pinRef.current;
    const path = pathRef.current;
    const marker = markerRef.current;
    if (!pin || !path || !marker) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    if (reduceMotion || isMobile) {
      path.style.strokeDashoffset = '0';
      const end = path.getPointAtLength(length);
      marker.setAttribute('cx', String(end.x));
      marker.setAttribute('cy', String(end.y));
      return;
    }

    path.style.strokeDashoffset = `${length}`;

    // The path is not parametrised linearly in x (peaks/valleys have uneven
    // arc length), so the node dots' scroll-progress thresholds have to be
    // sampled from the actual curve rather than assumed evenly spaced —
    // otherwise a node lights up well before or after the marker visually
    // reaches it.
    const steps = 600;
    const samples = Array.from({ length: steps + 1 }, (_, s) => {
      const len = (s / steps) * length;
      return { len, x: path.getPointAtLength(len).x };
    });
    const nodeFractions = NODE_X.map((targetX) => {
      const sample = samples.find((s) => s.x >= targetX) ?? samples[samples.length - 1];
      return sample.len / length;
    });

    const captions = Array.from(pin.querySelectorAll<HTMLElement>('.journey-caption-item'));
    const nodes = Array.from(pin.querySelectorAll<HTMLElement>('.journey-node'));

    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        path.style.strokeDashoffset = `${length * (1 - progress)}`;
        const point = path.getPointAtLength(length * progress);
        marker.setAttribute('cx', String(point.x));
        marker.setAttribute('cy', String(point.y));

        let idx = 0;
        nodeFractions.forEach((fraction, i) => {
          const reached = progress >= fraction - 0.015;
          nodes[i]?.classList.toggle('reached', reached);
          if (reached) idx = i;
        });
        captions.forEach((cap, i) => cap.classList.toggle('active', i === idx));
      },
    });

    return () => trigger.kill();
  }, [ready, reduceMotion, isMobile]);

  return (
    <section className="section journey-section">
      <div className="journey-pin" ref={pinRef}>
        <div className="journey-pin-inner">
          <div className="container">
            <span className="eyebrow">Der Weg</span>
            <h2 className="h2-section" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              Von der ersten Anfrage bis zur sicheren Infrastruktur.
            </h2>

            <div className="journey-track">
              <svg className="journey-svg" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
                <path className="journey-path-bg" d={PATH_D} />
                <path ref={pathRef} className="journey-path" d={PATH_D} />
                <circle ref={markerRef} className="journey-marker" r="9" cx="0" cy="170" />
              </svg>

              <div className="journey-nodes">
                {WORLDS.map((world, i) => (
                  <div
                    key={world.key}
                    className="journey-node"
                    data-world={world.key}
                    style={{ left: `${(NODE_X[i] / 1200) * 100}%` }}
                  >
                    <span className="journey-node-dot" />
                    <span className="journey-node-label">{world.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="journey-caption">
              {WORLDS.map((world, i) => (
                <div
                  key={world.key}
                  className={`journey-caption-item ${i === 0 ? 'active' : ''}`}
                  data-world={world.key}
                >
                  <span className="journey-caption-number">{world.number}</span>
                  <p className="journey-caption-text">{world.microcopy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The wavy scroll-scrubbed marker above is a desktop flourish — CSS
          swaps it out for this plain list below 1024px instead of just
          hiding the section outright, so the headline and each world's
          microcopy still reach mobile/tablet visitors. */}
      <div className="journey-mobile-fallback">
        <div className="container">
          <span className="eyebrow">Der Weg</span>
          <h2 className="h2-section" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            Von der ersten Anfrage bis zur sicheren Infrastruktur.
          </h2>
          <ol className="journey-mobile-list">
            {WORLDS.map((world) => (
              <li key={world.key} data-world={world.key}>
                <span className="journey-mobile-number">{world.number}</span>
                <div>
                  <span className="journey-mobile-name">{world.name}</span>
                  <p className="journey-mobile-text">{world.microcopy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
