import { describe, it, expect, vi, beforeEach } from "vitest"
import { chainableResult } from "./supabaseTestUtils"

vi.mock("../../lib/supabaseClient", () => ({
  supabase: { from: vi.fn() }
}))

import { supabase } from "../../lib/supabaseClient"
import {
  getAppointmentsByDate,
  isWeekday,
  ensureScheduleForDate,
  createDefaultScheduleForDate,
  bookAppointment
} from "../appointments"

beforeEach(() => {
  supabase.from.mockReset()
})

describe("isWeekday", () => {
  it("treats Monday-Friday as weekdays", () => {
    expect(isWeekday("2026-07-13")).toBe(true) // Monday
    expect(isWeekday("2026-07-14")).toBe(true) // Tuesday
    expect(isWeekday("2026-07-17")).toBe(true) // Friday
  })

  it("treats Saturday and Sunday as weekends", () => {
    expect(isWeekday("2026-07-18")).toBe(false) // Saturday
    expect(isWeekday("2026-07-19")).toBe(false) // Sunday
  })
})

describe("getAppointmentsByDate", () => {
  it("sorts slots chronologically instead of alphabetically", async () => {
    // "09:00 AM" sorts after "01:30 PM" alphabetically but must come first in time.
    const unsorted = [
      { id: "b", time: "01:30 PM" },
      { id: "a", time: "09:00 AM" },
      { id: "c", time: "12:00 PM" }
    ]
    supabase.from.mockReturnValue(chainableResult({ data: unsorted, error: null }))

    const result = await getAppointmentsByDate("2026-07-14")

    expect(result.map((slot) => slot.id)).toEqual(["a", "c", "b"])
  })

  it("throws when the query errors", async () => {
    supabase.from.mockReturnValue(chainableResult({ data: null, error: new Error("query failed") }))

    await expect(getAppointmentsByDate("2026-07-14")).rejects.toThrow("query failed")
  })
})

describe("createDefaultScheduleForDate", () => {
  it("does nothing on a weekend", async () => {
    await createDefaultScheduleForDate("2026-07-18")

    expect(supabase.from).not.toHaveBeenCalled()
  })

  it("upserts a slot per doctor per time on a weekday", async () => {
    const doctors = [{ id: "doc-1" }, { id: "doc-2" }]
    const upsert = vi.fn(() => chainableResult({ error: null }))
    supabase.from.mockImplementation((table) => {
      if (table === "doctors") {
        return chainableResult({ data: doctors, error: null })
      }
      return { upsert }
    })

    await createDefaultScheduleForDate("2026-07-14")

    expect(upsert).toHaveBeenCalledTimes(1)
    const [rows, options] = upsert.mock.calls[0]
    expect(rows).toHaveLength(doctors.length * 18) // 18 half-hour slots per doctor
    expect(options).toEqual({ onConflict: "doctor_id,date,time", ignoreDuplicates: true })
  })
})

describe("ensureScheduleForDate", () => {
  it("does nothing on a weekend", async () => {
    await ensureScheduleForDate("2026-07-18")

    expect(supabase.from).not.toHaveBeenCalled()
  })

  it("skips creating a schedule when slots already exist", async () => {
    supabase.from.mockReturnValue(chainableResult({ data: [{ id: "existing" }], error: null }))

    await ensureScheduleForDate("2026-07-14")

    expect(supabase.from).toHaveBeenCalledTimes(1)
  })
})

describe("bookAppointment", () => {
  it("creates a patient then marks the slot booked", async () => {
    const patient = { id: "patient-1", name: "Jane Doe" }
    const booked = { id: "appt-1", status: "booked", patients: patient }

    supabase.from.mockImplementation((table) => {
      if (table === "patients") {
        return chainableResult({ data: patient, error: null })
      }
      return chainableResult({ data: booked, error: null })
    })

    const result = await bookAppointment({
      appointmentId: "appt-1",
      patient: { name: "Jane Doe", phone: "555-0100" }
    })

    expect(result).toEqual(booked)
    expect(supabase.from).toHaveBeenCalledWith("patients")
    expect(supabase.from).toHaveBeenCalledWith("appointments")
  })

  it("throws without booking the slot when patient creation fails", async () => {
    supabase.from.mockImplementation((table) => {
      if (table === "patients") {
        return chainableResult({ data: null, error: new Error("patient insert failed") })
      }
      throw new Error("appointments should not be touched")
    })

    await expect(
      bookAppointment({ appointmentId: "appt-1", patient: { name: "Jane Doe", phone: "555-0100" } })
    ).rejects.toThrow("patient insert failed")
  })
})
