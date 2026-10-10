import React from 'react';
import { COMPANY } from '../data/siteData';

export default function CallButton() {
  const waLink = `https://wa.me/${COMPANY.whatsappNumber}?text=Hello+Veer+Security+Force%2C+I+would+like+to+enquire+about+your+security+services.`;

  const scrollToQuote = (e) => {
    e.preventDefault();
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
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
