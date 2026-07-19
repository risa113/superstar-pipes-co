import React from 'react';
import { ShieldCheck, MessageSquare, Users2, BadgeCheck, BarChart3, Target, Hammer, Droplet } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

export default function WhyChooseUs() {
  const { companyInfo } = useDatabase();

  // Mapping icons dynamically to whyChooseUs cards
  const getIcon = (id) => {
    switch (id) {
      case 1: return <ShieldCheck size={28} />;
      case 2: return <MessageSquare size={28} />;
      case 3: return <Users2 size={28} />;
      case 4: return <BadgeCheck size={28} />;
      case 5: return <BarChart3 size={28} />;
      default: return <ShieldCheck size={28} />;
    }
  };

  const industries = [
    { name: 'Agriculture & Irrigation', desc: 'Flexible lines for high-volume farm watering systems.', icon: <Droplet size={20} /> },
    { name: 'Chemical Processing', desc: 'Corrosion-proof hoses for acidic fluid conveying.', icon: <Hammer size={20} /> },
    { name: 'Construction & Mining', desc: 'Thunder hose solutions for sand, concrete, and heavy suction.', icon: <Target size={20} /> },
    { name: 'Water & Fluid Utilities', desc: 'Municipal distribution pipelines and steel wire reinforced lines.', icon: <Droplet size={20} /> }
  ];

  return (
    <section id="why-choose-us" className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>
        <p className="subtitle">Delivering Quality &amp; Reliability in Every Industrial Pipeline</p>

        {/* Why Choose Us Cards Grid */}
        <div className="grid grid-3" style={{ marginTop: '3rem' }}>
          {companyInfo.whyChooseUs?.map((item) => (
            <div key={item.id} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              background: 'var(--color-card-bg)',
              position: 'relative',
              borderTop: '4px solid var(--color-secondary)'
            }}>
              <div style={{
                color: 'var(--color-secondary)',
                background: 'rgba(2, 132, 199, 0.05)',
                width: '56px',
                height: '56px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getIcon(item.id)}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Industries We Service Sub-Section */}
        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--color-border)', paddingTop: '4rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
            Industries We Serve
          </h3>
          <p className="subtitle" style={{ marginBottom: '3rem' }}>
            Broad structural solutions customized for high-stress manufacturing sectors
          </p>

          <div className="grid grid-4">
            {industries.map((ind, idx) => (
              <div key={idx} style={{
                background: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  color: 'var(--color-accent)',
                  background: 'var(--color-accent-light)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {ind.icon}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {ind.name}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
