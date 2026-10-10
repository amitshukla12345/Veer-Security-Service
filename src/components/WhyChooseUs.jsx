import React from 'react';
import { WHY_CHOOSE_US } from '../data/siteData';

export default function WhyChooseUs() {
  return (
    <section id="why" className="why section-py">
      <div className="container">
        <div className="section-header centered">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">Why Choose Veer Security Service</h2>
          <span className="gold-divider" />
          <p className="section-desc">
            We are committed to delivering consistent, professional and client-focused security services.
          </p>
        </div>

        <div className="why-grid">
          {WHY_CHOOSE_US.map(item => (
            <div key={item.title} className="why-card">
              <div className="why-icon" aria-hidden="true">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
