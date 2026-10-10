import React, { useState, useEffect } from 'react';
import { SERVICES, COMPANY } from '../data/siteData';
import { sendEnquiryEmail } from '../services/emailService';
import {
  Shield, Building, Factory, Home as HomeIcon,
  Store, Tent, UserCog, User, Brush, ArrowRight, MessageCircle, MapPin, Phone, CheckCircle, Send, Mail, Users, Calendar, FileText
} from 'lucide-react';

const CARD_THEMES = [
  { accent: '#e53935', light: 'rgba(229,57,53,0.1)', gradient: 'linear-gradient(135deg, #e53935, #7a0a00)' },
  { accent: '#1e88e5', light: 'rgba(30,136,229,0.1)', gradient: 'linear-gradient(135deg, #1e88e5, #0a3880)' },
  { accent: '#43a047', light: 'rgba(67,160,71,0.1)', gradient: 'linear-gradient(135deg, #43a047, #1b5e20)' },
  { accent: '#fb8c00', light: 'rgba(251,140,0,0.1)', gradient: 'linear-gradient(135deg, #fb8c00, #6e2600)' },
  { accent: '#8e24aa', light: 'rgba(142,36,170,0.1)', gradient: 'linear-gradient(135deg, #8e24aa, #3a0050)' },
  { accent: '#00acc1', light: 'rgba(0,172,193,0.1)', gradient: 'linear-gradient(135deg, #00acc1, #002d35)' },
  { accent: '#fdd835', light: 'rgba(253,216,53,0.1)', gradient: 'linear-gradient(135deg, #fdd835, #6e5600)' },
  { accent: '#e53935', light: 'rgba(229,57,53,0.1)', gradient: 'linear-gradient(135deg, #e53935, #7a0a00)' },
  { accent: '#26a69a', light: 'rgba(38,166,154,0.1)', gradient: 'linear-gradient(135deg, #26a69a, #00352f)' },
];

const SERVICE_ICONS = {
  'security-guards': <Shield size={28} strokeWidth={1.8} />,
  'corporate-security': <Building size={28} strokeWidth={1.8} />,
  'industrial-security': <Factory size={28} strokeWidth={1.8} />,
  'residential-security': <HomeIcon size={28} strokeWidth={1.8} />,
  'commercial-security': <Store size={28} strokeWidth={1.8} />,
  'event-security': <Tent size={28} strokeWidth={1.8} />,
  'security-supervisors': <UserCog size={28} strokeWidth={1.8} />,
  'female-guards': <User size={28} strokeWidth={1.8} />,
  'housekeeping': <Brush size={28} strokeWidth={1.8} />,
};

const BANNER_IMAGES = [
  { url: '/gallery/Gemini_ service.png', pos: 'center center' }
];

