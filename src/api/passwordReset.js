import { supabase } from "../lib/supabaseClient"

// Checks whether the email exists in patient_profiles before sending a reset email.
export async function requestPasswordReset(email) {
  const normalizedEmail = email.trim().toLowerCase()

  const { data: emailExists, error: lookupError } = await supabase.rpc(
    "patient_email_exists",
    { lookup_email: normalizedEmail }
  )

  if (lookupError) throw lookupError

  if (!emailExists) {
    return {
      sent: false,
      message: "No email found."
    }
  }

  // Supabase Auth sends the automatic password reset email.
  const { error: resetError } = await supabase.auth.resetPasswordForEmail(
    normalizedEmail,
    {
      redirectTo: `${window.location.origin}/login`
    }
  )

  if (resetError) throw resetError

  return {
    sent: true,
    message: "Password reset email sent. Please check your inbox."
  }
}
