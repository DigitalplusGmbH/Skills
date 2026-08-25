import type { PointerEvent } from 'react';

/**
 * Drives the --mx/--my custom properties that .card-spotlight's ::before
 * radial-gradient reads to follow the cursor (see app/globals.css).
 */
export function handleSpotlightMove(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}
