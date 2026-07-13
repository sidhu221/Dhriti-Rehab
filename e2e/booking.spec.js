import { test, expect } from "@playwright/test"
import { mockSupabaseRest } from "./fixtures/supabaseMock"
import { mockEmailJs } from "./fixtures/emailjsMock"

const WEEKDAY_DATE = "2026-07-14" // a Tuesday - avoids the "no weekend slots" message

const DOCTOR = {
  id: "doc-1",
  name: "Dr. K.B Nihal",
  color: "#4cb5ae",
  phone: "+91 7013708265",
  email: "doctor@example.com"
}

const OPEN_SLOTS = [
  {
    id: "slot-1",
    date: WEEKDAY_DATE,
    time: "09:00 AM",
    status: "open",
    doctor_id: DOCTOR.id,
    doctors: DOCTOR
  },
  {
    id: "slot-2",
    date: WEEKDAY_DATE,
    time: "09:30 AM",
    status: "open",
    doctor_id: DOCTOR.id,
    doctors: DOCTOR
  }
]

const PATIENT = { id: "patient-1", name: "Jane Doe", phone: "555-0100", email: null }

test.describe("Appointment booking", () => {
  test("books a telehealth slot end-to-end", async ({ page }) => {
    const bookedAppointment = {
      id: "slot-1",
      date: WEEKDAY_DATE,
      time: "09:00 AM",
      status: "booked",
      appointment_type: "telehealth",
      doctors: DOCTOR,
      patients: PATIENT
    }

    await mockSupabaseRest(page, {
      doctors: [DOCTOR],
      appointments: OPEN_SLOTS,
      patient: PATIENT,
      bookedAppointment
    })
    await mockEmailJs(page)

    await page.goto("/appointment")

    await page.getByRole("button", { name: "💻 Telehealth" }).click()
    await page.locator('input[type="date"]').fill(WEEKDAY_DATE)

    await expect(page.getByText("09:00 AM")).toBeVisible()
    await page.getByText("09:00 AM").click()

    // Confirmation modal reflects the chosen type before continuing.
    await expect(page.getByText(/Type:\s*Telehealth/)).toBeVisible()

    await page.getByRole("button", { name: "Continue to Details" }).click()
    await expect(page).toHaveURL(/\/appointment\/slot-1/)

    await page.locator('input[name="name"]').fill("Jane Doe")
    await page.locator('input[name="phone"]').fill("555-0100")
    await page.getByRole("button", { name: "Confirm Appointment" }).click()

    await expect(page.getByRole("heading", { name: "Appointment Confirmed" })).toBeVisible()
    await expect(page.getByText("Dr. K.B Nihal")).toBeVisible()
    await expect(page.getByText(WEEKDAY_DATE)).toBeVisible()
  })

  test("shows a weekend notice instead of slots", async ({ page }) => {
    await mockSupabaseRest(page, { doctors: [DOCTOR], appointments: [] })

    await page.goto("/appointment")
    await page.locator('input[type="date"]').fill("2026-07-18") // Saturday

    await expect(
      page.getByText("We don't offer appointments on weekends.")
    ).toBeVisible()
  })
})
