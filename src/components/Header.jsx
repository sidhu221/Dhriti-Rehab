import "../style/Header.css"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo" aria-label="Dhriti Rehab Center home">
          <img
            className="logo-image"
            src="/dhriti-logo-full.png"
            alt="Dhriti Rehab Center - Resilience & Recovery"
          />
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/programs">Programs</NavLink>
          <NavLink to="/providers">Providers</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/telehealth">Telehealth</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>

      <div className="header-right">
        <Link to="/login" className="login-link">Login</Link>
        <Link to="/appointment" className="appointment-btn">
          Book Appointment
        </Link>
      </div>
    </header>
  )
}
