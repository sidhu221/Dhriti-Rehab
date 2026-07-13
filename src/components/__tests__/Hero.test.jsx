import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithRouter } from "../../test/renderWithRouter"
import Hero from "../Hero"

describe("Hero", () => {
  it("renders the CTA buttons as router links, not full-page anchors", () => {
    renderWithRouter(<Hero />)

    // A regression check: these must be <Link> (client-side routed), not a plain
    // <a href> hard navigation - GitHub Pages 404s on hard nav to unmatched paths.
    const bookButton = screen.getByRole("link", { name: /book appointment/i })
    const programsButton = screen.getByRole("link", { name: /explore programs/i })

    expect(bookButton).toHaveAttribute("href", "/appointment")
    expect(programsButton).toHaveAttribute("href", "/programs")
  })
})
