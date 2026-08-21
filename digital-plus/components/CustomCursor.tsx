'use client';

import { useEffect, useRef } from 'react';
import { usePerfFlags } from '@/hooks/usePerfFlags';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { noHover, reduceMotion, ready } = usePerfFlags();

  useEffect(() => {
    if (!ready || noHover || reduceMotion) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    function onMove(e: PointerEvent) {
      cursor!.style.left = `${e.clientX}px`;
      cursor!.style.top = `${e.clientY}px`;
      glow!.style.left = `${e.clientX}px`;
      glow!.style.top = `${e.clientY}px`;
    }

    function onOver(e: PointerEvent) {
      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      if (target) {
        cursor!.classList.add('is-active');
        cursor!.textContent = target.getAttribute('data-cursor') || '';
      }
    }

    function onOut(e: PointerEvent) {
      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      if (target) {
        cursor!.classList.remove('is-active');
        cursor!.textContent = '';
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerout', onOut, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
    };
  }, [ready, noHover, reduceMotion]);

  if (noHover || reduceMotion) return null;

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
    </>
  );
}
