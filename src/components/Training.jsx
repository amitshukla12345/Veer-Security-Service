import React from 'react';

const TRAINING_IMG = 'https://images.unsplash.com/photo-1580894908361-967195033215?w=700&q=80&fit=crop';

const TOPICS = [
  {
    icon: '🚪',
    title: 'Access Control',
    desc: 'Managing entry and exit points to ensure only authorised personnel access the premises.',
  },
  {
    icon: '📋',
    title: 'Visitor Management',
    desc: 'Systematic logging and verification of visitors to maintain site security records.',
  },
  {
    icon: '👁️',
    title: 'Site Monitoring',
    desc: 'Continuous observation of the premises to detect and report any security concerns.',
  },
  {
    icon: '🚨',
    title: 'Emergency Response',
    desc: 'Trained to respond calmly and effectively to emergency situations as per established protocols.',
  },
  {
    icon: '🦺',
    title: 'Basic Safety Procedures',
    desc: 'Knowledge of fire safety, first aid basics and incident reporting procedures.',
  },
  {
    icon: '📊',
    title: 'Regular Supervision',
    desc: 'Our supervisors conduct scheduled inspections to maintain guard performance and standards.',
  },
];

export default function Training() {
  return (
    <section id="training" className="training section-py">
      <div className="container">
        <div className="training-inner">
          {/* Content */}
          <div>
            <div className="section-header">
              <span className="section-label">Our Personnel</span>
              <h2 className="section-title">Security Personnel &amp; Operational Standards</h2>
              <span className="gold-divider" />
              <p className="section-desc">
                Every security professional deployed by Veer Security Service is prepared to uphold
                strict operational standards. Our guards are briefed on site-specific protocols
                before deployment and are regularly monitored to ensure consistent performance.
              </p>
            </div>

            <div className="training-topics">
              {TOPICS.map(topic => (
                <div key={topic.title} className="training-topic">
                  <span className="training-topic-icon" aria-hidden="true">{topic.icon}</span>
                  <div className="training-topic-content">
                    <h4>{topic.title}</h4>
                    <p>{topic.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div>
            <img
              src={TRAINING_IMG}
              alt="Veer Security Service personnel in professional formation"
              className="training-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
