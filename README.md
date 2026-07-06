# Dhriti Rehab Center — Website & Patient Portal

A full website and appointment-booking system built for **Dhriti (Mind Clinic and Counseling Center)**, a de-addiction and mental wellness clinic in Hyderabad, India.

**Live demo:** [add your deployed link here if you have one]
**Repo:** https://github.com/sidhu221/Dhriti-Rehab

---

## Why I Built This

<!--
This is your section to fill in — an admissions officer or interviewer will
read this first, so make it personal. A few prompts to help you write it:

- How did you connect with this clinic, and what did they actually need
  before you got involved (no website? an outdated one? no online booking?)
- What was the real-world problem you were solving for them — patients
  calling in to book, no way to browse programs online, no easy way for
  staff to see the day's schedule?
- What did you want to learn or prove to yourself by taking this on?
- Any feedback from the clinic once they saw it, or how it's actually
  being used today?
-->

I built this website for **Dr. K.B Nihal and Dhriti Rehab Center**, a de-addiction and mental wellness clinic in Hyderabad, to give them a professional online presence and booking system to help users interact better with the clinic. My goal was to create their first website which lists out the progams offered, a patient portal to view bookings, and a system for users to book appointments with the consult psychiatrist.

---

## What This Project Demonstrates

- **Full-stack web development**: a React single-page app on the frontend backed by a Postgres database (Supabase) on the backend
- **Database design**: designing a normalized schema (doctors, patients, appointments, patient profiles) with foreign keys, indexes, triggers, and row-level security policies rather than hardcoded data.
- **Authentication**: email/password auth with Supabase Auth, protected routes, and a session-aware patient dashboard.
- **A complete booking workflow**: date/time slot selection, availability generation, booking confirmation, and a patient-facing dashboard to view upcoming appointments
- **Working with real businesses**: translating a small business's actual needs (programs offered, provider bios, clinic hours, location) into a working product.

---

## Features

- **Marketing site** — home page, about page, and five individual treatment program pages (Alcohol De-Addiction, Drug De-Addiction, Adult Psychiatry, Psychological Services, Detox & Stabilization), each with its own content, a provider-facing "sidebar" for cross-navigation, and dedicated dos/don'ts.
- **Provider & telehealth pages** — provider bios with credentials/certifications, and a telehealth information page.
- **Appointment booking** — a real calendar/slot picker backed by the database: pick a date, see live availability per doctor, pick an open slot, and confirm booking with contact details.
- **Patient accounts** — sign up, log in, reset password (via Supabase Auth), and a patient dashboard showing profile info and upcoming/past appointments.
- **Staff scheduling view** — a doctor-facing dashboard to see and toggle a day's appointment slots between open/booked.
- **Contact & location** — clinic address, phone, embedded map, and a contact form.
- **Responsive design** — layouts adapt down to mobile breakpoints across every page.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 + React Router 7 |
| Build tool | Vite 8 |
| Backend / database | Supabase (PostgreSQL, Auth, Row-Level Security) |
| Styling | Hand-written CSS with a shared design-token system (no framework) |
| Linting | ESLint 10 |

No CSS framework, no component library, and no state-management library were used — layout, styling, and data flow are all hand-built, which was a deliberate choice to actually learn the fundamentals rather than lean on abstractions.

---

## Architecture

### Routing

A single React Router route table (`src/App.jsx`) drives every page — public marketing pages, auth pages (`/login`, `/signup`, `/forgot-password`), the booking flow (`/appointment`, `/appointment/:id`), and the two dashboards (`/patient-dashboard`, `/doctor-dashboard`).

### Database schema

Four tables in Supabase Postgres:

- **`doctors`** — provider records (name, phone, an accent color used in the UI).
- **`patients`** — created at booking time (name, phone, email).
- **`appointments`** — one row per bookable slot (doctor, date, time, status: `open`/`booked`), linked to a patient once booked.
- **`patient_profiles`** — the authenticated account record, keyed to the Supabase Auth user ID, auto-created via a database trigger the moment someone signs up.

Row-Level Security policies restrict `patient_profiles` so a signed-in user can only read/write their own row. A Postgres RPC (`patient_email_exists`) lets the password-reset flow check whether an email is registered without ever exposing user rows to the client. Other similar RLS policies were used for other tables.

### Booking flow

1. Patient opens `/appointment` and picks a date.
2. If no schedule exists yet for that date, the app auto-generates a fixed grid of slots per doctor.
3. Patient picks an open slot → a modal confirms the choice → continues to `/appointment/:id`.
4. Patient enters their details, which creates a patient record and marks the slot `booked`.
5. A signed-in patient can see their appointments reflected on `/patient-dashboard`.

### Design System

The site uses a deliberate three-color palette — **navy** for structure/headings, **green** for general actions and links, and **orange** reserved specifically for booking/scheduling calls-to-action — defined as CSS custom properties in `src/style/Index.css` and reused across all 26 stylesheets. This was iterated on specifically for accessibility (WCAG contrast) and to make color communicate meaning (e.g., "orange button" always means "this books an appointment") rather than being purely decorative.

---

## Project Structure

```
src/
├── pages/          # One component per route (Home, Programs, Appointment, Dashboards, etc.)
├── components/      # Shared building blocks (Header, Footer, Hero, homepage sections)
├── api/              # Supabase data-access functions (doctors, patients, appointments, auth)
├── lib/               # Supabase client setup
├── style/            # Per-page/component CSS + the shared design-token system
└── sql/               # Database schema (schema.sql) and seed data
```

---

## To Run this Locally

```bash
npm install
npm run dev
```

You'll need a Supabase project and a `.env` file with:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Run `src/sql/schema.sql` against your Supabase project to create the tables, triggers, and RLS policies.

---

## Known Limitations & Next Steps

Being upfront about what's incomplete, since this is a real project I'm still iterating on:

- **`/doctor-dashboard` has no authentication yet** — The next step is adding a staff login separate from the patient auth system.
- **Telehealth page is informational only** — there's no real video-call integration yet.

---

## Acknowledgments

Built for and with input from the team at Dhriti (Mind Clinic and Counseling Center), Hyderabad.

Thanks to Dr. K.B Nihal for providing gallery images for the clinic to use on the website.
