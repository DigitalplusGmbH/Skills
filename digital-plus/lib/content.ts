export type WorldKey = 'leads' | 'creative' | 'it';

export interface WorldScene {
  title: string;
  description: string;
}

export interface ServiceDetail {
  name: string;
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
  bodyExtra: string;
  services: string[];
  serviceDetails: ServiceDetail[];
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
    bodyExtra:
      'Das beginnt mit einer nüchternen Bestandsaufnahme: Wer sucht was, über welchen Kanal, mit welcher Kaufbereitschaft? Erst danach entscheiden wir, ob Google Ads, Meta Ads oder organische Suche den größeren Hebel bringt — und bauen die Landingpage und den Funnel passend zu genau dieser Antwort, nicht umgekehrt. Jede Kampagne bekommt eine eigene Erfolgsmetrik, bevor der erste Franken Budget fließt, damit Optimierung auf Daten beruht und nicht auf Bauchgefühl.',
    services: [
      'Google Ads',
      'Meta Ads',
      'Suchmaschinenoptimierung',
      'Landingpages',
      'Lead-Funnels',
      'Tracking & Attribution',
      'Conversion-Optimierung',
    ],
    serviceDetails: [
      { name: 'Google Ads', description: 'Search-, Shopping- und Performance-Max-Kampagnen, die auf Anfragenqualität statt auf Klickpreis optimiert werden.' },
      { name: 'Meta Ads', description: 'Facebook- und Instagram-Kampagnen mit klarer Zielgruppenlogik und laufender Creative-Testung statt Streuverlust.' },
      { name: 'Suchmaschinenoptimierung', description: 'Technisches SEO, Content-Struktur und Backlink-Aufbau für Rankings, die auch nach dem nächsten Google-Update halten.' },
      { name: 'Landingpages', description: 'Seiten mit einem einzigen Ziel pro Kampagne, in unter zwei Sekunden geladen und laufend A/B-getestet.' },
      { name: 'Lead-Funnels', description: 'Mehrstufige Strecken vom ersten Klick bis zum qualifizierten Termin, inklusive Follow-up-Automatisierung.' },
      { name: 'Tracking & Attribution', description: 'Serverseitiges Tracking und ein Attributionsmodell, das zeigt, welcher Kanal wirklich Umsatz bringt.' },
      { name: 'Conversion-Optimierung', description: 'Laufende Tests an Text, Layout und Angebot — jede Änderung wird gegen echte Zahlen validiert.' },
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
    bodyExtra:
      'Jedes Projekt startet mit einem Designsystem, nicht mit einem Logo-Entwurf: Farbwelt, Typografie, Bildsprache und Tonalität werden einmal definiert und dann konsequent über Website, Social Media, Print und Bewegtbild durchgezogen. Das verhindert den typischen Bruch zwischen Hochglanz-Broschüre und lieblos gepflegtem Instagram-Kanal — und macht jede neue Kampagne schneller, weil die Grundlage bereits steht.',
    services: [
      'Webdesign',
      'Branding & Corporate Identity',
      'Grafikdesign & Print',
      'Werbevideos & Motion Design',
      'Social-Media-Content',
      'Fotografie',
      '3D-Visualisierung',
    ],
    serviceDetails: [
      { name: 'Webdesign', description: 'Websites, die Markenauftritt und Nutzerführung gleichzeitig denken — von der Struktur bis zum letzten Hover-Detail.' },
      { name: 'Branding & Corporate Identity', description: 'Logo, Farbwelt, Typografie und Sprachregeln in einem Guide, der auf jedem Kanal gleich überzeugend wirkt.' },
      { name: 'Grafikdesign & Print', description: 'Von der Visitenkarte bis zur Messewand: Gestaltung, die sich konsequent an das Designsystem hält.' },
      { name: 'Werbevideos & Motion Design', description: 'Kampagnenfilme und animierte Kurzformate, produziert für den Kanal, auf dem sie tatsächlich laufen.' },
      { name: 'Social-Media-Content', description: 'Ein Redaktionsplan statt Einzelposts — Content, der auf Marke und Zielgruppe abgestimmt ist.' },
      { name: 'Fotografie', description: 'Produkt-, Team- und Eventfotografie, die zur Bildsprache der Marke passt statt generisch zu wirken.' },
      { name: '3D-Visualisierung', description: 'Produkte und Räume, die es noch nicht gibt, fotorealistisch dargestellt — für Kampagnen, Kataloge und Web.' },
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
    bodyExtra:
      'Eine Kampagne, die Anfragen bringt, ist wertlos, wenn das CRM dahinter down ist oder ein Ransomware-Vorfall die Kundendaten sperrt. Deshalb behandeln wir IT nicht als Kostenstelle, sondern als Fundament: Zugriffsrechte, Backups und Monitoring werden so eingerichtet, dass ein Ausfall zum Nicht-Ereignis wird, statt zum Krisentag. Alles dokumentiert, damit auch Ihr Team jederzeit weiß, wo welche Daten liegen und wer worauf Zugriff hat.',
    services: [
      'IT-Support',
      'IT-Infrastruktur',
      'Cybersecurity',
      'Cloud-Lösungen',
      'Backup-Lösungen',
      'Netzwerke',
      'Monitoring & Gerätemanagement',
    ],
    serviceDetails: [
      { name: 'IT-Support', description: 'Direkter Draht bei technischen Störungen, mit Reaktionszeiten statt Warteschlangen.' },
      { name: 'IT-Infrastruktur', description: 'Server, Arbeitsplätze und Software als aufeinander abgestimmtes System, nicht als Sammlung von Einzellösungen.' },
      { name: 'Cybersecurity', description: 'Zugriffskontrollen, Endpoint-Schutz und Mitarbeiter-Sensibilisierung gegen die häufigsten Einfallstore.' },
      { name: 'Cloud-Lösungen', description: 'Migration und Betrieb in der Cloud, ausgelegt auf Wachstum statt auf den heutigen Bedarf.' },
      { name: 'Backup-Lösungen', description: 'Automatisierte, getestete Backups nach der 3-2-1-Regel — nicht erst geprüft, wenn es zu spät ist.' },
      { name: 'Netzwerke', description: 'Stabile, segmentierte Netzwerke, die mit der Anzahl der Geräte und Standorte mitwachsen.' },
      { name: 'Monitoring & Gerätemanagement', description: 'Zentrale Übersicht über jedes Gerät im Unternehmen, mit Alarmierung bevor ein Problem sichtbar wird.' },
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

export const ABOUT = {
  paragraphs: [
    'Die meisten Unternehmen jonglieren Werbeagentur, Designstudio und IT-Dienstleister als drei getrennte Verträge — und tragen die Reibung dazwischen selbst: die Kampagne, die auf einer Website ausgeliefert wird, deren Ladezeit die Conversion-Rate killt; das neue Branding, das nie in der Anzeige ankommt, die die Werbeagentur nebenbei schaltet; die Migration in die Cloud, die niemand mit dem Marketingkalender abgestimmt hat.',
    'Digital Plus bündelt Performance-Marketing, Markenführung und technische Infrastruktur deshalb in einem gemeinsamen System: eine Strategie, ein Ansprechpartner, ein konsistentes Ergebnis über alle drei Welten hinweg. Nicht, weil wir alles ein bisschen können — sondern weil wir überzeugt sind, dass Wachstum nur dort entsteht, wo Marketing, Design und Technik dieselbe Sprache sprechen.',
    'Wir sind ein Schweizer Team, das Digitalagentur, Designstudio und IT-Dienstleister in einem Haus vereint. Das heisst kurze Wege zwischen den Disziplinen, gemeinsame Verantwortung für das Ergebnis — und eine Rechnung statt drei.',
  ],
  values: [
    {
      title: 'Ein System statt drei Silos',
      text: 'Kampagne, Marke und Infrastruktur werden als ein Projekt geplant, nicht als drei Aufträge an drei Anbieter, die nichts voneinander wissen.',
    },
    {
      title: 'Daten statt Bauchgefühl',
      text: 'Jede Entscheidung — vom Werbebudget bis zur Backup-Strategie — beruht auf gemessenen Zahlen, nicht auf der Meinung, die im Meeting am lautesten war.',
    },
    {
      title: 'Schweizer Präzision, digitale Geschwindigkeit',
      text: 'Sorgfalt in der Umsetzung und Tempo im Markt schliessen sich nicht aus — wir planen gründlich und liefern trotzdem in Wochen, nicht in Quartalen.',
    },
  ],
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'Muss ich alle drei Welten buchen, oder kann ich mit einer starten?',
    answer:
      'Die meisten Kunden starten mit einer Welt — häufig Leads oder Creative — und erweitern, sobald der erste Nutzen sichtbar ist. Das System ist von Anfang an so gebaut, dass eine zweite oder dritte Welt jederzeit andocken kann, ohne bestehende Arbeit neu aufzusetzen.',
  },
  {
    question: 'Wie lange dauert es, bis ein Projekt live geht?',
    answer:
      'Eine erste Landingpage oder Kampagne steht meist innerhalb von zwei bis vier Wochen. Ein vollständiges Rebranding oder eine IT-Migration planen wir je nach Umfang über sechs bis zwölf Wochen — mit klaren Zwischenschritten statt einem einzigen grossen Launch-Termin.',
  },
  {
    question: 'Wie funktioniert die Zusammenarbeit konkret — feste Verträge oder Projektbasis?',
    answer:
      'Beides ist möglich. Performance-Marketing und IT-Betreuung laufen meist als laufende Zusammenarbeit mit monatlicher Kündigungsfrist, weil kontinuierliche Optimierung den grössten Hebel bringt. Branding- und Website-Projekte werden in der Regel als klar abgegrenztes Projekt mit Fixpreis angeboten.',
  },
  {
    question: 'Was passiert, wenn eine Kampagne nicht die erwarteten Resultate bringt?',
    answer:
      'Wir tracken jede Kampagne gegen eine vorab definierte Erfolgsmetrik. Bleibt sie darunter, passen wir Zielgruppe, Creative oder Budget an — messbar und dokumentiert, nicht auf Zuruf. Transparenz über das, was funktioniert und was nicht, ist Teil der laufenden Zusammenarbeit.',
  },
  {
    question: 'Übernehmen Sie auch die IT-Betreuung, wenn Sie nicht das Marketing machen?',
    answer:
      'Ja. Die drei Welten sind unabhängig buchbar. Viele Kunden starten mit IT-Support oder Cybersecurity, ohne dass Digital Plus ihr Marketing betreut — und andere lassen sich ausschliesslich als Kreativstudio buchen, ohne IT-Vertrag.',
  },
  {
    question: 'Wie sicher sind unsere Daten, wenn Sie unsere IT-Infrastruktur betreuen?',
    answer:
      'Zugriffsrechte, Backups und Monitoring werden nach dokumentierten Standards eingerichtet, nicht nach Bauchgefühl. Sie erhalten jederzeit Einsicht, wer worauf Zugriff hat und wo Ihre Daten liegen — auch wenn die laufende Betreuung bei uns liegt.',
  },
  {
    question: 'Arbeiten Sie nur mit Unternehmen in der Schweiz?',
    answer:
      'Unser Kernmarkt ist die Schweiz, insbesondere für IT-Support und Cybersecurity, wo lokale Präsenz zählt. Leads- und Creative-Projekte betreuen wir auch für Unternehmen im deutschsprachigen Ausland.',
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
  { end: 12, suffix: '+', label: 'Jahre kombinierte Erfahrung' },
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
