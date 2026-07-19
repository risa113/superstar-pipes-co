import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, Phone, MessageSquare } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

export default function Navbar({ currentView, setCurrentView }) {
  const { companyInfo, isLoggedIn, logout } = useDatabase();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    setCurrentView('client');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
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
    }, 100);
  };

  return (
    <header style={{ 
      background: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.85)',
      boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.05)'
    }}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <div className="logo" onClick={() => handleNavClick('hero')} style={{ cursor: 'pointer' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-secondary)',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}>
            SS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>SUPER STAR</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-secondary)', letterSpacing: '1px' }}>PIPES &amp; CO</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li><a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }} className={currentView === 'client' ? 'active' : ''}>Home</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>Who We Are</a></li>
          <li><a href="#products" onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}>Products</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Services</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a></li>
          
          <li style={{ marginLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1.5rem' }}>
            {currentView === 'admin' ? (
              <button onClick={() => setCurrentView('client')} className="btn btn-outline" style={{ padding: '0.5rem 1rem', color: '#ffffff', borderColor: '#ffffff' }}>
                Go to Website
              </button>
            ) : (
              <button onClick={() => setCurrentView('admin')} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                <LayoutDashboard size={16} />
                {isLoggedIn ? 'Admin Panel' : 'Staff Login'}
              </button>
            )}
          </li>
        </ul>

        {/* Mobile Navigation Trigger */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          background: 'var(--color-primary)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          zIndex: 999,
          animation: 'modal-enter 0.2s ease-out'
        }}>
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }} style={{ fontSize: '1.1rem', color: '#94a3b8' }}>Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} style={{ fontSize: '1.1rem', color: '#94a3b8' }}>Who We Are</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); handleNavClick('products'); }} style={{ fontSize: '1.1rem', color: '#94a3b8' }}>Products</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }} style={{ fontSize: '1.1rem', color: '#94a3b8' }}>Services</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} style={{ fontSize: '1.1rem', color: '#94a3b8' }}>Contact</a>
          
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }}></div>
          
          {currentView === 'admin' ? (
            <button onClick={() => { setCurrentView('client'); setMobileMenuOpen(false); }} className="btn btn-outline" style={{ width: '100%', color: 'white', borderColor: 'white' }}>
              Go to Website
            </button>
          ) : (
            <button onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }} className="btn btn-primary" style={{ width: '100%' }}>
              <LayoutDashboard size={18} />
              {isLoggedIn ? 'Admin Panel' : 'Staff Login'}
            </button>
          )}
        </div>
      )}
    </header>
  );
}
