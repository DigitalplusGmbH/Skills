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
                LinkedIn
              </a>
              <a href="#" aria-label="Instagram">
                Instagram
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
              <li>{CONTACT.email}</li>
              <li>{CONTACT.phone}</li>
              <li>{CONTACT.address}</li>
            </ul>
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
        <p style={{ marginTop: '1.5rem', fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
          Motion effects derived from{' '}
          <a href="https://github.com/DavidHDev/vue-bits" style={{ textDecoration: 'underline' }}>
            vue-bits
          </a>{' '}
          by DavidHDev (MIT).
        </p>
      </div>
    </footer>
  );
}
