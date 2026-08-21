export type WorldKey = 'leads' | 'creative' | 'it';

export interface WorldScene {
  title: string;
  description: string;
}

export interface World {
  key: WorldKey;
  number: string;
  name: string;
  shortLabel: string;
  microcopy: string;
  eyebrow: string;
  headline: string[];
  body: string;
  services: string[];
  ctaLabel: string;
  ctaHref: string;
  scenes: WorldScene[];
  ghostWord: string;
}

export const WORLDS: World[] = [
  {
    key: 'leads',
    number: '01',
    name: 'Leads',
    shortLabel: 'Leads entdecken',
    microcopy: 'Mehr Sichtbarkeit. Mehr Anfragen. Mehr Wachstum.',
    eyebrow: 'World 01 — Leads',
    headline: ['Aufmerksamkeit ist gut.', 'Anfragen sind besser.'],
    body: 'Wir bauen die Systeme, die aus Sichtbarkeit planbare Anfragen machen: von der ersten Anzeige bis zum qualifizierten Termin im Kalender. Performance wird gemessen, nicht behauptet.',
    services: [
      'Google Ads',
      'Meta Ads',
      'Suchmaschinenoptimierung',
      'Landingpages',
      'Lead-Funnels',
      'Tracking & Attribution',
      'Conversion-Optimierung',
    ],
    ctaLabel: 'Mehr über Leads',
    ctaHref: '#kontakt',
    ghostWord: 'GROWTH',
    scenes: [
      { title: 'Datenströme', description: 'Kampagnen aus Google, Meta und organischer Suche laufen in einem gemeinsamen Datenmodell zusammen — sichtbar in Echtzeit, nicht erst im Monatsreport.' },
      { title: 'Digitale Knotenpunkte', description: 'Jede Landingpage ist ein Knoten im Funnel: getestet, geladen in unter zwei Sekunden, gebaut für einen einzigen Zweck.' },
      { title: 'Leuchtende Conversion-Points', description: 'Tracking sitzt an jedem Übergabepunkt — vom Klick bis zum abgeschlossenen Termin — damit jede Optimierung einen echten Hebel bewegt.' },
      { title: 'Abstrakte Lead-Funnels', description: 'Automatisierte Prozesse übergeben qualifizierte Anfragen direkt an Vertrieb oder CRM, ohne Excel-Umweg.' },
    ],
  },
  {
    key: 'creative',
    number: '02',
    name: 'Creative',
    shortLabel: 'Creative entdecken',
    microcopy: 'Ideen werden zu Marken, die im Kopf bleiben.',
    eyebrow: 'World 02 — Creative',
    headline: ['Marken werden nicht nur gesehen.', 'Sie werden erinnert.'],
    body: 'Von Corporate Identity bis Kampagnenfilm: Wir entwickeln die visuelle Sprache, die ein Unternehmen unverwechselbar macht — konsistent über jede Fläche, jedes Format, jeden Kontaktpunkt.',
    services: [
      'Webdesign',
      'Branding & Corporate Identity',
      'Grafikdesign & Print',
      'Werbevideos & Motion Design',
      'Social-Media-Content',
      'Fotografie',
      '3D-Visualisierung',
    ],
    ctaLabel: 'Creative entdecken',
    ctaHref: '#kontakt',
    ghostWord: 'IMPACT',
    scenes: [
      { title: 'Schwebende Designobjekte', description: 'Jedes Projekt beginnt mit einem klaren Designsystem — Farbe, Form, Typografie — bevor die erste Seite entsteht.' },
      { title: 'Kamera & Bewegtbild', description: 'Werbefilm, Social-Content und Motion Design entstehen aus einer Produktion, nicht aus drei getrennten Anbietern.' },
      { title: 'Typografie & Branding', description: 'Corporate Identity, die auf Visitenkarte, Fahrzeugbeschriftung und Website gleich überzeugend wirkt.' },
      { title: 'Kreative Interfaces', description: 'Webdesign, das Marke und Nutzerführung gleichzeitig denkt — nicht nacheinander.' },
    ],
  },
  {
    key: 'it',
    number: '03',
    name: 'IT & Sicherheit',
    shortLabel: 'IT-Lösungen ansehen',
    microcopy: 'Technologie, die funktioniert. Sicherheit, die bleibt.',
    eyebrow: 'World 03 — IT & Sicherheit',
    headline: ['Kreativität braucht Technologie.', 'Wachstum braucht Sicherheit.'],
    body: 'Marketing-Erfolg ist nur so stabil wie die Infrastruktur dahinter. Wir betreuen Netzwerke, Daten und Geräte so, dass Wachstum nie an einem Systemausfall oder einer Sicherheitslücke scheitert.',
    services: [
      'IT-Support',
      'IT-Infrastruktur',
      'Cybersecurity',
      'Cloud-Lösungen',
      'Backup-Lösungen',
      'Netzwerke',
      'Monitoring & Gerätemanagement',
    ],
    ctaLabel: 'IT-Lösungen ansehen',
    ctaHref: '#kontakt',
    ghostWord: 'SECURE',
    scenes: [
      { title: 'Serverstrukturen', description: 'Infrastruktur, die mitwächst — von der Cloud-Basis bis zum lokalen Backup, dokumentiert und überwacht.' },
      { title: 'Netzwerke & Nodes', description: 'Jedes Gerät im Unternehmen ist erfasst, verwaltet und im Ernstfall in Minuten wiederherstellbar.' },
      { title: 'Cybersecurity-Raster', description: 'Verschlüsselung, Zugriffskontrollen und Monitoring als laufender Prozess, nicht als einmaliges Audit.' },
      { title: 'Shield-Elemente', description: 'Backup- und Notfallpläne, die getestet sind, bevor sie gebraucht werden.' },
    ],
  },
];

