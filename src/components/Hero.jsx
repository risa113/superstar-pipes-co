import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Factory } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';
import factoryPhoto from '../assets/hero.png';

export default function Hero() {
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
    <section id="hero" style={{
      position: 'relative',
      minHeight: '95vh',
      display: 'flex',
      alignItems: 'center',
      background: 'radial-gradient(circle at top right, rgba(2, 132, 199, 0.15), transparent), linear-gradient(135deg, #090d16 0%, #0f172a 100%)',
      color: 'white',
      paddingTop: '80px',
      overflow: 'hidden'
    }}>
      {/* Decorative Blueprint Background Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }}></div>

      {/* Large Abstract Glowing Circle */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.2) 0%, transparent 70%)',
        top: '10%',
        right: '-10%',
        pointerEvents: 'none',
        borderRadius: '50%'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-grid">
          {/* Text Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Dynamic Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(2, 132, 199, 0.1)',
              border: '1px solid rgba(2, 132, 199, 0.3)',
              color: 'var(--color-secondary)',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              alignSelf: 'flex-start'
            }}>
              <Truck size={14} /> PAN India Delivery &amp; Supply
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-1px'
            }}>
              Super Star <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Pipes &amp; Co
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              color: '#94a3b8',
              maxWidth: '550px',
              fontWeight: 400
            }}>
              {companyInfo.tagline}. SIPCOT Industrial Park, Gangaikondan based manufacturers and distributors of high-quality industrial hoses and PVC solutions.
            </p>

            {/* CTA Buttons */}
            <div className="hero-actions">
              <button onClick={() => handleScrollTo('products')} className="btn btn-primary">
                View Catalog
                <ArrowRight size={18} />
              </button>
              <button onClick={() => handleScrollTo('contact')} className="btn btn-outline">
                Send Inquiry
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="hero-stats">
              <div className="hero-stat">
                <h3>100%</h3>
                <p>High Quality Materials</p>
              </div>
              <div className="hero-stat">
                <h3 style={{ color: 'var(--color-accent)' }}>PAN</h3>
                <p>India Logistics network</p>
              </div>
              <div className="hero-stat">
                <h3>SIPCOT</h3>
                <p>Gangaikondan Facility</p>
              </div>
            </div>
          </div>

          {/* Visual Graphics Area */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '420px'
          }}>
            {/* Factory Photo */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '28px',
              overflow: 'hidden',
              opacity: 0.08,
              pointerEvents: 'none'
            }}>
              <img
                src={factoryPhoto}
                alt="Factory Photo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.4) contrast(1.1)'
                }}
              />
            </div>

            {/* Visual Glassmorphism Box */}
            <div className="glass-card" style={{
              position: 'relative',
              width: '100%',
              maxWidth: '450px',
              height: '350px',
              padding: '2.5rem',
              border: '1px solid rgba(56, 189, 248, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7), 0 0 60px rgba(2, 132, 199, 0.08)'
            }}>
              <div>
                <Factory size={40} style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.4))' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: '#ffffff', letterSpacing: '-0.02em', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
                  Industrial Strength Hoses
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.65', fontWeight: 400 }}>
                  Specially formulated pipelines for conveying abrasive slurries, high pressure gases, industrial raw materials, and water resources under high stress.
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.85rem',
                color: '#e2e8f0',
                background: 'rgba(56, 189, 248, 0.08)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                fontWeight: 500
              }}>
                <ShieldCheck size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                ISO Standards &amp; Heavy-Duty Structural Rating
              </div>
            </div>

            {/* Glowing accents around the box */}
            <div style={{
              position: 'absolute',
              width: '80px',
              height: '80px',
              background: 'var(--color-accent)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              top: '-10px',
              left: '10px',
              opacity: 0.5,
              zIndex: -1
            }}></div>
            <div style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              background: 'var(--color-secondary)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              bottom: '-20px',
              right: '20px',
              opacity: 0.6,
              zIndex: -1
            }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
