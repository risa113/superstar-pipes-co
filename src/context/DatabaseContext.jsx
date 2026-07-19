import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const DatabaseContext = createContext();

// 1. Initialise Supabase Client if environment keys exist
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const useCloudDb = supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co');
const supabase = useCloudDb ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Log Connection Status
if (useCloudDb) {
  console.log('⚡ Supabase Cloud Database Connected Successfully.');
} else {
  console.warn('⚠️ Supabase credentials missing from .env file. Running in local storage fallback mode.');
}

// Default Seed Values (used when running in local storage fallback mode or seeding database)
const defaultImages = {
  suctionHose: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="p1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%230284c7"/><stop offset="50%" stop-color="%2338bdf8"/><stop offset="100%" stop-color="%230284c7"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g1)"/><g transform="translate(100, 100)"><rect x="50" y="150" width="500" height="80" rx="40" fill="url(%23p1)" opacity="0.9"/><rect x="50" y="250" width="500" height="80" rx="40" fill="url(%23p1)" opacity="0.75"/><circle cx="100" cy="190" r="30" fill="none" stroke="%23ffffff" stroke-width="4" stroke-dasharray="8,4"/><circle cx="100" cy="290" r="30" fill="none" stroke="%23ffffff" stroke-width="4" stroke-dasharray="8,4"/><path d="M 50 190 Q 300 120 550 190" fill="none" stroke="%23d97706" stroke-width="6" opacity="0.8"/><text x="300" y="80" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">SUCTION HOSE</text><text x="300" y="380" fill="%2364748b" font-family="sans-serif" font-size="16" text-anchor="middle">Heavy-Duty PVC Suction &amp; Delivery Pipe</text></g></svg>`,
  braidedHose: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="p2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%230284c7"/><stop offset="100%" stop-color="%2310b981"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g1)"/><g transform="translate(100, 100)"><rect x="50" y="180" width="500" height="50" rx="25" fill="url(%23p2)" opacity="0.95"/><path d="M 50 205 L 550 205" stroke="%23ffffff" stroke-width="4" stroke-dasharray="10,5"/><text x="300" y="80" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">BRAIDED HOSE</text><text x="300" y="380" fill="%2364748b" font-family="sans-serif" font-size="16" text-anchor="middle">High Tensile Polyester Reinforced Tubing</text></g></svg>`,
  industrialHose: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="p3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ea580c"/><stop offset="100%" stop-color="%23d97706"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g1)"/><g transform="translate(100, 100)"><rect x="50" y="160" width="500" height="100" rx="10" fill="url(%23p3)" opacity="0.9"/><path d="M 50 160 Q 300 240 550 160" fill="none" stroke="%23ffffff" stroke-width="8" opacity="0.4"/><text x="300" y="80" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">INDUSTRIAL HOSE</text><text x="300" y="380" fill="%2364748b" font-family="sans-serif" font-size="16" text-anchor="middle">Abrasive &amp; Chemical Conveyance Pipe</text></g></svg>`
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
    image: import.meta.env.BASE_URL + 'wire_reinforced.jpg',
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
    image: import.meta.env.BASE_URL + 'thunder_hose.jpg',
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
    image: import.meta.env.BASE_URL + 'wire_reinforced.jpg',
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

export const DatabaseProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState(defaultCompanyInfo);
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 2. Fetch all data from Supabase or Local Storage
  const fetchData = async () => {
    setLoading(true);
    try {
      if (useCloudDb) {
        // Fetch Products
        const { data: prodData, error: prodErr } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (prodErr) throw prodErr;
        setProducts(prodData || []);

        // Fetch Inquiries (if authenticated, otherwise keep empty until logged in)
        const { data: session } = await supabase.auth.getSession();
        if (session?.session) {
          const { data: inqData, error: inqErr } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false });
          if (!inqErr) setInquiries(inqData || []);
        }

        // Fetch Company Info
        const { data: infoData, error: infoErr } = await supabase
          .from('company_info')
          .select('*')
          .eq('id', 1)
          .single();
        if (infoErr && infoErr.code !== 'PGRST116') throw infoErr; // PGRST116 is empty row
        
        if (infoData) {
          setCompanyInfo({
            ...defaultCompanyInfo,
            ...infoData,
            // mapping database snakes to camelCases
            aboutText: infoData.about_text,
            mapShareLink: infoData.map_share_link,
            mapEmbedUrl: infoData.map_embed_url
          });
        }
      } else {
        // LocalStorage Fallback
        const cachedInfo = localStorage.getItem('ss_company_info');
        const cachedProds = localStorage.getItem('ss_products');
        const cachedInqs = localStorage.getItem('ss_inquiries');
        
        if (cachedInfo) setCompanyInfo(JSON.parse(cachedInfo));
        setProducts(cachedProds ? JSON.parse(cachedProds) : defaultProducts);
        setInquiries(cachedInqs ? JSON.parse(cachedInqs) : []);
        
        const localAuth = localStorage.getItem('ss_local_auth');
        if (localAuth === 'true') setIsLoggedIn(true);
      }
    } catch (err) {
      console.error('Error fetching database records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Check existing auth state
    if (useCloudDb) {
      supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          setIsLoggedIn(true);
          // fetch inquiries upon login
          supabase.from('inquiries').select('*').order('created_at', { ascending: false })
            .then(({ data }) => { if (data) setInquiries(data); });
        } else {
          setIsLoggedIn(false);
          setInquiries([]);
        }
      });
    }
  }, []);

  // 3. Setup real-time PostgreSQL listeners
  useEffect(() => {
    if (!useCloudDb) return;

    const productsChannel = supabase
      .channel('schema-products-change')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        supabase.from('products').select('*').order('created_at', { ascending: false })
          .then(({ data }) => { if (data) setProducts(data); });
      })
      .subscribe();

    const inquiriesChannel = supabase
      .channel('schema-inquiries-change')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => {
        supabase.from('inquiries').select('*').order('created_at', { ascending: false })
          .then(({ data }) => { if (data) setInquiries(data); });
      })
      .subscribe();

    const companyChannel = supabase
      .channel('schema-company-change')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'company_info', filter: 'id=eq.1' }, () => {
        supabase.from('company_info').select('*').eq('id', 1).single()
          .then(({ data }) => {
            if (data) {
              setCompanyInfo(prev => ({
                ...prev,
                ...data,
                aboutText: data.about_text,
                mapShareLink: data.map_share_link,
                mapEmbedUrl: data.map_embed_url
              }));
            }
          });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(productsChannel);
      supabase.removeChannel(inquiriesChannel);
      supabase.removeChannel(companyChannel);
    };
  }, []);

  // 4. Image Upload to Supabase Storage Bucket
  const uploadImage = async (fileBase64OrUrl) => {
    if (!useCloudDb) return fileBase64OrUrl;

    // Check if it's already a hosted URL
    if (typeof fileBase64OrUrl === 'string' && fileBase64OrUrl.startsWith('http')) {
      return fileBase64OrUrl;
    }

    // Decode Base64 and upload binary blob to Supabase Storage
    if (typeof fileBase64OrUrl === 'string' && fileBase64OrUrl.startsWith('data:image')) {
      try {
        const parts = fileBase64OrUrl.split(',');
        const mime = parts[0].match(/:(.*?);/)[1];
        const binary = atob(parts[1]);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        const blob = new Blob([new Uint8Array(array)], { type: mime });
        const extension = mime.split('/')[1] || 'png';
        const fileName = `product_${Date.now()}.${extension}`;

        // Upload to bucket 'product-images'
        const { error: uploadErr } = await supabase.storage
          .from('product-images')
          .upload(fileName, blob, { contentType: mime, cacheControl: '3600', upsert: true });

        if (uploadErr) throw uploadErr;

        // Obtain public asset URL
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        return urlData.publicUrl;
      } catch (err) {
        console.error('Failed to upload image file to Supabase Storage:', err);
        return fileBase64OrUrl; // Fallback to raw base64 string on upload failure
      }
    }

    return fileBase64OrUrl;
  };

  // 5. Database Actions (CRUD)
  const addProduct = async (product) => {
    setLoading(true);
    try {
      const publicImageUrl = await uploadImage(product.image);
      const newProduct = { ...product, image: publicImageUrl };

      if (useCloudDb) {
        const { error } = await supabase
          .from('products')
          .insert([newProduct]);
        if (error) throw error;
      } else {
        const added = { ...newProduct, id: Date.now().toString() };
        setProducts(prev => [added, ...prev]);
        localStorage.setItem('ss_products', JSON.stringify([added, ...products]));
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    setLoading(true);
    try {
      const publicImageUrl = await uploadImage(updatedProduct.image);
      const updated = { ...updatedProduct, image: publicImageUrl };

      if (useCloudDb) {
        const { error } = await supabase
          .from('products')
          .update(updated)
          .eq('id', id);
        if (error) throw error;
      } else {
        const mapped = products.map(p => p.id === id ? { ...p, ...updated } : p);
        setProducts(mapped);
        localStorage.setItem('ss_products', JSON.stringify(mapped));
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      if (useCloudDb) {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
        if (error) throw error;
      } else {
        const filtered = products.filter(p => p.id !== id);
        setProducts(filtered);
        localStorage.setItem('ss_products', JSON.stringify(filtered));
      }
    } finally {
      setLoading(false);
    }
  };

  const addInquiry = async (inquiry) => {
    try {
      if (useCloudDb) {
        const { error } = await supabase
          .from('inquiries')
          .insert([inquiry]);
        if (error) throw error;
      } else {
        const added = {
          ...inquiry,
          id: 'inq_' + Date.now().toString(),
          date: new Date().toISOString(),
          read: false
        };
        const updated = [added, ...inquiries];
        setInquiries(updated);
        localStorage.setItem('ss_inquiries', JSON.stringify(updated));
      }
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      if (useCloudDb) {
        const { error } = await supabase
          .from('inquiries')
          .delete()
          .eq('id', id);
        if (error) throw error;
      } else {
        const filtered = inquiries.filter(i => i.id !== id);
        setInquiries(filtered);
        localStorage.setItem('ss_inquiries', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  const markInquiryRead = async (id) => {
    try {
      if (useCloudDb) {
        const { error } = await supabase
          .from('inquiries')
          .update({ read: true })
          .eq('id', id);
        if (error) throw error;
      } else {
        const mapped = inquiries.map(i => i.id === id ? { ...i, read: true } : i);
        setInquiries(mapped);
        localStorage.setItem('ss_inquiries', JSON.stringify(mapped));
      }
    } catch (err) {
      console.error('Failed to mark inquiry read:', err);
    }
  };

  const updateCompanyInfo = async (updatedInfo) => {
    setLoading(true);
    try {
      if (useCloudDb) {
        const mappedInfo = {
          name: updatedInfo.name,
          tagline: updatedInfo.tagline,
          partner: updatedInfo.partner,
          address: updatedInfo.address,
          gstin: updatedInfo.gstin,
          phone: updatedInfo.phone,
          whatsapp: updatedInfo.whatsapp,
          email: updatedInfo.email,
          about_text: updatedInfo.aboutText,
          map_share_link: updatedInfo.mapShareLink,
          map_embed_url: updatedInfo.mapEmbedUrl
        };
        const { error } = await supabase
          .from('company_info')
          .update(mappedInfo)
          .eq('id', 1);
        if (error) throw error;
      } else {
        setCompanyInfo(prev => ({ ...prev, ...updatedInfo }));
        localStorage.setItem('ss_company_info', JSON.stringify({ ...companyInfo, ...updatedInfo }));
      }
    } finally {
      setLoading(false);
    }
  };

  // 6. Security Authentication & Authorisation
  const login = async (password) => {
    setLoading(true);
    try {
      if (useCloudDb) {
        // Authenticate via Supabase Auth
        // Using standard admin email mapped to passcode input
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'admin@superstarpipes.com',
          password: password
        });
        if (error) throw error;
        setIsLoggedIn(true);
        return true;
      } else {
        // Local passcode authentication fallback
        const localPass = localStorage.getItem('ss_admin_pass') || 'superstar123';
        if (password === localPass) {
          setIsLoggedIn(true);
          localStorage.setItem('ss_local_auth', 'true');
          return true;
        }
        return false;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (useCloudDb) {
        await supabase.auth.signOut();
      }
      setIsLoggedIn(false);
      localStorage.removeItem('ss_local_auth');
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPass) => {
    setLoading(true);
    try {
      if (useCloudDb) {
        const { error } = await supabase.auth.updateUser({
          password: newPass
        });
        if (error) throw error;
        return true;
      } else {
        localStorage.setItem('ss_admin_pass', newPass);
        return true;
      }
    } finally {
      setLoading(false);
    }
  };

  const resetDatabase = async () => {
    setLoading(true);
    try {
      if (useCloudDb) {
        // Clean out cloud products and restore defaults
        await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('products').insert(defaultProducts);
        
        // Clean out company info and restore default
        const defaultMappedInfo = {
          name: defaultCompanyInfo.name,
          tagline: defaultCompanyInfo.tagline,
          partner: defaultCompanyInfo.partner,
          address: defaultCompanyInfo.address,
          gstin: defaultCompanyInfo.gstin,
          phone: defaultCompanyInfo.phone,
          whatsapp: defaultCompanyInfo.whatsapp,
          email: defaultCompanyInfo.email,
          about_text: defaultCompanyInfo.aboutText,
          map_share_link: defaultCompanyInfo.mapShareLink,
          map_embed_url: defaultCompanyInfo.mapEmbedUrl
        };
        await supabase.from('company_info').update(defaultMappedInfo).eq('id', 1);
        await supabase.from('inquiries').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      } else {
        setCompanyInfo(defaultCompanyInfo);
        setProducts(defaultProducts);
        setInquiries([]);
        localStorage.removeItem('ss_company_info');
        localStorage.removeItem('ss_products');
        localStorage.removeItem('ss_inquiries');
        localStorage.removeItem('ss_local_auth');
      }
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <DatabaseContext.Provider value={{
      loading,
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
      resetDatabase
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
