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
      // No Lenis instance in this branch, but nav links, world-orb buttons and
      // CTAs all call scrollTo() expecting it to actually move the page —
      // without this, the default no-op context makes every one of them dead.
      setCtx({
        scrollTo: (target, options) => {
          const el = typeof target === 'string' ? document.querySelector(target) : target;
          if (typeof target === 'number') {
            window.scrollTo({ top: target + (options?.offset ?? 0) });
          } else if (el instanceof HTMLElement) {
            const top = el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? -80);
            window.scrollTo({ top });
          }
        },
      });
      return;
    }

    // Lower lerp = more glide, less snap — a heavier, calmer scroll feel.
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.85, smoothWheel: true });
    lenisRef.current = lenis;

    // Drive Lenis off GSAP's ticker (already a single rAF loop shared by every
    // GSAP animation on the page) instead of a second, separate rAF loop —
    // running lenis.raf() twice per frame doubled its work for no benefit.
    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    setCtx({
      scrollTo: (target, options) => lenis.scrollTo(target, { offset: options?.offset ?? -80 }),
    });

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return <LenisContext.Provider value={ctx}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
