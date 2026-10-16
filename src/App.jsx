import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar       from './components/Navbar';
import Footer       from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CallButton   from './components/CallButton';

// Pages / Components
import HomePage     from './pages/HomePage';
import About        from './components/About';
import Services     from './components/Services';
import Industries   from './components/Industries';
import Training     from './components/Training';
import Gallery      from './components/Gallery';
import Careers      from './components/Careers';
import Contact      from './components/Contact';
import FAQ          from './components/FAQ';
import QuoteForm    from './components/QuoteForm';
import WhyChooseUs  from './components/WhyChooseUs';
import PrivacyPolicy from './pages/PrivacyPolicy';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<><About /><WhyChooseUs /></>} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/training" element={<Training />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<><Contact /><FAQ /><QuoteForm /></>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
      {/* Floating & mobile contact UI */}
      <WhatsAppButton />
      <CallButton />
    </>
  );
}
