import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/hooks/useLenis';
import Nav from '@/components/Nav';
import CustomCursor from '@/components/CustomCursor';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display-nf',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body-nf',
  display: 'swap',
});

const siteUrl = 'https://www.digitalplus-platzhalter.ch';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Digital Plus — Leads. Creative. IT & Sicherheit.',
    template: '%s — Digital Plus',
  },
  description:
    'Digital Plus verbindet Performance-Marketing, kreative Kommunikation und moderne IT-Lösungen zu einem System: Strategie, Umsetzung und Infrastruktur aus einer Hand.',
  openGraph: {
    title: 'Digital Plus — Leads. Creative. IT & Sicherheit.',
    description:
      'Drei Welten, ein digitaler Partner: Performance-Marketing, Branding und IT-Infrastruktur aus einer Hand.',
    url: siteUrl,
    siteName: 'Digital Plus',
    locale: 'de_CH',
    type: 'website',
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Digital Plus',
      url: siteUrl,
      description:
        'Digitalagentur mit drei Kompetenzwelten: Leads (Performance-Marketing), Creative (Design & Branding) und IT & Sicherheit.',
    },
    {
      '@type': 'LocalBusiness',
      name: 'Digital Plus',
      url: siteUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '[Platzhalter]',
        addressLocality: '[Platzhalter]',
        addressCountry: 'CH',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Zum Inhalt springen
        </a>
        <LenisProvider>
          <Nav />
          <main id="main">{children}</main>
        </LenisProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
