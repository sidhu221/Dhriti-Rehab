import { createClient } from "@supabase/supabase-js"

// Vite exposes only environment variables that start with VITE_ to the browser.
// These values must be present in .env for the frontend to connect to Supabase.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fail fast with a helpful message if the Supabase connection is not configured.
// Without this check, Supabase requests can fail later with confusing network errors.
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env")
}

// Shared Supabase browser client used by all API helper files.
export const supabase = createClient(supabaseUrl, supabaseKey)
