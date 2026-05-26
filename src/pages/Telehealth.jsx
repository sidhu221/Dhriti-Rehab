import "../style/TelehealthPage.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

export default function Telehealth() {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <section className="telehealth-page">

        <div className="telehealth-layout">

          {/* LEFT SIDE */}
          <div className="telehealth-left">

            {/* HEADER BOX */}
            <div className="telehealth-box">
              <h1>Telehealth Services</h1>
              <p>
                Our telehealth program allows you to receive compassionate, private care from
                the comfort of your home. Whether you're continuing treatment or beginning
                your journey, our team is here to support you with secure, flexible, and
                accessible care options.
              </p>

              {/* SCHEDULE BUTTON */}
              <button
                className="schedule-btn"
                onClick={() => navigate("/appointment")}
              >
                📅 Schedule a Meeting
              </button>
            </div>

            {/* HOW IT WORKS */}
            <div className="telehealth-section colored-section">
              <h2>How Telehealth Works</h2>
              <p>
                You’ll meet with licensed clinicians through secure video sessions, message
                your care team privately, and schedule appointments with ease. Telehealth
                makes it simple to stay connected and supported.
              </p>
            </div>

            {/* GRID CARDS */}
            <div className="telehealth-grid">

              <div className="telehealth-card">
                <h3>🧩 What You’ll Need</h3>
                <ul>
                  <li>A quiet, private space</li>
                  <li>A phone, tablet, or computer</li>
                  <li>Reliable internet connection</li>
                </ul>
              </div>

              <div className="telehealth-card">
                <h3>🔒 Your Privacy Matters</h3>
                <p>
                  All telehealth communication is encrypted and confidential. Your information
                  is never shared without your written consent.
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="telehealth-right">
            <div className="telehealth-image-placeholder"></div>
          </div>

        </div>

      </section>

      <Footer />
    </>
  )
}
