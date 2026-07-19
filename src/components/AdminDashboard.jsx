import React, { useState, useEffect } from 'react';
import { 
  Lock, LayoutDashboard, Package, Inbox, Edit3, Settings, LogOut, 
  Plus, Edit, Trash2, Check, RefreshCw, Download, Upload, Eye, EyeOff, MessageSquare
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

export default function AdminDashboard() {
  const {
    loading: dbLoading, companyInfo, products, inquiries, isLoggedIn, login, logout, changePassword,
    addProduct, updateProduct, deleteProduct, deleteInquiry, markInquiryRead,
    updateCompanyInfo, resetDatabase
  } = useDatabase();

  const [activeTab, setActiveTab] = useState('overview');
  
  // Login UI State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Product Modals & Forms State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null); // null means adding new product
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState('');
  
  // Product Form Fields
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodUnit, setProdUnit] = useState('Meter');
  const [prodCategory, setProdCategory] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodSpecs, setProdSpecs] = useState([{ key: '', val: '' }]);

  // Company Content Forms State
  const [compName, setCompName] = useState(companyInfo.name);
  const [compTagline, setCompTagline] = useState(companyInfo.tagline);
  const [compPartner, setCompPartner] = useState(companyInfo.partner);
  const [compAddress, setCompAddress] = useState(companyInfo.address);
  const [compGstin, setCompGstin] = useState(companyInfo.gstin);
  const [compPhone, setCompPhone] = useState(companyInfo.phone);
  const [compWhatsapp, setCompWhatsapp] = useState(companyInfo.whatsapp);
  const [compEmail, setCompEmail] = useState(companyInfo.email);
  const [compAboutText, setCompAboutText] = useState(companyInfo.aboutText);
  const [compMapEmbed, setCompMapEmbed] = useState(companyInfo.mapEmbedUrl);
  const [compMapShare, setCompMapShare] = useState(companyInfo.mapShareLink);
  
  const [infoLoading, setInfoLoading] = useState(false);
  const [infoError, setInfoError] = useState('');
  const [contentSaved, setContentSaved] = useState(false);

  // Settings UI State
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [passMessage, setPassMessage] = useState({ text: '', type: '' });
  
  const [resetLoading, setResetLoading] = useState(false);
  const [inquiryActionId, setInquiryActionId] = useState(null); // tracking row loading

  // Sync company form fields whenever companyInfo is refreshed from the database
  useEffect(() => {
    setCompName(companyInfo.name || '');
    setCompTagline(companyInfo.tagline || '');
    setCompPartner(companyInfo.partner || '');
    setCompAddress(companyInfo.address || '');
    setCompGstin(companyInfo.gstin || '');
    setCompPhone(companyInfo.phone || '');
    setCompWhatsapp(companyInfo.whatsapp || '');
    setCompEmail(companyInfo.email || '');
    setCompAboutText(companyInfo.aboutText || '');
    setCompMapEmbed(companyInfo.mapEmbedUrl || '');
    setCompMapShare(companyInfo.mapShareLink || '');
  }, [companyInfo]);

  // Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const success = await login(passwordInput);
      if (success) {
        setPasswordInput('');
        setLoginError('');
      } else {
        setLoginError('Invalid Administrator Passcode');
      }
    } catch (err) {
      setLoginError(err.message || 'Failed to authenticate. Check internet or project keys.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Convert File upload to Base64 data URL
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProdImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Specs Dynamic Array Methods
  const addSpecField = () => {
    setProdSpecs([...prodSpecs, { key: '', val: '' }]);
  };

  const removeSpecField = (index) => {
    setProdSpecs(prodSpecs.filter((_, idx) => idx !== index));
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...prodSpecs];
    updated[index][field] = value;
    setProdSpecs(updated);
  };

  // Product Modal Submit (Add or Edit)
  const openAddProductModal = () => {
    setEditingProductId(null);
    setProdName('');
    setProdDesc('');
    setProdPrice('');
    setProdUnit('Meter');
    setProdCategory('PVC Hoses');
    setProdImage('');
    setProdSpecs([
      { key: 'Material', val: 'Premium PVC' },
      { key: 'Sizes Available', val: '1" to 4"' },
      { key: 'Working Pressure', val: '8 Bar' }
    ]);
    setModalError('');
    setModalSuccess(false);
    setShowProductModal(true);
  };

  const openEditProductModal = (product) => {
    setEditingProductId(product.id);
    setProdName(product.name);
    setProdDesc(product.description);
    setProdPrice(product.price);
    setProdUnit(product.unit);
    setProdCategory(product.category);
    setProdImage(product.image);
    
    // Map object specs to array
    const specsArray = product.specs 
      ? Object.entries(product.specs).map(([key, val]) => ({ key, val }))
      : [{ key: '', val: '' }];
    setProdSpecs(specsArray);
    
    setModalError('');
    setModalSuccess(false);
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodCategory) {
      alert('Product Name, Price, and Category are required.');
      return;
    }

    setModalLoading(true);
    setModalError('');
    setModalSuccess(false);

    // Convert specs array back to object
    const specsObj = {};
    prodSpecs.forEach(spec => {
      if (spec.key.trim()) {
        specsObj[spec.key.trim()] = spec.val.trim();
      }
    });

    const productData = {
      name: prodName,
      description: prodDesc,
      price: parseFloat(prodPrice),
      unit: prodUnit,
      category: prodCategory,
      image: prodImage || '',
      specs: specsObj
    };

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, productData);
      } else {
        await addProduct(productData);
      }
      setModalSuccess(true);
      setTimeout(() => {
        setShowProductModal(false);
        setModalSuccess(false);
      }, 1500);
    } catch (err) {
      setModalError(err.message || 'Failed to save product in cloud database.');
    } finally {
      setModalLoading(false);
    }
  };

  // Delete product wrapper
  const handleDeleteProduct = async (id, name) => {
    if (confirm(`Are you sure you want to delete product "${name}"?`)) {
      try {
        await deleteProduct(id);
      } catch (err) {
        alert('Failed to delete product: ' + err.message);
      }
    }
  };

  // Company Details Form submit
  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setInfoLoading(true);
    setInfoError('');
    setContentSaved(false);
    try {
      await updateCompanyInfo({
        name: compName,
        tagline: compTagline,
        partner: compPartner,
        address: compAddress,
        gstin: compGstin,
        phone: compPhone,
        whatsapp: compWhatsapp,
        email: compEmail,
        aboutText: compAboutText,
        mapEmbedUrl: compMapEmbed,
        mapShareLink: compMapShare
      });
      setContentSaved(true);
      setTimeout(() => setContentSaved(false), 3000);
    } catch (err) {
      setInfoError(err.message || 'Failed to update company info.');
    } finally {
      setInfoLoading(false);
    }
  };

  // Password update
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setPassMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    if (newPass.length < 5) {
      setPassMessage({ text: 'Password must be at least 5 characters long', type: 'error' });
      return;
    }
    setPassLoading(true);
    setPassMessage({ text: '', type: '' });
    try {
      await changePassword(newPass);
      setNewPass('');
      setConfirmPass('');
      setPassMessage({ text: 'Password updated successfully!', type: 'success' });
      setTimeout(() => setPassMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setPassMessage({ text: err.message || 'Failed to update password.', type: 'error' });
    } finally {
      setPassLoading(false);
    }
  };

  // Wipe database
  const handleWipeDatabase = async () => {
    if (confirm('CRITICAL: Wiping database will restore default product lines, clear inquiries, and reset site texts. Proceed?')) {
      setResetLoading(true);
      try {
        await resetDatabase();
        alert('Database has been reset to defaults.');
      } catch (err) {
        alert('Failed to reset database: ' + err.message);
      } finally {
        setResetLoading(false);
      }
    }
  };

  // Mark inquiry read helper
  const handleMarkInquiryRead = async (id) => {
    setInquiryActionId(id);
    try {
      await markInquiryRead(id);
    } catch (err) {
      alert('Error updating inquiry: ' + err.message);
    } finally {
      setInquiryActionId(null);
    }
  };

  // Delete inquiry helper
  const handleDeleteInquiry = async (id) => {
    if (confirm('Delete inquiry record?')) {
      setInquiryActionId(id);
      try {
        await deleteInquiry(id);
      } catch (err) {
        alert('Error deleting inquiry: ' + err.message);
      } finally {
        setInquiryActionId(null);
      }
    }
  };

  // Inquiry WhatsApp reply helper
  const handleInquiryWhatsAppReply = async (inq) => {
    setInquiryActionId(inq.id);
    try {
      const cleanNum = inq.phone.replace(/[^0-9]/g, '');
      const waPhone = cleanNum.startsWith('91') ? cleanNum : `91${cleanNum}`;
      const textMsg = `Hello ${inq.name}, this is Super Star Pipes & Co. We received your inquiry regarding our product: *${inq.product}* (${inq.quantity}). We are processing your request. Please let us know your convenient time for a call. Thank you!`;
      const redirectUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(textMsg)}`;
      
      await markInquiryRead(inq.id);
      window.open(redirectUrl, '_blank');
    } finally {
      setInquiryActionId(null);
    }
  };

  /* RENDER LOGIN VIEW IF NOT LOGGED IN */
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #090d16 0%, #0f172a 100%)',
        color: 'white',
        padding: '1.5rem'
      }}>
        <div className="glass-card admin-login-card" style={{
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(2, 132, 199, 0.1)',
            color: 'var(--color-secondary)',
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Lock size={32} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            Super Star Admin Access
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
            Enter your management passcode to access products CRUD database &amp; inquiries.
          </p>

          <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="pass" style={{ color: '#94a3b8' }}>Passcode</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="pass"
                  className="form-control"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    paddingRight: '3rem'
                  }}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loginLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '1rem',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: 'var(--color-danger)',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginBottom: '1.5rem',
                fontWeight: 500,
                textAlign: 'left',
                lineHeight: '1.4'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>⚠️ Authentication Error:</div>
                <div>{loginError}</div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid rgba(239, 68, 68, 0.2)', paddingTop: '0.5rem' }}>
                  <b>How to resolve:</b> Go to your Supabase Project &gt; <b>Authentication</b> tab, click <b>Add User</b> &gt; <b>Create User</b>, and add the email <b>superstarpipesandco@gmail.com</b> with password <b>superstar@123</b>.
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem' }} disabled={loginLoading}>
              {loginLoading ? 'Authenticating...' : 'Authenticate Control Panel'}
            </button>
          </form>
          
          <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#475569' }}>
            Super Star Pipes &amp; Co • Gangaikondan Facility Portal
          </div>
        </div>
      </div>
    );
  }

  /* RENDER AUTHENTICATED ADMIN LAYOUT */
  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: 'var(--color-secondary)',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>
              SS
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', letterSpacing: '0.5px' }}>
              STAFF PANEL
            </h2>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <li 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} />
            <span>Manage Products</span>
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <Inbox size={20} />
            <span>Inquiries ({inquiries.filter(i => !i.read).length})</span>
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            <Edit3 size={20} />
            <span>Edit Page Content</span>
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            <span>System Settings</span>
          </li>
        </nav>

        <div className="admin-sidebar-footer">
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>
            Logged in: <b>{companyInfo.partner}</b>
          </div>
          <button onClick={logout} className="btn btn-danger" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="admin-main">
        {/* Header section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--admin-border)',
          paddingBottom: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-heading)' }}>
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'products' && 'Product Database (CRUD)'}
              {activeTab === 'inquiries' && 'Customer Inquiries'}
              {activeTab === 'content' && 'Live Content Editor'}
              {activeTab === 'settings' && 'System Configuration'}
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Management system for Super Star Pipes &amp; Co, Tirunelveli SIPCOT.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {dbLoading ? (
              <span style={{ fontSize: '0.8rem', background: '#d9770615', border: '1px solid #d9770640', color: 'var(--color-accent)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: 600 }}>
                🔄 Connecting...
              </span>
            ) : (
              <span style={{ fontSize: '0.8rem', background: '#10b98115', border: '1px solid #10b98140', color: 'var(--color-success)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: 600 }}>
                🟢 Real-time Sync Active
              </span>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. OVERVIEW TAB */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div>
            {/* Stat Counters Grid */}
            <div className="admin-stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><Package size={24} /></div>
                <div>
                  <div className="stat-value">{products.length}</div>
                  <div className="stat-label">Total Products</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(217, 119, 6, 0.1)', color: 'var(--color-accent)' }}><Inbox size={24} /></div>
                <div>
                  <div className="stat-value">{inquiries.length}</div>
                  <div className="stat-label">Total Inquiries</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' }}><Inbox size={24} /></div>
                <div>
                  <div className="stat-value">{inquiries.filter(i => !i.read).length}</div>
                  <div className="stat-label">Unread Inquiries</div>
                </div>
              </div>
            </div>

            {/* Quick overview of latest Inquiries */}
            <div className="admin-card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>
                Recent Inquiries
              </h3>
              
              {inquiries.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>No inquiries received yet.</p>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Requested Product</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.slice(0, 3).map((inq) => (
                        <tr key={inq.id}>
                          <td style={{ fontWeight: 600 }}>{inq.name}</td>
                          <td>{inq.phone}</td>
                          <td style={{ color: 'var(--color-secondary)' }}>{inq.product}</td>
                          <td>{new Date(inq.created_at || inq.date).toLocaleDateString()}</td>
                          <td>
                            <span style={{ 
                              padding: '0.2rem 0.5rem', 
                              borderRadius: '4px', 
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              background: inq.read ? 'rgba(255,255,255,0.05)' : 'rgba(217, 119, 6, 0.15)',
                              color: inq.read ? '#64748b' : 'var(--color-accent)'
                            }}>
                              {inq.read ? 'Reviewed' : 'Unread'}
                            </span>
                          </td>
                          <td>
                            <button 
                              onClick={() => handleInquiryWhatsAppReply(inq)}
                              className="btn btn-primary" 
                              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                              disabled={inquiryActionId === inq.id}
                            >
                              <MessageSquare size={12} /> Reply
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick reference guide */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div className="admin-card" style={{ marginBottom: 0 }}>
                <h4 style={{ color: 'white', marginBottom: '0.75rem', fontWeight: 700 }}>Quick Operations</h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Manage catalogs, prices, and settings instantly. Live site updates apply dynamically.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={openAddProductModal} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    <Plus size={16} /> Add Product
                  </button>
                  <button onClick={() => setActiveTab('content')} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#fff', borderColor: 'var(--admin-border)' }}>
                    Edit Address / Phone
                  </button>
                </div>
              </div>

              <div className="admin-card" style={{ marginBottom: 0 }}>
                <h4 style={{ color: 'white', marginBottom: '0.75rem', fontWeight: 700 }}>Real-Time Cloud Hosting</h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Your database is hosted securely in the cloud. Changes made here reflect immediately to all customers worldwide.
                </p>
                <button onClick={() => setActiveTab('settings')} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', width: '100%', color: '#fff', borderColor: 'var(--admin-border)' }}>
                  Open Settings Panel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. PRODUCTS CRUD TAB */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Product Catalog Records</h3>
              <button onClick={openAddProductModal} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <Plus size={16} /> Create New Product
              </button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Base Price</th>
                    <th>Specifications</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img 
                          src={product.image || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23cbd5e1"/><text x="50" y="55" font-family="sans-serif" font-size="10" text-anchor="middle" fill="%2364748b">No Image</text></svg>'} 
                          alt={product.name} 
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                        />
                      </td>
                      <td style={{ fontWeight: 700, color: 'white' }}>{product.name}</td>
                      <td>
                        <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {product.category}
                        </span>
                      </td>
                      <td style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
                        ₹{product.price} / {product.unit}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {product.specs ? Object.keys(product.specs).length : 0} specs
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => openEditProductModal(product)} 
                            className="btn btn-outline" 
                            style={{ padding: '0.4rem', color: '#94a3b8', borderColor: 'var(--admin-border)', minWidth: '32px' }}
                            title="Edit Product"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id, product.name)} 
                            className="btn btn-danger" 
                            style={{ padding: '0.4rem', minWidth: '32px' }}
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. INQUIRIES TAB */}
        {/* ========================================================================= */}
        {activeTab === 'inquiries' && (
          <div className="admin-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Customer Leads Inbox</h3>

            {inquiries.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Inbox is clean. No inquiries received.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {inquiries.map((inq) => (
                  <div key={inq.id} style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid var(--admin-border)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderLeft: inq.read ? '1px solid var(--admin-border)' : '4px solid var(--color-accent)',
                    opacity: inquiryActionId === inq.id ? 0.6 : 1
                  }}>
                    {/* Top Row: Customer details */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {inq.name}
                          {!inq.read && (
                            <span style={{ fontSize: '0.7rem', background: 'rgba(217,119,6,0.15)', color: 'var(--color-accent)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
                              New
                            </span>
                          )}
                        </h4>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                          Phone: <b>{inq.phone}</b> • Received: {new Date(inq.created_at || inq.date).toLocaleString()}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {!inq.read && (
                          <button 
                            onClick={() => handleMarkInquiryRead(inq.id)}
                            className="btn btn-outline" 
                            style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', color: '#10b981', borderColor: '#10b98130', background: '#10b98105' }}
                            disabled={inquiryActionId === inq.id}
                          >
                            <Check size={12} /> Mark Read
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="btn btn-outline" 
                          style={{ padding: '0.4rem', color: 'var(--color-danger)', borderColor: '#ef444420' }}
                          disabled={inquiryActionId === inq.id}
                          title="Delete Inquiry"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Middle Row: Product specifications requested */}
                    <div style={{ 
                      background: 'rgba(255,255,255,0.02)', 
                      padding: '1rem', 
                      borderRadius: '6px', 
                      border: '1px solid var(--admin-border)',
                      display: 'flex',
                      gap: '2rem',
                      flexWrap: 'wrap'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Requested Pipe</div>
                        <div style={{ fontSize: '1rem', color: 'var(--color-secondary)', fontWeight: 700 }}>{inq.product}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Requested Volume</div>
                        <div style={{ fontSize: '1rem', color: 'white', fontWeight: 700 }}>{inq.quantity}</div>
                      </div>
                    </div>

                    {/* Message detail */}
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>Requirement Message</div>
                      <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        "{inq.message}"
                      </p>
                    </div>

                    {/* Action button */}
                    <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--admin-border)' }}>
                      <button 
                        onClick={() => handleInquiryWhatsAppReply(inq)}
                        className="btn btn-primary" 
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                        disabled={inquiryActionId === inq.id}
                      >
                        <MessageSquare size={14} /> Open WhatsApp Chat &amp; Send Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. EDIT PAGE CONTENT TAB */}
        {/* ========================================================================= */}
        {activeTab === 'content' && (
          <div className="admin-card">
            <form onSubmit={handleCompanySubmit}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Website Content Live Editor</h3>

              {contentSaved && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  color: 'var(--color-success)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  marginBottom: '1.5rem',
                  fontWeight: 600
                }}>
                  ✔ Content saved successfully! Changes are live on the customer site.
                </div>
              )}

              {infoError && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: 'var(--color-danger)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  marginBottom: '1.5rem',
                  fontWeight: 500
                }}>
                  ⚠️ {infoError}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div className="form-group">
                  <label style={{ color: '#94a3b8' }}>Company Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={compName} 
                    onChange={e => setCompName(e.target.value)} 
                    disabled={infoLoading}
                  />
                </div>

                <div className="form-group">
                  <label style={{ color: '#94a3b8' }}>Hero tagline</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={compTagline} 
                    onChange={e => setCompTagline(e.target.value)} 
                    disabled={infoLoading}
                  />
                </div>

                <div className="form-group">
                  <label style={{ color: '#94a3b8' }}>Managing Partner Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={compPartner} 
                    onChange={e => setCompPartner(e.target.value)} 
                    disabled={infoLoading}
                  />
                </div>

                <div className="form-group">
                  <label style={{ color: '#94a3b8' }}>GSTIN Reg Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={compGstin} 
                    onChange={e => setCompGstin(e.target.value)} 
                    disabled={infoLoading}
                  />
                </div>

                <div className="form-group">
                  <label style={{ color: '#94a3b8' }}>Phone Contact Line</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={compPhone} 
                    onChange={e => setCompPhone(e.target.value)} 
                    disabled={infoLoading}
                  />
                </div>

                <div className="form-group">
                  <label style={{ color: '#94a3b8' }}>WhatsApp Direct (with country code, no space/+) </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={compWhatsapp} 
                    onChange={e => setCompWhatsapp(e.target.value)} 
                    disabled={infoLoading}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={{ color: '#94a3b8' }}>Factory Physical Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={compAddress} 
                    onChange={e => setCompAddress(e.target.value)} 
                    disabled={infoLoading}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={{ color: '#94a3b8' }}>Who We Are description text</label>
                  <textarea 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white', minHeight: '120px' }}
                    value={compAboutText} 
                    onChange={e => setCompAboutText(e.target.value)}
                    disabled={infoLoading}
                  ></textarea>
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={{ color: '#94a3b8' }}>Google Maps Share Link</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={compMapShare} 
                    onChange={e => setCompMapShare(e.target.value)} 
                    disabled={infoLoading}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={{ color: '#94a3b8' }}>Google Maps Iframe Src URL (for map embed)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={compMapEmbed} 
                    onChange={e => setCompMapEmbed(e.target.value)} 
                    disabled={infoLoading}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '2rem', padding: '0.75rem 2rem' }} disabled={infoLoading}>
                {infoLoading ? 'Saving...' : 'Save Content Configurations'}
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. SYSTEM CONFIGURATION / SETTINGS TAB */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Change passcode */}
            <div className="admin-card" style={{ marginBottom: 0 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Change Password</h3>
              
              {passMessage.text && (
                <div style={{
                  background: passMessage.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  border: passMessage.type === 'error' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(16, 185, 129, 0.2)',
                  color: passMessage.type === 'error' ? 'var(--color-danger)' : 'var(--color-success)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  marginBottom: '1.5rem',
                  fontWeight: 500
                }}>
                  {passMessage.text}
                </div>
              )}

              <form onSubmit={handlePasswordChange} style={{ maxWidth: '400px' }}>
                <div className="form-group">
                  <label style={{ color: '#94a3b8' }}>New Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={newPass} 
                    onChange={e => setNewPass(e.target.value)} 
                    placeholder="New admin passcode"
                    disabled={passLoading}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: '#94a3b8' }}>Confirm Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', color: 'white' }}
                    value={confirmPass} 
                    onChange={e => setConfirmPass(e.target.value)} 
                    placeholder="Retype password"
                    disabled={passLoading}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }} disabled={passLoading}>
                  {passLoading ? 'Updating...' : 'Update Passcode'}
                </button>
              </form>
            </div>

            {/* Cloud Details */}
            <div className="admin-card" style={{ marginBottom: 0 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'white' }}>Cloud Connection Details</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                This application uses **Supabase** to store database records, manage authentication, and hold product images. If you need to make changes to your database schema, credentials, or view server logs, log into your Supabase Dashboard.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.5rem' }}>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Database URL</h4>
                  <code style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', wordBreak: 'break-all' }}>
                    {supabaseUrl || 'Not Configured'}
                  </code>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.5rem' }}>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Authentication Model</h4>
                  <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                    Standard administrator login mapped dynamically using secure PostgreSQL passwords.
                  </p>
                </div>
              </div>
            </div>

            {/* Factory Reset */}
            <div className="admin-card" style={{ marginBottom: 0, border: '1px solid #ef444450' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-danger)' }}>Factory Database Reset</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Resets the cloud database storage tables back to the initial default product lines and clears the inquiry list. **WARNING: All custom changes will be overwritten globally.**
              </p>
              <button 
                onClick={handleWipeDatabase}
                className="btn btn-danger"
                disabled={resetLoading}
              >
                <RefreshCw size={16} /> {resetLoading ? 'Resetting Database...' : 'Wipe and Reset Database'}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PRODUCT CRUD MODAL SHEET */}
        {/* ========================================================================= */}
        {showProductModal && (
          <div className="modal-overlay" style={{ color: 'var(--color-text-dark)' }}>
            <div className="modal-content" style={{ maxWidth: '650px' }}>
              <button className="modal-close" onClick={() => setShowProductModal(false)} disabled={modalLoading}>✕</button>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                {editingProductId ? 'Edit Product Details' : 'Create New Product Record'}
              </h3>

              {modalError && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: 'var(--color-danger)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  marginBottom: '1.5rem',
                  fontWeight: 500
                }}>
                  ⚠️ {modalError}
                </div>
              )}

              {modalSuccess && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  color: 'var(--color-success)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  marginBottom: '1.5rem',
                  fontWeight: 600
                }}>
                  ✔ Product saved successfully!
                </div>
              )}

              <form onSubmit={handleProductSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
                  
                  {/* Name Input */}
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={prodName} 
                      onChange={e => setProdName(e.target.value)} 
                      placeholder="e.g. Suction Hose"
                      disabled={modalLoading}
                      required 
                    />
                  </div>

                  {/* Category Select */}
                  <div className="form-group">
                    <label>Category *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={prodCategory} 
                      onChange={e => setProdCategory(e.target.value)} 
                      placeholder="e.g. Suction, Braided, Rubber"
                      disabled={modalLoading}
                      required 
                    />
                  </div>

                  {/* Price Input */}
                  <div className="form-group">
                    <label>Base Price amount (₹) *</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={prodPrice} 
                      onChange={e => setProdPrice(e.target.value)} 
                      placeholder="e.g. 180"
                      disabled={modalLoading}
                      required 
                    />
                  </div>

                  {/* Price Unit */}
                  <div className="form-group">
                    <label>Pricing Unit *</label>
                    <select 
                      className="form-control"
                      value={prodUnit}
                      onChange={e => setProdUnit(e.target.value)}
                      disabled={modalLoading}
                      required
                    >
                      <option value="Meter">Meter</option>
                      <option value="Coil">Coil</option>
                      <option value="Foot">Foot</option>
                      <option value="Piece">Piece</option>
                      <option value="Bundle">Bundle</option>
                    </select>
                  </div>
                </div>

                {/* Description Input */}
                <div className="form-group" style={{ marginTop: '0.5rem' }}>
                  <label>Product Description</label>
                  <textarea 
                    className="form-control" 
                    value={prodDesc} 
                    onChange={e => setProdDesc(e.target.value)} 
                    placeholder="Describe industrial strength, materials, applications..."
                    disabled={modalLoading}
                    style={{ minHeight: '80px' }}
                  ></textarea>
                </div>

                {/* Product Photo Upload / URL */}
                <div className="form-group">
                  <label>Product Image Source</label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ flexGrow: 1 }}>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={prodImage && prodImage.startsWith('data:') ? 'Custom local file selected' : prodImage} 
                        onChange={e => setProdImage(e.target.value)} 
                        placeholder="Paste image URL or upload file below..." 
                        disabled={modalLoading}
                      />
                      
                      {/* Image File Uploader */}
                      <div className="image-upload-area" style={{ padding: '1rem 0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                          Drag or Click to upload custom product picture
                        </span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={modalLoading}
                          style={{ fontSize: '0.75rem' }}
                        />
                      </div>
                    </div>
                    {prodImage && (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Preview</div>
                        <img 
                          src={prodImage} 
                          alt="Thumbnail Preview" 
                          className="image-preview-thumbnail" 
                          style={{ marginTop: '0.25rem', width: '80px', height: '80px', borderRadius: '4px' }} 
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Technical Specifications (Dynamic Fields) */}
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 700, margin: 0 }}>Technical Specifications</label>
                    <button type="button" onClick={addSpecField} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} disabled={modalLoading}>
                      + Add Row
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                    {prodSpecs.map((spec, index) => (
                      <div key={index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. Temperature Range" 
                          value={spec.key}
                          onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                          disabled={modalLoading}
                          style={{ flex: 1, padding: '0.5rem' }}
                        />
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. -10°C to +60°C" 
                          value={spec.val}
                          onChange={(e) => handleSpecChange(index, 'val', e.target.value)}
                          disabled={modalLoading}
                          style={{ flex: 1, padding: '0.5rem' }}
                        />
                        <button 
                          type="button" 
                          onClick={() => removeSpecField(index)} 
                          className="btn btn-danger" 
                          style={{ padding: '0.5rem', minWidth: '32px' }}
                          disabled={prodSpecs.length === 1 || modalLoading}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowProductModal(false)} className="btn btn-outline" style={{ padding: '0.6rem 1.25rem' }} disabled={modalLoading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 2rem' }} disabled={modalLoading}>
                    {modalLoading ? 'Saving to Database...' : (editingProductId ? 'Update Product' : 'Add to Catalog')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
