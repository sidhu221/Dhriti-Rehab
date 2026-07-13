import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithRouter } from "../../test/renderWithRouter"
import Footer from "../Footer"

describe("Footer", () => {
  it("links each program in the Programs section", () => {
    renderWithRouter(<Footer />)

    const expectedLinks = {
      "Alcohol De-Addiction": "/programs/alcohol",
      "Drug De-Addiction": "/programs/drug",
      "Adult Psychiatry": "/programs/psychiatry",
      "Psychological Services": "/programs/psychology",
      "Detox & Stabilization": "/programs/detox"
    }

    Object.entries(expectedLinks).forEach(([label, href]) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href)
    })
  })

  it("links each item in the Company section", () => {
    renderWithRouter(<Footer />)

    const expectedLinks = {
      "About Us": "/about",
      "Our Providers": "/providers",
      Gallery: "/gallery",
      Telehealth: "/telehealth",
      "Privacy Policy": "/privacy-policy",
      "Patient Portal": "/login"
    }

    Object.entries(expectedLinks).forEach(([label, href]) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href)
    })
  })
})
