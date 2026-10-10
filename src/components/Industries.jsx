import React, { useState, useEffect } from 'react';
import { INDUSTRIES } from '../data/siteData';
import { Building2, Home, Factory, HeartPulse, GraduationCap, Hotel, ShoppingBag, HardHat, Tent, Landmark, TreePine } from 'lucide-react';

const ICON_MAP = {
  "Corporate Offices": <Building2 size={24} strokeWidth={2} />,
  "Residential Societies": <Home size={24} strokeWidth={2} />,
  "Industries & Factories": <Factory size={24} strokeWidth={2} />,
  "Hospitals": <HeartPulse size={24} strokeWidth={2} />,
  "Schools & Colleges": <GraduationCap size={24} strokeWidth={2} />,
  "Hotels": <Hotel size={24} strokeWidth={2} />,
  "Malls & Retail": <ShoppingBag size={24} strokeWidth={2} />,
  "Construction Sites": <HardHat size={24} strokeWidth={2} />,
  "Events": <Tent size={24} strokeWidth={2} />,
  "Government Sectors": <Landmark size={24} strokeWidth={2} />,
  "Parks & Gardens": <TreePine size={24} strokeWidth={2} />,
};

const BANNER_IMAGES = [
  { url: 'gallery/industrial-security/group9.png', pos: 'center top' },
  { url: 'gallery/veer-security-guard.jpg', pos: 'center 30%' }
];

export default function Industries() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % BANNER_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="industries" className="industries section-py" style={{ paddingTop: '72px' }}>
      {/* ── Hero Header with Img Slider (No Cropping) ── */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '1920px', margin: '0 auto', background: '#0a1e3c', overflow: 'hidden' }}>
        {/* Images */}
        {BANNER_IMAGES.map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            alt="Industries Banner"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              position: idx === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              opacity: idx === currentSlide ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }}
          />
        ))}
        {/* Dark Overlay (optional, for text readability) */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 12, 27, 0.4)' }} />

        {/* Content Overlay */}
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
          {/*<span className="section-label" style={{ color: '#FFC107', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>
            Industries We Serve
          </span>
           <h2 className="section-title" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>
            Sectors We Protect
          </h2>
          <span className="gold-divider" style={{ margin: '20px auto 24px' }} />
          <p className="section-desc" style={{ color: 'rgba(255,255,255,0.9)', margin: '0 auto', maxWidth: '700px', fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}>
            We provide professional security coverage across a wide range of industries and sectors.
            Our solutions are adapted to the specific demands of each environment.
          </p> */}
        </div>
      </div>

      <div className="container" style={{ marginTop: '64px' }}>

        <div className="industries-grid">
          {INDUSTRIES.map(ind => (
            <div key={ind.title} className="industry-card">
              <div className="industry-icon" aria-hidden="true">
                {ICON_MAP[ind.title] || ind.icon}
              </div>
              <div className="industry-content">
                <h3>{ind.title}</h3>
                <p>{ind.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
