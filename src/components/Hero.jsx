import "./Hero.css"

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Compassionate Care for a Stronger Tomorrow</h1>
        <p>
          Dhriti RehabCenter provides supportive, evidence‑based rehabilitation
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
      </div>

      <div className="hero-image">
        <img src="/images/hero.jpg" alt="Dhriti RehabCenter" />
      </div>
    </section>
  )
}
