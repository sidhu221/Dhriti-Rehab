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
            <p>10-15/51/NR, Main Road, near SILVER OAK VILLAS, Officers Colony, Cherlapalli, Hyderabad, Secunderabad, Telangana 500051 
            <br /><strong><em>Landmark: Near Silver Oak Villas</em></strong></p>
          </div>

          <div className="info-block">
            <h3>Call</h3>
            <p>+91 7013708265</p>
          </div>

          <div className="info-block">
            <h3>Email</h3>
            <p>dhritimind_1798@dhritimind.com</p>
          </div>

          {/* GOOGLE MAP EMBED */}
          <div className="map-container">
            <iframe
              title="Dhriti Rehab Center Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.8193953832897!2d78.60275479199866!3d17.4683562646611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9dd6b3ff8351%3A0xf60affbcefcabf40!2sDHRITI%20(Mind%20Clinic%20And%20Counseling%20Center)!5e0!3m2!1sen!2sin!4v1783237468969!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
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
            <input type="text" placeholder="+91 1111111111" />
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
