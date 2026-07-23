/**
 * Supabase configuration placeholder.
 *
 * This module does not create a client or connect to Supabase. It only
 * centralizes the environment variable names for a later integration sprint.
 */
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
} as const;

export const isSupabaseConfigured =
  supabaseConfig.url.length > 0 && supabaseConfig.anonKey.length > 0;
