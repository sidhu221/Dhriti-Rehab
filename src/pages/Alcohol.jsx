import "../style/Alcohol-Page.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

export default function AlcoholDeAddiction() {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <section className="program-page">
        <div className="program-layout">

          {/* LEFT: TEXT */}
          <div className="program-left">
            <h1>Alcohol De‑Addiction Program</h1>

            <p className="program-intro">
              Our Alcohol De‑Addiction Program helps individuals regain stability,
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
            <li><span className="check-icon">✔</span> Drink plenty of water to support your body during early recovery.</li>
            <li><span className="check-icon">✔</span> Keep a consistent sleep routine to help your mood and energy stabilize.</li>
            <li><span className="check-icon">✔</span> Reach out to someone you trust when cravings or stress feel overwhelming.</li>
            <li><span className="check-icon">✔</span> Celebrate small wins — every alcohol‑free day strengthens your progress.</li>
            </ul>
        </div>

        <div className="donts-box">
            <h3>Important Don’ts</h3>
            <ul>
            <li><span className="x-icon">✘</span> Don’t keep alcohol at home — removing access reduces temptation.</li>
            <li><span className="x-icon">✘</span> Don’t skip meals — low blood sugar can increase cravings.</li>
            <li><span className="x-icon">✘</span> Don’t isolate yourself during tough moments — connection helps you stay grounded.</li>
            <li><span className="x-icon">✘</span> Don’t compare your recovery pace to others — healing looks different for everyone.</li>
            </ul>
        </div>

        </div>

          </div>

          {/* RIGHT: IMAGE + SIDEBAR STACKED */}
          <div className="program-right-column">
            <div className="program-right">
              <img
                src="https://thumbs.dreamstime.com/b/stop-drinking-alcohol-sticker-colorful-crossed-out-bottle-glass-wine-anti-drunk-advertising-campaign-vector-296162021.jpg"
                alt="Alcohol De-Addiction Program"
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
