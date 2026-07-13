import { test, expect } from "@playwright/test"
import { mockSupabaseRest } from "./fixtures/supabaseMock"

// Regression coverage for the bug where Hero/ProgramsHome used raw <a href>
// links: those force a full page reload, which 404s on GitHub Pages. A client
// side navigation never issues a main-frame document request, so we assert on
// that directly instead of just checking the resulting URL. (Sub-frame/iframe
// navigations, like the embedded Google Map, don't count and are filtered out.)
function trackMainFrameNavigations(page) {
  const navigations = []
  page.on("request", (request) => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
      navigations.push(request.url())
    }
  })
  return navigations
}

test.describe("Homepage navigation", () => {
  test.beforeEach(async ({ page }) => {
    // /appointment fetches its schedule on mount - stub it out so this
    // navigation test never touches the real database.
    await mockSupabaseRest(page, { doctors: [], appointments: [] })
  })

  test("hero buttons navigate client-side", async ({ page }) => {
    await page.goto("/")
    const navigations = trackMainFrameNavigations(page)

    await page.locator(".hero-section").getByRole("link", { name: "Book Appointment" }).click()
    await expect(page).toHaveURL("/appointment")
    expect(navigations).toEqual([])

    await page.goBack()
    await page.getByRole("link", { name: "Explore Programs" }).click()
    await expect(page).toHaveURL("/programs")
    expect(navigations).toEqual([])
  })

  test("program cards navigate to their dedicated pages", async ({ page }) => {
    await page.goto("/")
    const navigations = trackMainFrameNavigations(page)

    await page
      .locator(".program-card", { hasText: "Alcohol De‑Addiction" })
      .getByRole("link", { name: "Learn More →" })
      .click()

    await expect(page).toHaveURL("/programs/alcohol")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    expect(navigations).toEqual([])
  })
})
