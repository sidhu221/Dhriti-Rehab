import "../style/Gallery.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"

const photos = [
  { src: "/reception.jpeg", caption: "Reception Area" },
  { src: "/reception_2.jpeg", caption: "Lounge/Reception Area" },
  { src: "/hospital_bed.jpeg", caption: "Single Bed" },
  {src: "/general_ward_2.jpeg", caption: "Standard Ward" },
  { src: "/general_ward.jpeg", caption: "Spec Ward" },
  { src: "/Exterior Hallway.jpeg", caption: "Building Exterior" },
]

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  function showPrev() {
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length)
  }

  function showNext() {
    setActiveIndex((i) => (i + 1) % photos.length)
  }

  return (
    <>
      <Header />

      <section className="gallery-page">
        <h1 className="gallery-title">Our Gallery</h1>
        <p className="gallery-subtitle">
          A look inside Dhriti Rehab Center — our spaces, designed for comfort, privacy, and healing.
        </p>

        <div className="gallery-slideshow">
          <button
            className="gallery-slide-nav gallery-slide-prev"
            onClick={showPrev}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="gallery-slide">
            <img
              src={photos[activeIndex].src}
              alt={photos[activeIndex].caption}
              className="gallery-slide-img"
            />
            <p className="gallery-slide-caption">{photos[activeIndex].caption}</p>
          </div>

          <button
            className="gallery-slide-nav gallery-slide-next"
            onClick={showNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>

        <div className="gallery-dots">
          {photos.map((photo, index) => (
            <button
              key={index}
              className={`gallery-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide: ${photo.caption}`}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
