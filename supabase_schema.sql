-- ==========================================
-- SUPER STAR PIPES & CO - DATABASE SCHEMA
-- Execute this SQL inside Supabase SQL Editor
-- ==========================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PRODUCTS TABLE
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  unit text default 'Meter',
  image text,
  specs jsonb default '{}'::jsonb,
  category text,
  created_at timestamptz default now()
);

-- 2. INQUIRIES TABLE
create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  product text not null,
  quantity text,
  message text,
  read boolean default false,
  created_at timestamptz default now()
);

-- 3. COMPANY INFORMATION TABLE
create table if not exists public.company_info (
  id integer primary key default 1 check (id = 1),
  name text not null,
  tagline text,
  partner text,
  address text,
  gstin text,
  phone text,
  whatsapp text,
  email text,
  about_text text,
  map_share_link text,
  map_embed_url text
);

-- 4. INSERT DEFAULT SEED DETAILS (COMPANY INFO & PRODUCTS)
insert into public.company_info (id, name, tagline, partner, address, gstin, phone, whatsapp, email, about_text, map_share_link, map_embed_url)
values (
  1,
  'Super Star Pipes & Co',
  'Build on Quality & Reliability',
  'Mr. Noorudeen',
  'B-105, Sipcot Industrial Park, Gangaikondan, Tirunelveli',
  '33AEPFS0995D1ZS',
  '+91 9443283369',
  '+919443283369',
  'superstarpipeandco@gmail.com',
  'Super Star Pipes & Co is an established name in industrial pipe manufacturing and logistics, situated at the Sipcot Industrial Park, Gangaikondan, Tirunelveli. We deal in high-quality suction hoses, braided hoses, industrial hoses, PVC thunder hoses, and PVC steel wire reinforced hoses. Partnered by Mr. Noorudeen, we deliver premium raw materials and complete pipe supplies across India.',
  'https://maps.app.goo.gl/sbKdfygDMBvyNfnv8',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15773.74312678652!2d77.7663245456291!3d8.868735287413697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0412df082199b7%3A0xe54e605d3368a529!2sGangaikondan%20SIPCOT%20Industrial%20Park!5e0!3m2!1sen!2sin!4v1689762141549!5m2!1sen!2sin'
) on conflict (id) do nothing;

