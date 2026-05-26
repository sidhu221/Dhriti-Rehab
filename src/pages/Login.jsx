import "../style/Login.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Login() {
  return (
    <>
      <Header />

      <section className="login-page">

        <div className="login-card">

          <h2>Welcome Back</h2>
          <p className="login-subtitle">Log in to access your account</p>

          <form className="login-form">

            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" />

            <button type="submit" className="login-btn">
              Login
            </button>

          </form>

          <div className="login-links">
            <a href="/forgot-password">Forgot Password</a>
            <a href="/signup">Create an Account</a>
          </div>

        </div>

      </section>

      <Footer />
    </>
  )
}
