import "../style/AppointmentDetails.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { bookAppointment } from "../api/appointments"
import emailjs from "@emailjs/browser"

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const DOCTOR_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_DOCTOR_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const CLINIC_EMAIL = "dhritirehab@gmail.com"

// Notifies the assigned doctor (falling back to the clinic inbox) with the
// patient's details so they know who's coming in without checking the dashboard.
// Booking is already confirmed by this point, so a failed notification is
// logged rather than surfaced as a booking error.
function notifyDoctor(booking) {
  emailjs
    .send(
      SERVICE_ID,
      DOCTOR_TEMPLATE_ID,
      {
        to_email: booking.doctors?.email || CLINIC_EMAIL,
        doctor_name: booking.doctors?.name || "Dr. K.B Nihal",
        patient_name: booking.patients?.name || "",
        patient_phone: booking.patients?.phone || "",
        patient_email: booking.patients?.email || "Not provided",
        date: booking.date,
        time: booking.time,
        appointment_type: booking.appointment_type === "telehealth" ? "Telehealth" : "In-Person"
      },
      { publicKey: PUBLIC_KEY }
    )
    .catch((error) => console.error("Error notifying doctor:", error))
}

export default function AppointmentDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const slot = location.state?.slot

  const [form, setForm] = useState({ name: "", phone: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(null)

  // This page expects the selected slot to be passed from the appointment calendar.
  if (!slot) {
    return (
      <>
        <Header />
        <section className="appointment-details-page">
          <p>No appointment slot selected.</p>
        </section>
        <Footer />
      </>
    )
  }

  // Keeps form state in sync with the patient details inputs.
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Saves the patient and marks the chosen appointment slot as booked in Supabase.
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await bookAppointment({
        appointmentId: slot.id,
        patient: form,
        appointmentType: slot.appointmentType
      })
      setConfirmed(data)
      notifyDoctor(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <section className="appointment-details-page">
        {!confirmed && (
          <div className="details-card">
            <h1>Patient Details</h1>
            <p>
              <strong>Doctor:</strong> {slot.doctor?.name || "Dr. Dhriti"}<br />
              <strong>Date:</strong> {slot.date}<br />
              <strong>Time:</strong> {slot.time}<br />
              <strong>Type:</strong> {slot.appointmentType === "telehealth" ? "Telehealth" : "In-Person"}
            </p>

            <form onSubmit={handleSubmit} className="details-form">
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <label>Email (optional)</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />

              <button type="submit" disabled={loading}>
                {loading ? "Booking..." : "Confirm Appointment"}
              </button>
            </form>
          </div>
        )}

        {confirmed && (
          <div className="details-card">
            <h1>Appointment Confirmed</h1>
            <p>
              <strong>Doctor:</strong> {confirmed.doctors?.name || "Dr. K.B Nihal"}<br />
              <strong>Date:</strong> {confirmed.date}<br />
              <strong>Time:</strong> {confirmed.time}<br />
              <strong>Type:</strong> {confirmed.appointment_type === "telehealth" ? "Telehealth" : "In-Person"}<br />
              <strong>Contact:</strong> {confirmed.doctors?.phone || "Contact clinic"}
            </p>

            <p>
              Thank you, {form.name}. Your appointment has been booked. If you need to
              make changes, please contact the clinic directly.
            </p>

            <button onClick={() => navigate("/")}>
              Return to Home
            </button>
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}
