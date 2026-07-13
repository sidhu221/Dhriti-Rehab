import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithRouter } from "../../test/renderWithRouter"

vi.mock("@emailjs/browser", () => ({
  default: { sendForm: vi.fn() }
}))

import emailjs from "@emailjs/browser"
import Contact from "../Contact"

beforeEach(() => {
  emailjs.sendForm.mockReset()
})

async function fillAndSubmit(user) {
  await user.type(screen.getByPlaceholderText(/enter your name/i), "Jane Doe")
  await user.type(screen.getByPlaceholderText(/enter your email/i), "jane@example.com")
  await user.click(screen.getByRole("button", { name: /send message/i }))
}

describe("Contact form", () => {
  it("sends the form via EmailJS and shows a success message", async () => {
    emailjs.sendForm.mockResolvedValue({ status: 200 })
    const user = userEvent.setup()
    renderWithRouter(<Contact />)

    await fillAndSubmit(user)

    expect(emailjs.sendForm).toHaveBeenCalledTimes(1)
    expect(await screen.findByRole("status")).toHaveTextContent(/we've received your message/i)
  })

  it("shows an error message when EmailJS fails", async () => {
    emailjs.sendForm.mockRejectedValue(new Error("network error"))
    const user = userEvent.setup()
    renderWithRouter(<Contact />)

    await fillAndSubmit(user)

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i)
  })
})
