import Header from "../components/Header"
import Footer from "../components/Footer"
import Services from "./Services"
import Testimonials from "./Testimonials"
import Contact from "./Contact"
import Hero from "../components/Hero"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <section>
          <h1>Welcome to Dhriti Rehab</h1>
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
      </main>

      <Footer />
    </>
  )
}
