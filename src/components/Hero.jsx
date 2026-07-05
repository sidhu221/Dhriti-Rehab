import "../style/Hero.css"

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-badge">Licensed Rehabilitation &amp; Mental Wellness Center</span>

        <h1>Compassionate Care for a Stronger Tomorrow</h1>
        <p>
          Dhriti De-Addiction and Rehab Center provides supportive, evidence‑based rehabilitation
          and mental wellness programs to help you rebuild, recover, and thrive.
        </p>

        <div className="hero-buttons">
          <a href="/appointment" className="primary-btn">
            Book Appointment
          </a>
          <a href="/programs" className="secondary-btn">
            Explore Programs
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat hero-stat-navy">
            <strong>5+</strong>
            <span>Specialized Programs</span>
          </div>
          <div className="hero-stat hero-stat-green">
            <strong>Licensed</strong>
            <span>Clinical Providers</span>
          </div>
          <div className="hero-stat hero-stat-orange">
            <strong>100%</strong>
            <span>Confidential Care</span>
          </div>
        </div>

        <div className="hero-schedule">
          <p>
            <strong>Mon–Fri:</strong> 9:00 AM – 6:00 PM
          </p>
          <p>
            <strong>Weekends:</strong> Subject to provider availability
          </p>
          <p>
            <strong style={{ color: "red" }}><em>Prior Meeting is Mandatory</em></strong>
          </p>
        </div>
      </div>

      <div className="hero-image">
        <img src="/building_pic.png" alt="Dhriti RehabCenter" />
      </div>
    </section>
  )
}
