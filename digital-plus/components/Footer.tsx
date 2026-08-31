import { CONTACT, FOOTER_LINKS } from '@/lib/content';

export default function Footer() {
  return (
    <footer id="kontakt-formular" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="nav-logo" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              Digital Plus
            </span>
            <p className="body-lg" style={{ fontSize: '0.9375rem', maxWidth: '32ch' }}>
              Leads. Creative. IT &amp; Sicherheit. Ein digitaler Partner für Wachstum, Marke und Infrastruktur.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4.7" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="footer-col-title">Leistungen</p>
            <ul className="footer-links">
              {FOOTER_LINKS.leistungen.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Unternehmen</p>
            <ul className="footer-links">
              {FOOTER_LINKS.unternehmen.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Kontakt</p>
            <ul className="footer-links">
              <li>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
              </li>
              <li>{CONTACT.address}</li>
            </ul>
            <span className="placeholder-flag">E-Mail-Domain ist ein Platzhalter</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Digital Plus. Alle Rechte vorbehalten.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {FOOTER_LINKS.rechtliches.map((link) => (
              <a key={link.href} href={link.href} style={{ color: 'var(--text-tertiary)' }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
