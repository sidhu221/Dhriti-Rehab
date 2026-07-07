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
            <br></br>
            <div className="contact-box">
              <h3>Our Clinic</h3>

              <p><strong>Address:</strong><br />
                10-15/51/NR, Main Road, near SILVER OAK VILLAS, Officers Colony, Cherlapalli, Hyderabad, Secunderabad, Telangana 500051
                <br /><strong><em>Landmark: Near Silver Oak Villas</em></strong>
              </p>
              <br></br>
              <p><strong>Phone:</strong><br />
                +91 7013708265
              </p>
              <br></br>
              <p><strong>Email:</strong><br />
                dhritimind_1798@dhritimind.com
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.8193953832897!2d78.60275479199866!3d17.4683562646611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9dd6b3ff8351%3A0xf60affbcefcabf40!2sDHRITI%20(Mind%20Clinic%20And%20Counseling%20Center)!5e0!3m2!1sen!2sin!4v1783237468969!5m2!1sen!2sin"
            width="85%"
            height="350"
            align: center
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
