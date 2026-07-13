import "../style/NotFound.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const REDIRECT_DELAY_MS = 4000

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), REDIRECT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <>
      <Header />

      <section className="not-found-page">
        <div className="not-found-card">
          <h1>404</h1>
          <p>We couldn't find the page you were looking for.</p>
          <p className="not-found-redirect-note">
            Taking you back to the homepage...
          </p>
          <button onClick={() => navigate("/")}>Return Home Now</button>
        </div>
      </section>

      <Footer />
    </>
  )
}
