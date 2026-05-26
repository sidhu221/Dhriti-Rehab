import "../style/Appointment.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Appointment() {
  const navigate = useNavigate()

  // Example doctors
  const doctors = {
    drA: { name: "Dr. Meera Rao", color: "#4cb5ae", phone: "+91 98765 11111" },
    drB: { name: "Dr. Arjun Patel", color: "#ff9f43", phone: "+91 98765 22222" },
    drC: { name: "Dr. Kavya Sharma", color: "#6c63ff", phone: "+91 98765 33333" }
  }

  // Example schedule
  const schedule = [
    { time: "9:00 AM", doctor: "drA", occupied: false },
    { time: "9:30 AM", doctor: "drB", occupied: true },
    { time: "10:00 AM", doctor: "drC", occupied: false },
    { time: "10:30 AM", doctor: "drA", occupied: true },
    { time: "11:00 AM", doctor: "drB", occupied: false },
    { time: "11:30 AM", doctor: "drC", occupied: false }
  ]

  const [selectedSlot, setSelectedSlot] = useState(null)

  return (
    <>
      <Header />

      <section className="appointment-page">

        <h1>Book an Appointment</h1>

        {/* CALENDAR */}
        <div className="calendar-box">
          <h2>Select a Date</h2>
          <input type="date" className="calendar-input" />
        </div>

        {/* TIME SLOTS */}
        <div className="timeslot-container">
          <h2>Available Times</h2>

          <div className="timeslot-grid">
            {schedule.map((slot, index) => {
              const doc = doctors[slot.doctor]

              return (
                <div
                  key={index}
                  className={`timeslot ${slot.occupied ? "occupied" : ""}`}
                  style={{ borderLeft: `6px solid ${doc.color}` }}
                  onClick={() => !slot.occupied && setSelectedSlot({ ...slot, doctorInfo: doc })}
                >
                  <span className="slot-time">{slot.time}</span>
                  <span className="slot-doctor">{doc.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* POP-UP MODAL */}
        {selectedSlot && (
          <div className="modal-overlay" onClick={() => setSelectedSlot(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h3>{selectedSlot.doctorInfo.name}</h3>
              <p><strong>Time:</strong> {selectedSlot.time}</p>
              <p><strong>Contact:</strong> {selectedSlot.doctorInfo.phone}</p>

              <button
                className="book-btn"
                onClick={() => navigate("/appointment-details")}
              >
                Book Appointment
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
