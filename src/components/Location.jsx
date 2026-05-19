import "./Location.css"

export default function Location() {
  return (
    <section className="location-section">
      <div className="location-content">
        <h2>Find Dhriti RehabCenter</h2>
        <p>
          Visit our center for supportive, compassionate care. We’re here to help
          you move forward with strength and confidence.
        </p>
      </div>

      <div className="map-container">
        <iframe
          title="Dhriti RehabCenter Location"
          src="https://www.google.com/maps/embed?pb=YOUR_EMBED_LINK_HERE"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  )
}
