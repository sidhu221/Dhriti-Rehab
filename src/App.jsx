import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Providers from "./pages/Providers"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/providers" element={<Providers />} />
    </Routes>
  )
}
