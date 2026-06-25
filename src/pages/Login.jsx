import "../style/Login.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInPatient } from "../api/patientProfiles"

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signInPatient(form)
      navigate("/patient-dashboard")
    } catch (err) {
      setError(err.message || "Unable to log in. Please check your email and password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <section className="login-page">

        <div className="login-card">

          <h2>Welcome Back</h2>
          <p className="login-subtitle">Log in to access your account</p>

          <form className="login-form" onSubmit={handleSubmit}>

            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <div className="login-links">
            <Link to="/forgot-password">Forgot Password</Link>
            <Link to="/signup">Create an Account</Link>
          </div>

        </div>

      </section>

      <Footer />
    </>
  )
}
