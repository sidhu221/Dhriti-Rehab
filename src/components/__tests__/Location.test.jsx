import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithRouter } from "../../test/renderWithRouter"

vi.mock("@emailjs/browser", () => ({
  default: { sendForm: vi.fn() }
}))

import emailjs from "@emailjs/browser"
import Location from "../Location"

beforeEach(() => {
  emailjs.sendForm.mockReset()
})

async function fillAndSubmit(user) {
  await user.type(screen.getByLabelText(/full name/i), "Jane Doe")
  await user.type(screen.getByLabelText(/^email$/i), "jane@example.com")
  await user.click(screen.getByRole("button", { name: /request a confidential call/i }))
}

describe("Location contact form", () => {
  it("sends the form via EmailJS and shows a success message", async () => {
    emailjs.sendForm.mockResolvedValue({ status: 200 })
    const user = userEvent.setup()
    renderWithRouter(<Location />)

    await fillAndSubmit(user)

    expect(emailjs.sendForm).toHaveBeenCalledTimes(1)
    expect(await screen.findByRole("status")).toHaveTextContent(/we've received your request/i)
  })

  it("shows an error message when EmailJS fails", async () => {
    emailjs.sendForm.mockRejectedValue(new Error("network error"))
    const user = userEvent.setup()
    renderWithRouter(<Location />)

    await fillAndSubmit(user)

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i)
  })

  it("disables the submit button while sending", async () => {
    let resolveSend
    emailjs.sendForm.mockReturnValue(
      new Promise((resolve) => {
        resolveSend = resolve
      })
    )
    const user = userEvent.setup()
    renderWithRouter(<Location />)

    await fillAndSubmit(user)

    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled()

    resolveSend({ status: 200 })
    await screen.findByRole("status")
  })
})
