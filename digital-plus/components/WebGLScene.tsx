'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { usePerfFlags } from '@/hooks/usePerfFlags';

const DigitalCore = dynamic(() => import('./DigitalCore'), { ssr: false });

interface WebGLSceneProps {
  className?: string;
  fallbackClassName?: string;
}

/**
 * Gates the single WebGL signature-moment on the page: only mounts the
 * Three.js canvas once visible, and never on mobile / low-core / reduced-motion —
 * those get a static gradient fallback instead (see DESIGN.md §7, §9).
 */
export default function WebGLScene({ className = '', fallbackClassName = '' }: WebGLSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const { isMobile, isLowCore, reduceMotion, ready } = usePerfFlags();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldRenderWebGL = ready && !isMobile && !isLowCore && !reduceMotion;

  return (
    <div ref={containerRef} className={className}>
      {shouldRenderWebGL ? (
        inView && <DigitalCore />
      ) : (
        <div className={fallbackClassName} aria-hidden="true" />
      )}
    </div>
  );
}
