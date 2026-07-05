import "../style/ProvidersHome.css"
import { useNavigate } from "react-router-dom"

export default function ProvidersHome() {
  const navigate = useNavigate()

  const providers = [
    {
      name: "Dr. K.B Nihal",
      title: "Consultant Psychiatrist",
      img: "https://via.placeholder.com/400x450?text=Provider+1"
    },
    {
      name: "Ms. Gowthami Soudamini",
      title: "Clinical Psychologist",
      img: "https://via.placeholder.com/400x450?text=Provider+2"
    },
    {
      name: "Dr. Sugunakar Reddy Kotha",
      title: "Consultant Physician and Diabetologist",
      img: "https://via.placeholder.com/400x450?text=Provider+3"
    }
  ]

  return (
    <section className="providers-home-section">
      <h2 className="providers-home-title">Meet the Providers</h2>
      <p className="providers-home-subtitle">
        Compassionate, experienced care. Every clinician on our team is trained in
        trauma‑informed care and committed to your safety.
      </p>

      <div className="providers-home-grid">
        {providers.map((p, index) => (
          <div className="provider-card" key={index}>
            <img src={p.img} alt={p.name} className="provider-img" />

            <div className="provider-info">
              <h3>{p.name}</h3>
              <p>{p.title}</p>
            </div>

            {/* Hover Overlay */}
            <div className="provider-hover">
              <button
                className="provider-btn"
                onClick={() => navigate("/providers")}
              >
                Read Full Bio
              </button>

              <button
                className="provider-btn secondary"
                onClick={() => navigate("/contact")}
              >
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
