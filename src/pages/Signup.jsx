import "../style/Signup.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"
import { Link } from "react-router-dom"
import { signUpPatientProfile } from "../api/patientProfiles"

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  // Keeps each input connected to the local signup form state.
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Sends signup details to Supabase Auth and patient_profiles.
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const result = await signUpPatientProfile(form)
      setMessage(result.message)
      setForm({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        password: ""
      })
    } catch (err) {
      setError(err.message || "Unable to create account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <section className="signup-page">
        <div className="signup-card">
          <h2>Create Account</h2>
          <p className="signup-subtitle">Enter your details to set up your patient profile</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-row">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email Username</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              minLength="6"
              required
            />

            {message && <p className="signup-message success">{message}</p>}
            {error && <p className="signup-message error">{error}</p>}

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="signup-login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
