// Stops the app from sending real emails during e2e runs.
export async function mockEmailJs(page, { status = 200 } = {}) {
  await page.route("https://api.emailjs.com/**", async (route) => {
    await route.fulfill({ status, body: status === 200 ? "OK" : "Error" })
  })
}
