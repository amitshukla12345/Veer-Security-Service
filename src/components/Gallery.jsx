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
  // ── Security Personnel ──────────────────────────────────────
  { id: 1, category: 'Security Personnel',  src: '/gallery/veer-security-guard.jpg', alt: 'Veer Security Guard on duty' },
  { id: 2, category: 'Security Personnel',  src: 'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=600&q=75&fit=crop', alt: 'Security personnel at entrance' },

  // ── Corporate Security ───────────────────────────────────────
  // src: '/gallery/corporate-security/corporate-01.jpg'
  { id: 3, category: 'Corporate Security',  src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=75&fit=crop', alt: 'Corporate office security post' },
  { id: 4, category: 'Corporate Security',  src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=75&fit=crop', alt: 'Corporate security personnel' },

  // ── Industrial Security ──────────────────────────────────────
  // src: '/gallery/industrial-security/industrial-01.jpg'
  { id: 5, category: 'Industrial Security', src: '/gallery/security-personnel/veer-industrial-formal.jpg', alt: 'Veer Security industrial site team' },
  { id: 6, category: 'Industrial Security', src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=75&fit=crop', alt: 'Factory security perimeter' },

  // ── Training ─────────────────────────────────────────────────
  // src: '/gallery/training/training-01.jpg'
  { id: 7, category: 'Training',            src: 'https://images.unsplash.com/photo-1580894908361-967195033215?w=600&q=75&fit=crop', alt: 'Security personnel in formation' },
  { id: 8, category: 'Training',            src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=75&fit=crop', alt: 'Security briefing session' },

  // ── Events ───────────────────────────────────────────────────
  // src: '/gallery/events/event-01.jpg'
  { id: 9, category: 'Events',              src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=75&fit=crop', alt: 'Event security team' },

  // ── Housekeeping ─────────────────────────────────────────────
  // Local image: public/gallery/housekeeping/house keeping .jpg
  { id: 10, category: 'Housekeeping',       src: '/gallery/housekeeping/house%20keeping%20.jpg', alt: 'Professional housekeeping staff at work' },
  { id: 11, category: 'Housekeeping',       src: 'https://images.unsplash.com/photo-1527515637462-cff94edd36b3?w=600&q=75&fit=crop', alt: 'Housekeeping team at work' },
];

const CATEGORIES = ['All', ...new Set(ALL_ITEMS.map(i => i.category))];

export default function Gallery() {
  const [activeTab, setActiveTab]   = useState('All');
  const [lightbox, setLightbox]     = useState(null);

  const filtered = activeTab === 'All' ? ALL_ITEMS : ALL_ITEMS.filter(i => i.category === activeTab);

  const openLightbox  = useCallback((item) => setLightbox(item), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

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
          src="/gallery/gallery-banner.jpg" 
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
              <img src={item.src} alt={item.alt} loading="lazy" />
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
          <img src={lightbox.src} alt={lightbox.alt} className="lightbox-img" />
        </div>
      )}
    </section>
  );
}
