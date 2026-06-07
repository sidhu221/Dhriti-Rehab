import { supabase } from "../lib/supabaseClient"

// Reads every patient row, newest first, for staff/admin views.
export async function getPatients() {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// Reads one patient by primary key. .single() expects exactly one matching row.
export async function getPatientById(id) {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

// Creates a patient record from the appointment details form.
export async function createPatient(patient) {
  const { data, error } = await supabase
    .from("patients")
    .insert({
      name: patient.name,
      phone: patient.phone,
      email: patient.email || null
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Updates patient contact details while preserving any fields not provided.
export async function updatePatient(id, patient) {
  const updates = {
    ...(patient.name !== undefined && { name: patient.name }),
    ...(patient.phone !== undefined && { phone: patient.phone }),
    ...(patient.email !== undefined && { email: patient.email || null })
  }

  const { data, error } = await supabase
    .from("patients")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Deletes a patient row. Use carefully because appointments can still reference patients.
export async function deletePatient(id) {
  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", id)

  if (error) throw error
}

// Gets all appointments linked to one patient, including the assigned doctor details.
export async function getAppointmentsForPatient(patientId) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, doctors(*)")
    .eq("patient_id", patientId)
    .order("date", { ascending: false })
    .order("time")

  if (error) throw error
  return data
}
