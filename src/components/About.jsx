import React, { useState } from 'react';
import { ShieldCheck, Target, Handshake, Lock, Phone, X, User, CheckCircle } from 'lucide-react';

const ABOUT_IMG_MAIN = '/gallery/security-personnel/bouncers-group.jpg';
const ABOUT_IMG_ACCENT = '/gallery/security-personnel/bouncers-group.jpg';

const VALUES = [
  { icon: <ShieldCheck size={24} strokeWidth={2.5} color="#ffffff" />, title: 'Professional Service', desc: 'Conducted with discipline and attention to detail.' },
  { icon: <Target size={24} strokeWidth={2.5} color="#ffffff" />, title: 'Trained Personnel', desc: 'Guards trained in access control and site security.' },
  { icon: <Handshake size={24} strokeWidth={2.5} color="#ffffff" />, title: 'Client-First Approach', desc: 'We listen, plan and deliver around your requirements.' },
  { icon: <Lock size={24} strokeWidth={2.5} color="#ffffff" />, title: 'Reliable Coverage', desc: 'Consistent security coverage you can count on.' },
];

const STATS = [
  { value: '20+', label: 'Years of Experience' },
  { value: '500+', label: 'Clients Served' },
  { value: '1000+', label: 'Security Personnel' },
  { value: '2005', label: 'Year Founded' },
];

const TEAM = [
  {
    id: 1,
    name: 'Kanhaiya Jha',
    role: 'Supervisor',
    phone: '7634095143',
    image: '/gallery/supervisor.png',
    bg: 'e53935',
    bio: 'Kanhaiya Jha oversees our security operations on the ground, ensuring all guards are properly deployed and adhering to our strict professional standards. He brings years of operational experience to the team.',
    responsibilities: ['Site supervision', 'Guard deployment', 'Quality control']
  },
  {
    id: 2,
    name: 'Shaktinath Jha',
    role: 'Area Officer',
    phone: '8451016391',
    image: '/gallery/area_officer.png',
    bg: '1e88e5',
    bio: 'Shaktinath Jha manages client relations and coordinates security requirements across multiple zones. He is the first point of contact for area-level operations and site assessments.',
    responsibilities: ['Area management', 'Client relations', 'Incident response']
  }
];

