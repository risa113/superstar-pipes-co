import React, { useState } from 'react';
import { DatabaseProvider } from './context/DatabaseContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import WhyChooseUs from './components/WhyChooseUs';
import Products from './components/Products';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { MessageCircle } from 'lucide-react';
import { useDatabase } from './context/DatabaseContext';

function AppContent() {
  const [currentView, setCurrentView] = useState('client'); // 'client' or 'admin'
  const [prefilledProduct, setPrefilledProduct] = useState('');
  
  // Retrieve company info to bind the floating WhatsApp widget
  const { companyInfo } = useDatabase();

  const handleSelectProduct = (productName) => {
    setPrefilledProduct(productName);
  };

  const handleClearPrefilled = () => {
    setPrefilledProduct('');
  };

  if (currentView === 'admin') {
    return (
      <>
        {/* Navbar is rendered even in admin view to allow switching back to the client website */}
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        <div style={{ paddingTop: '80px' }}>
          <AdminDashboard />
        </div>
      </>
    );
  }

  // Formatting generic floating WhatsApp message
  const floatingWaMsg = `Hello Super Star Pipes & Co, I visited your website and would like to inquire about your industrial hose catalog.`;
  const floatingWaUrl = `https://wa.me/${companyInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent(floatingWaMsg)}`;

  return (
    <>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main style={{ minHeight: '100vh' }}>
        <Hero />
        <AboutUs />
        <Products onSelectProductForInquiry={handleSelectProduct} />
        <WhyChooseUs />
        <Services />
        <ContactForm prefilledProduct={prefilledProduct} clearPrefilledProduct={handleClearPrefilled} />
      </main>

      <Footer />

      {/* Floating WhatsApp Widget */}
      <a 
        href={floatingWaUrl}
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-widget whatsapp-floating"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </>
  );
}

export default function App() {
  return (
    <DatabaseProvider>
      <AppContent />
    </DatabaseProvider>
  );
}
