import { describe, it, expect, vi, afterEach } from "vitest"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import NotFound from "../NotFound"

function renderNotFound() {
  return render(
    <MemoryRouter initialEntries={["/this-route-does-not-exist"]}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  )
}

describe("NotFound", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("shows a 404 message for an unmatched route", () => {
    renderNotFound()

    expect(screen.getByText("404")).toBeInTheDocument()
    expect(screen.getByText(/couldn't find the page/i)).toBeInTheDocument()
  })

  it("auto-redirects to the homepage after the delay", () => {
    vi.useFakeTimers()
    renderNotFound()

    expect(screen.queryByText("Home Page")).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(4000)
    })

    expect(screen.getByText("Home Page")).toBeInTheDocument()
  })

  it("navigates home immediately when the button is clicked", async () => {
    const user = userEvent.setup()
    renderNotFound()

    await user.click(screen.getByRole("button", { name: /return home now/i }))

    expect(screen.getByText("Home Page")).toBeInTheDocument()
  })
})
