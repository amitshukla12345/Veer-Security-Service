import React, { useState, useEffect, useCallback } from 'react';
import { COMPANY } from '../data/siteData';

const HOUSEKEEPING_IMG = 'gallery/housekeeping/house%20keeping%20.jpg';
const SECURITY_IMG = 'gallery/veer-industrial-formal.jpg';
const CORPORATE_IMG = 'gallery/veer-security-guard.jpg';

const SLIDES = [
  {
    id: 1,
    highlight: 'TRUSTED SECURITY',
    title: 'PARTNER FOR YOUR BUSINESS',
    desc: 'Reliable and professional security solutions for businesses, residential communities, institutions, industries and events. Your safety is our commitment.',
    cta: { label: 'GET STARTED', href: '#quote' },
    img: SECURITY_IMG,
    badgeText: '500+ Trusted Clients'
  },
  {
    id: 2,
    highlight: 'COMPREHENSIVE',
    title: 'SECURITY SOLUTIONS',
    desc: 'From trained security guards and supervisors to event security and housekeeping — we provide end-to-end facility and security services tailored to your specific requirements.',
    cta: { label: 'EXPLORE SERVICES', href: '#services' },
    img: CORPORATE_IMG,
    badgeText: '20+ Years Experience'
  },
  {
    id: 3,
    highlight: 'PROFESSIONAL',
    title: 'HOUSEKEEPING & FACILITY',
    desc: 'We provide trained housekeeping personnel for offices, residential complexes, hospitals, hotels and commercial establishments — ensuring clean, safe and well-maintained premises every day.',
    cta: { label: 'GET A QUOTE', href: '#quote' },
    img: HOUSEKEEPING_IMG,
    badgeText: '1000+ Trained Staff'
  },
  {
    id: 4,
    highlight: 'DEDICATED',
    title: 'FEMALE SECURITY GUARDS',
    desc: 'We provide professionally trained female security personnel for corporate offices, malls, events, and residential societies, ensuring gender-specific security and frisking duties with utmost professionalism.',
    cta: { label: 'VIEW SERVICES', href: '#services' },
    img: 'gallery/security-personnel/female-security-mumbai.jpg',
    badgeText: 'Top Rated Security'
  },
  {
    id: 5,
    highlight: 'SPECIALIZED',
    title: 'EVENT & CROWD MANAGEMENT',
    desc: 'From corporate conferences to large public gatherings, our specialized event security teams handle crowd management, VIP protection, and access control flawlessly.',
    cta: { label: 'CONTACT US', href: '#contact' },
    img: 'gallery/housekeeping/house_keeping.jpeg',
    badgeText: 'Event Experts'
  },
  {
    id: 6,
    highlight: 'PREMIUM',
    title: 'PROFESSIONAL BOUNCERS',
    desc: 'Tough, highly trained male and female bouncers for premium events, VIP protection, clubs, and high-profile gatherings. Ensuring strict access control and absolute safety.',
    cta: { label: 'HIRE BOUNCERS', href: '#contact' },
    img: 'gallery/security-personnel/bouncers-group.jpg',
    badgeText: 'VIP Protection'
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const total = SLIDES.length;

  const goTo = useCallback((index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 350);
  }, [animating]);

  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % total);
    }, 5500);
    return () => clearInterval(timer);
  }, [current, total, goTo]);

  const slide = SLIDES[current];

  const handleCtaClick = (href) => {
    if (href) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-slider">
      {/* Dynamic Background matching reference image */}
      <div className="hs-bg" />

      {/* Slide Content wrapper */}
      <div className={`hs-content-wrap${animating ? ' hs-animating' : ''}`}>
        
        <div className="container hs-layout">
          
          {/* Left Text Column */}
          <div className="hs-text-col">
            <h1 className="hs-main-heading">
              <span className="hs-highlight">{slide.highlight}</span> <br/>
              <span className="hs-white-title">{slide.title}</span>
            </h1>
            <p className="hs-description">
              {slide.desc}
            </p>
            <button className="hs-btn-primary" onClick={() => handleCtaClick(slide.cta.href)}>
              {slide.cta.label}
            </button>
          </div>

          {/* Right Image/Curve Column */}
          <div className="hs-image-col">
            {/* The SVG curve mask for the image */}
            <div className="hs-curve-mask">
              <img src={slide.img} alt={slide.title} className="hs-image" />
              {/* Yellow border overlay (SVG or CSS) */}
              <div className="hs-curve-border"></div>
            </div>

            {/* Trusted Clients Badge overlapping the curve */}
            <div className="hs-trusted-badge">
              <div className="hs-badge-avatars">
                <div className="hs-avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=11)'}}></div>
                <div className="hs-avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=33)'}}></div>
                <div className="hs-avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=47)'}}></div>
              </div>
              <span className="hs-badge-text">{slide.badgeText}</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Nav dots */}
      <div className="hs-nav-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hs-nav-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
