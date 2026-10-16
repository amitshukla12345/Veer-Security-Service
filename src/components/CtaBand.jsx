import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY } from '../data/siteData';

export default function CtaBand() {
  const navigate = useNavigate();
  const waLink = `https://wa.me/${COMPANY.whatsappNumber}?text=Hello+Veer+Security+Service%2C+I+would+like+to+get+a+security+quotation+for+my+premises.`;

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
    <div className="cta-band">
      <div className="container cta-band-inner">
        <div className="cta-band-text">
          <h2>Ready to Secure Your Premises?</h2>
          <p>Contact us today to discuss your security requirements and get a tailored proposal.</p>
        </div>
        <div className="cta-band-btns">
          <a href="/contact#quote" className="btn btn-dark" onClick={scrollToQuote}>
            📋 Request a Quote
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
