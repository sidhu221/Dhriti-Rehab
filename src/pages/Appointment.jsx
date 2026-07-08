import "../style/Appointment.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAppointmentsByDate, ensureScheduleForDate, isWeekday } from "../api/appointments"
import { getDoctors } from "../api/doctors"

function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

export default function Appointment() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(getTodayDate)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [appointmentType, setAppointmentType] = useState("in-person")

  // Creates slots when needed, then loads the complete schedule for the chosen date.
  const loadSchedule = useCallback(async (date, doctorId) => {
    if (!date) return
    setLoading(true)
    try {
      await ensureScheduleForDate(date, doctorId)
      const data = await getAppointmentsByDate(date, doctorId)
      setSlots(data)
    } catch (error) {
      console.error("Error loading schedule:", error)
      setSlots([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    async function fetchDefaultDoctor() {
      try {
        const doctors = await getDoctors()
        if (doctors?.length > 0) {
          setSelectedDoctor(doctors[0].id)
        }
      } catch (error) {
        console.error("Error loading doctor info:", error)
      }
    }

    fetchDefaultDoctor()
  }, [])

  // Reload the schedule whenever the selected date changes.
  // Intentionally not depending on selectedDoctor: getAppointmentsByDate/
  // ensureScheduleForDate don't filter by doctor, so including it here just
  // caused this effect to fire a second time the moment the default doctor
  // finished loading — racing two concurrent ensureScheduleForDate calls for
  // the same date and creating duplicate slots.
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      loadSchedule(selectedDate, selectedDoctor || undefined)
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
          <h2>Appointment Type</h2>
          <div className="appointment-type-toggle">
            <button
              type="button"
              className={`type-option ${appointmentType === "in-person" ? "active" : ""}`}
              onClick={() => setAppointmentType("in-person")}
            >
              🏥 In-Person
            </button>
            <button
              type="button"
              className={`type-option ${appointmentType === "telehealth" ? "active" : ""}`}
              onClick={() => setAppointmentType("telehealth")}
            >
              💻 Telehealth
            </button>
          </div>

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

          {!loading && !isWeekday(selectedDate) && (
            <p>
              We don't offer appointments on weekends. Please call{" "}
              <a href="tel:+917013708265">+91 7013708265</a> to schedule.
            </p>
          )}

          {!loading && isWeekday(selectedDate) && slots.length === 0 && (
            <p>No schedule available for this date.</p>
          )}

          <div className="timeslot-grid">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`timeslot ${slot.status === "booked" ? "occupied" : ""}`}
                style={{ borderLeft: `6px solid ${slot.doctors?.color || "#2e9e70"}` }}
                onClick={() =>
                  slot.status !== "booked" &&
                  setSelectedSlot({
                    id: slot.id,
                    time: slot.time,
                    date: slot.date,
                    doctor: slot.doctors,
                    appointmentType
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
              <p>
                <strong>Type:</strong>{" "}
                {selectedSlot.appointmentType === "telehealth" ? "Telehealth" : "In-Person"}
              </p>
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
