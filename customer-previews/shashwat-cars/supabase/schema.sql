-- SHASHWAT CARS production schema
create extension if not exists pgcrypto;

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  brand text not null,
  model text not null,
  variant text default '',
  year int not null check (year between 1990 and 2100),
  price numeric(12,2) not null check (price >= 0),
  fuel text not null,
  transmission text not null,
  km_driven int not null check (km_driven >= 0),
  body_type text not null,
  color text,
  ownership text not null,
  registration text,
  registration_state text,
  location text not null,
  status text not null default 'AVAILABLE' check (status in ('AVAILABLE','RESERVED','SOLD','HIDDEN')),
  description text default '',
  features jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  images jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  status text not null default 'NEW',
  name text not null,
  mobile text not null,
  email text,
  vehicle_id uuid references vehicles(id) on delete set null,
  vehicle_name text,
  source text default 'website',
  city text,
  next_follow_up timestamptz,
  assigned_staff text,
  message text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists lead_notes (
  id uuid primary key default gen_random_uuid(), lead_id uuid not null references leads(id) on delete cascade,
  note text not null, created_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(), reviewer_name text not null, rating numeric(2,1), comment text,
  source text default 'manual', verified boolean not null default false, published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists settings (
  key text primary key, value jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now()
);

alter table vehicles enable row level security;
alter table leads enable row level security;
alter table lead_notes enable row level security;
alter table reviews enable row level security;
alter table settings enable row level security;
-- No public RLS policies are intentionally created. The Next.js server uses the service role key.
