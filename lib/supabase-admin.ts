import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

/**
 * Cliente Supabase com a service role key (bypassa RLS).
 * Uso exclusivo em código server-only (ex: app/api/seed/route.ts) — nunca importar de componentes client.
 *
 * Criado sob demanda (não no carregamento do módulo) para não quebrar o build
 * em ambientes onde SUPABASE_SERVICE_ROLE_KEY intencionalmente não está definida
 * (ex: produção, onde o seed é bloqueado).
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl.startsWith("https://")) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL does not look like a valid URL (should start with https://).",
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Add it to .env.local to run the seed.",
    );
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  return cachedClient;
}
