import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public project URL and anon key, injected at build time. Both are meant to be public:
// what anyone can read or write is decided by the RLS policies in supabase/migrations.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

let client: SupabaseClient | null = null;

/** Browser client with the session kept in localStorage. Null until the env vars are set. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  client ??= createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}
