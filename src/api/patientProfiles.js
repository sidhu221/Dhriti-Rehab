import { supabase } from "../lib/supabaseClient"

// Logs an existing patient into Supabase Auth.
export async function signInPatient({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  return data
}

// Creates a Supabase Auth user and stores public profile fields in patient_profiles.
// The password is handled by Supabase Auth and should not be stored as plain text.
export async function signUpPatientProfile({ firstName, lastName, dob, email, password }) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        dob
      }
    }
  })

  if (authError) throw authError

  const userId = authData.user?.id

  if (!userId || !authData.session) {
    return {
      user: authData.user,
      profile: null,
      message: "Please check your email to finish creating your account."
    }
  }

  // If the SQL trigger is installed, this upsert simply keeps the profile in sync.
  const { data: profile, error: profileError } = await supabase
    .from("patient_profiles")
    .upsert(
      {
        id: userId,
        first_name: firstName,
        last_name: lastName,
        dob,
        email
      },
      { onConflict: "id" }
    )
    .select()
    .single()

  if (profileError) throw profileError

  return {
    user: authData.user,
    profile,
    message: "Your account has been created."
  }
}

// Loads the currently authenticated user's patient profile.
export async function getCurrentPatientProfile() {
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError) throw userError
  if (!userData.user) return { user: null, profile: null }

  const { data: profile, error: profileError } = await supabase
    .from("patient_profiles")
    .select("*")
    .eq("id", userData.user.id)
    .maybeSingle()

  if (profileError) throw profileError

  return {
    user: userData.user,
    profile
  }
}

// Finds appointment rows connected to the logged-in patient's email address.
export async function getCurrentPatientAppointments(email) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, doctors(*), patients!inner(*)")
    .eq("patients.email", email)
    .order("date", { ascending: true })
    .order("time", { ascending: true })

  if (error) throw error
  return data
}

// Ends the current patient session.
export async function signOutPatient() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
