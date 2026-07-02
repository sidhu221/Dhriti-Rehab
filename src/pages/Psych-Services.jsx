import "../style/PsychologicalServices.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

export default function PsychologicalServices() {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <section className="program-page">
        <div className="program-layout">

          {/* LEFT SIDE CONTENT */}
          <div className="program-left">
            <h1>Psychological Services</h1>

            <p className="program-intro">
              Our Psychological Services support individuals across the Hyderabad region
              by offering therapy‑based care focused on emotional wellbeing, resilience,
              and personal growth. Our licensed therapists and counselors work with
              individuals, families, and young adults to help them navigate stress,
              relationships, and life challenges with confidence and clarity.
            </p>

            <h2>What We Offer</h2>
            <ul>
              <li>Individual Therapy for emotional wellbeing and coping skills</li>
              <li>Family Counseling to strengthen communication and understanding</li>
              <li>Relationship & Couples Support for healthier connection</li>
              <li>Stress & Anxiety Management strategies</li>
              <li>Mood Support & Emotional Regulation guidance</li>
              <li>Behavioral Therapy approaches for healthier habits</li>
              <li>Trauma‑Informed Support for difficult life experiences</li>
              <li>Workplace Stress & Burnout Support</li>
              <li>Adolescent & Young Adult Emotional Support</li>
            </ul>

            {/* FIND THE RIGHT PROVIDER BOX */}
            <div className="provider-box">
              <h3>Find the Right Provider</h3>
              <p>
                Explore our team of experienced therapists, counselors, and mental‑health
                professionals to find the provider who best fits your needs. Our clinicians
                are committed to offering supportive, evidence‑based care for individuals
                across all stages of life.
              </p>

  

              <button
                className="provider-button"
                onClick={() => navigate("/providers")}
              >
                View Providers
              </button>
            </div>

          </div>

          {/* RIGHT SIDE: IMAGE + SIDEBAR */}
          <div className="program-right-column">

            {/* IMAGE ON TOP RIGHT */}
            <div className="program-right">
              <img
                src="https://nevaancounselingcenter.com/wp-content/uploads/2024/12/family.jpeg"
                alt="Psychological Services"
                className="psych-services-image"
              />
            </div>

            {/* SIDEBAR BELOW IMAGE */}
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
