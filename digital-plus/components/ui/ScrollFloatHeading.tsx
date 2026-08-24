'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePerfFlags } from '@/hooks/usePerfFlags';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFloatHeadingProps {
  text: string;
  as?: 'h2' | 'h3';
  className?: string;
  ghostWord?: string;
  /** Word index (0-based) from which words render with the signature gradient. */
  gradientFrom?: number;
}

/**
 * A calm "curtain" reveal: each word slides up out of an overflow-hidden mask
 * as the heading scrolls into view — no blur, no snap. Fires once over a short
 * fixed duration rather than scrubbing with scroll position: a mask reveal
 * necessarily clips words vertically through mid-glyph while in transit, so a
 * scroll-linked version leaves that half-clipped (near-illegible) state on
 * screen for as long as the reader scrolls slowly or pauses. A one-shot
 * animation guarantees it resolves in well under a second regardless of how
 * the user scrolls.
 */
export default function ScrollFloatHeading({
  text,
  as = 'h2',
  className = '',
  ghostWord,
  gradientFrom,
}: ScrollFloatHeadingProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { reduceMotion, ready } = usePerfFlags();
  const words = text.split(' ');

  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>('.sf-word'));
    if (spans.length === 0) return;

    if (reduceMotion) {
      gsap.set(spans, { yPercent: 0, opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      spans,
      { yPercent: 115, opacity: 0.4 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ready, reduceMotion]);

  const Tag = as as any;
  const baseClass = as === 'h2' ? 'h2-section' : 'h3-card';

  return (
    <Tag
      ref={ref}
      className={`${baseClass} ${ghostWord ? 'ghost-title' : ''} ${className}`.trim()}
      data-ghost={ghostWord}
    >
      {words.map((word, i) => {
        const isGradient = gradientFrom !== undefined && i >= gradientFrom;
        return (
          <span className="sf-word-mask" key={i}>
            <span className={`sf-word ${isGradient ? 'gradient-text' : ''}`}>{word}</span>
          </span>
        );
      }).reduce<ReactNode[]>((acc, node, i) => {
        if (i > 0) acc.push(' ');
        acc.push(node);
        return acc;
      }, [])}
    </Tag>
  );
}
