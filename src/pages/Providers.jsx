import "../style/Providers.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Providers() {
  const providers = [
    {
      name: "Dr. K.B Nihal",
      role: "Consultant Psychiatrist",
      img: "https://via.placeholder.com/150",
      experience: "14 years",
      degree: "MBBS, MD (Psychiatry), FIPS",
      cert_awards: "1. Certification in Diabetes and Metabolic Disorders, 2. Fellowship in Sexology, 3. Accredited in Professional Counselling Diploma for Sexual Abuse", 
    },
    {
      name: "Ms. Gowthami Soudamini",
      role: "Clinical Psychologist",
      img: "https://via.placeholder.com/150",
      experience: "5 years",
      degree: "M.A, MPHIL",
      cert_awards: "1. Interpersonal Psychotherapy (IPT) Certification at University of Toronto, 2. Interpersonal and Social Rythm Therapy, 3. Teacher Social and Emotional Learning Certification",
    },
    {
      name: "Dr. Sugunakar Reddy Kotha",
      role: "Consultant Physician and Diabetologist",
      img: "https://via.placeholder.com/150",
      experience: "8+ years",
      degree: "MBBS, MD, PGDHHM",
      cert_awards: "1. Fellowship in Diabetology, 2. Awarded Best Reporter of Adverse Drug Reactions"
    },
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
                      <p className="provider-experience"><strong>Experience:</strong> {p.experience}</p>
                      <p className="provider-degree"><strong>Qualifications:</strong> {p.degree}</p>

                      <div className="provider-certs">
                          <strong>Certifications &amp; Awards</strong>
                          <ul>
                              {p.cert_awards
                                  .split(/\d+\.\s*/)
                                  .map((item) => item.replace(/,\s*$/, "").trim())
                                  .filter(Boolean)
                                  .map((item, i) => (
                                      <li key={i}>{item}</li>
                                  ))}
                          </ul>
                      </div>
                  </div>
              ))}
          </div>
      </div> <Footer /></>
  )
}
