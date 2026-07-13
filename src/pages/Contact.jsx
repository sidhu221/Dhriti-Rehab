import "../style/Contact.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState("idle")

  // Sends the form straight to the clinic inbox via EmailJS - no backend involved.
  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("sending")
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY
      })
      setStatus("success")
      formRef.current.reset()
    } catch (error) {
      console.error("Error sending contact form:", error)
      setStatus("error")
    }
  }

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
                dhritirehab@gmail.com
              </p>
            </div>
          </div>

          {/* RIGHT SIDE — CONTACT FORM */}
          <div className="contact-right">
            <h2>Send Us a Message</h2>

            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <label>Your Name</label>
              <input type="text" name="name" placeholder="Enter your name" required />

              <label>Your Email</label>
              <input type="email" name="email" placeholder="Enter your email" required />

              <label>Phone Number</label>
              <input type="text" name="phone" placeholder="Enter your phone number" />

              <label>Your Message</label>
              <textarea name="message" placeholder="Write your message here"></textarea>

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>

              {status === "success" && (
                <p className="form-status" role="status">
                  Thank you — we've received your message and will be in touch soon.
                </p>
              )}

              {status === "error" && (
                <p className="form-status" role="alert">
                  Something went wrong. Please try again or call the clinic directly.
                </p>
              )}
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
