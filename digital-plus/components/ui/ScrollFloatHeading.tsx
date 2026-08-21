'use client';

import { useEffect, useRef } from 'react';
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
      gsap.set(spans, { opacity: 1, y: 0, filter: 'blur(0px)' });
      return;
    }

    const tween = gsap.fromTo(
      spans,
      { opacity: 0, y: 56, filter: 'blur(16px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 98%',
          end: 'top 25%',
          scrub: 0.6,
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
          <span key={i}>
            <span className={`sf-word ${isGradient ? 'gradient-text' : ''}`}>{word}</span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </Tag>
  );
}
