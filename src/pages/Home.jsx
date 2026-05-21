import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import Location from "../components/Location"
import Testimonials from "../components/Testimonial"
import TelehealthHome from "../components/Telehealth-Home"
import ProvidersHome from "../components/ProvidersHome"
import ProgramsHome from "../components/ProgramsHome"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProgramsHome />
      <ProvidersHome />
      <TelehealthHome />
      <Location />
      <Testimonials />
      <Footer />
    </>
  )
}
