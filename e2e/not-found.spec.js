import { test, expect } from "@playwright/test"

test.describe("404 handling", () => {
  test("shows the 404 page and auto-redirects home", async ({ page }) => {
    await page.goto("/this-page-does-not-exist")

    await expect(page.getByRole("heading", { name: "404" })).toBeVisible()

    // Auto-redirect fires after 4s - poll rather than a fixed wait so this
    // isn't flaky under CI load.
    await expect(page).toHaveURL("/", { timeout: 8000 })
  })

  test("the 404 page's button returns home immediately", async ({ page }) => {
    await page.goto("/another-missing-route")
    await page.getByRole("button", { name: /return home now/i }).click()

    await expect(page).toHaveURL("/")
  })
})
