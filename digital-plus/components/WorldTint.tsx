'use client';

import { useEffect, useRef } from 'react';
import { usePerfFlags } from '@/hooks/usePerfFlags';

// Kept in sync with --world-leads-rgb/--world-creative-rgb/--world-it-rgb in
// globals.css (Digital Blue / Creative Purple / Plus Cyan per the brand
// book) — these were still the pre-brand-book hex values, so this fixed
// full-viewport overlay was washing the whole page in the wrong palette
// depending on scroll position, on top of whatever else was on screen.
const ACCENT_RGB: Record<string, string> = {
  leads: '37, 99, 235',
  creative: '124, 58, 237',
  it: '0, 196, 251',
};

/**
 * A very faint full-viewport color wash that shifts toward the active
 * world's accent while its section is in view, and fades out everywhere
 * else — ties the three worlds together through motion, not just badges.
 */
export default function WorldTint() {
  const ref = useRef<HTMLDivElement>(null);
  const { reduceMotion, ready } = usePerfFlags();

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    // Scoped to the actual world sections, not every small element carrying
    // data-world (Journey nodes, FinalCTA pills, case-study art panels) —
    // those are much smaller than the viewport and were winning the
    // "highest intersection ratio" comparison below in situations that had
    // nothing to do with actually being in that world's section.
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.world-section[data-world]'));
    if (!sections.length) return;

    const ratios = new Map<Element, number>(sections.map((s) => [s, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0));

        const [best, bestRatio] = Array.from(ratios.entries()).reduce<[HTMLElement | null, number]>(
          (acc, [target, ratio]) => (ratio > acc[1] ? [target as HTMLElement, ratio] : acc),
          [null, 0],
        );

        if (best && bestRatio > 0.15) {
          const rgb = ACCENT_RGB[best.dataset.world || ''];
          if (rgb) el.style.setProperty('--tint-rgb', rgb);
          el.style.opacity = '1';
        } else {
          el.style.opacity = '0';
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ready, reduceMotion]);

  if (reduceMotion) return null;

  return <div ref={ref} className="world-tint" aria-hidden="true" />;
}
