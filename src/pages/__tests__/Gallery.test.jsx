import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithRouter } from "../../test/renderWithRouter"
import Gallery from "../Gallery"

describe("Gallery", () => {
  it("shows the first photo's caption initially", () => {
    renderWithRouter(<Gallery />)

    expect(screen.getByText("Reception Area")).toBeInTheDocument()
  })

  it("advances to the next photo and its caption", async () => {
    const user = renderGallery()

    await user.click(screen.getByRole("button", { name: /next image/i }))

    expect(screen.getByText("Lounge/Reception Area")).toBeInTheDocument()
  })

  it("wraps backward to the last photo from the first", async () => {
    const user = renderGallery()

    await user.click(screen.getByRole("button", { name: /previous image/i }))

    expect(screen.getByText("Building Exterior")).toBeInTheDocument()
  })

  it("jumps directly to a slide via its dot", async () => {
    const user = renderGallery()

    await user.click(screen.getByRole("button", { name: /go to slide: single bed/i }))

    expect(screen.getByText("Single Bed")).toBeInTheDocument()
  })
})

function renderGallery() {
  renderWithRouter(<Gallery />)
  return userEvent.setup()
}
