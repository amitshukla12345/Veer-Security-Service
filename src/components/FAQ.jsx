import React, { useState, useRef, useEffect } from 'react';
import { FAQS } from '../data/siteData';
import { ChevronDown } from 'lucide-react';

function FaqItem({ faq, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div 
      style={{
        background: isOpen ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
        border: '1px solid',
        borderColor: isOpen ? 'rgba(255,193,7,0.4)' : 'rgba(255,255,255,0.08)',
        borderRadius: '12px',
        marginBottom: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          background: 'transparent',
          border: 'none',
          color: isOpen ? '#FFC107' : '#fff',
          fontSize: '1.05rem',
          fontWeight: 600,
          textAlign: 'left',
          cursor: 'pointer',
          fontFamily: 'var(--font-main)',
          transition: 'color 0.3s ease'
        }}
        onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.color = '#FFC107'; }}
        onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.color = '#fff'; }}
      >
        <span style={{ paddingRight: '20px', lineHeight: 1.4 }}>{faq.question}</span>
        <div 
          style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '32px', height: '32px', borderRadius: '50%',
            background: isOpen ? 'rgba(255,193,7,0.1)' : 'rgba(255,255,255,0.05)',
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s'
          }}
        >
          <ChevronDown size={18} color={isOpen ? '#FFC107' : 'rgba(255,255,255,0.7)'} />
        </div>
      </button>
      
      <div
        style={{
          height: `${height}px`,
          transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div ref={contentRef} style={{ padding: '0 24px 24px 24px' }}>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '16px' }} />
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <section id="faq" className="faq section-py" style={{ background: '#071530', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* We use a grid layout similar to Contact page */}
        {/* We use a grid layout similar to Contact page */}
        <div className="faq-inner">
          
          {/* Left - Header & Text */}
          <div className="faq-sidebar">
            <span style={{ display: 'inline-block', background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)', color: '#FFC107', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', padding: '6px 18px', borderRadius: '30px', marginBottom: '16px' }}>
              FAQ
            </span>
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0 0 20px', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
              Frequently Asked Questions
            </h2>
            <span className="gold-divider" style={{ marginBottom: '24px', marginLeft: 0 }} />
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '450px' }}>
              Have questions about our security services? Find answers to the most common enquiries. 
              Don't see your question? Contact us directly and our team will be happy to assist you.
            </p>
          </div>

          {/* Right - Accordion */}
          <div role="list">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
