import "./Programs.css"

export default function Programs() {
  return (
    <section className="programs-section">
      <h2 className="programs-title">Our Programs</h2>
      <p className="programs-subtitle">
        Supportive, evidence‑based programs designed to help you heal, grow, and thrive.
      </p>

      <div className="programs-grid">

        <div className="program-card">
          <h3>Rehabilitation Therapy</h3>
          <p>
            Personalized physical and emotional rehabilitation plans to help you regain
            strength, mobility, and confidence.
          </p>
          <a href="/programs" className="program-link">Learn More →</a>
        </div>

        <div className="program-card">
          <h3>Mental Wellness Support</h3>
          <p>
            Compassionate counseling and therapy sessions to support emotional well‑being
            and long‑term mental health.
          </p>
          <a href="/programs" className="program-link">Learn More →</a>
        </div>

        <div className="program-card">
          <h3>Youth & Family Programs</h3>
          <p>
            Supportive programs designed for teens, young adults, and families navigating
            challenging life situations together.
          </p>
          <a href="/programs" className="program-link">Learn More →</a>
        </div>

        <div className="program-card">
          <h3>Telehealth Sessions</h3>
          <p>
            Convenient online therapy and follow‑up sessions from the comfort of your home.
          </p>
          <a href="/programs" className="program-link">Learn More →</a>
        </div>

      </div>
    </section>
  )
}
