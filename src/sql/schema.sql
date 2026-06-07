-- DOCTORS TABLE
-- Stores the providers shown in the appointment calendar and dashboard.
create table public.doctors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null,
  phone text not null,
  created_at timestamp with time zone default now()
);

-- PATIENTS TABLE
-- Stores patient contact information collected during appointment booking.
create table public.patients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  created_at timestamp with time zone default now()
);

-- APPOINTMENTS TABLE
-- Stores one bookable time slot for one doctor on one date.
-- doctor_id links each slot to a provider; patient_id is filled after booking.
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid references public.doctors(id) on delete cascade,
  date date not null,
  time text not null,
  status text not null default 'open',
  patient_id uuid references public.patients(id),
  created_at timestamp with time zone default now()
);

-- These indexes keep date-based schedule lookups fast as the table grows.
create index on public.appointments (date);
create index on public.appointments (doctor_id, date);
