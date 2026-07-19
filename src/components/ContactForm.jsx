import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

export default function ContactForm({ prefilledProduct, clearPrefilledProduct }) {
  const { companyInfo, addInquiry } = useDatabase();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Hook to handle pre-filled product when clicked from catalog
  useEffect(() => {
    if (prefilledProduct) {
      setProduct(prefilledProduct);
    }
  }, [prefilledProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !product) {
      alert('Please fill out Name, Phone and select a Product.');
      return;
    }

    const inquiryData = {
      name,
      phone,
      product,
      quantity: quantity || 'Not specified',
      message: message || 'Urgent inquiry.'
    };

    // Save to Local Database (so Admin can review)
    addInquiry(inquiryData);

    // Build the WhatsApp formatted message
    const waBaseUrl = `https://wa.me/${companyInfo.whatsapp.replace('+', '')}`;
    const textMessage = `*NEW INQUIRY - SUPER STAR PIPES & CO*
---------------------------------------
👤 *Client Name:* ${name}
📞 *Phone:* ${phone}
📦 *Product:* ${product}
📏 *Quantity:* ${quantity || 'Not specified'}
✉️ *Requirements:* ${message || 'Looking for pricing and delivery details.'}
---------------------------------------
_Sent via Super Star Pipes web inquiry portal_`;

    const encodedText = encodeURIComponent(textMessage);
    const waRedirectUrl = `${waBaseUrl}?text=${encodedText}`;

    // Show success state
    setSubmitted(true);
    clearPrefilledProduct();

    // Trigger WhatsApp Redirect after a short delay so the user sees the success state
    setTimeout(() => {
      window.open(waRedirectUrl, '_blank');
      // Reset form fields
      setName('');
      setPhone('');
      setProduct('');
      setQuantity('');
      setMessage('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="subtitle">Send us an inquiry or visit our industrial plant for bulk orders</p>

        <div className="grid grid-2" style={{ marginTop: '3rem', alignItems: 'stretch' }}>
          {/* Contact Details & Map Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                Contact Information
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <MapPin className="text-gradient" style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>Registered Factory Address</h4>
                  <p style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1rem' }}>
                    {companyInfo.address}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Phone className="text-gradient" style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>Phone / WhatsApp Contact</h4>
                  <p style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                    {companyInfo.phone} (Mr. Noorudeen)
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Mail className="text-gradient" style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>Email Address</h4>
                  <p style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                    {companyInfo.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Iframe Google Map */}
            <div style={{
              flexGrow: 1,
              minHeight: '280px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--border-radius)',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'var(--shadow-md)'
            }}>
              <iframe 
                src={companyInfo.mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '280px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Super Star Pipes SIPCOT Gangaikondan Tirunelveli"
              ></iframe>
            </div>
            
            {/* Direct share link button */}
            <a 
              href={companyInfo.mapShareLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline" 
              style={{ alignSelf: 'flex-start', padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
            >
              <MapPin size={16} /> Open in Google Maps App
            </a>
          </div>

          {/* Inquiry Form Column */}
          <div className="card" style={{
            background: 'var(--color-bg-light)',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <CheckCircle2 size={60} style={{ color: 'var(--color-success)' }} />
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>Inquiry Submitted!</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '400px' }}>
                  Your details have been saved successfully to our system. Redirecting you to **Mr. Noorudeen** on WhatsApp to complete your request...
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#25d366',
                  fontWeight: 600,
                  marginTop: '1.5rem',
                  fontSize: '0.9rem'
                }}>
                  <MessageSquare size={18} /> Connecting to WhatsApp Web
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                  Send Bulk Inquiry
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Fill out the form below. Our managers will log your request and contact you directly.
                </p>

                {/* Name Input */}
                <div className="form-group">
                  <label htmlFor="name">Full Name <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                  <input 
                    type="text" 
                    id="name"
                    className="form-control"
                    placeholder="e.g. Rajesh Kumar" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="form-group">
                  <label htmlFor="phone">Phone Number <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                  <input 
                    type="tel" 
                    id="phone"
                    className="form-control"
                    placeholder="e.g. +91 9876543210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                {/* Product Select */}
                <div className="form-group">
                  <label htmlFor="product">Select Product <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                  <select 
                    id="product"
                    className="form-control"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Hoses/Pipes --</option>
                    <option value="Suction Hose">Suction Hose</option>
                    <option value="Braided Hose">Braided Hose</option>
                    <option value="Industrial Hose">Industrial Hose</option>
                    <option value="PVC Thunder Hose Pipe">PVC Thunder Hose Pipe</option>
                    <option value="PVC Steel Wire Reinforced Hose Pipe">PVC Steel Wire Reinforced Hose Pipe</option>
                    <option value="Other / Raw Materials">Other / Raw Materials</option>
                  </select>
                </div>

                {/* Quantity Input */}
                <div className="form-group">
                  <label htmlFor="quantity">Quantity Required</label>
                  <input 
                    type="text" 
                    id="quantity"
                    className="form-control"
                    placeholder="e.g. 500 Meters, 100 Coils" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {/* Message Input */}
                <div className="form-group">
                  <label htmlFor="message">Requirement Details</label>
                  <textarea 
                    id="message"
                    className="form-control"
                    placeholder="Describe specific diameters, color preferences, pressure requirements, or custom delivery address..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.9rem' }}>
                  <Send size={18} /> Submit &amp; Reply on WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
