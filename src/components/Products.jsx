import React, { useState } from 'react';
import { Eye, MessageCircle, FileText, Check } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

export default function Products({ onSelectProductForInquiry }) {
  const { products } = useDatabase();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories extraction
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleInquire = (productName) => {
    onSelectProductForInquiry(productName);
    const element = document.getElementById('contact');
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
    <section id="products" className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <h2 className="section-title">Our Product Range</h2>
        <p className="subtitle">Premium PVC and reinforced industrial hoses engineered for excellence</p>

        {/* Filter Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          margin: '2rem 0 3rem'
        }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className="btn"
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.9rem',
                borderRadius: '20px',
                background: activeCategory === cat ? 'var(--color-secondary)' : '#f1f5f9',
                color: activeCategory === cat ? '#ffffff' : 'var(--color-text-muted)',
                boxShadow: 'none',
                border: activeCategory === cat ? 'none' : '1px solid var(--color-border)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              height: '100%',
              background: '#ffffff',
              borderRadius: 'var(--border-radius)'
            }}>
              {/* Product Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '220px',
                background: '#f1f5f9',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(15, 23, 42, 0.85)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {product.category}
                </span>
              </div>

              {/* Product Body */}
              <div style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                gap: '0.75rem'
              }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {product.name}
                </h3>
                
                {/* Pricing amount display */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                    ₹{product.price}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    / {product.unit}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', background: '#ecfdf5', padding: '0.1rem 0.4rem', borderRadius: '4px', marginLeft: '0.5rem', fontWeight: 600 }}>
                    Best Rate
                  </span>
                </div>

                <p style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flexGrow: 1
                }}>
                  {product.description}
                </p>

                {/* Card Actions */}
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginTop: '1rem',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '1.25rem'
                }}>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="btn btn-outline" 
                    style={{ flex: 1, padding: '0.6rem 0.5rem', fontSize: '0.85rem', borderWidth: '1px' }}
                  >
                    <Eye size={16} /> Specs
                  </button>
                  <button 
                    onClick={() => handleInquire(product.name)}
                    className="btn btn-primary" 
                    style={{ flex: 1.5, padding: '0.6rem 0.5rem', fontSize: '0.85rem' }}
                  >
                    <MessageCircle size={16} /> Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Specifications Modal Overlay */}
        {selectedProduct && (
          <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {/* Left Side: Product preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)'
                  }}>
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {selectedProduct.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)' }}>₹{selectedProduct.price}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>/ {selectedProduct.unit}</span>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Right Side: Specifications Table */}
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                    <FileText size={18} style={{ color: 'var(--color-secondary)' }} /> Technical Specifications
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedProduct.specs && Object.entries(selectedProduct.specs).map(([key, val], idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0',
                        borderBottom: '1px dashed var(--color-border)',
                        fontSize: '0.9rem'
                      }}>
                        <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>{key}</span>
                        <span style={{ fontWeight: 500, color: 'var(--color-primary)', textAlign: 'right' }}>{val}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      handleInquire(selectedProduct.name);
                      setSelectedProduct(null);
                    }}
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: '2rem' }}
                  >
                    <MessageCircle size={18} /> Request Bulk Quote Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
