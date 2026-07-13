import { describe, it, expect } from "vitest"
import { screen, within } from "@testing-library/react"
import { renderWithRouter } from "../../test/renderWithRouter"
import Header from "../Header"

describe("Header", () => {
  it("links the logo back to home", () => {
    renderWithRouter(<Header />)

    expect(screen.getByRole("link", { name: /dhriti rehab center home/i })).toHaveAttribute(
      "href",
      "/"
    )
  })

  it("renders the primary navigation with the expected routes", () => {
    renderWithRouter(<Header />)

    const nav = screen.getByRole("navigation", { name: /primary navigation/i })
    const expectedLinks = {
      Home: "/",
      "About Us": "/about",
      Programs: "/programs",
      Providers: "/providers",
      Gallery: "/gallery",
      Telehealth: "/telehealth",
      Contact: "/contact"
    }

    Object.entries(expectedLinks).forEach(([label, href]) => {
      expect(within(nav).getByRole("link", { name: label })).toHaveAttribute("href", href)
    })
  })

  it("links the book appointment button to the booking page", () => {
    renderWithRouter(<Header />)

    expect(screen.getByRole("link", { name: /book appointment/i })).toHaveAttribute(
      "href",
      "/appointment"
    )
  })
})
