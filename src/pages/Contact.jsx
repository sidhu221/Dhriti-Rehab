import "../style/Contact.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Contact() {
  return (
    <>
      <Header />

      <section className="contact-page">

        <div className="contact-layout">

          {/* LEFT SIDE — CONTACT INFO */}
          <div className="contact-left">
            <h2>Contact Us</h2>

            <div className="contact-box">
              <h3>Our Clinic</h3>

              <p><strong>Address:</strong><br />
                123 Wellness Road,<br />
                Hyderabad, Telangana, India
              </p>

              <p><strong>Phone:</strong><br />
                +91 98765 43210
              </p>

              <p><strong>Email:</strong><br />
                contact@yourclinic.com
              </p>
            </div>
          </div>

          {/* RIGHT SIDE — CONTACT FORM */}
          <div className="contact-right">
            <h2>Send Us a Message</h2>

            <form className="contact-form">
              <label>Your Name</label>
              <input type="text" placeholder="Enter your name" />

              <label>Your Email</label>
              <input type="email" placeholder="Enter your email" />

              <label>Phone Number</label>
              <input type="text" placeholder="Enter your phone number" />

              <label>Your Message</label>
              <textarea placeholder="Write your message here"></textarea>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* GOOGLE MAP */}
        <div className="contact-map">
          <iframe
            title="clinic-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.497783359934!2d-119.247053!3d34.448049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e9b7c0e4b7d8c7%3A0x8e8b9f4d3e2c4c0!2sOjai%20Valley%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

      </section>

      <Footer />
    </>
  )
}
