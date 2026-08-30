"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  let fallo: unknown = null;
  try {
    const { error } = await supabase.auth.signOut();
    fallo = error;
  } catch (e) {
    fallo = e;
  }
  if (fallo) {
    // La sesión ya estaba caducada o revocada (p. ej. tras cambiar la
    // contraseña): Supabase no limpia las cookies, así que se borran a mano.
    const store = await cookies();
    for (const c of store.getAll()) {
      if (c.name.startsWith("sb-") && c.name.includes("-auth-token")) {
        store.delete(c.name);
      }
    }
  }
  redirect("/admin/login");
}
