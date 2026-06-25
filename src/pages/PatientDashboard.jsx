import "../style/PatientDashboard.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  getCurrentPatientAppointments,
  getCurrentPatientProfile,
  signOutPatient
} from "../api/patientProfiles"

function formatDate(date) {
  if (!date) return "Not scheduled"
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}

export default function PatientDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const patientName = useMemo(() => {
    if (profile?.first_name || profile?.last_name) {
      return `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim()
    }

    return user?.email || "Patient"
  }, [profile, user])

  const nextAppointment = appointments.find((appointment) => {
    const appointmentDate = new Date(`${appointment.date}T23:59:59`)
    return appointmentDate >= new Date()
  })

  // Loads only the currently authenticated patient's profile and appointments.
  const loadDashboard = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const { user: currentUser, profile: currentProfile } =
        await getCurrentPatientProfile()

      if (!currentUser) {
        navigate("/login")
        return
      }

      const patientEmail = currentProfile?.email || currentUser.email
      const patientAppointments = await getCurrentPatientAppointments(patientEmail)

      setUser(currentUser)
      setProfile(currentProfile)
      setAppointments(patientAppointments)
    } catch (err) {
      setError(err.message || "Unable to load your dashboard.")
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  async function handleSignOut() {
    await signOutPatient()
    navigate("/login")
  }

  return (
    <>
      <Header />

      <main className="patient-dashboard-page">
        <section className="patient-dashboard-hero">
          <div>
            <p className="patient-dashboard-kicker">Patient Portal</p>
            <h1>Welcome, {patientName}</h1>
            <p>
              View your profile, upcoming appointments, and care resources from one
              private dashboard.
            </p>
          </div>

          <button className="patient-dashboard-signout" onClick={handleSignOut}>
            Sign Out
          </button>
        </section>

        {loading && <p className="patient-dashboard-status">Loading your dashboard...</p>}
        {error && <p className="patient-dashboard-error">{error}</p>}

        {!loading && !error && (
          <section className="patient-dashboard-grid">
            <div className="patient-dashboard-card profile-card">
              <h2>Profile</h2>
              <dl>
                <div>
                  <dt>Name</dt>
                  <dd>{patientName}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{profile?.email || user?.email}</dd>
                </div>
                <div>
                  <dt>Date of Birth</dt>
                  <dd>{profile?.dob ? formatDate(profile.dob) : "Not provided"}</dd>
                </div>
              </dl>
            </div>

            <div className="patient-dashboard-card next-card">
              <h2>Next Appointment</h2>
              {nextAppointment ? (
                <div className="appointment-summary">
                  <strong>{formatDate(nextAppointment.date)}</strong>
                  <span>{nextAppointment.time}</span>
                  <p>{nextAppointment.doctors?.name || "Provider unavailable"}</p>
                </div>
              ) : (
                <p>No upcoming appointment is currently scheduled.</p>
              )}
              <Link to="/appointment" className="patient-dashboard-action">
                Book Appointment
              </Link>
            </div>

            <div className="patient-dashboard-card appointments-card">
              <h2>Appointment History</h2>
              {appointments.length > 0 ? (
                <ul>
                  {appointments.map((appointment) => (
                    <li key={appointment.id}>
                      <span>{formatDate(appointment.date)}</span>
                      <strong>{appointment.time}</strong>
                      <em>{appointment.doctors?.name || "Provider unavailable"}</em>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Your appointments will appear here after booking.</p>
              )}
            </div>

            <div className="patient-dashboard-card resources-card">
              <h2>Quick Actions</h2>
              <div className="patient-dashboard-actions">
                <Link to="/telehealth">Telehealth</Link>
                <Link to="/providers">View Providers</Link>
                <Link to="/contact">Contact Clinic</Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
