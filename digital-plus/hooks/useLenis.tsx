'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LenisContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void;
}

const LenisContext = createContext<LenisContextValue>({ scrollTo: () => {} });

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ctx, setCtx] = useState<LenisContextValue>({ scrollTo: () => {} });

  useEffect(() => {
    // Every ScrollTrigger on the page measures element positions relative to
    // the CURRENT layout. Web fonts swapping in (font-display: swap) after
    // that measurement shifts text metrics and reflows content below —
    // silently invalidating start/end offsets for anything further down the
    // page. Refreshing once fonts settle (and once more after full load, as
    // a catch-all for images/WebGL canvas sizing) keeps every trigger honest.
    const refresh = () => ScrollTrigger.refresh();
    const fontsReady = (document as any).fonts?.ready as Promise<unknown> | undefined;
    fontsReady?.then(refresh).catch(() => {});
    window.addEventListener('load', refresh);
    const timeoutId = window.setTimeout(refresh, 1200);

    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    setCtx({
      scrollTo: (target, options) => lenis.scrollTo(target, { offset: options?.offset ?? -80 }),
    });

    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return <LenisContext.Provider value={ctx}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
