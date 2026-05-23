import "../style/AdultPsychiatry.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

export default function AdultPsychiatry() {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <section className="program-page">
        <div className="program-layout">

          {/* LEFT SIDE CONTENT */}
          <div className="program-left">
            <h1>Adult Psychiatry</h1>

            <p className="program-intro">
              Our Adult Psychiatry services focus on understanding emotional, behavioral,
              and psychological challenges that commonly affect adults. We provide
              supportive evaluation, therapy, and treatment planning to help individuals
              regain balance, clarity, and wellbeing.
            </p>

            <h2>Common Conditions We Support</h2>
            <ul>
              <li>Anxiety Disorders</li>
              <li>Depression</li>
              <li>Bipolar Spectrum Disorders</li>
              <li>Obsessive‑Compulsive Disorder (OCD)</li>
              <li>Post‑Traumatic Stress Disorder (PTSD)</li>
              <li>Generalized Stress & Adjustment Disorders</li>
              <li>Sleep‑Related Difficulties</li>
              <li>Somatic Symptom & Health‑Anxiety Disorders</li>
              <li>Attention Deficit Hyperactivity Disorder (ADHD)</li>
              <li>Personality‑Related Emotional Regulation Challenges</li>
            </ul>

            {/* DO'S AND DON'TS */}
            <div className="dos-donts">

              <div className="dos-box">
                <h3>Helpful Do’s</h3>
                <ul>
                  <li><span className="check-icon">✔</span> Reach out early when symptoms feel overwhelming — support can make a big difference.</li>
                  <li><span className="check-icon">✔</span> Keep track of mood changes, sleep patterns, and stress triggers to share with your clinician.</li>
                  <li><span className="check-icon">✔</span> Build healthy routines that include rest, movement, and calming activities.</li>
                  <li><span className="check-icon">✔</span> Stay connected with supportive people who help you feel grounded.</li>
                  <li><span className="check-icon">✔</span> Practice self‑compassion — healing takes time and patience.</li>
                </ul>
              </div>

              <div className="donts-box">
                <h3>Important Don’ts</h3>
                <ul>
                  <li><span className="x-icon">✘</span> Don’t ignore persistent symptoms — early attention helps prevent escalation.</li>
                  <li><span className="x-icon">✘</span> Don’t isolate yourself during difficult moments — connection supports recovery.</li>
                  <li><span className="x-icon">✘</span> Don’t rely on unhealthy coping habits to manage stress or emotions.</li>
                  <li><span className="x-icon">✘</span> Don’t compare your progress to others — every journey is unique.</li>
                  <li><span className="x-icon">✘</span> Don’t skip follow‑ups or recommended therapy sessions — consistency matters.</li>
                </ul>
              </div>
{/* EMERGENCY BOX */}
            <div className="emergency-box">
              <h3>Emergency Support</h3>
              <p>
                If you or someone around you is in immediate danger or experiencing a
                crisis, please contact India’s emergency helpline:
              </p>
              <strong className="emergency-number">112</strong>
              <p>This number is available 24/7 for urgent assistance.</p>
            </div>
            </div>
          </div>

          {/* RIGHT SIDE SIDEBAR */}
          <div className="program-right-column">
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
