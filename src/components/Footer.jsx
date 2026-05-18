import "../styles/Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT SECTION — LOGO + DESCRIPTION */}
        <div className="footer-section footer-about">
          <div className="footer-logo">
            <div className="footer-logo-icon">✦</div>
            <div>
              <h2>Dhriti Rehab Center</h2>
              <span>Healing • Support • Recovery</span>
            </div>
          </div>

          <p className="footer-description">
            Providing compassionate, evidence based rehabilitation and mental health support.
            You are not alone — recovery begins with the first step.
          </p>

          <div className="footer-socials">
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">💼</a>
          </div>
        </div>

        {/* SERVICES */}
        <div className="footer-section">
          <h3>Programs</h3>
          <ul>
            <li><a href="/programs">Rehabilitation Programs</a></li>
            <li><a href="/therapy">Therapy & Counseling</a></li>
            <li><a href="/youth">Youth Support</a></li>
            <li><a href="/family">Family Therapy</a></li>
            <li><a href="/aftercare">Aftercare Planning</a></li>
            <li><a href="/telehealth">Telehealth Sessions</a></li>
          </ul>
        </div>

        {/* CONDITIONS */}
        <div className="footer-section">
          <h3>Conditions</h3>
          <ul>
            <li><a href="/anxiety">Anxiety</a></li>
            <li><a href="/depression">Depression</a></li>
            <li><a href="/addiction">Addiction Recovery</a></li>
            <li><a href="/trauma">Trauma & PTSD</a></li>
            <li><a href="/adhd">ADHD</a></li>
            <li><a href="/bipolar">Bipolar Disorder</a></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/providers">Our Providers</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/portal">Patient Portal</a></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© 2026 Dhriti RehabCenter. All rights reserved.</p>
        <p className="crisis-text">
          If you are in crisis, call or text <strong>988</strong> for 24/7 support.
        </p>
      </div>
    </footer>
  )
}
