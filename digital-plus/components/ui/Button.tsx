'use client';

import React, { useRef } from 'react';
import { usePerfFlags } from '@/hooks/usePerfFlags';

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
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        data-cursor="view"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
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
      data-cursor="view"
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {content}
    </button>
  );
}
