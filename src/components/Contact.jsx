import React, { useState } from 'react';
import { COMPANY } from '../data/siteData';
import { Phone, MessageCircle, Mail, MapPin, Map, Clock, Send, CheckCircle, User, FileText } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: <Phone size={22} strokeWidth={2} />,
    label: 'Phone',
    value: COMPANY.phone,
    sub: 'Available 24 / 7',
    href: COMPANY.phoneHref,
    accent: '#1e88e5',
    light: 'rgba(30,136,229,0.12)',
  },
  {
    icon: <MessageCircle size={22} strokeWidth={2} />,
    label: 'WhatsApp',
    value: COMPANY.whatsapp,
    sub: 'Quick response guaranteed',
    href: `https://wa.me/${COMPANY.whatsappNumber}`,
    accent: '#25D366',
    light: 'rgba(37,211,102,0.12)',
  },
  {
    icon: <Mail size={22} strokeWidth={2} />,
    label: 'Email',
    value: COMPANY.email,
    sub: 'We reply within 24 hours',
    href: COMPANY.emailHref,
    accent: '#fb8c00',
    light: 'rgba(251,140,0,0.12)',
  },
  {
    icon: <MapPin size={22} strokeWidth={2} />,
    label: 'Office Address',
    value: COMPANY.address,
    sub: 'Visit us anytime',
    href: null,
    accent: '#e53935',
    light: 'rgba(229,57,53,0.12)',
  },
  {
    icon: <Map size={22} strokeWidth={2} />,
    label: 'Service Areas',
    value: COMPANY.serviceLocations,
    sub: 'Pan-city coverage',
    href: null,
    accent: '#8e24aa',
    light: 'rgba(142,36,170,0.12)',
  },
  {
    icon: <Clock size={22} strokeWidth={2} />,
    label: 'Working Hours',
    value: '24 Hours, 7 Days',
    sub: '365 days a year',
    href: null,
    accent: '#00acc1',
    light: 'rgba(0,172,193,0.12)',
  },
];

