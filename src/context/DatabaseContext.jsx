import React, { createContext, useContext, useState, useEffect } from 'react';

const DatabaseContext = createContext();

// Predefined default values for product image placeholders (using inline SVG strings representing premium industrial pipes)
const defaultImages = {
  suctionHose: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="p1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%230284c7"/><stop offset="50%" stop-color="%2338bdf8"/><stop offset="100%" stop-color="%230284c7"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g1)"/><g transform="translate(100, 100)"><rect x="50" y="150" width="500" height="80" rx="40" fill="url(%23p1)" opacity="0.9"/><rect x="50" y="250" width="500" height="80" rx="40" fill="url(%23p1)" opacity="0.75"/><circle cx="100" cy="190" r="30" fill="none" stroke="%23ffffff" stroke-width="4" stroke-dasharray="8,4"/><circle cx="100" cy="290" r="30" fill="none" stroke="%23ffffff" stroke-width="4" stroke-dasharray="8,4"/><path d="M 50 190 Q 300 120 550 190" fill="none" stroke="%23d97706" stroke-width="6" opacity="0.8"/><text x="300" y="80" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">SUCTION HOSE</text><text x="300" y="380" fill="%2364748b" font-family="sans-serif" font-size="16" text-anchor="middle">Heavy-Duty PVC Suction &amp; Delivery Pipe</text></g></svg>`,
  braidedHose: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="p2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%230284c7"/><stop offset="100%" stop-color="%2310b981"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g1)"/><g transform="translate(100, 100)"><rect x="50" y="180" width="500" height="50" rx="25" fill="url(%23p2)" opacity="0.95"/><path d="M 50 205 L 550 205" stroke="%23ffffff" stroke-width="4" stroke-dasharray="10,5"/><text x="300" y="80" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">BRAIDED HOSE</text><text x="300" y="380" fill="%2364748b" font-family="sans-serif" font-size="16" text-anchor="middle">High Tensile Polyester Reinforced Tubing</text></g></svg>`,
  industrialHose: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="p3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ea580c"/><stop offset="100%" stop-color="%23d97706"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g1)"/><g transform="translate(100, 100)"><rect x="50" y="160" width="500" height="100" rx="10" fill="url(%23p3)" opacity="0.9"/><path d="M 50 160 Q 300 240 550 160" fill="none" stroke="%23ffffff" stroke-width="8" opacity="0.4"/><text x="300" y="80" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">INDUSTRIAL HOSE</text><text x="300" y="380" fill="%2364748b" font-family="sans-serif" font-size="16" text-anchor="middle">Abrasive &amp; Chemical Conveyance Pipe</text></g></svg>`,
  thunderHose: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="p4" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%237c3aed"/><stop offset="100%" stop-color="%232563eb"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g1)"/><g transform="translate(100, 100)"><rect x="50" y="140" width="500" height="120" rx="30" fill="url(%23p4)" opacity="0.85"/><rect x="80" y="150" width="440" height="100" rx="20" fill="none" stroke="%23ffffff" stroke-width="4" stroke-dasharray="15,10" opacity="0.9"/><text x="300" y="80" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">PVC THUNDER HOSE</text><text x="300" y="380" fill="%2364748b" font-family="sans-serif" font-size="16" text-anchor="middle">Rigid Helix Spiral Reinforced Suction Pipe</text></g></svg>`,
  wireHose: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="p5" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%2364748b"/><stop offset="100%" stop-color="%2394a3b8"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g1)"/><g transform="translate(100, 100)"><rect x="50" y="170" width="500" height="70" rx="35" fill="none" stroke="%23ffffff" stroke-width="8" opacity="0.7"/><rect x="60" y="180" width="480" height="50" rx="25" fill="url(%23p5)" opacity="0.3"/><path d="M 50 205 C 100 170, 150 240, 200 205 C 250 170, 300 240, 350 205 C 400 170, 450 240, 500 205 C 550 170, 600 240, 650 205" fill="none" stroke="%230284c7" stroke-width="4"/><text x="300" y="80" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">STEEL WIRE REINFORCED</text><text x="300" y="380" fill="%2364748b" font-family="sans-serif" font-size="16" text-anchor="middle">Transparent Steel Wire Helix PVC Hose</text></g></svg>`
};

