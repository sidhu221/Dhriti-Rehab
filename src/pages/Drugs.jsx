import "../style/Alcohol-Page.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

export default function DrugsDeAddiction() {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <section className="program-page">
        <div className="program-layout">

          {/* LEFT: TEXT */}
          <div className="program-left">
            <h1>Drug De‑Addiction Program</h1>

            <p className="program-intro">
              Our Drug De‑Addiction Program helps individuals regain stability,
              confidence, and emotional balance. We focus on safe withdrawal support,
              compassionate guidance, and long‑term recovery skills tailored to each person.
            </p>

            <h2>What This Program Helps With</h2>
            <p>
              Many people experience physical or emotional discomfort when reducing
              alcohol use. Our team provides supportive monitoring and therapeutic
              care to help you move through this stage safely and confidently.
            </p>

            <h2>How the Program Works</h2>
            <p>
              This is a 4 week program that begins with a supervised stabilization phase, that involves 1 week of detox and 3 weeks of psychological therapy.
              Treatment begins with a supervised stabilization phase, followed by
              personalized therapy sessions. You’ll work with trained clinicians who
              help you understand triggers, build coping strategies, and strengthen
              your support system.
            </p>

            <h2>What’s Included</h2>
            <ul>
              <li>Supportive medical monitoring</li>
              <li>Individual and group therapy</li>
              <li>Family‑focused sessions</li>
              <li>Skills for long‑term recovery</li>
              <li>Optional aftercare planning</li>
            </ul>

            <div className="dos-donts">

        <div className="dos-box">
        <h3>Helpful Do’s</h3>
        <ul>
            <li><span className="check-icon">✔</span> Follow your treatment plan consistently — structure helps your body and mind stabilize.</li>
            <li><span className="check-icon">✔</span> Stay hydrated and eat balanced meals to support your recovery.</li>
            <li><span className="check-icon">✔</span> Reach out to your care team or a trusted person when cravings or stress feel intense.</li>
            <li><span className="check-icon">✔</span> Build a daily routine that includes rest, movement, and calming activities.</li>
            <li><span className="check-icon">✔</span> Celebrate progress, even if it feels small — every step forward matters.</li>
        </ul>
        </div>


        <div className="donts-box">
        <h3>Important Don’ts</h3>
        <ul>
            <li><span className="x-icon">✘</span> Don’t attempt withdrawal alone — supervised care keeps you safe and supported.</li>
            <li><span className="x-icon">✘</span> Don’t hide symptoms, cravings, or setbacks — honesty helps your team guide you.</li>
            <li><span className="x-icon">✘</span> Don’t spend time in environments or situations that trigger old habits.</li>
            <li><span className="x-icon">✘</span> Don’t compare your recovery to others — healing looks different for everyone.</li>
            <li><span className="x-icon">✘</span> Don’t isolate yourself — connection is one of the strongest tools in recovery.</li>
        </ul>
        </div>


        </div>

          </div>

          {/* RIGHT: IMAGE + SIDEBAR STACKED */}
          <div className="program-right-column">
            <div className="program-right">
              <img
                src="https://www.stepbystep.com/wp-content/uploads/2012/04/No-to-Drug-Abuse.jpg"
                alt="Drugs De-Addiction Program"
              />
            </div>

            <aside className="program-sidebar">
              <h3>Programs</h3>
              <ul>
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
