import "../style/Location.css"

export default function Location() {
  return (
    <section className="location-section">
      <div className="location-container">

        {/* LEFT SIDE — CONTACT INFO + MAP */}
        <div className="location-info">
          <h2 className="location-title">Get in Touch</h2>
          <p className="location-subtitle">
            We’re here when you’re ready. Reach out for a confidential intake conversation.
          </p>

          <div className="info-block">
            <h3>Visit Us</h3>
            <p>42 Tranquil Way<br />Hyderbad, India</p>
          </div>

          <div className="info-block">
            <h3>Call</h3>
            <p>(800) 555‑HOPE</p>
          </div>

          <div className="info-block">
            <h3>Email</h3>
            <p>care@dhritirehab.org</p>
          </div>

          {/* GOOGLE MAP EMBED */}
          <div className="map-container">
            <iframe
              title="Dhriti RehabCenter Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.497783359934!2d-119.247053!3d34.448049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e9b7c0e4b7d8c7%3A0x8e8b9f4d3e2c4c0!2sOjai%20Valley%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* RIGHT SIDE — CONTACT FORM */}
        <form className="location-form">
          <label>
            Full name
            <input type="text" placeholder="Jane Doe" />
          </label>

          <label>
            Email
            <input type="email" placeholder="jane@example.com" />
          </label>

          <label>
            Phone (optional)
            <input type="text" placeholder="(555) 234‑5678" />
          </label>

          <label>
            How can we help?
            <textarea placeholder="Tell us a little about what brings you here." />
          </label>

          <button type="submit" className="location-button">
            Request a confidential call
          </button>

          <p className="privacy-note">
            Your information is encrypted and reviewed only by our intake clinicians.
          </p>
        </form>
      </div>
    </section>
  )
}
