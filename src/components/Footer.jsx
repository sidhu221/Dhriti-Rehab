import "../style/Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-about">
          <div className="footer-logo">
            <div className="footer-logo-icon">✦</div>
            <div>
              <h2>Dhriti RehabCenter</h2>
              <span>Healing • Support • Recovery</span>
            </div>
          </div>

          <p>
            Providing compassionate, evidence‑based rehabilitation and mental wellness
            support. You are not alone — your journey forward starts here.
          </p>
        </div>

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

      <div className="footer-bottom">
        <p>© 2026 Dhriti RehabCenter. All rights reserved.</p>
        <p className="crisis">
          If you ever feel unsafe or overwhelmed, you can call or text 988 for support anytime.
        </p>
      </div>
    </footer>
  )
}
s