import React, { useState, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY IMAGES — apni photos add karne ke liye:
//
// 1. Photo ko sahi subfolder mein dalo:
//    public/gallery/security-personnel/   → Security Personnel photos
//    public/gallery/corporate-security/   → Corporate Security photos
//    public/gallery/industrial-security/  → Industrial Security photos
//    public/gallery/training/             → Training photos
//    public/gallery/events/               → Events photos
//    public/gallery/housekeeping/         → Housekeeping photos
//
// 2. Neeche ALL_ITEMS array mein entry add karo. Example:
//    { id: 10, category: 'Security Personnel',
//      src: '/gallery/security-personnel/guard-01.jpg',
//      alt: 'Security guard at main gate' }
//
// Note: Abhi placeholder images hain — inhe apni photos se replace karo.
// ─────────────────────────────────────────────────────────────────────────────

const ALL_ITEMS = [
  {
    id: 1,
    category: 'Corporate & Commercial',
    src: 'gallery/security-personnel/group-corporate-entrance.jpg',
    alt: 'Corporate Office Entrance Security Squad',
    caption: 'Veer Security guards deployed at commercial corporate headquarters and IT parks'
  },
  {
    id: 2,
    category: 'Corporate & Commercial',
    src: 'gallery/mall.png',
    alt: 'Shopping Mall & Retail Hub Security',
    caption: 'Guards operating door frame metal detectors, baggage inspection scanners, and crowd flow management'
  },
  {
    id: 3,
    category: 'Industrial Security',
    src: 'gallery/veer-industrial-formal.jpg',
    alt: 'Industrial Gate Security Squad - Veer Security Service',
    caption: 'Uniformed industrial security squad at main factory checkpoint with official Veer Security branding'
  },
  {
    id: 4,
    category: 'Industrial Security',
    src: 'gallery/industrial-security/group9.png',
    alt: 'Manufacturing Plant & Warehouse Logistics Security',
    caption: '24/7 security deployment and night patrol for manufacturing units and logistics warehouses'
  },
  {
    id: 5,
    category: 'Residential Security',
    src: 'gallery/society_image.png',
    alt: 'Residential Society Gate & Vehicle Access Control',
    caption: 'Veer Security guard managing boom barrier entry and digital visitor verification at Prakash Enclave'
  },
  {
    id: 6,
    category: 'Residential Security',
    src: 'gallery/security-personnel/group-patrol-residential.jpg',
    alt: 'Gated Township Patrolling Squad',
    caption: 'Trained security patrol squad equipped with wireless transceivers securing residential communities'
  },
  {
    id: 7,
    category: 'Institutional Security',
    src: 'gallery/school%20image%20.png',
    alt: 'School & Educational Institution Security',
    caption: 'Dedicated security officers ensuring student safety, pedestrian crossing, and bus transit monitoring'
  },
  {
    id: 8,
    category: 'CCTV & Surveillance',
    src: 'gallery/cctv%20image%20.png',
    alt: '24/7 CCTV Command Center & Electronic Surveillance',
    caption: 'High-tech central surveillance room with Veer Security operators monitoring multi-camera feeds in real-time'
  },
  {
    id: 9,
    category: 'Training & Safety',
    src: 'gallery/fire%20extinguisher.png',
    alt: 'Live Fire Fighting & Emergency Evacuation Drill',
    caption: 'Hands-on fire extinguisher operations, safety protocols, and emergency evacuation drills'
  },
  {
    id: 10,
    category: 'Training & Safety',
    src: 'gallery/open%20training%20ground.png',
    alt: 'Security Drill & Parade Ground Physical Training',
    caption: 'Senior security trainer conducting physical conditioning, drill parade, and tactical preparedness sessions'
  },
  {
    id: 11,
    category: 'Training & Safety',
    src: 'gallery/guard%20recrutment.png',
    alt: 'Security Guard Recruitment & Verification Drive',
    caption: 'Rigorous physical screening, background verification, and formal induction of security guards'
  },
  {
    id: 12,
    category: 'Security Personnel',
    src: 'gallery/security-personnel/female-security-mumbai.jpg',
    alt: 'Professional Lady Security Officers',
    caption: 'Specialized female security personnel for frisking, corporate front-desk, and institutional safety'
  },
  {
    id: 13,
    category: 'Security Personnel',
    src: 'gallery/veer-security-guard.jpg',
    alt: 'Uniformed Security Guard on Duty',
    caption: 'Alert and vigilant on-site security guard maintaining strict access control across premises'
  },
  {
    id: 14,
    category: 'Security Personnel',
    src: 'gallery/security-personnel/group%20.png',
    alt: 'Security Quick Response Team (QRT)',
    caption: 'Rapid action security unit equipped for emergency escalation and high-visibility perimeter patrol'
  },
  {
    id: 15,
    category: 'Events & VIP',
    src: 'gallery/security-personnel/bouncers-group.jpg',
    alt: 'Bouncers & VIP Executive Protection Squad',
    caption: 'Trained male and female bouncers for high-profile events, concerts, VIP escorts, and private venues'
  },
  {
    id: 16,
    category: 'Facility & Housekeeping',
    src: 'gallery/housekeeping/house_keeping.jpeg',
    alt: 'Corporate Housekeeping & Facility Management Staff',
    caption: 'Professional cleaning squad equipped with modern sanitation trolleys and facility care supplies'
  },
  {
    id: 17,
    category: 'Facility & Housekeeping',
    src: 'gallery/housekeeping/house%20keeping%20.jpg',
    alt: 'Commercial Floor Scrubbing & Deep Cleaning Service',
    caption: 'Mechanized floor maintenance, facade cleaning, and comprehensive commercial housekeeping'
  },
  {
    id: 18,
    category: 'Facility & Housekeeping',
    src: 'gallery/garden.png',
    alt: 'Public Park, Garden & Facility Perimeter Guarding',
    caption: 'Uniformed security staff maintaining peaceful atmosphere and safety across public parks and gardens'
  },
];

const CATEGORIES = [
  'All',
  'Corporate & Commercial',
  'Industrial Security',
  'Residential Security',
  'Security Personnel',
  'Events & VIP',
  'Training & Safety',
  'CCTV & Surveillance',
  'Institutional Security',
  'Facility & Housekeeping'
];

export default function Gallery() {
  const [activeTab, setActiveTab]   = useState('All');
  const [lightbox, setLightbox]     = useState(null);

  const filtered = activeTab === 'All' ? ALL_ITEMS : ALL_ITEMS.filter(i => i.category === activeTab);

  const openLightbox  = useCallback((item) => setLightbox(item), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const handleImgError = (e) => {
    const current = e.currentTarget.getAttribute('src');
    if (!current) return;
    if (current.includes('%20')) {
      e.currentTarget.src = decodeURIComponent(current);
    } else if (current.includes(' ')) {
      e.currentTarget.src = encodeURI(current);
    }
  };

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeLightbox();
  };

  // Close on Escape key
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLightbox]);

  return (
    <section id="gallery" className="gallery section-py" style={{ paddingTop: '80px' }}>
      
      {/* ── Full Width Image Banner (No Cropping) ── */}
      <div style={{ width: '100%', maxWidth: '1920px', margin: '0 auto', background: '#0a1e3c' }}>
        <img 
          src="gallery/gallery-banner.jpg" 
          alt="Veer Security Force Gallery" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            display: 'block' 
          }} 
        />
      </div>

      <div className="container" style={{ marginTop: '20px' }}>
        <div className="section-header centered" style={{ marginBottom: '20px' }}>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Our Work in the Field</h2>
          <span className="gold-divider" style={{ marginBottom: '10px' }} />
        </div>

        {/* Tabs */}
        <div className="gallery-tabs" role="tablist" aria-label="Gallery categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeTab === cat}
              className={`gallery-tab${activeTab === cat ? ' active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {filtered.map(item => (
            <div
              key={item.id}
              className="gallery-item"
              onClick={() => openLightbox(item)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(item)}
            >
              <img 
                src={item.src} 
                alt={item.alt} 
                loading="lazy" 
                onError={handleImgError}
              />
              <div className="gallery-overlay">
                <span className="gallery-overlay-label">{item.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-backdrop"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${lightbox.alt}`}
        >
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close image">×</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightbox.src} 
              alt={lightbox.alt} 
              className="lightbox-img" 
              onError={handleImgError} 
            />
            <div className="lightbox-caption-box">
              <span className="lightbox-tag">{lightbox.category}</span>
              <h3 className="lightbox-title">{lightbox.alt}</h3>
              {lightbox.caption && <p className="lightbox-desc">{lightbox.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
