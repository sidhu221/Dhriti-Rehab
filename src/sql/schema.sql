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
  appointment_type text not null default 'in-person'
    check (appointment_type in ('in-person', 'telehealth')),
  created_at timestamp with time zone default now()
);

-- These indexes keep date-based schedule lookups fast as the table grows.
create index on public.appointments (date);
create index on public.appointments (doctor_id, date);

-- Prevents the same doctor from ever getting two slots at the same date/time —
-- this is what makes createDefaultScheduleForDate's upsert safe against the
-- race where a page load fires the "create default schedule" call twice
-- before the first insert lands.
alter table public.appointments
add constraint appointments_doctor_date_time_unique unique (doctor_id, date, time);

-- PATIENT PROFILES TABLE
-- Stores patient account details from the signup form.
-- Passwords are intentionally not stored here; Supabase Auth stores password hashes.
create table public.patient_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  dob date not null,
  email text not null unique,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Keeps updated_at current whenever a patient profile changes.
create or replace function public.set_patient_profiles_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_patient_profiles_updated_at
before update on public.patient_profiles
for each row
execute function public.set_patient_profiles_updated_at();

-- Creates a patient profile automatically when Supabase Auth creates a user.
create or replace function public.create_patient_profile_for_new_user()
returns trigger as $$
begin
  insert into public.patient_profiles (id, first_name, last_name, dob, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    (new.raw_user_meta_data ->> 'dob')::date,
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger create_patient_profile_for_new_user
after insert on auth.users
for each row
execute function public.create_patient_profile_for_new_user();

-- Allow patients to read, create, and update only their own profile.
alter table public.patient_profiles enable row level security;

create policy "Patients can read their own profile"
on public.patient_profiles for select
to authenticated
using (auth.uid() = id);

create policy "Patients can create their own profile"
on public.patient_profiles for insert
to authenticated
with check (auth.uid() = id);

create policy "Patients can update their own profile"
on public.patient_profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Lets the forgot-password page check whether an email exists without exposing rows.
create or replace function public.patient_email_exists(lookup_email text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.patient_profiles
    where lower(email) = lower(trim(lookup_email))
  );
$$;

grant execute on function public.patient_email_exists(text) to anon;
grant execute on function public.patient_email_exists(text) to authenticated;
