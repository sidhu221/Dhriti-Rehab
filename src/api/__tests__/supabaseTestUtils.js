import { vi } from "vitest"

// The real supabase-js query builder is chainable (.select().eq().order()...)
// and only becomes a promise when awaited. This proxy mimics that: every
// method call (select, eq, order, single, etc.) returns another chainable
// proxy resolving to the same fixed result, regardless of chain length.
export function chainableResult(result) {
  return new Proxy(
    {},
    {
      get(_target, prop) {
        if (prop === "then") {
          return (resolve, reject) => Promise.resolve(result).then(resolve, reject)
        }
        if (prop === "catch") {
          return (reject) => Promise.resolve(result).catch(reject)
        }
        return () => chainableResult(result)
      }
    }
  )
}

// Builds a fake supabase client whose .from()/.rpc() calls resolve to
// `result` and whose .auth methods can be overridden per test via `auth`.
export function createSupabaseMock({ result = { data: null, error: null }, auth = {} } = {}) {
  return {
    from: vi.fn(() => chainableResult(result)),
    rpc: vi.fn(() => chainableResult(result)),
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      ...auth
    }
  }
}
