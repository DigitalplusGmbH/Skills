'use client';

import { useStaggerReveal } from '@/hooks/useReveal';

type Point = { x: number; y: number; weight: number };

// Four corners plus three interpolated points per edge (t = .25/.5/.75) of a
// diamond with the given half-width — the same construction as the brand
// signet's rasterized rhombus (dots tapering toward each tip, fullest at the
// mid-edge), not a grid clipped into a diamond outline.
function ring(half: number): Point[] {
  const corners: [number, number][] = [
    [0, -half],
    [half, 0],
    [0, half],
    [-half, 0],
  ];
  const pts: Point[] = [];
  for (let i = 0; i < 4; i += 1) {
    const [ax, ay] = corners[i];
    const [bx, by] = corners[(i + 1) % 4];
    pts.push({ x: ax, y: ay, weight: 0.5 });
    [0.25, 0.5, 0.75].forEach((t) => {
      pts.push({ x: ax + (bx - ax) * t, y: ay + (by - ay) * t, weight: t === 0.5 ? 1.25 : 0.85 });
    });
  }
  return pts;
}

const RINGS = [
  { half: 44, radius: 1.7, opacity: 0.9 },
  { half: 30, radius: 1.15, opacity: 0.55 },
  { half: 16, radius: 0.75, opacity: 0.32 },
];

/**
 * The brand signet's diamond-of-dots, reused as a generic decorative motif
 * (not the protected logo file). Three concentric rings — echoes the real
 * mark's layered rhombus instead of a flat grid clipped into a diamond.
 * Dots fade/scale in with a stagger the first time this scrolls into view
 * (via useStaggerReveal) — a one-time "content reveal", not a looping
 * animation, per the book's "ruhig, kein permanentes Wackeln" rule.
 */
export default function DotDiamond({ className = '' }: { className?: string }) {
  const ref = useStaggerReveal<SVGSVGElement>(0.35);

  return (
    <svg
      ref={ref}
      className={`dot-diamond ${className}`}
      viewBox="-50 -50 100 100"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {RINGS.map((cfg) =>
        ring(cfg.half).map((p, i) => (
          <circle
            key={`${cfg.half}-${i}`}
            cx={p.x}
            cy={p.y}
            r={cfg.radius * p.weight}
            style={{ ['--dot-o' as string]: cfg.opacity }}
          />
        )),
      )}
    </svg>
  );
}