const defaultCompanyInfo = {
  name: "Super Star Pipes & Co",
  tagline: "Build on Quality & Reliability",
  partner: "Mr. Noorudeen",
  address: "B-105, Sipcot Industrial Park, Gangaikondan, Tirunelveli",
  gstin: "33AEPFS0995D1ZS",
  phone: "+91 9443283369",
  whatsapp: "+919443283369",
  email: "superstarpipeandco@gmail.com",
  aboutText: "Super Star Pipes & Co is an established name in industrial pipe manufacturing and logistics, situated at the Sipcot Industrial Park, Gangaikondan, Tirunelveli. We deal in high-quality suction hoses, braided hoses, industrial hoses, PVC thunder hoses, and PVC steel wire reinforced hoses. Partnered by Mr. Noorudeen, we deliver premium raw materials and complete pipe supplies across India.",
  mapShareLink: "https://maps.app.goo.gl/sbKdfygDMBvyNfnv8",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15773.74312678652!2d77.7663245456291!3d8.868735287413697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0412df082199b7%3A0xe54e605d3368a529!2sGangaikondan%20SIPCOT%20Industrial%20Park!5e0!3m2!1sen!2sin!4v1689762141549!5m2!1sen!2sin",
  whyChooseUs: [
    { id: 1, title: "High-Quality Materials", desc: "Crafted using premium virgin polymers and reinforced elements to handle maximum stress." },
    { id: 2, title: "Service Response", desc: "Round-the-clock availability with high responsiveness and friendly customer support." },
    { id: 3, title: "Experienced Team", desc: "Supervised by experienced engineers and industrial veterans to ensure perfect output." },
    { id: 4, title: "Trusted Service", desc: "Long-standing reliability serving major manufacturing plants and distributors PAN India." },
    { id: 5, title: "Bulk Orders Capability", desc: "Optimized lines and robust raw material stocks for high-capacity prompt delivery." }
  ],
  services: [
    { id: 1, title: "PVC Pipes Supply", desc: "Manufacturing and distribution of standard and custom dimension PVC flexible pipelines." },
    { id: 2, title: "Industrial Raw Materials", desc: "Supply of high-grade industrial polymers, reinforcing wires, and compound materials." },
    { id: 3, title: "Bulk Industrial Pipes Supply", desc: "Direct logistical fulfillment of high-capacity pipes and coupling systems for industrial complexes." }
  ]
};

const defaultProducts = [
  {
    id: "1",
    name: "Suction Hose",
    description: "Heavy-duty flexible PVC suction hose designed for industrial suction, dewatering, and general fluid transfer. Specially engineered to resist crushing, vacuum-collapse, and mild chemical wear.",
    price: "180",
    unit: "Meter",
    image: defaultImages.suctionHose,
    specs: {
      "Material": "Premium Grade PVC with Rigid Helix Reinforcement",
      "Sizes Available": "1\" to 6\" Internal Diameter",
      "Temperature Range": "-10°C to +60°C",
      "Working Pressure": "6 Bar",
      "Vacuum Rating": "90%"
    },
    category: "Suction"
  },
  {
    id: "2",
    name: "Braided Hose",
    description: "Multi-layered high-pressure braided hose reinforced with high-tensile polyester yarn. Ideal for air compressor lines, water injection, pneumatic systems, and spraying light chemicals.",
    price: "95",
    unit: "Meter",
    image: defaultImages.braidedHose,
    specs: {
      "Material": "PVC inner/outer tubes with Polyester braiding",
      "Sizes Available": "1/4\" to 2\" Internal Diameter",
      "Temperature Range": "-5°C to +65°C",
      "Working Pressure": "15 Bar",
      "Burst Pressure": "45 Bar"
    },
    category: "Braided"
  },
  {
    id: "3",
    name: "Industrial Hose",
    description: "Premium industrial grade hose suitable for heavy-duty discharge, high abrasion fluid lines, chemical conveying, and oil transport. Outfitted with chemical-resistant liners.",
    price: "240",
    unit: "Meter",
    image: defaultImages.industrialHose,
    specs: {
      "Material": "Reinforced Rubber & Polymer Blend",
      "Sizes Available": "1/2\" to 4\" Internal Diameter",
      "Temperature Range": "-25°C to +80°C",
      "Working Pressure": "12 Bar",
      "Safety Factor": "3:1"
    },
    category: "Industrial"
  },
  {
    id: "4",
    name: "PVC Thunder Hose Pipe",
    description: "High-grade premium spiral-reinforced thunder suction pipe. Excellent flexibility, highly resistant to external impact and harsh weather. Specifically designed for extreme suction and delivery requirements like mining, sand-gravel, and slurry transport.",
    price: "285",
    unit: "Meter",
    image: defaultImages.thunderHose,
    specs: {
      "Material": "Impact-resistant rigid PVC spiral helix inside soft PVC",
      "Sizes Available": "1.5\" to 8\" Internal Diameter",
      "Temperature Range": "-15°C to +65°C",
      "Working Pressure": "8 Bar",
      "Corrosion Resistance": "Excellent"
    },
    category: "Thunder"
  },
  {
    id: "5",
    name: "PVC Steel Wire Reinforced Hose Pipe",
    description: "Highly flexible, transparent PVC hose embedded with a spiral high-strength steel wire. Ideal for high vacuum and pressure applications where visual product flow verification is essential. Handles liquids, food-grade items, chemicals, and powders.",
    price: "210",
    unit: "Meter",
    image: defaultImages.wireHose,
    specs: {
      "Material": "Transparent PVC with Spring Steel Wire Helix",
      "Sizes Available": "1/2\" to 4\" Internal Diameter",
      "Temperature Range": "-5°C to +70°C",
      "Working Pressure": "10 Bar",
      "Vacuum Rating": "95%"
    },
    category: "Steel Wire"
  }
];

