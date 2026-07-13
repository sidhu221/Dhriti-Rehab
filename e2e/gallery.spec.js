import { test, expect } from "@playwright/test"

test.describe("Gallery slideshow", () => {
  test("navigates forward, backward, and via dots", async ({ page }) => {
    await page.goto("/gallery")

    await expect(page.getByText("Reception Area")).toBeVisible()

    await page.getByRole("button", { name: "Next image" }).click()
    await expect(page.getByText("Lounge/Reception Area")).toBeVisible()

    await page.getByRole("button", { name: "Previous image" }).click()
    await expect(page.getByText("Reception Area")).toBeVisible()

    // Backward from the first slide should wrap to the last one.
    await page.getByRole("button", { name: "Previous image" }).click()
    await expect(page.getByText("Building Exterior")).toBeVisible()

    await page.getByRole("button", { name: "Go to slide: Single Bed" }).click()
    await expect(page.getByText("Single Bed")).toBeVisible()
  })
})
