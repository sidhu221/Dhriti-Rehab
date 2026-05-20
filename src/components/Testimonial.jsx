import "../style/Testimonials.css"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "For the first time in years, I feel hope. The team treated me like a person — not a case file.",
      initials: "M.R.",
      program: "Alcohol Recovery, 18 months sober",
    },
    {
      quote:
        "The family counseling helped us all heal. We have a relationship I didn't think was possible again.",
      initials: "J.K.",
      program: "Family Program",
    },
    {
      quote:
        "Telehealth made it possible to keep going through everything. My counselor really listens.",
      initials: "A.T.",
      program: "Telehealth Aftercare",
    },
    {
      quote:
        "Detox felt safe. The medical team was kind every hour of the day. I could finally rest.",
      initials: "S.P.",
      program: "Detox & Stabilization",
    },
    {
      quote:
        "I came in carrying so much shame. I leave knowing I deserve to be well.",
      initials: "D.H.",
      program: "Substance Use Recovery, 6 months sober",
    },
    {
      quote:
        "Relapse prevention gave me actual tools — not just talk. I trust myself again.",
      initials: "L.B.",
      program: "Relapse Prevention",
    },
  ]

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">What People Are Saying</h2>

      <div className="testimonials-grid">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <div className="quote-icon">“</div>

            <p className="testimonial-quote">{t.quote}</p>

            <div className="testimonial-footer">
              <span className="testimonial-initials">{t.initials}</span>
              <span className="testimonial-program">{t.program}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
