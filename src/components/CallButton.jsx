import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY } from '../data/siteData';

export default function CallButton() {
  const navigate = useNavigate();
  const waLink = `https://wa.me/${COMPANY.whatsappNumber}?text=Hello+Veer+Security+Service%2C+I+would+like+to+know+more+about+your+professional+security+services.`;

  const scrollToQuote = (e) => {
    e.preventDefault();
    const el = document.getElementById('quote');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact#quote');
    }
  };

  return (
    <div className="mobile-contact-bar" role="navigation" aria-label="Quick contact">
      <div className="mobile-contact-bar-inner">
        <a href={COMPANY.phoneHref} className="mobile-bar-btn call" aria-label="Call us">
          <span className="bar-icon">📞</span>
          Call
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-bar-btn whatsapp"
          aria-label="WhatsApp us"
        >
          <span className="bar-icon">💬</span>
          WhatsApp
        </a>
        <a href="#quote" className="mobile-bar-btn quote" onClick={scrollToQuote} aria-label="Get a quote">
          <span className="bar-icon">📋</span>
          Get Quote
        </a>
      </div>
    </div>
  );
}
