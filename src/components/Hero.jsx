import React from 'react';
import { COMPANY } from '../data/siteData';

// Using a high-quality Unsplash image for the hero — replace with your own.
const HERO_IMAGE = 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=900&q=80&fit=crop';

export default function Hero() {
  const waLink = `https://wa.me/${COMPANY.whatsappNumber}?text=Hello+Veer+Security+Service%2C+I+would+like+to+know+more+about+your+professional+security+services.`;

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg" />
      <div className="hero-bg-grid" />

      <div className="container">
        <div className="hero-inner">
          {/* Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Trusted Security Partner
            </div>

            <h1 className="hero-title">
              Veer <span className="gold">Security</span> Service
            </h1>
            <p className="hero-tagline">{COMPANY.tagline}</p>
            <p className="hero-desc">{COMPANY.description}</p>

            <div className="hero-btns">
              <a href="#quote" className="btn btn-primary" onClick={scrollTo('quote')}>
                📋 Get a Quote
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                💬 WhatsApp Us
              </a>
            </div>

            <div className="hero-trust">
              <div className="hero-trust-item">
                <span className="hero-trust-icon">🛡️</span>
                Trained Personnel
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-icon">✅</span>
                Professional Service
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-icon">🕐</span>
                24/7 Availability
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img
                src={HERO_IMAGE}
                alt="Veer Security Service professional security personnel on duty"
                className="hero-img"
                loading="eager"
              />
              <div className="hero-img-overlay" />
              <div className="hero-badge-float">
                <span className="hero-badge-float-icon">🛡️</span>
                <div className="hero-badge-float-text">
                  <span className="hero-badge-float-label">Professional</span>
                  <span className="hero-badge-float-value">Security Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
