# DESIGN.md — Digital Plus

> Drei Welten, ein digitales Universum: Swiss Precision meets Future Digital Technology.

## 1. Visual Theme & Atmosphere

**Style**: Dark Editorial Tech — Schweizer Präzision trifft kybernetische Zukunftstechnologie.
**Keywords**: futuristisch, präzise, räumlich, minimalistisch, hochwertig, kontrolliert, kinetisch, vertrauenswürdig.
**Tone**: ruhig-selbstbewusst, technisch fundiert, editoriell großzügig — NOT gaming, NOT crypto-neon, NOT generisches Glassmorphism-Agentur-Template.
**Feel**: Wie ein Reinraum-Labor, in dem gerade drei Lichtquellen — Blau, Violett, Magenta — synchron zu pulsieren beginnen. Nichts blinkt zufällig; jede Bewegung hat einen Grund.

**Interaction Tier**: L3 — Immersive Scroll-Story-Erfahrung im Hero, danach hochwertige Editorial-Website mit L2-Rhythmus.
**Dependencies**: GSAP + ScrollTrigger + Lenis (Smooth Scroll) + Three.js (ein WebGL-Scene im Hero, `React Three Fiber` wenn Next.js/React genutzt wird).

**Weltspezifische Gewichtung** (dieselbe Palette, verschobener Schwerpunkt):
| Welt | Dominante Akzente |
|------|--------------------|
| Leads | Cyber Blue dominant, Violet als Übergang |
| Creative | Cyber Pink + Violet dominant |
| IT & Sicherheit | Cyber Blue + Violet, ruhiger und kontrastärmer als Creative |

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds */
  --bg: #07080d;                 /* Seitenhintergrund, fast schwarz mit Blaustich */
  --surface: #101117;            /* Karten, Panels, Nav-Hintergrund (gescrollt) */
  --surface-alt: #14151f;        /* alternierende Section-Flächen */
  --surface-hover: #1a1c28;      /* Hover-Zustand von Flächen */

  /* Borders */
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.18);

  /* Text */
  --text: #ffffff;
  --text-secondary: #a8abb8;
  --text-tertiary: #6e7180;

  /* Accent — global default (CTA, Links, Fokus) */
  --accent: #2563ff;              /* Cyber Blue */
  --accent-hover: #5286ff;

  /* Welten-Akzente */
  --world-leads: #00a8ff;         /* Cyber Blue, klar & datenhaft */
  --world-leads-rgb: 0, 168, 255;
  --world-creative: #ff2bd6;      /* Cyber Pink */
  --world-creative-rgb: 255, 43, 214;
  --world-it: #7c3aed;            /* Cyber Violet */
  --world-it-rgb: 124, 58, 237;

  /* Signature Gradient — sparsam einsetzen (Logo, Hero-Keyword, ein CTA-Block) */
  --gradient-signature: linear-gradient(120deg, #00a8ff 0%, #7c3aed 50%, #ff2bd6 100%);

  /* RGB-Hilfswerte für rgba() */
  --bg-rgb: 7, 8, 13;
  --accent-rgb: 37, 99, 255;
  --surface-rgb: 16, 17, 23;

  /* Semantic */
  --success: #22c55e;
  --error: #f43f5e;
  --warning: #f59e0b;
}

