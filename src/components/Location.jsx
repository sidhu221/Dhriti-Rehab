import "./Location.css"

export default function Location() {
  return (
    <section className="location-section">
      <h2>Find Dhriti Rehab Center</h2>
      <p>We are here to support your journey — visit us at our center.</p>

      <div className="map-container">
        <iframe
          title="Dhriti Rehab Center Location"
          /* 
          Replace the src URL with your actual Google Maps embed link
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.123456789!2d-122.123456!3d47.678123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549015123456789%3A0xabcdef123456789!2sRedmond%2C%20WA!5e0!3m2!1sen!2sus!4v0000000000000"
          */
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  )
}
