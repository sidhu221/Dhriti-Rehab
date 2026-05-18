import Header from "../components/Header"
import Footer from "../components/Footer"
import Services from "./Services"
import Testimonials from "./Testimonials"
import Contact from "./Contact"
import Hero from "../components/Hero"
import "../components/Location"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <section>
          <h1>Welcome to Dhriti Rehab Center</h1>
          <p>Your path to wellness, support, and positive change starts here.</p>
        </section>

        <section>
          <Services />
        </section>

        <section>
          <Testimonials />
        </section>

        <section>
          <Contact />
        </section>

        <section>
          <Location />
        </section>
      </main>

      <Footer />
    </>
  )
}
