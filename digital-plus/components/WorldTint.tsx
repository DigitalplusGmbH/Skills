'use client';

import { useEffect, useRef } from 'react';
import { usePerfFlags } from '@/hooks/usePerfFlags';

const ACCENT_RGB: Record<string, string> = {
  leads: '0, 145, 212',
  creative: '214, 22, 159',
  it: '109, 40, 217',
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

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-world]'));
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
