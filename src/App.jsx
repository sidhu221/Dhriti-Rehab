import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Providers from "./pages/Providers"
import Telehealth from "./pages/Telehealth"
import AlcoholDeAddiction from "./pages/Alcohol"
import DrugsDeAddiction from "./pages/Drugs"
import AdultPsychiatry from "./pages/Adult-Psychiatry"
import Programs from "./pages/Programs"
import PsychologicalServices from "./pages/Psych-Services"
import Detox from "./pages/Detox"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import About from "./pages/About"
import Appointment from "./pages/Appointment"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/telehealth" element={<Telehealth />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/programs/alcohol" element={<AlcoholDeAddiction />} />
      <Route path="/programs/drug" element={<DrugsDeAddiction />} />
      <Route path="/programs/psychiatry" element={<AdultPsychiatry />} />
      <Route path="/programs/psychology" element={<PsychologicalServices />} />
      <Route path="/programs/detox" element={<Detox />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/appointment" element={<Appointment />} />
    </Routes>
  )
}
