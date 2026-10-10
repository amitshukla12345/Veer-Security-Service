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

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
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

      {/* Mobile menu */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        <ul className="mobile-nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`nav-link${location.pathname === l.path ? ' active' : ''}`}
                onClick={handleNavClick}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <NavIcon name={l.iconName} />
                  {l.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-contact">
          <a href={COMPANY.phoneHref} className="btn btn-primary" style={{ width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Phone size={18} strokeWidth={2.5} /> {COMPANY.phone}
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: '#fff', border: 'none' }}>
            <MessageCircle size={18} strokeWidth={2.5} /> WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}
