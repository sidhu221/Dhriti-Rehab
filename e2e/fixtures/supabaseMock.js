// Intercepts every Supabase REST call so e2e tests exercise real UI/routing
// behavior without touching the live database. Cross-origin PATCH/POST
// requests trigger a real CORS preflight, so OPTIONS is handled explicitly.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "*"
}

export async function mockSupabaseRest(
  page,
  { doctors = [], appointments = [], patient = null, bookedAppointment = null } = {}
) {
  await page.route("**/rest/v1/**", async (route) => {
    const request = route.request()
    const method = request.method()

    if (method === "OPTIONS") {
      return route.fulfill({ status: 204, headers: CORS_HEADERS })
    }

    const url = new URL(request.url())
    const table = url.pathname.split("/").filter(Boolean).pop()

    if (table === "doctors" && method === "GET") {
      return route.fulfill({ json: doctors, headers: CORS_HEADERS })
    }

    if (table === "appointments" && method === "GET") {
      const select = url.searchParams.get("select") || ""
      // ensureScheduleForDate's existence check (select=id) vs the full
      // schedule fetch (select=*,doctors(*)) hit the same table+method.
      if (select.startsWith("id")) {
        return route.fulfill({ json: [{ id: "existing-slot-check" }], headers: CORS_HEADERS })
      }
      return route.fulfill({ json: appointments, headers: CORS_HEADERS })
    }

    if (table === "patients" && method === "POST") {
      return route.fulfill({ json: patient, headers: CORS_HEADERS })
    }

    if (table === "appointments" && method === "PATCH") {
      return route.fulfill({ json: bookedAppointment, headers: CORS_HEADERS })
    }

    return route.fulfill({ json: [], headers: CORS_HEADERS })
  })
}
