import { supabase } from "../lib/supabaseClient"

// Fetches every doctor so the appointment calendar can build a slot for each provider.
export async function getDoctors() {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .order("name")

  if (error) throw error
  return data
}

// Fetches one doctor by primary key. .single() expects exactly one matching row.
export async function getDoctorById(id) {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}
