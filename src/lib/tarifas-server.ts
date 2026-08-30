import { createClient } from "@supabase/supabase-js";
import {
  normalizarTarifas,
  TARIFAS_CLAVE,
  TARIFAS_POR_DEFECTO,
  type Tarifas,
} from "./tarifas";

/**
 * Lee el documento de tarifas. Usa la clave pública sin cookies para que las
 * páginas que lo llaman puedan seguir siendo estáticas (ISR).
 */
export async function leerTarifas(): Promise<Tarifas> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
    const { data, error } = await supabase
      .from("prices")
      .select("features")
      .eq("name_es", TARIFAS_CLAVE)
      .maybeSingle();
    if (error || !data) return TARIFAS_POR_DEFECTO;
    return normalizarTarifas(data.features);
  } catch {
    return TARIFAS_POR_DEFECTO;
  }
}
