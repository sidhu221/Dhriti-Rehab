import "../style/Appointment.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAppointmentsByDate, ensureScheduleForDate } from "../api/appointments"

function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

export default function Appointment() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(getTodayDate)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)

  // Creates slots when needed, then loads the complete schedule for the chosen date.
  const loadSchedule = useCallback(async (date) => {
    if (!date) return
    setLoading(true)
    try {
      await ensureScheduleForDate(date)
      const data = await getAppointmentsByDate(date)
      setSlots(data)
    } catch (error) {
      console.error("Error loading schedule:", error)
      setSlots([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Reload the schedule whenever the selected date changes.
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      loadSchedule(selectedDate)
    }, 0)

    return () => clearTimeout(loadTimer)
  }, [loadSchedule, selectedDate])

  // When a patient picks a new date, the effect above loads that date's schedule.
  function handleDateChange(e) {
    setSelectedDate(e.target.value)
  }

  return (
    <>
      <Header />

      <section className="appointment-page">
        <h1>Book an Appointment</h1>

        <div className="calendar-box">
          <h2>Select a Date</h2>
          <input
            type="date"
            className="calendar-input"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="timeslot-container">
          <h2>Available Times</h2>

          {loading && <p>Loading schedule...</p>}

          {!loading && slots.length === 0 && (
            <p>No schedule available for this date.</p>
          )}

          <div className="timeslot-grid">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`timeslot ${slot.status === "booked" ? "occupied" : ""}`}
                style={{ borderLeft: `6px solid ${slot.doctors?.color || "#4cb5ae"}` }}
                onClick={() =>
                  slot.status !== "booked" &&
                  setSelectedSlot({
                    id: slot.id,
                    time: slot.time,
                    date: slot.date,
                    doctor: slot.doctors
                  })
                }
              >
                <span className="slot-time">{slot.time}</span>
                <span className="slot-doctor">{slot.doctors?.name || "Provider unavailable"}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedSlot && (
          <div className="modal-overlay" onClick={() => setSelectedSlot(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h3>{selectedSlot.doctor?.name || "Provider unavailable"}</h3>
              <p><strong>Date:</strong> {selectedSlot.date}</p>
              <p><strong>Time:</strong> {selectedSlot.time}</p>
              <p><strong>Contact:</strong> {selectedSlot.doctor?.phone || "Contact clinic"}</p>

              <button
                className="book-btn"
                onClick={() =>
                  navigate(`/appointment/${selectedSlot.id}`, { state: { slot: selectedSlot } })
                }
              >
                Continue to Details
              </button>

              <button className="close-btn" onClick={() => setSelectedSlot(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}
