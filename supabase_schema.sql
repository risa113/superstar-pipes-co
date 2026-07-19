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

-- 4. INSERT DEFAULT SEED COMPANY DETAILS
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
