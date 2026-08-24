'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePerfFlags } from '@/hooks/usePerfFlags';
import type { WorldKey } from '@/lib/content';

interface StarCardConfig {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  blur: number;
  w: number;
  label: string;
  title: string;
  world: WorldKey;
}

// Positioned to flank the hero copy (roughly |x| < 460, |y| < 320) rather than
// overlap it — the constellation frames the text instead of competing with it.
const CARDS: StarCardConfig[] = [
  { x: -620, y: -300, z: 50, rx: -4, ry: 8, rz: -3, blur: 0, w: 200, label: 'Google Ads', title: 'CTR +38 % in 6 Wochen', world: 'leads' },
  { x: -760, y: -120, z: -260, rx: 6, ry: -10, rz: 4, blur: 3, w: 190, label: 'Tracking', title: 'Attribution über 5 Kanäle', world: 'leads' },
  { x: -640, y: 160, z: -560, rx: 2, ry: 6, rz: -2, blur: 7, w: 170, label: 'Funnel', title: 'Vom Klick zum Termin', world: 'leads' },
  { x: -720, y: 400, z: 80, rx: -6, ry: 4, rz: 2, blur: 0, w: 180, label: 'SEO', title: 'Top 3 für Kernbegriffe', world: 'leads' },

  { x: 620, y: -300, z: 70, rx: 5, ry: -8, rz: 3, blur: 0, w: 200, label: 'Branding', title: 'Neue CI in 6 Wochen', world: 'creative' },
  { x: 760, y: -100, z: -240, rx: -4, ry: 10, rz: -3, blur: 3, w: 190, label: 'Motion', title: 'Kampagnenfilm, 30 Sek.', world: 'creative' },
  { x: 640, y: 180, z: -540, rx: -3, ry: -6, rz: 2, blur: 6, w: 170, label: '3D Visual', title: 'Produkt im Raum', world: 'creative' },
  { x: 720, y: 410, z: 90, rx: 6, ry: -4, rz: -2, blur: 0, w: 180, label: 'Social', title: 'Content-Wochenplan', world: 'creative' },

  { x: -540, y: -300, z: 110, rx: 3, ry: 0, rz: 0, blur: 0, w: 190, label: 'Security', title: 'Zero-Day-Monitoring', world: 'it' },
  { x: 560, y: -300, z: -280, rx: -5, ry: 6, rz: 3, blur: 3, w: 180, label: 'Cloud', title: 'Backup in 15 Minuten', world: 'it' },
  { x: -580, y: 380, z: -600, rx: 4, ry: -5, rz: -3, blur: 8, w: 160, label: 'Netzwerk', title: '99,9 % Verfügbarkeit', world: 'it' },
  { x: 600, y: 380, z: 60, rx: -2, ry: 3, rz: 2, blur: 0, w: 170, label: 'Devices', title: 'Alle Geräte verwaltet', world: 'it' },
];

export default function Constellation() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { isMobile, reduceMotion, noHover, ready } = usePerfFlags();

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const stage = stageRef.current;
    if (!stage) return;

    const inners = Array.from(stage.querySelectorAll<HTMLElement>('.star-card-inner'));

    const floats = inners.map((el) =>
      gsap.to(el, {
        y: gsap.utils.random(-14, 14),
        rotate: gsap.utils.random(-3, 3),
        duration: gsap.utils.random(4, 7),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }),
    );

    let frame = 0;
    function onMove(e: PointerEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        inners.forEach((el, i) => {
          const depth = Math.abs(CARDS[i]?.z ?? 0) / 400;
          gsap.to(el, {
            x: dx * 18 * depth,
            rotationY: dx * 7 * depth,
            rotationX: -dy * 7 * depth,
            duration: 0.9,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        });
      });
    }

    if (!noHover) window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      floats.forEach((f) => f.kill());
      if (!noHover) window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [ready, reduceMotion, noHover]);

  const visibleCards = isMobile ? CARDS.slice(0, 4) : CARDS;

  return (
    <div ref={stageRef} className="constellation" aria-hidden="true">
      {visibleCards.map((card, i) => (
        <div
          key={`${card.world}-${i}`}
          className="star-card"
          data-world={card.world}
          style={
            {
              '--x': card.x,
              '--y': card.y,
              '--z': `${card.z}px`,
              '--rx': `${card.rx}deg`,
              '--ry': `${card.ry}deg`,
              '--rz': `${card.rz}deg`,
              '--blur': card.blur,
              '--w': `${card.w}px`,
            } as React.CSSProperties
          }
        >
          <div className="star-card-inner">
            <span className="star-card-label">{card.label}</span>
            <span className="star-card-title">{card.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
