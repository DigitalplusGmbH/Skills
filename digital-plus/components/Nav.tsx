'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '@/lib/content';
import { useLenis } from '@/hooks/useLenis';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    scrollTo(href);
  }

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Hauptnavigation">
        <a href="#top" className="nav-logo" onClick={(e) => handleNavClick(e, '#top')}>
          Digital Plus
        </a>
        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="nav-link" onClick={(e) => handleNavClick(e, item.href)}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="nav-links" style={{ gap: '1rem' }}>
          <a href="#kontakt" className="btn btn-primary" onClick={(e) => handleNavClick(e, '#kontakt')}>
            Projekt starten
          </a>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span style={open ? { transform: 'translateY(7px) rotate(45deg)' } : undefined} />
          <span style={open ? { opacity: 0 } : undefined} />
          <span style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined} />
        </button>
      </nav>

      <div className={`nav-mobile ${open ? 'open' : ''}`} aria-hidden={!open}>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} className="nav-link" onClick={(e) => handleNavClick(e, item.href)}>
            {item.label}
          </a>
        ))}
        <a href="#kontakt" className="btn btn-primary" onClick={(e) => handleNavClick(e, '#kontakt')}>
          Projekt starten
        </a>
      </div>
    </>
  );
}
