import "../style/Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About Section */}
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

        {/* Programs Section */}
        <div className="footer-section">
          <h3>Programs</h3>
          <ul>
            <li><a href="#">Alcohol De-Addiction</a></li>
            <li><a href="#">Drug De-Addiction</a></li>
            <li><a href="#">Adult Psychiatry</a></li>
            <li><a href="#">Psychological Services</a></li>
            <li><a href="#">Detox & Stabilization</a></li>
          </ul>
        </div>

        {/*
        <div className="footer-section">
          <h3>Conditions</h3>
          <ul>
            <li><a href="#">Anxiety</a></li>
            <li><a href="#">Depression</a></li>
            <li><a href="#">Addiction Recovery</a></li>
            <li><a href="#">Trauma & PTSD</a></li>
            <li><a href="#">ADHD</a></li>
            <li><a href="#">Bipolar Disorder</a></li>
          </ul>
        </div>
          */}

        {/* Company Section */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Providers</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Patient Portal</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 Dhriti RehabCenter. All rights reserved.</p>
        <p className="crisis">
          In the event of an emergency, call 112 for support anytime.
        </p>
      </div>
    </footer>
  )
}
