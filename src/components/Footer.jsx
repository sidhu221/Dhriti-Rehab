import "../style/Footer.css"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <Link to="/" className="footer-logo" aria-label="Dhriti Rehab Center home">
            <img
              className="footer-logo-image"
              src="/dhriti-logo-full.png"
              alt="Dhriti Rehab Center - Resilience & Recovery"
            />
          </Link>

          <p>
            Providing compassionate, evidence-based rehabilitation and mental wellness
            support. You are not alone; your journey forward starts here.
          </p>
        </div>

        <div className="footer-section">
          <h3>Programs</h3>
          <ul>
            <li><Link to="/programs/alcohol">Alcohol De-Addiction</Link></li>
            <li><Link to="/programs/drug">Drug De-Addiction</Link></li>
            <li><Link to="/programs/psychiatry">Adult Psychiatry</Link></li>
            <li><Link to="/programs/psychology">Psychological Services</Link></li>
            <li><Link to="/programs/detox">Detox & Stabilization</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/providers">Our Providers</Link></li>
            <li><Link to="/telehealth">Telehealth</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/login">Patient Portal</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Dhriti Rehab Center. All rights reserved.</p>
      </div>
    </footer>
  )
}