insert into public.products (id, name, description, price, unit, image, specs, category)
values 
(
  '0a34b22c-7b44-4638-89c0-67a6e1694db0',
  'Suction Hose',
  'Heavy-duty flexible PVC suction hose designed for industrial suction, dewatering, and general fluid transfer. Specially engineered to resist crushing, vacuum-collapse, and mild chemical wear.',
  180,
  'Meter',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="p1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%230284c7"/><stop offset="50%" stop-color="%2338bdf8"/><stop offset="100%" stop-color="%230284c7"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g1)"/><g transform="translate(100, 100)"><rect x="50" y="150" width="500" height="80" rx="40" fill="url(%23p1)" opacity="0.9"/><rect x="50" y="250" width="500" height="80" rx="40" fill="url(%23p1)" opacity="0.75"/><circle cx="100" cy="190" r="30" fill="none" stroke="%23ffffff" stroke-width="4" stroke-dasharray="8,4"/><circle cx="100" cy="290" r="30" fill="none" stroke="%23ffffff" stroke-width="4" stroke-dasharray="8,4"/><path d="M 50 190 Q 300 120 550 190" fill="none" stroke="%23d97706" stroke-width="6" opacity="0.8"/><text x="300" y="80" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">SUCTION HOSE</text><text x="300" y="380" fill="%2364748b" font-family="sans-serif" font-size="16" text-anchor="middle">Heavy-Duty PVC Suction &amp; Delivery Pipe</text></g></svg>',
  '{"Material": "Premium Grade PVC with Rigid Helix Reinforcement", "Sizes Available": "1\" to 6\" Internal Diameter", "Temperature Range": "-10°C to +60°C", "Working Pressure": "6 Bar", "Vacuum Rating": "90%"}',
  'Suction'
),
(
  '9b80ce82-dbbb-4a57-bb06-bd56cc22ea8d',
  'Braided Hose',
  'Multi-layered high-pressure braided hose reinforced with high-tensile polyester yarn. Ideal for air compressor lines, water injection, pneumatic systems, and spraying light chemicals.',
  95,
  'Meter',
  '/superstar-pipes-co/wire_reinforced.jpg',
  '{"Material": "PVC inner/outer tubes with Polyester braiding", "Sizes Available": "1/4\" to 2\" Internal Diameter", "Temperature Range": "-5°C to +65°C", "Working Pressure": "15 Bar", "Burst Pressure": "45 Bar"}',
  'Braided'
),
(
  '64bf0178-5db0-4965-b1a7-58b29df42b03',
  'Industrial Hose',
  'Premium industrial grade hose suitable for heavy-duty discharge, high abrasion fluid lines, chemical conveying, and oil transport. Outfitted with chemical-resistant liners.',
  240,
  'Meter',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="p3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ea580c"/><stop offset="100%" stop-color="%23d97706"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g1)"/><g transform="translate(100, 100)"><rect x="50" y="160" width="500" height="100" rx="10" fill="url(%23p3)" opacity="0.9"/><path d="M 50 160 Q 300 240 550 160" fill="none" stroke="%23ffffff" stroke-width="8" opacity="0.4"/><text x="300" y="80" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">INDUSTRIAL HOSE</text><text x="300" y="380" fill="%2364748b" font-family="sans-serif" font-size="16" text-anchor="middle">Abrasive &amp; Chemical Conveyance Pipe</text></g></svg>',
  '{"Material": "Reinforced Rubber & Polymer Blend", "Sizes Available": "1/2\" to 4\" Internal Diameter", "Temperature Range": "-25°C to +80°C", "Working Pressure": "12 Bar", "Safety Factor": "3:1"}',
  'Industrial'
),
(
  '0d45ca14-fb5e-4efb-8664-df8d9514757e',
  'PVC Thunder Hose Pipe',
  'High-grade premium spiral-reinforced thunder suction pipe. Excellent flexibility, highly resistant to external impact and harsh weather. Specifically designed for extreme suction and delivery requirements like mining, sand-gravel, and slurry transport.',
  285,
  'Meter',
  '/superstar-pipes-co/thunder_hose.jpg',
  '{"Material": "Impact-resistant rigid PVC spiral helix inside soft PVC", "Sizes Available": "1.5\" to 8\" Internal Diameter", "Temperature Range": "-15°C to +65°C", "Working Pressure": "8 Bar", "Corrosion Resistance": "Excellent"}',
  'Thunder'
),
(
  '7cbb72c1-d411-4770-8b43-26a978f8cb0f',
  'PVC Steel Wire Reinforced Hose Pipe',
  'Highly flexible, transparent PVC hose embedded with a spiral high-strength steel wire. Ideal for high vacuum and pressure applications where visual product flow verification is essential. Handles liquids, food-grade items, chemicals, and powders.',
  210,
  'Meter',
  '/superstar-pipes-co/wire_reinforced.jpg',
  '{"Material": "Transparent PVC with Spring Steel Wire Helix", "Sizes Available": "1/2\" to 4\" Internal Diameter", "Temperature Range": "-5°C to +70°C", "Working Pressure": "10 Bar", "Vacuum Rating": "95%"}',
  'Steel Wire'
)
on conflict (id) do nothing;

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
alter table public.products enable row level security;
alter table public.inquiries enable row level security;
alter table public.company_info enable row level security;

-- 6. ENABLE ROW LEVEL SECURITY ACCESS POLICIES

-- Products Table Policies
create policy "Allow public read access to products" on public.products
  for select using (true);
create policy "Allow authenticated admin write access to products" on public.products
  for all using (auth.role() = 'authenticated');

-- Inquiries Table Policies
create policy "Allow public to insert inquiries" on public.inquiries
  for insert with check (true);
create policy "Allow authenticated admin to read inquiries" on public.inquiries
  for select using (auth.role() = 'authenticated');
create policy "Allow authenticated admin to modify inquiries" on public.inquiries
  for all using (auth.role() = 'authenticated');

-- Company Info Table Policies
create policy "Allow public read access to company_info" on public.company_info
  for select using (true);
create policy "Allow authenticated admin write access to company_info" on public.company_info
  for all using (auth.role() = 'authenticated');