/* Weltspezifischer Scope — wird per data-Attribut auf die jeweilige Section gesetzt */
[data-world="leads"]    { --world-accent: var(--world-leads);    --world-accent-rgb: var(--world-leads-rgb); }
[data-world="creative"] { --world-accent: var(--world-creative); --world-accent-rgb: var(--world-creative-rgb); }
[data-world="it"]       { --world-accent: var(--world-it);       --world-accent-rgb: var(--world-it-rgb); }
```

**Color Rules:**
- Alle Farben werden ausschließlich über CSS-Variablen referenziert — keine hartkodierten Hex-Werte im Komponentencode.
- Pro Section maximal **ein** dominanter Akzent (`--world-accent` innerhalb einer Welt, sonst `--accent`). Nie zwei Welt-Akzente gleichzeitig gleich stark in derselben Section.
- `--gradient-signature` ist ein Markenzeichen, kein Füllmuster: max. 3 Einsatzorte auf der gesamten Seite (Logo-Mark, ein Hero-Schlüsselwort, ein finaler CTA-Hintergrund).
- Cyber-Farben immer auf `--bg`/`--surface` (dunkel), nie als große Flächen — sie sind Licht, keine Farbfläche. Große Flächen bleiben `--bg`/`--surface`.

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-display: 'Space Grotesk', 'Inter', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Space Grotesk | clamp(2.75rem, 7vw, 6.5rem) | 700 | 1.02 | -0.02em |
| Section H2 | Space Grotesk | clamp(2rem, 4vw, 3.25rem) | 600 | 1.08 | -0.01em |
| H3 | Space Grotesk | clamp(1.25rem, 2vw, 1.75rem) | 600 | 1.2 | — |
| Body | Inter | clamp(1rem, 1.1vw, 1.125rem) | 400 | 1.65 | — |
| Label / Eyebrow | Inter | 0.8125rem | 600 | 1.4 | 0.14em (uppercase) |
| Mono / Data | 'JetBrains Mono', monospace | 0.875rem | 500 | 1.5 | 0.01em |

**Typography Rules:**
- Headline-Weight ≥ 600, Hero H1 immer 700.
- Zeilenlänge Fließtext max. 68ch für Lesbarkeit auf dunklem Grund.
- Deutsche Umlaute/ß: beide Fonts unterstützen Latin Extended vollständig — kein Fallback-Bruch.
- Body-Zeilenhöhe ≥ 1.6, Absatzabstand ≥ 1.25em.
- **NEVER use**: Serifenschriften, verspielte/rundliche Display-Fonts, System-Default ohne Fallback-Kette.

**Text Decoration:**
- Hero H1: **Gradient-Text** auf dem Schlüsselwort ("EIN DIGITALER PARTNER") mit `--gradient-signature`, plus subtiler **Glow** (`text-shadow: 0 0 40px rgba(124,58,237,0.35)`) — Bedingung erfüllt: dunkler Hintergrund + Schriftgröße ≥ 80px.
- Section H2: kein Gradient, kein Shadow — Welt-Sections nutzen stattdessen die **Ghost-Title**-Technik (Pattern 5) mit `--world-accent` als Ghost-Farbe für räumliche Tiefe.
- Fließtext (`p`): niemals Dekoration.
- Eyebrow-Labels: `border-bottom: 2px solid var(--world-accent, var(--accent))`, kein Text-Shadow.

## 4. Component Stylings

### Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.25s cubic-bezier(0.16,1,0.3,1),
              box-shadow 0.25s cubic-bezier(0.16,1,0.3,1),
              background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.btn-primary {
  background: var(--accent);
  color: #ffffff;
}
.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(var(--accent-rgb), 0.35);
}
.btn-primary:active { transform: translateY(0) scale(0.97); box-shadow: none; }
.btn-primary:focus-visible { outline: 2px solid var(--accent-hover); outline-offset: 3px; }
.btn-primary:disabled { background: var(--surface-alt); color: var(--text-tertiary); cursor: not-allowed; transform: none; box-shadow: none; }

.btn-secondary {
  background: transparent;
  color: var(--text);
  border-color: var(--border);
}
.btn-secondary:hover { border-color: var(--border-hover); background: var(--surface-hover); transform: translateY(-2px); }
.btn-secondary:active { transform: translateY(0) scale(0.97); }
.btn-secondary:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.btn-secondary:disabled { color: var(--text-tertiary); border-color: var(--border); cursor: not-allowed; transform: none; }

/* Magnetische CTA (JS setzt --mx/--my via translate, siehe Section 7) */
.btn-magnetic { will-change: transform; }
```

### Cards

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.75rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
  position: relative;
  isolation: isolate;
}
.card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(var(--world-accent-rgb, var(--accent-rgb)), 0.25);
}
.card:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }

