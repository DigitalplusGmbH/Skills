'use client';

import React, { useEffect, useRef } from 'react';
import { usePerfFlags } from '@/hooks/usePerfFlags';
import { useLenis } from '@/hooks/useLenis';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'world';
  magnetic?: boolean;
  showArrow?: boolean;
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  magnetic = false,
  showArrow = true,
  className = '',
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const { noHover, reduceMotion } = usePerfFlags();
  const { scrollTo } = useLenis();

  function handlePointerMove(e: React.PointerEvent) {
    if (!magnetic || noHover || reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }

  function handlePointerLeave() {
    if (ref.current) ref.current.style.transform = '';
  }

  // Scrolling (wheel/trackpad) moves the page under a stationary pointer
  // without firing pointerleave, so a magnetic offset applied right before
  // a scroll would otherwise stay stuck on the button for as long as it's
  // being scrolled — a stale transform on a will-change-heavy element is
  // exactly the kind of state that causes ghosting during fast scroll.
  useEffect(() => {
    if (!magnetic) return;
    function reset() {
      if (ref.current) ref.current.style.transform = '';
    }
    window.addEventListener('scroll', reset, { passive: true });
    return () => window.removeEventListener('scroll', reset);
  }, [magnetic]);

  const classes = `btn btn-${variant} ${magnetic ? 'btn-magnetic' : ''} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (href) {
    const isSamePageAnchor = href.startsWith('#');
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        data-cursor="ansehen"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={
          isSamePageAnchor
            ? (e) => {
                e.preventDefault();
                scrollTo(href);
              }
            : undefined
        }
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      data-cursor="ansehen"
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {content}
    </button>
  );
}
