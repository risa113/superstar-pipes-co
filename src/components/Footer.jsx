import React from 'react';
import { Mail, Phone, MapPin, ShieldAlert, Award } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

export default function Footer() {
  const { companyInfo } = useDatabase();

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer style={{
      background: 'var(--color-primary)',
      color: '#94a3b8',
      padding: '4rem 0 2rem',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Logo & About summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ffffff' }}>
              <div style={{
                background: 'var(--color-secondary)',
                color: 'white',
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                SS
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>SUPER STAR PIPES &amp; CO</h3>
            </div>
            
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#64748b' }}>
              B-105, SIPCOT Industrial Park, Gangaikondan-based dynamic industrial hose manufacturers. Known for precision extrusion and high-reliability bulk supply pipelines.
            </p>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#d97706',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              <Award size={16} /> PAN INDIA DISPATCH
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); handleScrollTo('hero'); }} style={{ color: '#64748b' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>Home / Top</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleScrollTo('about'); }} style={{ color: '#64748b' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>Who We Are</a></li>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); handleScrollTo('products'); }} style={{ color: '#64748b' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>Products</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleScrollTo('services'); }} style={{ color: '#64748b' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>Services</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }} style={{ color: '#64748b' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>Inquiries / Map</a></li>
            </ul>
          </div>

          {/* Contacts & GSTIN */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Corporate Details</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <span>{companyInfo.address}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--color-secondary)' }} />
                <span>{companyInfo.phone}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--color-secondary)' }} />
                <span>{companyInfo.email}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                <ShieldAlert size={18} style={{ color: 'var(--color-accent)' }} />
                <span style={{ color: '#ffffff', fontWeight: 600 }}>GSTIN: <span style={{ color: 'var(--color-accent)' }}>{companyInfo.gstin}</span></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Bottom line */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} Super Star Pipes &amp; Co. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Managing Partner: {companyInfo.partner}</span>
            <span>Tirunelveli, Tamil Nadu</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
