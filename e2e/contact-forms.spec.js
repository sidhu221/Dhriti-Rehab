import { test, expect } from "@playwright/test"
import { mockEmailJs } from "./fixtures/emailjsMock"

test.describe("Contact forms", () => {
  test("homepage location form sends via EmailJS and shows a success message", async ({
    page
  }) => {
    await mockEmailJs(page)
    await page.goto("/")

    await page.getByLabel("Full name").fill("Jane Doe")
    await page.getByLabel("Email", { exact: true }).fill("jane@example.com")
    await page.getByRole("button", { name: /request a confidential call/i }).click()

    await expect(page.getByRole("status")).toHaveText(/we've received your request/i)
  })

  test("homepage location form shows an error message when EmailJS fails", async ({ page }) => {
    await mockEmailJs(page, { status: 422 })
    await page.goto("/")

    await page.getByLabel("Full name").fill("Jane Doe")
    await page.getByLabel("Email", { exact: true }).fill("jane@example.com")
    await page.getByRole("button", { name: /request a confidential call/i }).click()

    await expect(page.getByRole("alert")).toHaveText(/something went wrong/i)
  })

  test("Contact page form sends via EmailJS and shows a success message", async ({ page }) => {
    await mockEmailJs(page)
    await page.goto("/contact")

    await page.getByPlaceholder("Enter your name").fill("Jane Doe")
    await page.getByPlaceholder("Enter your email").fill("jane@example.com")
    await page.getByRole("button", { name: "Send Message" }).click()

    await expect(page.getByRole("status")).toHaveText(/we've received your message/i)
  })
})
