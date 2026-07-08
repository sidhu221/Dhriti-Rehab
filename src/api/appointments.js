import { supabase } from "../lib/supabaseClient"

// "time" is stored as text like "09:00 AM", so sorting it alphabetically in
// the database (or in JS) puts every "0X:XX PM" slot before "09:00 AM" -
// this converts it to minutes-since-midnight for a real chronological sort.
function timeToMinutes(time) {
  const [, hourStr, minStr, meridiem] = time.match(/(\d+):(\d+)\s*(AM|PM)/i) || []
  let hour = parseInt(hourStr, 10) % 12
  if (meridiem?.toUpperCase() === "PM") hour += 12
  return hour * 60 + parseInt(minStr, 10)
}

// Reads all appointment rows for a date and includes the linked doctor record.
// If this returns fewer rows than expected, check Supabase RLS policies and that
// each appointments.doctor_id points to an existing doctors.id row.
export async function getAppointmentsByDate(date) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, doctors(*)")
    .eq("date", date)
  if (error) throw error
  return [...data].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
}

// Clinic hours: 9 AM - 6 PM, one slot every half hour, Monday-Friday only.
const WEEKDAY_TIMES = [
  "09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM",
  "03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM"
]

// Parsed with an explicit local-midnight time so the day-of-week isn't
// shifted by UTC parsing of a bare "YYYY-MM-DD" string.
export function isWeekday(date) {
  const day = new Date(`${date}T00:00:00`).getDay()
  return day >= 1 && day <= 5
}

// Creates the default open schedule for every doctor on a date that has no slots yet.
// No-op on weekends: the clinic doesn't take weekend appointments.
export async function createDefaultScheduleForDate(date) {
  if (!isWeekday(date)) return

  const { data: doctors, error: docError } = await supabase.from("doctors").select("*")
  if (docError) throw docError

  const rows = doctors.flatMap((doc) =>
    WEEKDAY_TIMES.map((t) => ({
      doctor_id: doc.id,
      date,
      time: t,
      status: "open"
    }))
  )

  const { error } = await supabase
    .from("appointments")
    .upsert(rows, { onConflict: "doctor_id,date,time", ignoreDuplicates: true })
  if (error) throw error
}

// Makes sure a date has appointment rows before the UI tries to display it.
export async function ensureScheduleForDate(date) {
  if (!isWeekday(date)) return

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
export async function bookAppointment({ appointmentId, patient, appointmentType }) {
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
    .update({
      status: "booked",
      patient_id: patientData.id,
      appointment_type: appointmentType || "in-person"
    })
    .eq("id", appointmentId)
    .select("*, doctors(*), patients(*)")
    .single()

  if (error) throw error
  return data
}
