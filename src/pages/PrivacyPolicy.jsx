import React from 'react';
import { COMPANY } from '../data/siteData';

export default function PrivacyPolicy() {
  return (
    <div className="section-py" style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container">
        <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '20px', fontFamily: 'var(--font-display)' }}>Privacy Policy</h1>
        <div style={{ background: 'var(--navy-card)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
          
          <h2 style={{ color: 'var(--yellow)', fontSize: '1.4rem', marginTop: '30px', marginBottom: '10px' }}>1. Information We Collect</h2>
          <p>When you use our forms to contact us, apply for a job, or request a quote, we collect personal information such as your Name, Mobile Number, Email Address, and Location. This information is submitted voluntarily by you.</p>
          
          <h2 style={{ color: 'var(--yellow)', fontSize: '1.4rem', marginTop: '30px', marginBottom: '10px' }}>2. How We Use Your Information</h2>
          <p>We use your information strictly to respond to your inquiries, provide the requested security services, or evaluate job applications. We do not sell, rent, or share your personal data with third-party marketers or unauthorized entities.</p>

          <h2 style={{ color: 'var(--yellow)', fontSize: '1.4rem', marginTop: '30px', marginBottom: '10px' }}>3. Data Security and Protection</h2>
          <p>We implement standard security measures to protect the information you submit. All forms are protected by Web3Forms configuration and anti-spam protocols to ensure your data is transmitted securely to our team.</p>

          <h2 style={{ color: 'var(--yellow)', fontSize: '1.4rem', marginTop: '30px', marginBottom: '10px' }}>4. Cookies and Tracking</h2>
          <p>Our website may use basic cookies to enhance user experience and analyze traffic. These do not store personally identifiable information.</p>

          <h2 style={{ color: 'var(--yellow)', fontSize: '1.4rem', marginTop: '30px', marginBottom: '10px' }}>5. Contact Us</h2>
          <p>If you have any questions regarding this privacy policy or wish to have your data removed, please contact us at:</p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
            <li><strong>Email:</strong> {COMPANY.email}</li>
            <li><strong>Phone:</strong> {COMPANY.phone}</li>
            <li><strong>Address:</strong> {COMPANY.address}</li>
          </ul>

        </div>
      </div>
    </div>
  );
}
