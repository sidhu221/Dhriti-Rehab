import { describe, it, expect, vi, beforeEach } from "vitest"
import { chainableResult } from "./supabaseTestUtils"

vi.mock("../../lib/supabaseClient", () => ({
  supabase: { from: vi.fn() }
}))

import { supabase } from "../../lib/supabaseClient"
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  getAppointmentsForPatient
} from "../patients"

beforeEach(() => {
  supabase.from.mockReset()
})

describe("getPatients", () => {
  it("returns every patient row", async () => {
    const patients = [{ id: "1", name: "Jane Doe" }]
    supabase.from.mockReturnValue(chainableResult({ data: patients, error: null }))

    const result = await getPatients()

    expect(result).toEqual(patients)
    expect(supabase.from).toHaveBeenCalledWith("patients")
  })

  it("throws on a database error", async () => {
    supabase.from.mockReturnValue(chainableResult({ data: null, error: new Error("boom") }))

    await expect(getPatients()).rejects.toThrow("boom")
  })
})

describe("getPatientById", () => {
  it("returns the matching patient", async () => {
    const patient = { id: "1", name: "Jane Doe" }
    supabase.from.mockReturnValue(chainableResult({ data: patient, error: null }))

    await expect(getPatientById("1")).resolves.toEqual(patient)
  })
})

describe("createPatient", () => {
  it("inserts and returns the new patient row", async () => {
    const created = { id: "1", name: "Jane Doe", phone: "555-0100", email: null }
    supabase.from.mockReturnValue(chainableResult({ data: created, error: null }))

    const result = await createPatient({ name: "Jane Doe", phone: "555-0100" })

    expect(result).toEqual(created)
  })

  it("throws when insert fails", async () => {
    supabase.from.mockReturnValue(chainableResult({ data: null, error: new Error("insert failed") }))

    await expect(createPatient({ name: "Jane Doe", phone: "555-0100" })).rejects.toThrow(
      "insert failed"
    )
  })
})

describe("updatePatient", () => {
  it("returns the updated patient row", async () => {
    const updated = { id: "1", name: "Jane Smith" }
    supabase.from.mockReturnValue(chainableResult({ data: updated, error: null }))

    const result = await updatePatient("1", { name: "Jane Smith" })

    expect(result).toEqual(updated)
  })
})

describe("deletePatient", () => {
  it("resolves without error on success", async () => {
    supabase.from.mockReturnValue(chainableResult({ error: null }))

    await expect(deletePatient("1")).resolves.toBeUndefined()
  })

  it("throws when delete fails", async () => {
    supabase.from.mockReturnValue(chainableResult({ error: new Error("delete failed") }))

    await expect(deletePatient("1")).rejects.toThrow("delete failed")
  })
})

describe("getAppointmentsForPatient", () => {
  it("returns appointments joined with doctor details", async () => {
    const appointments = [{ id: "a1", doctors: { name: "Dr. K.B Nihal" } }]
    supabase.from.mockReturnValue(chainableResult({ data: appointments, error: null }))

    const result = await getAppointmentsForPatient("1")

    expect(result).toEqual(appointments)
    expect(supabase.from).toHaveBeenCalledWith("appointments")
  })
})