export const NAV_ITEMS = [
  { label: 'Leads', href: '#leads' },
  { label: 'Creative', href: '#creative' },
  { label: 'IT & Sicherheit', href: '#it' },
  { label: 'Projekte', href: '#projekte' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Kontakt', href: '#kontakt' },
];

export const PROCESS_STEPS = [
  {
    index: '01',
    title: 'Verstehen',
    description: 'Wir analysieren Marktumfeld, Zielgruppe und bestehende Systeme, bevor wir eine einzige Empfehlung aussprechen.',
  },
  {
    index: '02',
    title: 'Strategie',
    description: 'Aus der Analyse entsteht ein Plan, der Leads, Creative und IT als ein System denkt — nicht als drei getrennte Baustellen.',
  },
  {
    index: '03',
    title: 'Umsetzung',
    description: 'Kampagnen, Design und Infrastruktur werden parallel aufgebaut und laufend gegen die Strategie geprüft.',
  },
  {
    index: '04',
    title: 'Optimierung',
    description: 'Daten aus dem laufenden Betrieb fließen zurück in Kampagnen, Kreation und technische Konfiguration.',
  },
];

export interface CaseStudy {
  client: string;
  category: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  placeholder: true;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: '[Kundenname — Platzhalter]',
    category: 'Creative / Lead Generation',
    challenge: '[Kurze Beschreibung der Ausgangslage einsetzen]',
    solution: '[Kurze Beschreibung der Lösung einsetzen]',
    result: '[Messbares Resultat einsetzen]',
    services: ['Branding', 'Website', 'Performance Marketing'],
    placeholder: true,
  },
  {
    client: '[Kundenname — Platzhalter]',
    category: 'IT & Sicherheit / Infrastruktur',
    challenge: '[Kurze Beschreibung der Ausgangslage einsetzen]',
    solution: '[Kurze Beschreibung der Lösung einsetzen]',
    result: '[Messbares Resultat einsetzen]',
    services: ['Cloud-Migration', 'Monitoring', 'IT-Support'],
    placeholder: true,
  },
  {
    client: '[Kundenname — Platzhalter]',
    category: 'Leads / Performance',
    challenge: '[Kurze Beschreibung der Ausgangslage einsetzen]',
    solution: '[Kurze Beschreibung der Lösung einsetzen]',
    result: '[Messbares Resultat einsetzen]',
    services: ['Google Ads', 'Landingpages', 'Tracking'],
    placeholder: true,
  },
];

export interface Stat {
  end: number;
  suffix: string;
  label: string;
}

/**
 * Platzhalter-Kennzahlen — bewusst als Beispielwerte gesetzt, damit Layout und
 * Count-Up-Animation funktionieren. Vor dem Livegang durch echte Zahlen ersetzen
 * (siehe eyebrow-Hinweis in components/sections/Numbers.tsx).
 */
export const STATS: Stat[] = [
  { end: 32, suffix: '%', label: 'mehr qualifizierte Anfragen' },
  { end: 180, suffix: '+', label: 'umgesetzte Projekte' },
  { end: 12, suffix: ' Jahre', label: 'kombinierte Erfahrung' },
  { end: 60, suffix: '+', label: 'betreute Unternehmen' },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
  placeholder: true;
}

export const FEATURED_TESTIMONIAL: Testimonial = {
  quote: '„[Platzhalter — echtes Kundenzitat hier einsetzen. Konkret, mit Zahl oder Ergebnis, wenn möglich.]“',
  author: '[Name — Platzhalter]',
  role: '[Position, Unternehmen — Platzhalter]',
  rating: 5,
  placeholder: true,
};

export const TESTIMONIALS: Testimonial[] = [
  { quote: '„[Platzhalter-Bewertung einsetzen]“', author: '[Name]', role: '[Unternehmen]', rating: 5, placeholder: true },
  { quote: '„[Platzhalter-Bewertung einsetzen]“', author: '[Name]', role: '[Unternehmen]', rating: 5, placeholder: true },
  { quote: '„[Platzhalter-Bewertung einsetzen]“', author: '[Name]', role: '[Unternehmen]', rating: 4, placeholder: true },
];

export const FOOTER_LINKS = {
  leistungen: [
    { label: 'Leads', href: '#leads' },
    { label: 'Creative', href: '#creative' },
    { label: 'IT & Sicherheit', href: '#it' },
  ],
  unternehmen: [
    { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Projekte', href: '#projekte' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  rechtliches: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'AGB', href: '/agb' },
  ],
};

export const CONTACT = {
  email: '[kontakt@digitalplus-platzhalter.ch]',
  phone: '[+41 00 000 00 00 — Platzhalter]',
  address: '[Straße, PLZ Ort — Platzhalter]',
};