/* Spotlight-Hover (Feature-Karten): --mx/--my per pointermove gesetzt */
.card-spotlight::before {
  content: '';
  position: absolute; inset: 0; border-radius: inherit;
  background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%),
              rgba(var(--world-accent-rgb, var(--accent-rgb)), 0.14), transparent 70%);
  opacity: 0; transition: opacity 0.3s ease; pointer-events: none; z-index: 1;
}
.card-spotlight:hover::before { opacity: 1; }
```

### Navigation

```css
.nav {
  position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem clamp(1.25rem, 5vw, 3rem);
  background: transparent; border-bottom: 1px solid transparent;
  transition: background 0.35s ease, border-color 0.35s ease, padding 0.35s ease, backdrop-filter 0.35s ease;
}
.nav.scrolled {
  background: rgba(var(--bg-rgb), 0.82);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--border);
  padding-block: 0.875rem;
}
.nav-link {
  color: var(--text-secondary); font-size: 0.9375rem; font-weight: 500;
  padding: 0.4rem 0; position: relative; text-decoration: none;
  transition: color 0.25s ease;
}
.nav-link::after {
  content: ''; position: absolute; left: 0; bottom: -2px; width: 0; height: 1.5px;
  background: var(--accent); transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
}
.nav-link:hover { color: var(--text); }
.nav-link:hover::after { width: 100%; }
.nav-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
.nav-link[aria-current="true"] { color: var(--text); }
.nav-link[aria-current="true"]::after { width: 100%; }
```

### Links

```css
.link {
  color: var(--text);
  text-decoration: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
.link::after {
  content: ''; position: absolute; left: 0; bottom: -1px; width: 100%; height: 1px;
  background: var(--text-tertiary); transition: background 0.25s ease, transform 0.25s ease;
  transform-origin: left;
}
.link:hover::after { background: var(--world-accent, var(--accent)); }
.link .arrow { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1); }
.link:hover .arrow { transform: translateX(4px); }
.link:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 2px; }
```

### Tags / Badges

```css
.tag {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.3rem 0.75rem; border-radius: 999px;
  font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
  background: rgba(var(--world-accent-rgb, var(--accent-rgb)), 0.12);
  color: var(--world-accent, var(--accent));
  border: 1px solid rgba(var(--world-accent-rgb, var(--accent-rgb)), 0.25);
  transition: background 0.2s ease;
}
.tag:hover { background: rgba(var(--world-accent-rgb, var(--accent-rgb)), 0.2); }
```

### World Selector (Hero-spezifisch)

```css
.world-orb {
  border: 1px solid var(--border);
  background: rgba(var(--surface-rgb), 0.6);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.world-orb:hover, .world-orb:focus-visible {
  border-color: var(--world-accent);
  box-shadow: 0 0 0 1px var(--world-accent), 0 0 48px rgba(var(--world-accent-rgb), 0.35);
  transform: translateY(-6px);
}
.world-orb:focus-visible { outline: 2px solid var(--world-accent); outline-offset: 4px; }
.world-orb[aria-pressed="true"] { border-color: var(--world-accent); background: rgba(var(--world-accent-rgb), 0.08); }
```

## 5. Layout Principles

**Container:**
- Max width: 1360px (Editorial-Sections), 1440px (Case-Study-Vollbild-Bilder dürfen breiter).
- Padding: `clamp(1.25rem, 5vw, 4rem)` horizontal.
- Narrow variant (Textblöcke, Testimonial-Quote): 640px.

**Spacing Scale:**
- Section padding: `clamp(5rem, 10vw, 9rem)` vertikal.
- Component gap: 1.5rem (Karten-Grid gap), 0.75rem (Label-zu-Headline).
- Card internal padding: 1.75rem–2.25rem.

**Grid:**
```css
.grid-worlds { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.grid-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }
.grid-bento { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.grid-bento .span-2 { grid-column: span 2; }
.grid-cases { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
```

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | keine Schatten, nur `--border` | Nav (top), Footer, Tags |
| Subtle | `0 8px 24px rgba(0,0,0,0.25)` | Karten im Ruhezustand |
| Elevated | `0 24px 60px rgba(0,0,0,0.45)` + 1px Akzent-Ring | Karten-Hover, Modals |
| Glow | `0 0 48px rgba(var(--world-accent-rgb),0.35)` | World-Orbs aktiv, CTA-Block, WebGL-Halo |

## 7. Animation & Interaction

**Motion Philosophy**: Jede Bewegung erzählt etwas über die drei Welten — nie Dekoration ohne Bedeutung. Scroll ist die Zeitachse der Markenerzählung.
**Tier**: L3

### Dependencies
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"></script>
```
(Im Next.js-Build: `gsap`, `@gsap/react`, `lenis`, `three` + `@react-three/fiber` als npm-Dependencies statt CDN.)

### Base Setup
```js
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const perf = {
  isMobile: matchMedia('(max-width: 640px)').matches,
  isLowCore: navigator.hardwareConcurrency < 4,
  reduceMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
  noHover: !matchMedia('(hover: hover)').matches,
};
document.documentElement.dataset.perf = JSON.stringify(perf);
```

### Entrance Animation
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
.reveal { opacity: 0; transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
.reveal.in-view { opacity: 1; transform: translateY(0); }
```

### Scroll Behavior — Signature Moments (mind. 3/4 Scroll-Story-Muster, siehe scroll-story-patterns.md)

1. **Hero — Card Constellation** (Pattern 1): 12–14 Karten (je eine reale Leistungsprobe je Welt: Ads-Dashboard-Ausschnitt, Branding-Mockup, Security-Node) schweben in 3D um den zentralen "Digital Core" (WebGL Torus-Knot/Sphere, iridescentes Material). Mausbewegung erzeugt Tiefen-Parallaxe je Z-Ebene.
2. **Hero → Digital-Plus-Intro — Card Collapse** (Pattern 2): Beim ersten Scroll fliegen die Konstellations-Karten gestaffelt (`stagger random`) in die Mitte und lösen sich in das nächste Section-Panel auf ("Drei Welten. Eine Strategie.").
3. **Drei-Welten-Sections — Left Pin / Right Swap** (Pattern 3): Für jede Welt (Leads/Creative/IT) bleibt links Titel+Text+CTA fixiert, rechts wechseln 3–4 Szenen (Datengraph → Funnel → Conversion-Point für Leads; Kamera → Mockup → Typografie für Creative; Server-Rack → Netzwerk-Diagramm → Shield für IT).
4. **Digital Core WebGL Signature** (Pattern 4): derselbe Torus-Knot aus dem Hero taucht in der CTA-Section vor dem Footer erneut auf, jetzt langsam rotierend, als visueller Rahmen für "Welche Welt bringt Ihr Unternehmen weiter?".
5. **Ghost-Title** (Pattern 5) auf allen drei Welt-H2 mit `--world-accent` als Ghost-Farbe.
6. **Process-Timeline**: horizontale, scrollgebundene Leuchtlinie (`scrub`-Timeline) verbindet die 4 Prozessschritte, Signal "läuft" beim Scrollen von Schritt zu Schritt mit.

```js
// Beispiel Pin-Swap für eine Welt-Section (siehe scroll-story-patterns.md Pattern 3)
ScrollTrigger.create({
  trigger: '.world-leads .pin-swap',
  start: 'top top', end: 'bottom bottom', scrub: 0.5,
  onUpdate: (self) => {
    const idx = Math.min(Math.floor(self.progress * scenes.length), scenes.length - 1);
    scenes.forEach((s, i) => gsap.to(s, { opacity: i === idx ? 1 : 0, duration: 0.4 }));
  },
});
```

### Hover & Focus States
Siehe Section 4 (Buttons, Cards, Links, Nav, World-Orbs) — jedes interaktive Element hat definierte `:hover` und `:focus-visible` Zustände mit `outline: 2px solid`.

### Special Effects
- **Custom Cursor** (Desktop, `matchMedia('(hover: hover)')` only): dezenter Ring, wächst zu "VIEW"/"OPEN"/"EXPLORE"-Label über interaktiven Elementen; `mix-blend-mode: difference`.
- **Cursor-Glow** in den Welt-Sections: `radial-gradient` folgt dem Cursor in `--world-accent`, Opazität 0.08.
- **Magnetische CTAs**: `Magnet`-Pattern (siehe interaction-patterns.md L3) auf primärem Hero-CTA und finalem CTA-Block.
- **Text-Reveal**: Hero H1 nutzt `SplitText`-Stagger; Section-H2 nutzt `ScrollFloat`; Fließtext nutzt `ScrollReveal` (zeilenweise, nicht wortweise — Deutsch liest sich in Zeilen).
- **Count-Up**: Zahlenbereich (Abschnitt 12) animiert via `countUp()` bei Eintritt in Viewport.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
```js
if (perf.reduceMotion) {
  ScrollTrigger.getAll().forEach(st => st.kill());
  document.querySelectorAll('.webgl-canvas').forEach(c => c.remove());
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
}
```

## 8. Do's and Don'ts

### Do
- Jede Section hat genau einen dominanten Farbakzent (Welt-Akzent oder globaler `--accent`).
- Signature-Moments folgen der 1-2-Bildschirme-Regel — nie drei Screens ohne Highlight.
- WebGL-Scene wird pausiert (`renderer` stoppt `requestAnimationFrame`), wenn außerhalb des Viewports (`IntersectionObserver`).
- Alle Animationen nutzen `transform`/`opacity`/`filter` (GPU-Pfad), nie `top`/`left`/`width` in Loops.
- Mobile erhält eine bewusst vereinfachte, aber niemals leere Version jeder Signature-Moment (statisches Bild statt WebGL, ein Reveal statt Pin-Swap).
- Deutsche Texte sind eigenständig formuliert — keine Standard-Agentur-Phrasen ("nächstes Level" etc.).
- Kontrastverhältnis Text/Hintergrund ≥ 4.5:1 auch bei `--text-secondary` auf `--bg`.

### Don't
- ❌ Mehr als 1 WebGL-Scene gleichzeitig aktiv rendern.
- ❌ `filter: blur()` auf mehr als 3 gleichzeitig bewegten Elementen (GPU-Last).
- ❌ `backdrop-filter: blur()` über 14px oder auf großflächigen Scroll-Containern.
- ❌ Zwei Welt-Akzente in derselben Section gleich stark gewichten (verwässert die Markenlogik).
- ❌ `--gradient-signature` als Flächenfüllung großer Container — nur Text/schmale Akzente.
- ❌ Erfundene Kennzahlen (Kundenzahl, Umsatzsteigerung) ohne Kennzeichnung als Platzhalter.
- ❌ Custom Cursor auf Touch-Geräten oder ohne `(hover: hover)`-Check aktivieren.
- ❌ Pin-Scrub-Sections ohne `scrub`-Wert > 3 Bildschirmhöhen strecken (fühlt sich hängend an).
- ❌ Stockfotos von Personen vor Laptops verwenden.

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|--------------|
| Desktop | > 1200px | 3-Spalten Welten-Grid, volle Hero-Constellation (12–14 Karten), Pin-Swap 2-Spalten |
| Tablet | 768–1200px | Welten-Grid 2 Spalten (dritte umbricht), Constellation reduziert auf 8 Karten, Pin-Swap bleibt aber schmaler |
| Mobile | < 768px | Welten-Grid 1 Spalte (vertikal stapelnd + Swipe-Snap), Constellation → 4 statische Karten ohne Parallaxe, WebGL → statisches Poster-Bild, kein Custom Cursor, Pin-Swap → einfache Stacked Reveal ohne Sticky-Pin |

**Touch Targets:** minimum 44×44px, World-Orbs mindestens 96×96px auf Mobile.
**Collapsing Strategy:** Nav klappt ab 768px zu Vollbild-Menü (Hamburger), Left-Pin/Right-Swap-Sections werden zu vertikal gestapelten Cards mit einmaligem Reveal statt Sticky-Pin.

```css
@media (max-width: 1200px) {
  .grid-worlds { grid-template-columns: repeat(2, 1fr); }
  .constellation .star-card:nth-child(n+9) { display: none; }
}
@media (max-width: 768px) {
  .grid-worlds, .grid-cases { grid-template-columns: 1fr; }
  .pin-swap { height: auto; }
  .pin-swap-inner { position: static; height: auto; grid-template-columns: 1fr; display: flex; flex-direction: column; }
  .webgl-canvas { display: none; }
  .webgl-scene::after { content: ''; display: block; background: var(--gradient-signature); opacity: 0.15; aspect-ratio: 4/3; border-radius: 24px; }
  .custom-cursor, .cursor-glow { display: none; }
}
```
