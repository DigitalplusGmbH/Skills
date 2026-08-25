'use client';

import { useEffect, useState } from 'react';

const CODE = 'carti';

/**
 * Hidden dev easter egg — type "carti" anywhere on the page for a brief
 * Whole Lotta Red-styled flash. No visible trace unless you know the code.
 */
export default function EasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log('%c🖤 psst… try typing "carti" 🖤', 'color:#ff0033;font-size:14px;font-weight:bold;');

    let buffer = '';
    let timeoutId = 0;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-CODE.length);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        buffer = '';
      }, 2000);

      if (buffer === CODE) {
        buffer = '';
        setActive(true);
        window.setTimeout(() => setActive(false), 2600);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="easter-egg-overlay" aria-hidden="true">
      <span className="easter-egg-text">WHOLE LOTTA RED</span>
    </div>
  );
}