const defaultInquiries = [
  {
    id: "inq_1",
    name: "Prakash Rajan",
    phone: "+91 9876543210",
    product: "PVC Steel Wire Reinforced Hose Pipe",
    quantity: "350 Meters",
    message: "Requirement for our chemical processing unit in Chennai. Need quote for 2 inch variant.",
    date: "2026-07-18T10:15:30Z",
    read: false
  },
  {
    id: "inq_2",
    name: "Balasubramanian K",
    phone: "+91 9444123456",
    product: "PVC Thunder Hose Pipe",
    quantity: "500 Meters",
    message: "Urgent bulk procurement for agricultural dewatering project in Tirunelveli.",
    date: "2026-07-19T08:30:00Z",
    read: true
  }
];

export const DatabaseProvider = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState(() => {
    const data = localStorage.getItem('ss_company_info');
    return data ? JSON.parse(data) : defaultCompanyInfo;
  });

  const [products, setProducts] = useState(() => {
    const data = localStorage.getItem('ss_products');
    return data ? JSON.parse(data) : defaultProducts;
  });

  const [inquiries, setInquiries] = useState(() => {
    const data = localStorage.getItem('ss_inquiries');
    return data ? JSON.parse(data) : defaultInquiries;
  });

  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('ss_admin_pass') || 'superstar123';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Synchronize changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('ss_company_info', JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem('ss_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ss_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('ss_admin_pass', adminPassword);
  }, [adminPassword]);

  // Product Actions (CRUD)
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Inquiry Actions (CRUD)
  const addInquiry = (inquiry) => {
    const newInquiry = {
      ...inquiry,
      id: 'inq_' + Date.now().toString(),
      date: new Date().toISOString(),
      read: false
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const deleteInquiry = (id) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const markInquiryRead = (id) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, read: true } : i));
  };

  // Company Information Actions
  const updateCompanyInfo = (updatedInfo) => {
    setCompanyInfo(prev => ({ ...prev, ...updatedInfo }));
  };

  // Admin Security
  const login = (password) => {
    if (password === adminPassword) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const changePassword = (newPass) => {
    setAdminPassword(newPass);
  };

  // Reset database to default settings
  const resetDatabase = () => {
    setCompanyInfo(defaultCompanyInfo);
    setProducts(defaultProducts);
    setInquiries(defaultInquiries);
    setAdminPassword('superstar123');
    localStorage.removeItem('ss_company_info');
    localStorage.removeItem('ss_products');
    localStorage.removeItem('ss_inquiries');
    localStorage.removeItem('ss_admin_pass');
  };

  // Data Import/Export handlers
  const exportDatabase = () => {
    const databaseDump = {
      companyInfo,
      products,
      inquiries,
      adminPassword
    };
    return JSON.stringify(databaseDump, null, 2);
  };

  const importDatabase = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.companyInfo && parsed.products && parsed.inquiries) {
        setCompanyInfo(parsed.companyInfo);
        setProducts(parsed.products);
        setInquiries(parsed.inquiries);
        if (parsed.adminPassword) {
          setAdminPassword(parsed.adminPassword);
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <DatabaseContext.Provider value={{
      companyInfo,
      products,
      inquiries,
      isLoggedIn,
      login,
      logout,
      changePassword,
      addProduct,
      updateProduct,
      deleteProduct,
      addInquiry,
      deleteInquiry,
      markInquiryRead,
      updateCompanyInfo,
      resetDatabase,
      exportDatabase,
      importDatabase
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
