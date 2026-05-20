import "../style/Providers.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Providers() {
  const providers = [
    {
      name: "Dr. Aisha Verma",
      role: "Clinical Psychologist",
      img: "https://via.placeholder.com/150",
      email: "aisha.verma@example.com",
      phone: "(555) 123‑4567"
    },
    {
      name: "Dr. Michael Chen",
      role: "Psychiatrist",
      img: "https://via.placeholder.com/150",
      email: "michael.chen@example.com",
      phone: "(555) 987‑6543"
    },
    {
      name: "Dr. Sofia Martinez",
      role: "Family Therapist",
      img: "https://via.placeholder.com/150",
      email: "sofia.martinez@example.com",
      phone: "(555) 222‑8899"
    },
    {
      name: "Dr. Liam Patel",
      role: "Addiction Specialist",
      img: "https://via.placeholder.com/150",
      email: "liam.patel@example.com",
      phone: "(555) 444‑7788"
    }
  ]

  return (
    <><Header /><div className="providers-page">
          <h1 className="providers-title">Our Providers</h1>
          <p className="providers-subtitle">
              Meet our compassionate team of licensed professionals dedicated to your healing and recovery.
          </p>

          <div className="providers-grid">
              {providers.map((p, index) => (
                  <div className="provider-card" key={index}>
                      <img src={p.img} alt={p.name} className="provider-img" />

                      <h2>{p.name}</h2>
                      <h4>{p.role}</h4>

                      <div className="provider-contact">
                          <p>Email: <a href={`mailto:${p.email}`}>{p.email}</a></p>
                          <p>Phone: {p.phone}</p>
                      </div>
                  </div>
              ))}
          </div>
      </div> <Footer /></>
  )
}