export default function Services() {
  const [hovered, setHovered] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [form, setForm] = useState({ name: '', mobile: '', email: '', location: '', guards: '', startDate: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = React.useRef(null);

  useEffect(() => {
    setForm({ name: '', mobile: '', email: '', location: '', guards: '', startDate: '', message: '' });
    setSent(false);
  }, [activeService]);

  const handleForm = (e) => {
    let { name, value } = e.target;
    if (name === 'name') value = value.replace(/[^a-zA-Z\s.]/g, '').slice(0, 50);
    if (name === 'mobile') value = value.replace(/[^0-9]/g, '').slice(0, 10);
    if (name === 'email') value = value.slice(0, 100);
    if (name === 'location') value = value.slice(0, 100);
    if (name === 'guards') value = value.replace(/[^0-9]/g, '').slice(0, 4);
    if (name === 'message') value = value.slice(0, 500);
    setForm(f => ({ ...f, [name]: value }));
  };

  const validateServiceForm = () => {
    if (formRef.current && !formRef.current.reportValidity()) return false;
    if (!form.name.trim() || !form.mobile.trim() || !form.email.trim() || !form.location.trim() || !form.guards.trim() || !form.startDate.trim() || !form.message.trim()) {
      alert('Please fill out all fields.');
      return false;
    }
    return true;
  };

  const submitService = (activeData) => {
    if (!validateServiceForm()) return;
    if (!window.confirm('Are you sure you want to send this enquiry via WhatsApp?')) return;

    const msg = `Hello Veer Security Service ,

I would like to enquire about: *${activeData.title}*

*Name:* ${form.name}
*Mobile:* ${form.mobile}
*Email:* ${form.email}
*Location:* ${form.location}
*Number of Guards:* ${form.guards}
*Start Date:* ${form.startDate}

*Message:*
${form.message}

Please contact me. Thank you.`;

    window.open(`https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    setForm({ name: '', mobile: '', email: '', location: '', guards: '', startDate: '', message: '' });
    setSent(true);
  };

  const submitServiceEmail = async (activeData) => {
    if (!validateServiceForm()) return;
    if (!window.confirm('Are you sure you want to send this enquiry via Email?')) return;

    setLoading(true);
    try {
      const emailForm = { ...form, service: activeData.title };
      await sendEnquiryEmail(emailForm, `Service Enquiry: ${activeData.title} - ${form.name}`);
      setForm({ name: '', mobile: '', email: '', location: '', guards: '', startDate: '', message: '' });
      setSent(true);
    } catch (err) {
      alert(err.message || 'Something went wrong while sending the email.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % BANNER_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (SERVICES.find(s => s.id === hash)) setActiveService(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const buildWaLink = (msg) =>
    `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  const activeData = activeService ? SERVICES.find(s => s.id === activeService) : null;
  const activeTheme = activeData ? CARD_THEMES[SERVICES.indexOf(activeData) % CARD_THEMES.length] : null;

  return (
    <section id="services" className="svc-section section-py" style={{ paddingTop: '72px' }}>

      {/* ── Hero Banner ── */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '1920px', margin: '0 auto', background: '#0a1e3c', overflow: 'hidden' }}>
        {BANNER_IMAGES.map((img, idx) => (
          <img key={idx} src={img.url} alt="Services Banner"
            style={{
              width: '100%', height: 'auto', display: 'block',
              position: idx === 0 ? 'relative' : 'absolute', top: 0, left: 0,
              opacity: idx === currentSlide ? 1 : 0, transition: 'opacity 1.5s ease-in-out'
            }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,12,27,0.4)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
          {/* <span className="section-label" style={{ color: '#FFC107', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>What We Offer</span>
          <h2 className="section-title" style={{ color: '#fff', fontSize: 'clamp(2rem,4vw,3rem)', margin: 0 }}>Our Professional Services</h2>
          <span className="gold-divider" style={{ margin: '20px auto 24px' }} />
          <p className="section-desc" style={{ color: 'rgba(255,255,255,0.9)', margin: '0 auto', maxWidth: '700px', fontSize: 'clamp(1rem,1.5vw,1.1rem)' }}>
            Comprehensive security and facility solutions — each tailored to your specific site, operations and requirements.
          </p>*/}
        </div>
      </div>

      <div className="container" style={{ paddingTop: '64px' }}>

        {/* ── Active Service Detail Panel ── */}
        {activeData && (
          <div className="svc-detail-panel" style={{ '--panel-accent': activeTheme.accent }} id="svc-detail">
            <button className="svc-detail-close" onClick={() => setActiveService(null)} aria-label="Close">✕</button>
            <div className="svc-detail-inner">
              <div className="svc-detail-img">
                <img src={activeData.img} alt={activeData.title} />
                <div className="svc-detail-img-overlay" style={{ background: activeTheme.gradient }} />
              </div>
              <div className="svc-detail-body">
                <span className="section-label" style={{ marginBottom: '12px', display: 'inline-block' }}>
                  {activeData.icon} Service Detail
                </span>
                <h3>{activeData.title}</h3>
                <div className="svc-detail-divider" style={{ background: activeTheme.accent }} />
                <p style={{ marginBottom: '20px' }}>{activeData.description}</p>

                {sent ? (
                  <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(37,211,102,0.1)', borderRadius: '12px', border: '1px solid rgba(37,211,102,0.2)' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: '#fff', marginBottom: '16px', padding: '8px', boxShadow: '0 0 15px rgba(255, 193, 7, 0.35), 0 0 0 6px rgba(255, 193, 7, 0.08)' }}>
                      <img src="/gallery/logo.png" alt="Veer Security Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <h4 style={{ color: '#25D366', fontSize: '1.2rem', marginBottom: '8px' }}>Enquiry Sent!</h4>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>Thank you. We will contact you soon regarding {activeData.title}.</p>
                    <button onClick={() => setSent(false)} style={{ background: '#25D366', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
                  </div>
                ) : (
                  <form ref={formRef} className="cfc-form" style={{ marginTop: '10px' }} noValidate={false}>
                    {/* Spam Protection Honeypot */}
                    <input type="checkbox" name="botcheck" style={{ display: 'none' }} value={form.botcheck || ''} onChange={(e) => setForm({ ...form, botcheck: e.target.checked })} />
                    
                    <div className="cfc-row">
                      <div className="cfc-field">
                        <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Full Name <span style={{ color: '#ef5350' }}>*</span></label>
                        <div className="cfc-input-wrap">
                          <span className="cfc-input-icon"><User size={16} /></span>
                          <input name="name" maxLength={50} required value={form.name} onChange={handleForm} placeholder="Your name" />
                        </div>
                      </div>
                      <div className="cfc-field">
                        <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Mobile Number <span style={{ color: '#ef5350' }}>*</span></label>
                        <div className="cfc-input-wrap">
                          <span className="cfc-input-icon"><Phone size={16} /></span>
                          <input name="mobile" type="tel" maxLength={10} required value={form.mobile} onChange={handleForm} placeholder="Your mobile number" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="cfc-row" style={{ marginTop: '16px' }}>
                      <div className="cfc-field">
                        <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Email Address <span style={{ color: '#ef5350' }}>*</span></label>
                        <div className="cfc-input-wrap">
                          <span className="cfc-input-icon"><Mail size={16} /></span>
                          <input name="email" type="email" maxLength={100} required value={form.email} onChange={handleForm} placeholder="Your email address" />
                        </div>
                      </div>
                      <div className="cfc-field">
                        <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Location <span style={{ color: '#ef5350' }}>*</span></label>
                        <div className="cfc-input-wrap">
                          <span className="cfc-input-icon"><MapPin size={16} /></span>
                          <input name="location" maxLength={100} required value={form.location} onChange={handleForm} placeholder="Your city/area" />
                        </div>
                      </div>
                    </div>

                    <div className="cfc-row" style={{ marginTop: '16px' }}>
                      <div className="cfc-field">
                        <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>How many guards? <span style={{ color: '#ef5350' }}>*</span></label>
                        <div className="cfc-input-wrap">
                          <span className="cfc-input-icon"><Users size={16} /></span>
                          <input name="guards" type="number" min="1" max="9999" maxLength={4} required value={form.guards} onChange={handleForm} placeholder="e.g. 2" />
                        </div>
                      </div>
                      <div className="cfc-field">
                        <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Start Date <span style={{ color: '#ef5350' }}>*</span></label>
                        <div className="cfc-input-wrap">
                          <span className="cfc-input-icon"><Calendar size={16} /></span>
                          <input name="startDate" type="date" required value={form.startDate} onChange={handleForm} />
                        </div>
                      </div>
                    </div>

                    <div className="cfc-field" style={{ marginTop: '16px' }}>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Message <span style={{ color: '#ef5350' }}>*</span></label>
                      <div className="cfc-input-wrap cfc-textarea-wrap" style={{ alignItems: 'flex-start' }}>
                        <span className="cfc-input-icon" style={{ marginTop: '14px' }}><FileText size={16} /></span>
                        <textarea name="message" rows="4" maxLength={500} required value={form.message} onChange={handleForm} placeholder="Describe your security requirement..." style={{ resize: 'vertical', minHeight: '100px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                      <button type="button" onClick={() => submitService(activeData)} className="cfc-submit" style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Send size={18} /> Enquire on WhatsApp
                      </button>
                      <button type="button" onClick={() => submitServiceEmail(activeData)} disabled={loading} className="cfc-submit" style={{ width: '100%', background: '#1e88e5', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Mail size={18} /> {loading ? 'Sending Enquiry...' : 'Enquire via Email'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)', color: '#FFC107', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', padding: '6px 18px', borderRadius: '30px', marginBottom: '16px' }}>
            All Services
          </span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>
            Trusted Security Solutions
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Click any service to learn more or enquire directly.
          </p>
        </div>

        {/* ── Premium Cards Grid ── */}
        <div className="svc-premium-grid">
          {SERVICES.map((service, i) => {
            const theme = CARD_THEMES[i % CARD_THEMES.length];
            const isHov = hovered === service.id;
            const isActive = activeService === service.id;
            return (
              <article
                key={service.id}
                id={service.id}
                className={`svc-premium-card${isHov ? ' hov' : ''}${isActive ? ' act' : ''}`}
                style={{ '--acc': theme.accent, '--acc-light': theme.light }}
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  setActiveService(prev => prev === service.id ? null : service.id);
                  setTimeout(() => document.getElementById('svc-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                }}
              >
                {/* Top accent bar */}
                <div className="svc-pc-bar" />

                {/* Number badge */}
                <span className="svc-pc-num">0{i + 1}</span>

                {/* Icon box */}
                <div className="svc-pc-icon">
                  {SERVICE_ICONS[service.id] ?? <Shield size={28} strokeWidth={1.8} />}
                </div>

                {/* Text */}
                <h3 className="svc-pc-title">{service.title}</h3>
                <p className="svc-pc-desc">{service.description.slice(0, 90)}{service.description.length > 90 ? '…' : ''}</p>

                {/* Divider */}
                <div className="svc-pc-divider" />

                {/* CTA */}
                <div className="svc-pc-footer">
                  <a
                    href={buildWaLink(service.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="svc-pc-cta"
                    onClick={e => e.stopPropagation()}
                  >
                    <MessageCircle size={15} strokeWidth={2} />
                    <span>WhatsApp Enquiry</span>
                    <ArrowRight size={14} className="svc-pc-arrow" />
                  </a>
                  <button className="svc-pc-details">Details →</button>
                </div>

                {/* Glow */}
                <div className="svc-pc-glow" />
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="svc-bottom-cta" style={{ marginTop: '56px' }}>
          <p className="svc-bottom-text">Need a custom security solution?</p>
          <a href={`https://wa.me/${COMPANY.whatsappNumber}?text=Hello%2C%20I%20need%20a%20custom%20security%20quote.`}
            target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            📋 Request a Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
