import { createClient } from "@supabase/supabase-js";

/**
 * Cliente con la clave de servicio. Salta las políticas RLS, así que solo se
 * usa en el servidor y siempre después de `requireAdmin()`.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
