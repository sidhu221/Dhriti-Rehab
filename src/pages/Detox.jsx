import "../style/Detox.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

export default function Detox() {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <section className="program-page">
        <div className="program-layout">

          {/* LEFT SIDE CONTENT */}
          <div className="program-left">
            <h1>Detox & Stabilization</h1>

            <p className="program-intro">
              Our Detox & Stabilization program provides safe, supportive care for individuals
              who are beginning their recovery journey. The focus is on helping people regain
              physical and emotional balance in a structured, compassionate environment.
              Detox is the first step toward long‑term wellbeing, and our team ensures that
              individuals feel supported, understood, and guided throughout the process.
            </p>

            <h2>What This Program Supports</h2>
            <ul>
              <li>Managing early withdrawal‑related discomfort safely</li>
              <li>Stabilizing physical and emotional wellbeing</li>
              <li>Reducing stress and anxiety during early recovery</li>
              <li>Helping individuals build healthy routines</li>
              <li>Providing supportive counseling and monitoring</li>
            </ul>


            {/* DO'S AND DON'TS */}
            <div className="dos-donts">

              <div className="dos-box">
                <h3>Helpful Do’s</h3>
                <ul>
                  <li><span className="check-icon">✔</span> Stay hydrated and follow the guidance of trained professionals.</li>
                  <li><span className="check-icon">✔</span> Reach out for emotional support when things feel overwhelming.</li>
                  <li><span className="check-icon">✔</span> Rest as much as your body needs during early stabilization.</li>
                  <li><span className="check-icon">✔</span> Share any discomfort or concerns with your care team.</li>
                  <li><span className="check-icon">✔</span> Surround yourself with supportive people who encourage recovery.</li>
                </ul>
              </div>

              <div className="donts-box">
                <h3>Important Don’ts</h3>
                <ul>
                  <li><span className="x-icon">✘</span> Don’t try to manage withdrawal alone — support makes it safer.</li>
                  <li><span className="x-icon">✘</span> Don’t ignore physical or emotional symptoms that feel unusual.</li>
                  <li><span className="x-icon">✘</span> Don’t isolate yourself during early recovery.</li>
                  <li><span className="x-icon">✘</span> Don’t return to stressful environments without support.</li>
                  <li><span className="x-icon">✘</span> Don’t skip follow‑up care or stabilization sessions.</li>
                </ul>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE SIDEBAR */}
          <div className="program-right-column">
            <aside className="program-sidebar">
              <h3>Programs</h3>
              <ul>
                <li onClick={() => navigate("/programs/general")}>General Programs</li>
                <li onClick={() => navigate("/programs/alcohol")}>Alcohol De‑Addiction</li>
                <li onClick={() => navigate("/programs/drug")}>Drug De‑Addiction</li>
                <li onClick={() => navigate("/programs/psychiatry")}>Adult Psychiatry</li>
                <li onClick={() => navigate("/programs/psychology")}>Psychological Services</li>
                <li onClick={() => navigate("/programs/detox")}>Detox & Stabilization</li>
              </ul>
            </aside>
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}