export default function Contact() {
  const [hovered, setHovered] = useState(null);
  const [mapLocation, setMapLocation] = useState(null);

  return (
    <section id="contact" className="contact section-py" style={{ paddingTop: '72px', background: 'var(--navy)' }}>

      {/* ── Hero Banner ── */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '1920px', margin: '0 auto', background: '#0a1e3c', overflow: 'hidden' }}>
        <img src="/gallery/contact.png" alt="Contact Banner" fetchPriority="high" style={{ width: '100%', height: 'auto', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,12,27,0.45)' }} />
      </div>

      {/* ── Contact Info Cards ── */}
      <div className="container" style={{ paddingTop: '72px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)', color: '#FFC107', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', padding: '6px 18px', borderRadius: '30px', marginBottom: '16px' }}>
            Reach Us
          </span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>
            Get in Touch With Us
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Available 24/7 for all your security needs. Reach out through any channel below.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="contact-info-grid">
          {CONTACT_INFO.map((c, i) => {
            const Card = (
              <div
                className={`contact-info-card${hovered === i ? ' hov' : ''}`}
                style={{ '--ci-acc': c.accent, '--ci-light': c.light }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="ci-bar" />
                <div className="ci-icon">{c.icon}</div>
                <div className="ci-body">
                  <span className="ci-label">{c.label}</span>
                  <span className="ci-value">{c.value}</span>
                  <span className="ci-sub">{c.sub}</span>
                </div>
                {c.href && <span className="ci-arrow">→</span>}
              </div>
            );
            return c.href ? (
              <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                {Card}
              </a>
            ) : (
              <div key={i}>{Card}</div>
            );
          })}
        </div>

        {/* ── Main Grid: Form + Map ── */}
        <div className="contact-main-grid" style={{ marginTop: '72px' }}>

          {/* ── Map + Quick Links ── */}
          <>

            {/* Map placeholder */}
            <div className="contact-map-card">
              <div className="cmap-header">
                <MapPin size={18} strokeWidth={2} color="#FFC107" />
                <span>Our Prime Service Areas</span>
              </div>
              <div className="cmap-body" style={{ padding: 0 }}>
                <iframe
                  title="Veer Security Head Quarter"
                  src={mapLocation || `https://maps.google.com/maps?q=${encodeURIComponent('Room No.1, Babubhai Niwas, V.M. Road, Nehru Nagar, Vile Parle West, Mumbai - 400056')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="250"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div style={{ padding: '24px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Our Locations:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <button 
                      onClick={() => setMapLocation(`https://maps.google.com/maps?q=${encodeURIComponent('Room No.1, Babubhai Niwas, V.M. Road, Nehru Nagar, Vile Parle West, Mumbai - 400056')}&t=&z=15&ie=UTF8&iwloc=&output=embed`)}
                      className="location-tag-pill hq-pill"
                      style={{ cursor: 'pointer', background: 'rgba(255, 193, 7, 0.15)', borderColor: '#FFC107', color: '#FFC107' }}
                    >
                      🏢 Head Quarter (Vile Parle West)
                    </button>
                    {['Bandra', 'Santacruz', 'Juhu', 'Andheri', 'Khar'].map((loc) => (
                      <button 
                        key={loc} 
                        onClick={() => setMapLocation(`https://maps.google.com/maps?q=${encodeURIComponent(loc + ', Mumbai')}&t=&z=13&ie=UTF8&iwloc=&output=embed`)}
                        className="location-tag-pill"
                        style={{ cursor: 'pointer' }}
                      >
                        📍 {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(13,33,71,0.8) 0%, rgba(7,21,48,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              height: 'fit-content',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ display: 'inline-block', width: '4px', height: '18px', background: '#FFC107', borderRadius: '4px' }} />
                <p style={{ color: '#fff', fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800, margin: 0, fontFamily: 'var(--font-display)' }}>
                  Quick Contact
                </p>
              </div>

              <a href={COMPANY.phoneHref} 
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '12px',
                  background: 'rgba(30,136,229,0.08)', border: '1px solid rgba(30,136,229,0.2)', color: '#fff',
                  textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600, transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(30,136,229,0.15)'; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.borderColor = 'rgba(30,136,229,0.4)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(30,136,229,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(30,136,229,0.2)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(30,136,229,0.2)', color: '#64b5f6' }}>
                  <Phone size={20} strokeWidth={2} />
                </div>
                Call Us Now
              </a>

              <a href={`https://wa.me/${COMPANY.whatsappNumber}`} target="_blank" rel="noopener noreferrer" 
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '12px',
                  background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)', color: '#fff',
                  textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600, transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.15)'; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.2)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37,211,102,0.2)', color: '#81c784' }}>
                  <MessageCircle size={20} strokeWidth={2} />
                </div>
                Chat on WhatsApp
              </a>

              <a href={COMPANY.emailHref} 
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '12px',
                  background: 'rgba(251,140,0,0.08)', border: '1px solid rgba(251,140,0,0.2)', color: '#fff',
                  textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600, transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(251,140,0,0.15)'; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.borderColor = 'rgba(251,140,0,0.4)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(251,140,0,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(251,140,0,0.2)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(251,140,0,0.2)', color: '#ffb74d' }}>
                  <Mail size={20} strokeWidth={2} />
                </div>
                Send Email
              </a>

              {/* Social Media Links */}
              <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ display: 'inline-block', width: '4px', height: '18px', background: '#FFC107', borderRadius: '4px' }} />
                  <p style={{ color: '#fff', fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800, margin: 0, fontFamily: 'var(--font-display)' }}>
                    Follow Us
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {COMPANY.social.facebook && (
                    <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1877F2'; e.currentTarget.style.borderColor = '#1877F2'; e.currentTarget.style.transform = 'translateY(-4px)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none' }} aria-label="Facebook">
                      <img src="https://cdn.simpleicons.org/facebook/white" alt="Facebook" width="24" height="24" />
                    </a>
                  )}
                  {COMPANY.social.instagram && (
                    <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#E1306C'; e.currentTarget.style.borderColor = '#E1306C'; e.currentTarget.style.transform = 'translateY(-4px)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none' }} aria-label="Instagram">
                      <img src="https://cdn.simpleicons.org/instagram/white" alt="Instagram" width="24" height="24" />
                    </a>
                  )}
                  {COMPANY.social.youtube && (
                    <a href={COMPANY.social.youtube} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#FF0000'; e.currentTarget.style.borderColor = '#FF0000'; e.currentTarget.style.transform = 'translateY(-4px)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none' }} aria-label="YouTube">
                      <img src="https://cdn.simpleicons.org/youtube/white" alt="YouTube" width="24" height="24" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </section>
  );
}
