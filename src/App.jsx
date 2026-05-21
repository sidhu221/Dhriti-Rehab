import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Providers from "./pages/Providers"
import Telehealth from "./pages/Telehealth"
import AlcoholDeAddiction from "./pages/Alcohol"
import DrugsDeAddiction from "./pages/Drugs"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/telehealth" element={<Telehealth />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/programs/alcohol" element={<AlcoholDeAddiction />} />
      <Route path="/programs/drug" element={<DrugsDeAddiction />} />
    </Routes>
  )
}
