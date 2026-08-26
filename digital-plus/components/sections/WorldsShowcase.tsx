'use client';

import { useReveal } from '@/hooks/useReveal';
import { useLenis } from '@/hooks/useLenis';
import { handleSpotlightMove } from '@/lib/spotlight';
import { WORLDS, WORLDS_SHOWCASE_INTRO } from '@/lib/content';

const WORLD_IMAGES: Record<string, string> = {
  leads: 'images/world-leads.webp',
  creative: 'images/world-creative.webp',
  it: 'images/world-it.webp',
};

function WorldCard({ world }: { world: (typeof WORLDS)[number] }) {
  const ref = useReveal<HTMLAnchorElement>();
  const { scrollTo } = useLenis();

  return (
    <a
      ref={ref}
      href={`#${world.key}`}
      data-world={world.key}
      className="card card-spotlight worlds-showcase-card reveal"
      onPointerMove={handleSpotlightMove}
      onClick={(e) => {
        e.preventDefault();
        scrollTo(`#${world.key}`);
      }}
    >
      <img className="worlds-showcase-image" src={WORLD_IMAGES[world.key]} alt="" />
      <div className="worlds-showcase-content">
        <span className="worlds-showcase-pill">
          <i className="worlds-showcase-dot" aria-hidden="true" />
          {world.showcase.pill}
        </span>
        <h3 className="worlds-showcase-name">{world.name}</h3>
        <p className="worlds-showcase-desc">{world.showcase.description}</p>
        <div className="worlds-showcase-tags">
          {world.showcase.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="worlds-showcase-go">
          <span>{world.showcase.goLabel}</span>
          <i className="worlds-showcase-arrow" aria-hidden="true">
            →
          </i>
        </div>
      </div>
    </a>
  );
}

export default function WorldsShowcase() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section className="section" aria-label="Digital Plus Leistungswelten">
      <div className="container">
        <div ref={headingRef} className="reveal" style={{ maxWidth: 780, marginBottom: '2.5rem' }}>
          <span className="eyebrow">{WORLDS_SHOWCASE_INTRO.eyebrow}</span>
          <h2 className="h2-section" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            {WORLDS_SHOWCASE_INTRO.heading}
          </h2>
          <p className="body-lg">{WORLDS_SHOWCASE_INTRO.lead}</p>
        </div>

        <div className="worlds-showcase-grid">
          {WORLDS.map((world) => (
            <WorldCard key={world.key} world={world} />
          ))}
        </div>
      </div>
    </section>
  );
}
