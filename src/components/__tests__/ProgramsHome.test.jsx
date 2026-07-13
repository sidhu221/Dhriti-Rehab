import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithRouter } from "../../test/renderWithRouter"
import ProgramsHome from "../ProgramsHome"

describe("ProgramsHome", () => {
  it("links each program card to its dedicated page", () => {
    renderWithRouter(<ProgramsHome />)

    expect(screen.getByRole("heading", { name: /alcohol de‑addiction/i })).toBeInTheDocument()

    const expectedLinks = {
      "Alcohol De‑Addiction": "/programs/alcohol",
      "Drug De‑Addiction": "/programs/drug",
      "Adult Psychiatry": "/programs/psychiatry",
      "Psychological Services": "/programs/psychology",
      "Detox & Stabilization": "/programs/detox"
    }

    Object.entries(expectedLinks).forEach(([title, href]) => {
      const card = screen.getByRole("heading", { name: title }).closest(".program-card")
      const link = card.querySelector(".program-link")
      expect(link.tagName).toBe("A")
      expect(link).toHaveAttribute("href", href)
    })
  })
})
