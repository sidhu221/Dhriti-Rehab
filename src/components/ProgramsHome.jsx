import "../style/ProgramsHome.css"
import { Link } from "react-router-dom"

export default function Programs() {
  const programs = [
    {
      title: "Alcohol De‑Addiction",
      desc: "Medically supervised detox and counseling for sustainable recovery.",
      icon: "🧴",
      link: "/programs/alcohol"
    },
    {
      title: "Drug De‑Addiction",
      desc: "Evidence‑based pathways for opioid, stimulant, and prescription dependence.",
      icon: "🌿",
      link: "/programs/drug"
    },
    {
      title: "Adult Psychiatry",
      desc: "Comprehensive psychiatric evaluations and medication management.",
      icon: "🧠",
      link: "/programs/psychiatry"
    },
    {
      title: "Psychological Services",
      desc: "Therapy, assessments, and long‑term mental wellness support.",
      icon: "💬",
      link: "/programs/psychology"
    },
    {
      title: "Detox & Stabilization",
      desc: "Round‑the‑clock medical oversight for safe, comfortable withdrawal.",
      icon: "⚕️",
      link: "/programs/detox"
    }
  ]

  return (
    <section className="programs-page">
      <div className="programs-container">

        <h2 className="programs-title">Personalized Recovery Paths</h2>
        <p className="programs-subtitle">
          Specialized clinical programs designed to support every stage of healing.
        </p>

        <div className="programs-grid">
          {programs.map((p, index) => (
            <div className="program-card" key={index}>
              <div className="program-icon">{p.icon}</div>

              <h3>{p.title}</h3>
              <p>{p.desc}</p>

              <Link className="program-link" to={p.link}>
                Learn More →
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
