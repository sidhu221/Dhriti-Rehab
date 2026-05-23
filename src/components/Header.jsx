import "../style/Header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">✦</div>
          <div className="logo-text">
            <h2>Dhriti</h2>
            <span>RehabCenter</span>
          </div>
        </div>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/programs">Programs</a>
          {/* <a href="/conditions">Conditions</a> */}
          <a href="/providers">Providers</a>
          <a href="/telehealth">Telehealth</a>
          {/*<a href="/FAQ">FAQ</a>
          <a href="/about">Gallery</a> */}
          <a href="/contact">Contact</a>
        </nav>
      </div>

      <div className="header-right">
        <a href="/appointment" className="appointment-btn">
          Book Appointment
        </a>
      </div>
    </header>
  )
}
