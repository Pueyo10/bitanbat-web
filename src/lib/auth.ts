import { createClient } from "@/lib/supabase/server";

export interface AdminUser {
  id: string;
  email: string;
}

/**
 * Devuelve el usuario si tiene sesión y el rol "admin" en app_metadata.
 * Ese rol solo puede asignarlo la clave de servicio, nunca el propio usuario.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.app_metadata?.role !== "admin") return null;
  return { id: user.id, email: user.email ?? "" };
}

export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) throw new Error("La sesión ha caducado. Vuelve a iniciar sesión.");
  return user;
}
