import React from 'react';
import { User, MapPin, BadgePercent, Shield, Globe } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

export default function AboutUs() {
  const { companyInfo } = useDatabase();

  return (
    <section id="about" className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <h2 className="section-title">Who We Are</h2>
        <p className="subtitle">Super Star Pipes &amp; Co - Trusted Industrial Hose Manufacturers</p>

        {/* Top Section: Factory Image & Description */}
        <div className="grid grid-2" style={{ alignItems: 'stretch', marginTop: '3rem', gap: '3rem' }}>
          {/* Left Column: Factory Image Presentation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ 
              position: 'relative', 
              borderRadius: 'var(--border-radius)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
              height: '100%',
              minHeight: '280px',
              backgroundColor: '#f1f5f9'
            }}>
              <img 
                src="/factory.jpg" 
                alt="Super Star Pipes & Co Factory - Gangaikondan SIPCOT" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  display: 'block', 
                  transition: 'transform 0.5s ease' 
                }} 
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'} 
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} 
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 70%, transparent 100%)', 
                padding: '2rem 1.5rem 1.5rem', 
                color: 'white' 
              }}>
                <span style={{
                  background: 'var(--color-secondary)',
                  color: 'white',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  marginBottom: '0.5rem'
                }}>
                  Manufacturing Unit
                </span>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                  Super Star Pipes &amp; Co
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#e2e8f0', marginTop: '0.25rem' }}>
                  B-105, SIPCOT Industrial Park, Gangaikondan, Tirunelveli
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Company Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.3 }}>
              Dedicated to Industrial Pipelines &amp; Raw Material Distribution
            </h3>
            
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              {companyInfo.aboutText}
            </p>

            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Established inside the state-of-the-art SIPCOT Industrial Park in Gangaikondan, Tirunelveli, we represent reliability in bulk hose supplies. Our operations strictly align with national standards to deliver robust, high-performance fittings for demanding chemical, agricultural, and mineral-conveying industries across the Indian sub-continent.
            </p>

            {/* Core Values Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={16} />
                </div>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Quality Assured Manufacturing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe size={16} />
                </div>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>PAN India Logistics Fulfillment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Credentials Card */}
        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{
            background: 'var(--color-bg-light)',
            border: '1px solid var(--color-border)',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '850px'
          }}>
            {/* Visual decoration overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, transparent 50%, var(--color-secondary) 50%)',
              opacity: 0.05
            }}></div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              Official Credentials &amp; Address Details
            </h3>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '2rem' 
            }}>
              {/* Partner Name */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ color: 'var(--color-secondary)', marginTop: '0.2rem' }}>
                  <User size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Managing Partner</h4>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>{companyInfo.partner}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{companyInfo.phone}</p>
                </div>
              </div>

              {/* Company Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ color: 'var(--color-secondary)', marginTop: '0.2rem' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Factory Location</h4>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)', lineHeight: 1.4 }}>
                    {companyInfo.address}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', fontWeight: 600, marginTop: '0.25rem' }}>
                    Tirunelveli, Tamil Nadu, India
                  </p>
                </div>
              </div>

              {/* GSTIN Details */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ color: 'var(--color-secondary)', marginTop: '0.2rem' }}>
                  <BadgePercent size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>GSTIN Registration</h4>
                  <span style={{ 
                    display: 'inline-block',
                    background: 'var(--color-accent-light)',
                    color: '#92400e',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                    border: '1px solid #fde68a',
                    marginTop: '0.25rem'
                  }}>
                    {companyInfo.gstin}
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, marginTop: '0.5rem' }}>
                    🚛 PAN INDIA DELIVERY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
