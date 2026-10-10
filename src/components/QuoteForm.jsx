import React, { useState } from 'react';
import { COMPANY, SERVICE_OPTIONS, SHIFT_OPTIONS } from '../data/siteData';
import { sendEnquiryEmail } from '../services/emailService';
import { User, Building2, Phone, Mail, ShieldCheck, MapPin, Users, Clock, Calendar, FileText, CheckCircle } from 'lucide-react';

const INITIAL = {
  name: '', company: '', mobile: '', email: '',
  service: '', location: '', guards: '', shift: '', startDate: '', message: '',
};

const REQUIRED = ['name', 'company', 'mobile', 'email', 'service', 'location', 'guards', 'shift', 'startDate', 'message'];

export default function QuoteForm() {
  const [form, setForm]       = useState(INITIAL);
  const [status, setStatus]   = useState(null); // null | 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg]   = useState('');

  const handle = (e) => {
    let { name, value } = e.target;
    if (name === 'name') value = value.replace(/[^a-zA-Z\s.]/g, '').slice(0, 50);
    if (name === 'mobile') value = value.replace(/[^0-9]/g, '').slice(0, 10);
    if (name === 'guards') value = value.replace(/[^0-9]/g, '').slice(0, 4);
    if (name === 'company' || name === 'location') value = value.slice(0, 100);
    if (name === 'message') value = value.slice(0, 500);
    setForm(f => ({ ...f, [name]: value }));
  };

  const validate = () => {
    for (const field of REQUIRED) {
      if (!form[field] || !form[field].trim()) {
        return `Please fill in the required field: "${field.charAt(0).toUpperCase() + field.slice(1)}".`;
      }
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      return "Please enter a valid email address.";
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(form.mobile.trim())) {
      return "Please enter a valid 10-digit mobile number.";
    }

    return null;
  };

  // ── WhatsApp ──
  const sendViaWhatsApp = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setErrMsg(err); setStatus('error'); return; }

    if (!window.confirm('Are you sure you want to send this enquiry via WhatsApp?')) {
      return;
    }

    const msg = `Hello Veer Security Service,

I would like to enquire about your security services.

*Name:* ${form.name}
*Company:* ${form.company || 'N/A'}
*Mobile:* ${form.mobile}
*Email:* ${form.email || 'N/A'}
*Service:* ${form.service}
*Location:* ${form.location}
*Guards Required:* ${form.guards || 'Not specified'}
*Shift:* ${form.shift || 'Not specified'}
*Start Date:* ${form.startDate || 'Not specified'}

*Message:*
${form.message}

Please contact me regarding this requirement.

Thank you.`;

    window.open(`https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    setForm(INITIAL);
    setStatus('success');
    setErrMsg('');
  };

  // ── Email ──
  const sendViaEmail = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setErrMsg(err); setStatus('error'); return; }

    if (!window.confirm('Are you sure you want to send this enquiry via Email?')) {
      return;
    }

    setStatus('loading');
    setErrMsg('');
    try {
      await sendEnquiryEmail(form);
      setStatus('success');
      setForm(INITIAL);
    } catch (error) {
      setStatus('error');
      setErrMsg(
        error.message?.includes('not configured')
          ? error.message
          : 'Failed to send your enquiry. Please try WhatsApp or call us directly.'
      );
    }
  };

  return (
    <section id="quote" className="quote section-py">
      <div className="container">
        <div className="quote-inner">
          {/* Sidebar */}
          <div className="quote-sidebar">
            <span className="section-label">Request a Quote</span>
            <h2 className="section-title">Get a Free Security Consultation</h2>
            <span className="gold-divider" />
            <p className="section-desc">
              Fill in the form and we will prepare a tailored security proposal for your requirement.
              You can also reach us directly via WhatsApp or phone.
            </p>

            <div className="quote-sidebar-card">
              {[
                { icon: '📞', label: 'Phone', value: COMPANY.phone, href: COMPANY.phoneHref },
                { icon: '💬', label: 'WhatsApp', value: COMPANY.whatsapp, href: `https://wa.me/${COMPANY.whatsappNumber}` },
                { icon: '📧', label: 'Email', value: COMPANY.email, href: COMPANY.emailHref },
                { icon: '🏢', label: 'Head Quarter', value: COMPANY.address, href: null },
              ].map(c => (
                <div key={c.label} className="quote-contact-item">
                  <span className="quote-contact-icon">{c.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px', color: 'var(--text-muted)' }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">{c.value}</a>
                      : <span style={{ color: 'var(--white)', fontSize: '0.88rem', display: 'block', lineHeight: 1.4 }}>{c.value}</span>
                    }
                  </div>
                </div>
              ))}
              
              <div style={{ marginTop: '20px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <iframe
                  title="Head Quarter Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent('Room No.1, Babubhai Niwas, V.M. Road, Nehru Nagar, Vile Parle West, Mumbai - 400056')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="160"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)', display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Form box */}
          <div className="quote-form-box">
            <h3 className="quote-form-title">Enquiry Form</h3>
            <p className="quote-form-sub">Fields marked * are required.</p>

            <form noValidate>
              {/* Spam Protection Honeypot */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} value={form.botcheck || ''} onChange={(e) => setForm({ ...form, botcheck: e.target.checked })} />
              
              <div className="quote-grid">
                <div className="cfc-field">
                  <label htmlFor="q-name"><User size={13} strokeWidth={2.5} style={{marginRight: 4}}/> Full Name <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><User size={16} strokeWidth={2} /></span>
                    <input id="q-name" name="name" maxLength={50} required value={form.name} onChange={handle} placeholder="Your full name" />
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="q-company"><Building2 size={13} strokeWidth={2.5} style={{marginRight: 4}}/> Company / Organisation <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><Building2 size={16} strokeWidth={2} /></span>
                    <input id="q-company" name="company" maxLength={100} required value={form.company} onChange={handle} placeholder="Company name" />
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="q-mobile"><Phone size={13} strokeWidth={2.5} style={{marginRight: 4}}/> Mobile Number <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><Phone size={16} strokeWidth={2} /></span>
                    <input id="q-mobile" name="mobile" type="tel" maxLength={10} required value={form.mobile} onChange={handle} placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="q-email"><Mail size={13} strokeWidth={2.5} style={{marginRight: 4}}/> Email <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><Mail size={16} strokeWidth={2} /></span>
                    <input id="q-email" name="email" type="email" maxLength={100} required value={form.email} onChange={handle} placeholder="your@email.com" />
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="q-service"><ShieldCheck size={13} strokeWidth={2.5} style={{marginRight: 4}}/> Service Required <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><ShieldCheck size={16} strokeWidth={2} /></span>
                    <select id="q-service" name="service" required value={form.service} onChange={handle}>
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="q-location"><MapPin size={13} strokeWidth={2.5} style={{marginRight: 4}}/> Location <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><MapPin size={16} strokeWidth={2} /></span>
                    <input id="q-location" name="location" maxLength={100} required value={form.location} onChange={handle} placeholder="Site / city / area" />
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="q-guards"><Users size={13} strokeWidth={2.5} style={{marginRight: 4}}/> Number of Guards Required <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><Users size={16} strokeWidth={2} /></span>
                    <input id="q-guards" name="guards" type="number" min="1" max="9999" maxLength={4} required value={form.guards} onChange={handle} placeholder="e.g. 4" />
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="q-shift"><Clock size={13} strokeWidth={2.5} style={{marginRight: 4}}/> Shift Requirement <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><Clock size={16} strokeWidth={2} /></span>
                    <select id="q-shift" name="shift" required value={form.shift} onChange={handle}>
                      <option value="">Select shift</option>
                      {SHIFT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="cfc-field">
                  <label htmlFor="q-date"><Calendar size={13} strokeWidth={2.5} style={{marginRight: 4}}/> Preferred Start Date <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap">
                    <span className="cfc-input-icon"><Calendar size={16} strokeWidth={2} /></span>
                    <input id="q-date" name="startDate" type="date" required value={form.startDate} onChange={handle} />
                  </div>
                </div>
                <div className="cfc-field" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="q-message"><FileText size={13} strokeWidth={2.5} style={{marginRight: 4}}/> Message <span style={{ color: '#ef5350' }}>*</span></label>
                  <div className="cfc-input-wrap cfc-textarea-wrap" style={{ alignItems: 'flex-start' }}>
                    <span className="cfc-input-icon" style={{ marginTop: '14px' }}><FileText size={16} strokeWidth={2} /></span>
                    <textarea id="q-message" name="message" rows={4} maxLength={500} required value={form.message} onChange={handle} placeholder="Describe your security requirement..." style={{ resize: 'vertical', minHeight: '100px' }} />
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {status === 'error' && errMsg && (
                <div className="alert alert-error" role="alert">⚠️ {errMsg}</div>
              )}

              {/* Buttons */}
              <div className="quote-btns" style={{ marginTop: '20px' }}>
                <button type="button" className="btn btn-whatsapp" onClick={sendViaWhatsApp}>
                  💬 Send via WhatsApp
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={sendViaEmail}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? '⏳ Sending…' : '📧 Send Enquiry by Email'}
                </button>
              </div>
            </form>

            {/* Success Modal */}
            {status === 'success' && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div style={{ background: 'linear-gradient(145deg, rgba(13,33,71,0.95) 0%, rgba(7,21,48,1) 100%)', border: '1px solid rgba(37,211,102,0.4)', borderRadius: '24px', padding: '48px 32px', textAlign: 'center', maxWidth: '420px', width: '100%', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '130px', height: '130px', borderRadius: '50%', background: '#fff', marginBottom: '28px', padding: '12px', boxShadow: '0 0 25px rgba(255, 193, 7, 0.35), 0 0 0 10px rgba(255, 193, 7, 0.08)' }}>
                    <img src="gallery/logo.png" alt="Veer Security Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <h4 style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '14px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Enquiry Sent!</h4>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '36px' }}>Thank you for your enquiry. Our team will review your requirements and contact you shortly.</p>
                  <button onClick={() => setStatus(null)} style={{ background: '#25D366', color: '#000', border: 'none', padding: '16px 36px', borderRadius: '14px', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', width: '100%', transition: 'all 0.3s ease' }}>
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
