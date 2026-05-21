import "../style/TelehealthPage.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function TelehealthPage() {
  return (
    <>
    <Header />
    <section className="telehealth-page">
      <div className="telehealth-page-container">

        <h1>Telehealth Services</h1>
        <p className="telehealth-intro">
          Our telehealth program allows you to receive compassionate, private care
          from the comfort of your home. Whether you're continuing treatment or
          beginning your journey, our team is here to support you.
        </p>

        <div className="telehealth-page-content">
          <div className="telehealth-block">
            <h2>How Telehealth Works</h2>
            <p>
              You’ll meet with licensed clinicians through secure video sessions,
              message your care team privately, and schedule appointments with ease.
            </p>
          </div>

          <div className="telehealth-block">
            <h2>What You’ll Need</h2>
            <ul>
              <li>A quiet, private space</li>
              <li>A phone, tablet, or computer</li>
              <li>Reliable internet connection</li>
            </ul>
          </div>

          <div className="telehealth-block">
            <h2>Your Privacy Matters</h2>
            <p>
              All telehealth communication is encrypted and confidential. Your
              information is never shared without your written consent.
            </p>
          </div>
        </div>

      </div>
    </section>
    <Footer />
    </>
  )
}
