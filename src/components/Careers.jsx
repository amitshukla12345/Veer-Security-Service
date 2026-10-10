import React, { useState } from 'react';
import { COMPANY, CAREER_POSITIONS, EXPERIENCE_OPTIONS } from '../data/siteData';
import { sendEnquiryEmail } from '../services/emailService';
import { User, Phone, Mail, MapPin, Briefcase, Award, FileText, Send, CheckCircle, ShieldCheck, TrendingUp, Clock, BookOpen } from 'lucide-react';

const INITIAL = { name: '', mobile: '', email: '', location: '', position: '', experience: '', message: '' };

export default function Careers() {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = React.useRef(null);

  const handle = (e) => {
    let { name, value } = e.target;
    if (name === 'name') value = value.replace(/[^a-zA-Z\s.]/g, '').slice(0, 50);
    if (name === 'mobile') value = value.replace(/[^0-9]/g, '').slice(0, 10);
    if (name === 'location') value = value.slice(0, 100);
    if (name === 'message') value = value.slice(0, 500);
    setForm(f => ({ ...f, [name]: value }));
  };

  const validateForm = () => {
    if (formRef.current && !formRef.current.reportValidity()) return false;
    if (!form.name.trim() || !form.mobile.trim() || !form.email.trim() || !form.location.trim() || !form.position || !form.experience || !form.message.trim()) {
      alert('Please fill out all required fields before submitting.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      alert("Please enter a valid email address.");
      return false;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(form.mobile.trim())) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }
    return true;
  };

  const sendViaWhatsApp = () => {
    if (!validateForm()) return;

    if (!window.confirm('Are you sure you want to submit this application via WhatsApp?')) {
      return;
    }

    const msg = `Hello Veer Security Service ,

I would like to apply for a position at your organisation.

*📝 Applicant Details:*
👤 Name: ${form.name}
📞 Mobile: ${form.mobile}
📧 Email: ${form.email || 'Not provided'}
📍 Location: ${form.location || 'Not provided'}
💼 Position: ${form.position}
🎓 Experience: ${form.experience || 'Not specified'}

💬 Message:
${form.message || 'None'}

🙏 Thank you.`;
    window.open(`https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');

    setForm(INITIAL);
    setSent(true);
  };

  const sendViaEmail = async () => {
    if (!validateForm()) return;

    if (!window.confirm('Are you sure you want to submit this application via Email?')) {
      return;
    }

    setLoading(true);
    try {
      await sendEnquiryEmail(form, `Job Application: ${form.position} - ${form.name}`);
      setForm(INITIAL);
      setSent(true);
    } catch (error) {
      alert(error.message || 'Something went wrong while sending the email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="careers" className="careers section-py" style={{ paddingTop: '72px', background: 'var(--navy)' }}>
      {/* ── Hero Header with Img (No Cropping) ── */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '1920px', margin: '0 auto', background: '#0a1e3c', overflow: 'hidden' }}>
        <img
          src="/gallery/career.png"
          alt="Careers Banner"
          fetchPriority="high"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 12, 27, 0.4)' }} />
      </div>

      <div className="container" style={{ marginTop: '72px' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)', color: '#FFC107', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', padding: '6px 18px', borderRadius: '30px', marginBottom: '16px' }}>
            Join Our Team
          </span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>
            Careers at Veer Security
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            We are always looking for disciplined, dedicated individuals who take pride in professional service.
          </p>
        </div>

        <div className="contact-main-grid">
          {/* Left - Perks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { icon: <ShieldCheck size={24} />, title: 'Professional Environment', desc: 'Structured, disciplined and respectful workplace.', color: '#1e88e5', bg: 'rgba(30,136,229,0.1)' },
              { icon: <TrendingUp size={24} />, title: 'Career Growth', desc: 'Opportunities to advance from guard to supervisor roles.', color: '#25D366', bg: 'rgba(37,211,102,0.1)' },
              { icon: <BookOpen size={24} />, title: 'On-the-Job Training', desc: 'Site-specific briefings and operational guidance provided.', color: '#fb8c00', bg: 'rgba(251,140,0,0.1)' },
              { icon: <Clock size={24} />, title: 'Regular Shifts', desc: 'Structured shift patterns for better work-life balance.', color: '#8e24aa', bg: 'rgba(142,36,170,0.1)' },
            ].map((p, i) => (
              <div key={i} style={{
                background: 'linear-gradient(160deg, #0d2147 0%, #071530 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                gap: '18px',
                alignItems: 'flex-start',
                transition: 'transform 0.3s ease',
                cursor: 'default'
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px',
                  background: p.bg, color: p.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {p.icon}
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem', margin: '0 0 6px', fontWeight: 700 }}>{p.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="contact-form-card">
            <div className="cfc-header">
              <div className="cfc-header-icon" style={{ background: 'rgba(37,211,102,0.12)', color: '#25D366', borderColor: 'rgba(37,211,102,0.2)' }}>
                <Briefcase size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 className="cfc-title">Apply via WhatsApp</h3>
                <p className="cfc-sub">Fast response from our recruitment team</p>
              </div>
            </div>
            <span className="gold-divider" style={{ marginBottom: '28px' }} />

            <form ref={formRef} className="cfc-form" noValidate={false}>
              {/* Spam Protection Honeypot */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} value={form.botcheck || ''} onChange={(e) => setForm({ ...form, botcheck: e.target.checked })} />
              
              <div className="cfc-row">
                <div className="cfc-field">
                  <label htmlFor="car-name"><User size={13} strokeWidth={2.5} style={{ marginRight: 4 }} /> Full Name <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><User size={16} strokeWidth={2} /></span>
                    <input id="car-name" name="name" maxLength={50} required value={form.name} onChange={handle} placeholder="Your full name" />
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="car-mobile"><Phone size={13} strokeWidth={2.5} style={{ marginRight: 4 }} /> Mobile Number <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><Phone size={16} strokeWidth={2} /></span>
                    <input id="car-mobile" name="mobile" type="tel" maxLength={10} required value={form.mobile} onChange={handle} placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
              </div>

              <div className="cfc-row">
                <div className="cfc-field">
                  <label htmlFor="car-email"><Mail size={13} strokeWidth={2.5} style={{ marginRight: 4 }} /> Email Address <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><Mail size={16} strokeWidth={2} /></span>
                    <input id="car-email" name="email" type="email" maxLength={100} required value={form.email} onChange={handle} placeholder="Your email address" />
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="car-location"><MapPin size={13} strokeWidth={2.5} style={{ marginRight: 4 }} /> Location <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><MapPin size={16} strokeWidth={2} /></span>
                    <input id="car-location" name="location" maxLength={100} required value={form.location} onChange={handle} placeholder="Your city / area" />
                  </div>
                </div>
              </div>

              <div className="cfc-row">
                <div className="cfc-field">
                  <label htmlFor="car-position"><Briefcase size={13} strokeWidth={2.5} style={{ marginRight: 4 }} /> Position Applying For <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><Briefcase size={16} strokeWidth={2} /></span>
                    <select id="car-position" name="position" required value={form.position} onChange={handle}>
                      <option value="">Select position</option>
                      {CAREER_POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="car-exp"><Award size={13} strokeWidth={2.5} style={{ marginRight: 4 }} /> Experience <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><Award size={16} strokeWidth={2} /></span>
                    <select id="car-exp" name="experience" required value={form.experience} onChange={handle}>
                      <option value="">Select experience</option>
                      {EXPERIENCE_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="cfc-field">
                <label htmlFor="car-msg"><FileText size={13} strokeWidth={2.5} style={{ marginRight: 4 }} /> Message <span style={{ color: '#ef5350' }}>*</span></label>
                <div className="cfc-input-wrap cfc-textarea-wrap" style={{ alignItems: 'flex-start' }}>
                  <span className="cfc-input-icon" style={{ marginTop: '14px' }}><FileText size={16} strokeWidth={2} /></span>
                  <textarea id="car-msg" name="message" rows={4} maxLength={500} required value={form.message} onChange={handle} placeholder="Tell us about yourself..." style={{ resize: 'vertical', minHeight: '100px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={sendViaWhatsApp} className="cfc-submit" style={{ background: '#25D366', color: '#fff', border: 'none', cursor: 'pointer' }}>
                  <Send size={18} strokeWidth={2} />
                  Apply via WhatsApp
                </button>
                <button type="button" onClick={sendViaEmail} disabled={loading} className="cfc-submit" style={{ background: '#1e88e5', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                  <Mail size={18} strokeWidth={2} />
                  {loading ? 'Sending Application...' : 'Apply via Email'}
                </button>
              </div>
            </form>

            {/* Social Media Links */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', justifyContent: 'center' }}>
                <p style={{ color: '#fff', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, margin: 0, fontFamily: 'var(--font-display)' }}>
                  Follow Our Updates
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {COMPANY.social.facebook && (
                  <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1877F2'; e.currentTarget.style.borderColor = '#1877F2'; e.currentTarget.style.transform = 'translateY(-4px)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none' }} aria-label="Facebook">
                    <img src="https://cdn.simpleicons.org/facebook/white" alt="Facebook" width="20" height="20" />
                  </a>
                )}
                {COMPANY.social.instagram && (
                  <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#E1306C'; e.currentTarget.style.borderColor = '#E1306C'; e.currentTarget.style.transform = 'translateY(-4px)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none' }} aria-label="Instagram">
                    <img src="https://cdn.simpleicons.org/instagram/white" alt="Instagram" width="20" height="20" />
                  </a>
                )}
                {COMPANY.social.youtube && (
                  <a href={COMPANY.social.youtube} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#FF0000'; e.currentTarget.style.borderColor = '#FF0000'; e.currentTarget.style.transform = 'translateY(-4px)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none' }} aria-label="YouTube">
                    <img src="https://cdn.simpleicons.org/youtube/white" alt="YouTube" width="20" height="20" />
                  </a>
                )}
              </div>
            </div>            {/* Success Modal */}
            {sent && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div style={{ background: 'linear-gradient(145deg, rgba(13,33,71,0.95) 0%, rgba(7,21,48,1) 100%)', border: '1px solid rgba(37,211,102,0.4)', borderRadius: '24px', padding: '48px 32px', textAlign: 'center', maxWidth: '420px', width: '100%', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '130px', height: '130px', borderRadius: '50%', background: '#fff', marginBottom: '28px', padding: '12px', boxShadow: '0 0 25px rgba(255, 193, 7, 0.35), 0 0 0 10px rgba(255, 193, 7, 0.08)' }}>
                    <img src="/gallery/logo.png" alt="Veer Security Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <h4 style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '14px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Success!</h4>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '36px' }}>Your application has been successfully prepared. Our team will get back to you shortly.</p>
                  <button onClick={() => setSent(false)} style={{ background: '#25D366', color: '#000', border: 'none', padding: '16px 36px', borderRadius: '14px', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', width: '100%', transition: 'all 0.3s ease' }}>
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
