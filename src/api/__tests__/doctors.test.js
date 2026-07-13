import { describe, it, expect, vi, beforeEach } from "vitest"
import { chainableResult } from "./supabaseTestUtils"

vi.mock("../../lib/supabaseClient", () => ({
  supabase: { from: vi.fn() }
}))

import { supabase } from "../../lib/supabaseClient"
import { getDoctors, getDoctorById } from "../doctors"

describe("getDoctors", () => {
  beforeEach(() => {
    supabase.from.mockReset()
  })

  it("returns the doctor rows on success", async () => {
    const doctors = [{ id: "1", name: "Dr. K.B Nihal" }]
    supabase.from.mockReturnValue(chainableResult({ data: doctors, error: null }))

    const result = await getDoctors()

    expect(result).toEqual(doctors)
    expect(supabase.from).toHaveBeenCalledWith("doctors")
  })

  it("throws when supabase returns an error", async () => {
    const dbError = new Error("connection failed")
    supabase.from.mockReturnValue(chainableResult({ data: null, error: dbError }))

    await expect(getDoctors()).rejects.toThrow("connection failed")
  })
})

describe("getDoctorById", () => {
  beforeEach(() => {
    supabase.from.mockReset()
  })

  it("returns a single doctor on success", async () => {
    const doctor = { id: "1", name: "Dr. K.B Nihal" }
    supabase.from.mockReturnValue(chainableResult({ data: doctor, error: null }))

    const result = await getDoctorById("1")

    expect(result).toEqual(doctor)
  })

  it("throws when no matching doctor is found", async () => {
    const dbError = new Error("no rows found")
    supabase.from.mockReturnValue(chainableResult({ data: null, error: dbError }))

    await expect(getDoctorById("missing")).rejects.toThrow("no rows found")
  })
})
