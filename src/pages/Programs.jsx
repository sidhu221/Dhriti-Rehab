import "../style/GeneralPrograms.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

export default function GeneralPrograms() {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <section className="program-page">
        <div className="program-layout">

          {/* LEFT SIDE CONTENT */}
          <div className="program-left">
            <h1>Our Psychiatry Programs</h1>

            <p className="program-intro">
              Our clinic proudly serves individuals across the Hyderabad region, offering
              accessible and high‑quality mental‑health care. We provide a wide range of
              outpatient services including counseling, therapy, psychiatric evaluations,
              medication management, and supportive wellness programs designed to help
              individuals build emotional resilience and long‑term stability.
            </p>

            <p className="program-intro">
              Our team of mental‑health professionals — including psychiatrists, therapists,
              and counselors — work together to create personalized treatment plans that
              support each person’s unique needs. Whether you’re seeking help for stress,
              mood‑related concerns, or long‑standing emotional challenges, we’re here to
              guide you with compassion and expertise.
            </p>

            {/* CLICKABLE PHONE NUMBER */}
            <p style={{ marginTop: "20px", fontWeight: "600" }}>
              Contact our team at{" "}
              <a
                href="tel:9876543210"
                style={{ color: "#1f7a5c", textDecoration: "none" }}
              >
                +91 7013708265
              </a>{" "}
              to learn more about our services and how we can support your mental‑health journey.
            </p>

            {/* FIND THE RIGHT PROVIDER BOX */}
            <div className="provider-box">
                <h3>Find the Right Provider</h3>
                <p>
                    Explore our team of experienced psychiatrists, therapists, and mental‑health
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
                src="https://media.istockphoto.com/id/1394727459/photo/doctor-consoling-sad-senior-man-in-waiting-room.jpg?s=170667a&w=0&k=20&c=ZdnkVv-K7V2KqFWD-mkhdJx-fZbyFPbnF8WG8SKYB4A="
                alt="General Programs"
                className="general-program-image"
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
