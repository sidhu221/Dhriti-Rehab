import "../style/ForgotPassword.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"
import { Link } from "react-router-dom"
import { requestPasswordReset } from "../api/passwordReset"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  // Checks the patient profile table and asks Supabase to email the reset link.
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const result = await requestPasswordReset(email)

      if (result.sent) {
        setMessage(result.message)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err.message || "Unable to send password reset email.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <section className="forgot-password-page">
        <div className="forgot-password-card">
          <h2>Forgot Password</h2>
          <p className="forgot-password-subtitle">
            Enter your email and we will send a password reset link if it is on file.
          </p>

          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <label htmlFor="resetEmail">Email</label>
            <input
              id="resetEmail"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {message && <p className="forgot-password-message success">{message}</p>}
            {error && <p className="forgot-password-message error">{error}</p>}

            <button type="submit" className="forgot-password-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </form>

          <p className="forgot-password-login-link">
            Remembered your password? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
