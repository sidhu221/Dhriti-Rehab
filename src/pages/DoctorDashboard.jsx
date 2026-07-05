import "../style/DoctorDashboard.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCallback, useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { getAppointmentsByDate, ensureScheduleForDate } from "../api/appointments"

function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

export default function DoctorDashboard() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)

  // Loads a date's schedule for staff review and creates the default rows if missing.
  const load = useCallback(async (date) => {
    if (!date) return
    setLoading(true)
    try {
      await ensureScheduleForDate(date)
      const data = await getAppointmentsByDate(date)
      setSlots(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // Reload the staff schedule whenever the selected date changes.
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      load(selectedDate)
    }, 0)

    return () => clearTimeout(loadTimer)
  }, [load, selectedDate])

  // Toggles whether a slot is available. Booked slots created through the patient
  // form may also have a patient_id attached in Supabase.
  async function toggleSlotStatus(slot) {
    const newStatus = slot.status === "open" ? "booked" : "open"
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", slot.id)

    if (!error) {
      setSlots((prev) =>
        prev.map((s) => (s.id === slot.id ? { ...s, status: newStatus } : s))
      )
    }
  }

  return (
    <>
      <Header />

      <section className="doctor-dashboard-page">
        <h1>Doctor Dashboard</h1>

        <div className="calendar-box">
          <h2>Manage Schedule</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
            }}
          />
        </div>

        {loading && <p>Loading...</p>}

        <div className="dashboard-slots">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className={`dashboard-slot ${slot.status}`}
              style={{ borderLeft: `6px solid ${slot.doctors?.color || "#2e9e70"}` }}
            >
              <div>
                <strong>{slot.time}</strong> - {slot.doctors?.name || "Provider unavailable"}
              </div>
              <div>Status: {slot.status}</div>
              <button onClick={() => toggleSlotStatus(slot)}>
                {slot.status === "open" ? "Mark as Booked" : "Mark as Open"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
