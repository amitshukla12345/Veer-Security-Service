import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/siteData';

const QUICK_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'About',      path: '/about' },
  { label: 'Services',   path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Gallery',    path: '/gallery' },
  { label: 'Careers',    path: '/careers' },
  { label: 'Contact',    path: '/contact' },
];

const FOOTER_SERVICES = [
  'Security Guard Services',
  'Corporate Security',
  'Industrial Security',
  'Residential Security',
  'Event Security',
  'Housekeeping Services',
];

// Company logo — stored in public/gallery/logo.png
const LOGO_SRC = '/gallery/logo.png';

export default function Footer() {
  const year = new Date().getFullYear();
  const waLink = `https://wa.me/${COMPANY.whatsappNumber}?text=Hello+Veer+Security+Force%2C+I+would+like+to+enquire+about+your+security+services.`;

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <img
                src={LOGO_SRC}
                alt="Veer Security Service Logo"
                style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#fff', padding: '2px', objectFit: 'contain', flexShrink: 0 }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700 }}>
                  Veer Security Service
                </div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)' }}>
                  Professional Security
                </div>
              </div>
            </div>
            <p className="footer-brand-desc">{COMPANY.tagline}</p>
            <div style={{ marginTop: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', lineHeight: 1.3 }}>
                <span style={{ marginTop: '2px', color: '#FFC107' }}>📍</span>
                <div>
                  <strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Head Quarter</strong>
                  Room No.1, Babubhai Niwas,<br />
                  V.M. Road, Nehru Nagar,<br />
                  Vile Parle West, Mumbai - 400 056
                </div>
              </div>
              <div style={{ marginTop: '8px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '280px' }}>
                <iframe
                  title="Head Quarter Map Footer"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent('Room No.1, Babubhai Niwas, V.M. Road, Nehru Nagar, Vile Parle West, Mumbai - 400056')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="140"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)', display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="footer-social">
              {COMPANY.social.facebook && (
                <a href={COMPANY.social.facebook} className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <img src="https://cdn.simpleicons.org/facebook/white" alt="Facebook" width="18" height="18" />
                </a>
              )}
              {COMPANY.social.instagram && (
                <a href={COMPANY.social.instagram} className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <img src="https://cdn.simpleicons.org/instagram/white" alt="Instagram" width="18" height="18" />
                </a>
              )}
              {COMPANY.social.youtube && (
                <a href={COMPANY.social.youtube} className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <img src="https://cdn.simpleicons.org/youtube/white" alt="YouTube" width="18" height="18" />
                </a>
              )}
              <a href={waLink} className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <img src="https://cdn.simpleicons.org/whatsapp/white" alt="WhatsApp" width="18" height="18" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-links">
              {QUICK_LINKS.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="footer-col-title">Services</h3>
            <ul className="footer-links">
              {FOOTER_SERVICES.map(s => (
                <li key={s}>
                  <Link to="/services" className="footer-link">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-col-title">Contact</h3>
            <address style={{ fontStyle: 'normal' }}>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">💬</span>
                <a href={waLink} target="_blank" rel="noopener noreferrer">{COMPANY.whatsapp}</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📧</span>
                <a href={COMPANY.emailHref}>{COMPANY.email}</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span>{COMPANY.address}</span>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © {year} Veer Security Service. All Rights Reserved.
          </p>
          <nav className="footer-bottom-links" aria-label="Legal links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/privacy-policy">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
