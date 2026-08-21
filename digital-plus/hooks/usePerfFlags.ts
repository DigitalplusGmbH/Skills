'use client';

import { useEffect, useState } from 'react';

export interface PerfFlags {
  isMobile: boolean;
  isLowCore: boolean;
  reduceMotion: boolean;
  noHover: boolean;
  ready: boolean;
}

const DEFAULT_FLAGS: PerfFlags = {
  isMobile: false,
  isLowCore: false,
  reduceMotion: false,
  noHover: false,
  ready: false,
};

export function usePerfFlags(): PerfFlags {
  const [flags, setFlags] = useState<PerfFlags>(DEFAULT_FLAGS);

  useEffect(() => {
    const next: PerfFlags = {
      isMobile: window.matchMedia('(max-width: 640px)').matches,
      isLowCore: (navigator.hardwareConcurrency || 8) < 4,
      reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      noHover: !window.matchMedia('(hover: hover)').matches,
      ready: true,
    };
    setFlags(next);
    document.documentElement.dataset.perf = JSON.stringify(next);
  }, []);

  return flags;
}
