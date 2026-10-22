import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY, SERVICES } from '../data/siteData';
import { Shield, Building, Factory, Home as HomeIcon, Store, Tent, UserCog, User, Brush, ChevronDown, Info, Images, Briefcase, Phone, MessageCircle } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',       path: '/',           iconName: 'home' },
  { label: 'About',      path: '/about',       iconName: 'info' },
  { label: 'Services',   path: '/services',    iconName: 'shield' },
  { label: 'Industries', path: '/industries',  iconName: 'factory' },
  { label: 'Gallery',    path: '/gallery',     iconName: 'images' },
  { label: 'Careers',    path: '/careers',     iconName: 'briefcase' },
  { label: 'Contact',    path: '/contact',     iconName: 'phone' },
];

function NavIcon({ name }) {
  const props = { size: 15, strokeWidth: 2 };
  switch (name) {
    case 'home':      return <HomeIcon {...props} />;
    case 'info':      return <Info {...props} />;
    case 'shield':    return <Shield {...props} />;
    case 'factory':   return <Factory {...props} />;
    case 'images':    return <Images {...props} />;
    case 'briefcase': return <Briefcase {...props} />;
    case 'phone':     return <Phone {...props} />;
    default:          return null;
  }
}

const LOGO_SRC = 'gallery/logo.png';

const DROPDOWN_ICONS = {
  'security-guards':      <Shield size={20} strokeWidth={2} color="#FFC107" />,
  'corporate-security':   <Building size={20} strokeWidth={2} color="#FFC107" />,
  'industrial-security':  <Factory size={20} strokeWidth={2} color="#FFC107" />,
  'residential-security': <HomeIcon size={20} strokeWidth={2} color="#FFC107" />,
  'commercial-security':  <Store size={20} strokeWidth={2} color="#FFC107" />,
  'event-security':       <Tent size={20} strokeWidth={2} color="#FFC107" />,
  'security-supervisors': <UserCog size={20} strokeWidth={2} color="#FFC107" />,
  'female-guards':        <User size={20} strokeWidth={2} color="#FFC107" />,
  'housekeeping':         <Brush size={20} strokeWidth={2} color="#FFC107" />,
};

