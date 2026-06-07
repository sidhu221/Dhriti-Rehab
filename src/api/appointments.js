import { supabase } from "../lib/supabaseClient"

// Reads all appointment rows for a date and includes the linked doctor record.
// If this returns fewer rows than expected, check Supabase RLS policies and that
// each appointments.doctor_id points to an existing doctors.id row.
export async function getAppointmentsByDate(date) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, doctors(*)")
    .eq("date", date)
    .order("time")
  if (error) throw error
  return data
}

// Creates the default open schedule for every doctor on a date that has no slots yet.
export async function createDefaultScheduleForDate(date) {
  const { data: doctors, error: docError } = await supabase.from("doctors").select("*")
  if (docError) throw docError

  const times = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM"]

  const rows = doctors.flatMap((doc) =>
    times.map((t) => ({
      doctor_id: doc.id,
      date,
      time: t,
      status: "open"
    }))
  )

  const { error } = await supabase.from("appointments").insert(rows)
  if (error) throw error
}

// Makes sure a date has appointment rows before the UI tries to display it.
export async function ensureScheduleForDate(date) {
  const { data, error } = await supabase
    .from("appointments")
    .select("id")
    .eq("date", date)
    .limit(1)

  if (error) throw error
  if (!data || data.length === 0) {
    await createDefaultScheduleForDate(date)
  }
}

// Books a slot by first creating a patient row, then linking that patient to the appointment.
export async function bookAppointment({ appointmentId, patient }) {
  const { data: patientData, error: patientError } = await supabase
    .from("patients")
    .insert({
      name: patient.name,
      phone: patient.phone,
      email: patient.email || null
    })
    .select()
    .single()

  if (patientError) throw patientError

  const { data, error } = await supabase
    .from("appointments")
    .update({ status: "booked", patient_id: patientData.id })
    .eq("id", appointmentId)
    .select("*, doctors(*), patients(*)")
    .single()

  if (error) throw error
  return data
}
