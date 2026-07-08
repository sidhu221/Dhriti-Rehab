import "../style/About.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function About() {
  return (
    <>
      <Header />

      <section className="about-page">

        <div className="about-layout">

          <div className="about-left">
  <div className="about-content-box">
    <h1>About Our Clinic</h1>

    <p className="about-intro">
      We are dedicated to creating a warm, supportive, and accessible space for individuals
      seeking emotional and mental‑wellbeing support. Our team believes that every person
      deserves compassionate care, personalized guidance, and a safe environment to grow,
      heal, and thrive.
    </p>

    <h2>Our Mission</h2>
    <p>
      Our mission is to empower individuals by providing high‑quality, evidence‑based
      mental‑health services that promote resilience, balance, and long‑term wellbeing.
      We strive to make care approachable, respectful, and centered around each person’s
      unique needs.
    </p>

    <h2>How We Help</h2>
    <p>
      Whether someone is navigating stress, emotional challenges, or seeking support for
      personal growth, our clinicians offer thoughtful guidance and structured care. We
      focus on building healthy coping skills, strengthening emotional awareness, and
      helping individuals move toward a more confident and grounded life.
    </p>
  </div>
</div>


          {/* RIGHT SIDE — IMAGE */}
          <div className="about-right">
            <div className="about-image-placeholder">
              <img
                src="/dhriti-logo-full.png"
                alt="Clinic Logo"
              />
            </div>
          </div>

        </div>

      </section>

      <Footer />
    </>
  )
}
