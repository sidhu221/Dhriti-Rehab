import "../style/PrivacyPolicy.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main className="privacy-policy-page">
        <section className="privacy-policy-container">
          <div className="privacy-policy-header">
            <h1>Privacy Policy</h1>
            <p>Last updated: June 25, 2026.</p>
          </div>

          <div className="privacy-policy-content">
            <section>
              <h2>1. Our Commitment</h2>
              <p>
                Dhriti Rehab Center respects your privacy and is committed to protecting
                the personal information you share with us. This policy explains how we
                collect, use, and safeguard information submitted through our website,
                appointment forms, account signup, and related patient services.
              </p>
            </section>

            <section>
              <h2>2. Information We Collect</h2>
              <p>
                We may collect information such as your name, date of birth, email
                address, phone number, appointment details, provider selection, and
                information you choose to provide when contacting us or creating an
                account.
              </p>
            </section>

            <section>
              <h2>3. How We Use Information</h2>
              <p>
                We use your information to create and manage patient profiles, schedule
                appointments, communicate with you about services, respond to questions,
                send account or password reset emails, and improve the reliability and
                safety of our website.
              </p>
            </section>

            <section>
              <h2>4. Health and Appointment Information</h2>
              <p>
                Appointment and patient profile information may be sensitive. We use it
                only for care coordination, administrative support, and patient service
                purposes. Please avoid submitting emergency or urgent medical details
                through website forms.
              </p>
            </section>

            <section>
              <h2>5. Data Storage and Security</h2>
              <p>
                Information submitted through this website may be stored in our database
                and authentication systems. We use reasonable technical and organizational
                safeguards to protect your information from unauthorized access, loss, or
                misuse.
              </p>
            </section>

            <section>
              <h2>6. Sharing Information</h2>
              <p>
                We do not sell your personal information. We may share information only
                with authorized staff, care providers, service vendors that help operate
                our systems, or when required by law.
              </p>
            </section>

            <section>
              <h2>7. Your Choices</h2>
              <p>
                You may contact us to request updates to your profile information or to
                ask questions about how your information is handled. Account-related
                emails, including password reset messages, are sent only when needed to
                support your access to services.
              </p>
            </section>

            <section>
              <h2>8. Contact Us</h2>
              <p>
                If you have questions about this privacy policy or how your information is
                handled, please contact Dhriti Rehab Center through the contact page or by
                calling the clinic directly.
              </p>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
