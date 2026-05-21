import "../style/Telehealth-Home.css"
import { useNavigate } from "react-router-dom"

export default function TelehealthHome() {
  const navigate = useNavigate()

  const features = [
    {
      title: "Secure video sessions",
      text: "End‑to‑end encrypted counseling from anywhere you feel safe."
    },
    {
      title: "Confidential messaging",
      text: "Reach your care team between sessions through private, secure chat."
    },
    {
      title: "Flexible scheduling",
      text: "Book, reschedule, or cancel sessions in seconds — evenings included."
    },
    {
      title: "Private by design",
      text: "Your records are encrypted and never shared without your consent."
    }
  ]

  return (
    <section className="telehealth-home">
      <div className="telehealth-home-container">

        {/* LEFT SIDE */}
        <div className="telehealth-home-left">
          <h3 className="telehealth-tag">TELEHEALTH</h3>
          <h2 className="telehealth-title">Care that meets you where you are.</h2>

          <p className="telehealth-desc">
            Continue your recovery from home with the same dedicated team.
            Confidential video, secure messaging, and easy scheduling — all built
            with your privacy in mind.
          </p>

          <button
            className="telehealth-home-btn"
            onClick={() => navigate("/telehealth")}
          >
            Start telehealth intake
          </button>
        </div>

        {/* RIGHT SIDE — FEATURES */}
        <div className="telehealth-home-features">
          {features.map((f, i) => (
            <div className="telehealth-feature-card" key={i}>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
