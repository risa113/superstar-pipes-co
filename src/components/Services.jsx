import React from 'react';
import { Package, HelpCircle, Shield, Milestone } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

export default function Services() {
  const { companyInfo } = useDatabase();

  const getServiceIcon = (id) => {
    switch (id) {
      case 1: return <Package size={30} />;
      case 2: return <Shield size={30} />;
      case 3: return <Milestone size={30} />;
      default: return <Package size={30} />;
    }
  };

  return (
    <section id="services" className="section" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
      <div className="container">
        <h2 className="section-title" style={{ color: 'white' }}>Our Services</h2>
        <p className="subtitle" style={{ color: '#94a3b8' }}>Comprehensive pipeline logistics and custom material supply channels</p>

        <div className="grid grid-3" style={{ marginTop: '3rem' }}>
          {companyInfo.services?.map((service) => (
            <div key={service.id} className="card" style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              padding: '2.5rem'
            }}>
              <div style={{
                color: 'var(--color-secondary)',
                background: 'rgba(2, 132, 199, 0.15)',
                width: '60px',
                height: '60px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(2, 132, 199, 0.2)'
              }}>
                {getServiceIcon(service.id)}
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                {service.title}
              </h3>

              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {service.desc}
              </p>

              <div style={{
                marginTop: 'auto',
                fontSize: '0.85rem',
                color: 'var(--color-secondary)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                PAN India Delivery Available
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
