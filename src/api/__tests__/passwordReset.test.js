import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("../../lib/supabaseClient", () => ({
  supabase: {
    rpc: vi.fn(),
    auth: {
      resetPasswordForEmail: vi.fn()
    }
  }
}))

import { supabase } from "../../lib/supabaseClient"
import { requestPasswordReset } from "../passwordReset"

beforeEach(() => {
  supabase.rpc.mockReset()
  supabase.auth.resetPasswordForEmail.mockReset()
})

describe("requestPasswordReset", () => {
  it("normalizes the email before checking it exists", async () => {
    supabase.rpc.mockResolvedValue({ data: true, error: null })
    supabase.auth.resetPasswordForEmail.mockResolvedValue({ error: null })

    await requestPasswordReset("  Jane@Example.com  ")

    expect(supabase.rpc).toHaveBeenCalledWith("patient_email_exists", {
      lookup_email: "jane@example.com"
    })
    expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      "jane@example.com",
      expect.objectContaining({ redirectTo: expect.stringContaining("/login") })
    )
  })

  it("skips sending a reset email when the address is unknown", async () => {
    supabase.rpc.mockResolvedValue({ data: false, error: null })

    const result = await requestPasswordReset("nobody@example.com")

    expect(result).toEqual({ sent: false, message: "No email found." })
    expect(supabase.auth.resetPasswordForEmail).not.toHaveBeenCalled()
  })

  it("throws when the existence lookup fails", async () => {
    supabase.rpc.mockResolvedValue({ data: null, error: new Error("rpc failed") })

    await expect(requestPasswordReset("jane@example.com")).rejects.toThrow("rpc failed")
    expect(supabase.auth.resetPasswordForEmail).not.toHaveBeenCalled()
  })

  it("throws when sending the reset email fails", async () => {
    supabase.rpc.mockResolvedValue({ data: true, error: null })
    supabase.auth.resetPasswordForEmail.mockResolvedValue({ error: new Error("send failed") })

    await expect(requestPasswordReset("jane@example.com")).rejects.toThrow("send failed")
  })
})