const SERVICE_TAGLINES = {
  'security-guards':      '24/7 armed & unarmed personnel for all premises.',
  'corporate-security':   'Access control & visitor management for offices.',
  'industrial-security':  'Protecting factories, warehouses & equipment.',
  'residential-security': 'Gate management for societies & communities.',
  'commercial-security':  'Retail, mall & showroom security experts.',
  'event-security':       'Crowd control for events & conferences.',
  'security-supervisors': 'On-site supervisors ensuring quality & discipline.',
  'female-guards':        'Trained female guards for frisking & escort duty.',
  'housekeeping':         'Professional cleaning & facility management staff.',
};

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close mega-menu when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest('.nav-dropdown-container')) setDropdownOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Reset mobile services dropdown when menu closes
  useEffect(() => {
    if (!menuOpen) {
      setMobileServicesOpen(false);
    }
  }, [menuOpen]);

  // Prevent background scrolling and touchmove gestures when mobile menu is open
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!e.target.closest('.mobile-nav')) {
        e.preventDefault();
      }
    };

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('nav-menu-open');
      document.documentElement.classList.add('nav-menu-open');
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('nav-menu-open');
      document.documentElement.classList.remove('nav-menu-open');
      document.removeEventListener('touchmove', handleTouchMove);
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('nav-menu-open');
      document.documentElement.classList.remove('nav-menu-open');
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
  };

  const waLink = `https://wa.me/${COMPANY.whatsappNumber}?text=Hello+Veer+Security+Service%2C+I+would+like+to+know+more+about+your+professional+security+services.`;

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container navbar-inner">

          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={handleNavClick}>
            <img
              src={LOGO_SRC}
              alt="Veer Security Service Logo"
              className="navbar-logo-icon"
              style={{ borderRadius: '50%', background: '#fff', padding: '2px', objectFit: 'contain' }}
            />
            <div className="navbar-logo-text">
              <span className="navbar-logo-name">Veer Security Service</span>
              <span className="navbar-logo-sub">Professional Security</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="navbar-nav" role="menubar">
            {NAV_LINKS.map(l => {
              if (l.label === 'Services') {
                return (
                  <li key={l.path} role="none" className="nav-dropdown-container">
                    <Link
                      to={l.path}
                      role="menuitem"
                      className={`nav-link${location.pathname === l.path ? ' active' : ''}`}
                      onClick={(e) => {
                        // Toggle dropdown instead of navigating immediately if on desktop, or just navigate?
                        // If they click 'Services', we navigate to /services. 
                        // But let's toggle dropdown on click for mobile/tablet.
                        if (window.innerWidth <= 900) {
                          e.preventDefault();
                          setDropdownOpen(prev => !prev);
                        } else {
                          handleNavClick();
                        }
                      }}
                      onMouseEnter={() => window.innerWidth > 900 && setDropdownOpen(true)}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <NavIcon name={l.iconName} />
                        {l.label}
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        marginLeft: '5px',
                        transition: 'transform 0.25s ease',
                        transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}>
                        <ChevronDown size={14} strokeWidth={2.5} />
                      </span>
                    </Link>

                    {/* ── Mega Menu ── */}
                    <div className={`nav-mega-menu${dropdownOpen ? ' open' : ''}`}>
                      <div className="nav-mega-header">
                        <h4>Our Security &amp; Facility Services</h4>
                        <p>Professional, trained &amp; reliable solutions tailored for every client</p>
                      </div>
                      <div className="nav-mega-grid">
                        {SERVICES.map(svc => (
                          <Link
                            key={svc.id}
                            to={`/services#${svc.id}`}
                            className="nav-mega-item"
                            onClick={() => {
                              setDropdownOpen(false);
                              setMenuOpen(false);
                            }}
                          >
                            <span className="nav-mega-icon">{DROPDOWN_ICONS[svc.id]}</span>
                            <div className="nav-mega-text">
                              <strong>{svc.title}</strong>
                              <span>{SERVICE_TAGLINES[svc.id]}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="nav-mega-footer">
                        <Link
                          to="/contact"
                          onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}
                        >
                          📞 Request a Free Quote &rarr;
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li key={l.path} role="none">
                  <Link
                    to={l.path}
                    role="menuitem"
                    className={`nav-link${location.pathname === l.path ? ' active' : ''}`}
                    onClick={handleNavClick}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <NavIcon name={l.iconName} />
                      {l.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="navbar-actions">
            <a href={COMPANY.phoneHref} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={16} strokeWidth={2.5} color="#ef5350" /> Call Now
            </a>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#25D366', color: '#fff', border: 'none' }}>
              <MessageCircle size={16} strokeWidth={2.5} /> WhatsApp
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`} 
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile menu */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        <ul className="mobile-nav-links">
          {NAV_LINKS.map(l => {
            if (l.label === 'Services') {
              return (
                <li key={l.path} className="mobile-nav-item-dropdown">
                  <div
                    className={`nav-link mobile-nav-dropdown-btn${mobileServicesOpen ? ' open' : ''}`}
                    onClick={() => setMobileServicesOpen(prev => !prev)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={mobileServicesOpen}
                    aria-label="Toggle Services dropdown"
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <NavIcon name={l.iconName} />
                      {l.label}
                    </span>
                    <span
                      className="mobile-nav-arrow"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: mobileServicesOpen ? 'var(--yellow, #FFC107)' : 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      <ChevronDown size={18} strokeWidth={2.4} />
                    </span>
                  </div>

                  {/* Mobile Services Accordion Submenu */}
                  {mobileServicesOpen && (
                    <div className="mobile-services-accordion">
                      <div className="mobile-services-grid">
                        {SERVICES.map(svc => (
                          <Link
                            key={svc.id}
                            to={`/services#${svc.id}`}
                            className="mobile-service-sublink"
                            onClick={() => {
                              setMenuOpen(false);
                              setMobileServicesOpen(false);
                              if (location.pathname === '/services') {
                                window.location.hash = svc.id;
                              }
                            }}
                          >
                            <span className="mobile-service-subicon">
                              {DROPDOWN_ICONS[svc.id] || <Shield size={18} color="#FFC107" />}
                            </span>
                            <div className="mobile-service-subtext">
                              <span className="mobile-service-subtitle">{svc.title}</span>
                              <span className="mobile-service-subdesc">{SERVICE_TAGLINES[svc.id]}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link
                        to="/services"
                        className="mobile-services-all-link"
                        onClick={() => {
                          setMenuOpen(false);
                          setMobileServicesOpen(false);
                        }}
                      >
                        <span>View All Services Page</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="nav-link"
                  onClick={handleNavClick}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <NavIcon name={l.iconName} />
                    {l.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mobile-nav-contact">
          <a href={COMPANY.phoneHref} className="btn mobile-contact-btn mobile-call-btn">
            <Phone size={17} strokeWidth={2.2} /> Contact Us
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn mobile-contact-btn mobile-wa-btn">
            <MessageCircle size={17} strokeWidth={2.2} /> WhatsApp Us
          </a>

          {/* Follow Us Social Icons */}
          <div className="mobile-social-section">
            <div className="mobile-social-title">
              <span className="mobile-social-bar"></span>
              <span>FOLLOW US</span>
            </div>
            <div className="mobile-social-icons">
              {COMPANY.social?.facebook && (
                <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" className="mobile-social-btn" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {COMPANY.social?.instagram && (
                <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" className="mobile-social-btn" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
              {COMPANY.social?.youtube && (
                <a href={COMPANY.social.youtube} target="_blank" rel="noopener noreferrer" className="mobile-social-btn" aria-label="YouTube">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {COMPANY.email && (
                <a href={COMPANY.emailHref} className="mobile-social-btn" aria-label="Email Us">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
