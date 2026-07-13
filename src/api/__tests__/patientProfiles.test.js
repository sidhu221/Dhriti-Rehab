import { describe, it, expect, vi, beforeEach } from "vitest"
import { chainableResult } from "./supabaseTestUtils"

vi.mock("../../lib/supabaseClient", () => ({
  supabase: {
    from: vi.fn(),
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn()
    }
  }
}))

import { supabase } from "../../lib/supabaseClient"
import {
  signInPatient,
  signUpPatientProfile,
  getCurrentPatientProfile,
  getCurrentPatientAppointments,
  signOutPatient
} from "../patientProfiles"

beforeEach(() => {
  supabase.from.mockReset()
  supabase.auth.signInWithPassword.mockReset()
  supabase.auth.signUp.mockReset()
  supabase.auth.getUser.mockReset()
  supabase.auth.signOut.mockReset()
})

describe("signInPatient", () => {
  it("returns the session data on success", async () => {
    const session = { user: { id: "1" } }
    supabase.auth.signInWithPassword.mockResolvedValue({ data: session, error: null })

    await expect(signInPatient({ email: "a@b.com", password: "secret" })).resolves.toEqual(session)
  })

  it("throws on invalid credentials", async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: new Error("Invalid login credentials")
    })

    await expect(signInPatient({ email: "a@b.com", password: "wrong" })).rejects.toThrow(
      "Invalid login credentials"
    )
  })
})

describe("signUpPatientProfile", () => {
  it("returns a pending message when email confirmation is required", async () => {
    supabase.auth.signUp.mockResolvedValue({
      data: { user: { id: "1" }, session: null },
      error: null
    })

    const result = await signUpPatientProfile({
      firstName: "Jane",
      lastName: "Doe",
      dob: "2000-01-01",
      email: "jane@example.com",
      password: "secret"
    })

    expect(result.profile).toBeNull()
    expect(result.message).toMatch(/check your email/i)
    expect(supabase.from).not.toHaveBeenCalled()
  })

  it("upserts and returns the profile when a session is issued immediately", async () => {
    supabase.auth.signUp.mockResolvedValue({
      data: { user: { id: "1" }, session: { access_token: "tok" } },
      error: null
    })
    const profile = { id: "1", first_name: "Jane", last_name: "Doe" }
    supabase.from.mockReturnValue(chainableResult({ data: profile, error: null }))

    const result = await signUpPatientProfile({
      firstName: "Jane",
      lastName: "Doe",
      dob: "2000-01-01",
      email: "jane@example.com",
      password: "secret"
    })

    expect(result.profile).toEqual(profile)
    expect(supabase.from).toHaveBeenCalledWith("patient_profiles")
  })

  it("throws when auth sign-up fails", async () => {
    supabase.auth.signUp.mockResolvedValue({ data: null, error: new Error("email already in use") })

    await expect(
      signUpPatientProfile({
        firstName: "Jane",
        lastName: "Doe",
        dob: "2000-01-01",
        email: "jane@example.com",
        password: "secret"
      })
    ).rejects.toThrow("email already in use")
  })
})

describe("getCurrentPatientProfile", () => {
  it("returns null user/profile when logged out", async () => {
    supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null })

    await expect(getCurrentPatientProfile()).resolves.toEqual({ user: null, profile: null })
    expect(supabase.from).not.toHaveBeenCalled()
  })

  it("returns the profile for a logged-in user", async () => {
    const user = { id: "1" }
    const profile = { id: "1", first_name: "Jane" }
    supabase.auth.getUser.mockResolvedValue({ data: { user }, error: null })
    supabase.from.mockReturnValue(chainableResult({ data: profile, error: null }))

    await expect(getCurrentPatientProfile()).resolves.toEqual({ user, profile })
  })
})

describe("getCurrentPatientAppointments", () => {
  it("returns appointments for the given patient email", async () => {
    const appointments = [{ id: "a1" }]
    supabase.from.mockReturnValue(chainableResult({ data: appointments, error: null }))

    await expect(getCurrentPatientAppointments("jane@example.com")).resolves.toEqual(appointments)
  })
})

describe("signOutPatient", () => {
  it("resolves on success", async () => {
    supabase.auth.signOut.mockResolvedValue({ error: null })

    await expect(signOutPatient()).resolves.toBeUndefined()
  })

  it("throws when sign-out fails", async () => {
    supabase.auth.signOut.mockResolvedValue({ error: new Error("network error") })

    await expect(signOutPatient()).rejects.toThrow("network error")
  })
})
