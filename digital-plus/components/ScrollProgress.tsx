'use client';

import { useEffect, useRef } from 'react';
import { usePerfFlags } from '@/hooks/usePerfFlags';

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { reduceMotion, ready } = usePerfFlags();

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const bar = ref.current;
    if (!bar) return;

    let frame = 0;
    function update() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar!.style.transform = `scaleX(${pct})`;
    }
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ready, reduceMotion]);

  if (reduceMotion) return null;

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