export default function About() {
  const [activeMember, setActiveMember] = useState(null);
  return (
    <section id="about" className="about section-py" style={{ paddingTop: '72px' }}>
      {/* ── Hero Header with Img (No Cropping) ── */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '1920px', margin: '0 auto', background: '#0a1e3c', overflow: 'hidden' }}>
        <img
          src="/gallery/about page.png"
          alt="About Banner"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 12, 27, 0.4)' }} />

        <div
          className="container"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px'
          }}
        >
          {/* <span className="section-label" style={{ color: '#FFC107', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>
            About Us
          </span>
          <h2 className="section-title" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>
            About Veer Security Service
          </h2>
          <span className="gold-divider" style={{ margin: '20px auto 24px' }} />
          <p className="section-desc" style={{ color: 'rgba(255,255,255,0.9)', margin: '0 auto', maxWidth: '700px', fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}>
            Committed to delivering professional, reliable and disciplined security services tailored to the unique needs of each client.
          </p>*/}
        </div>
      </div>

      <div className="container" style={{ marginTop: '64px' }}>
        <div className="about-inner">
          {/* Content */}
          <div className="about-content-left">
            <div className="section-header">
              <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>Our Mission & Approach</h2>
              <span className="gold-divider" />
              <p className="section-desc">
                Veer Security Service is committed to delivering professional, reliable and disciplined
                security services tailored to the unique needs of each client. We serve businesses,
                residential communities, institutions, industries and events with the highest standards
                of security management.
              </p>
              <br />
              <p className="section-desc">
                Our team of trained security professionals is deployed with clear protocols, regular
                supervision and a focus on accountability. We believe that effective security is built on
                discipline, communication and trust — values that define every engagement we undertake.
              </p>
            </div>



            {/* Values grid */}
            <div className="about-values">
              {VALUES.map(v => (
                <div key={v.title} className="about-value-item">
                  <span className="about-value-icon">{v.icon}</span>
                  <div>
                    <strong>{v.title}</strong>
                    {v.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-content-right">
            {/* Founder card */}
            <div className="about-founder-card">
              <div className="about-founder-avatar" aria-hidden="true">
                <img src="/gallery/founder_professional.jpg" alt="Sanjay Pandey - Founder" />
              </div>
              <div className="about-founder-info">
                <div className="about-founder-name">Sanjay Pandey</div>
                <div className="about-founder-role">Founder &amp; Director · Veer Security Service</div>
                <p className="about-founder-quote">
                  "Our mission since 2005 has been simple — protect every client with the same
                  dedication and discipline we would give to our own family."
                </p>
                <div className="about-founder-bio" style={{ marginTop: '16px', marginBottom: '20px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                  <p>
                    With over two decades of extensive expertise in risk management, facility protection, and personnel training, Sanjay Pandey has established Veer Security Service as a benchmark for trust and reliability in the region. Under his leadership, the agency has grown to manage over 500+ premium client sites. He personally oversees the rigorous training protocols, ensuring that every officer meets his strict standards of integrity, vigilance, and rapid response.
                  </p>
                </div>
                <div className="about-founder-since">
                  <span className="about-founder-badge">🏅 Founded in 2005</span>
                  <span className="about-founder-badge">⭐ 20+ Years in Security</span>
                  <span className="about-founder-badge">🛡️ Trusted Industry Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row full width */}
        <div className="about-stats">
          {STATS.map(s => (
            <div key={s.label} className="about-stat">
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Key Team Members */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: '30px' }}>Our Key Team Members</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', justifyContent: 'center' }}>
            
            {TEAM.map(member => (
              <div 
                key={member.id}
                className="team-card" 
                onClick={() => setActiveMember(member)}
                style={{ 
                  padding: '30px 24px', 
                  textAlign: 'center', 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ 
                  width: '100px', height: '100px', margin: '0 auto 16px', 
                  borderRadius: '50%', overflow: 'hidden', border: '3px solid #FFC107',
                  boxShadow: '0 8px 24px rgba(255, 193, 7, 0.2)'
                }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=${member.bg}&color=fff&size=200`; }} />
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.4rem', margin: '0 0 6px' }}>{member.name}</h4>
                <p style={{ color: '#FFC107', fontSize: '0.95rem', margin: '0 0 16px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{member.role}</p>
                <a 
                  href={`tel:+91${member.phone}`} 
                  onClick={(e) => e.stopPropagation()} 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#25D366', textDecoration: 'none', fontWeight: 'bold', background: 'rgba(37,211,102,0.1)', padding: '8px 16px', borderRadius: '50px' }}
                >
                  <Phone size={16} /> +91 {member.phone}
                </a>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Team Member Profile Modal */}
      {activeMember && (
        <div className="svc-modal-overlay" onClick={() => setActiveMember(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', padding: '40px 20px', overflowY: 'auto', backdropFilter: 'blur(8px)' }}>
          <div className="svc-detail-panel" onClick={(e) => e.stopPropagation()} style={{ margin: 'auto', background: '#0a1e3c', borderRadius: '20px', maxWidth: '420px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <button className="svc-close-btn" onClick={() => setActiveMember(null)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.1)', border: 'none', width: '30px', height: '30px', borderRadius: '50%', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
              <X size={16} />
            </button>
            {/* Modal Banner */}
            <div style={{ width: '100%', height: '110px', background: 'linear-gradient(135deg, #1e3c72 0%, #0a1e3c 100%)', position: 'relative', borderBottom: '2px solid rgba(255,193,7,0.3)', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
              {/* Subtle pattern overlay */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }} />
            </div>
            
            <div style={{ padding: '0 24px 30px', textAlign: 'center', position: 'relative' }}>
              <div style={{ 
                width: '100px', height: '100px', margin: '-50px auto 16px', 
                borderRadius: '50%', overflow: 'hidden', 
                border: '5px solid #0a1e3c', position: 'relative', zIndex: 10,
                boxShadow: '0 0 0 2px #FFC107, 0 8px 24px rgba(0,0,0,0.5)',
                background: '#fff'
              }}>
                <img src={activeMember.image} alt={activeMember.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${activeMember.name.replace(' ', '+')}&background=${activeMember.bg}&color=fff&size=200`; }} />
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 6px', fontWeight: 700 }}>{activeMember.name}</h3>
              <div style={{ color: '#FFC107', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>{activeMember.role}</div>
              
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
                {activeMember.bio}
              </p>

              <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.5px' }}>
                  <User size={16} color="#FFC107" /> Core Responsibilities
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeMember.responsibilities.map((req, i) => (
                    <li key={i} style={{ color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', lineHeight: 1.4 }}>
                      <span style={{ marginTop: '2px' }}><CheckCircle size={14} color="#FFC107" /></span> {req}
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href={`tel:+91${activeMember.phone}`} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(90deg, #128C7E 0%, #25D366 100%)', color: '#fff', textDecoration: 'none', fontWeight: 'bold', padding: '12px', borderRadius: '50px', marginTop: '24px', fontSize: '1rem', boxShadow: '0 8px 20px rgba(37,211,102,0.3)', transition: 'transform 0.2s ease', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <Phone size={18} /> Call {activeMember.name.split(' ')[0]}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
