"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizarTarifas, TARIFAS_CLAVE, type Tarifas } from "@/lib/tarifas";
import type { ActionResult } from "../../types";

export async function saveTarifas(input: Tarifas): Promise<ActionResult> {
  try {
    await requireAdmin();

    const doc = normalizarTarifas(input);
    if (doc.secciones.length === 0) {
      return { ok: false, error: "Tiene que quedar al menos una sección con líneas." };
    }
    const sinPrecio = doc.secciones.flatMap((s) => s.filas).find((f) => f.precio <= 0);
    if (sinPrecio) {
      return { ok: false, error: `Falta el precio de «${sinPrecio.es || sinPrecio.eu}».` };
    }

    const db = createAdminClient();
    const { data: existente } = await db
      .from("prices")
      .select("id")
      .eq("name_es", TARIFAS_CLAVE)
      .maybeSingle();

    const row = {
      name_es: TARIFAS_CLAVE,
      name_eu: TARIFAS_CLAVE,
      description_es: "Documento de tarifas de la web, editado desde el panel",
      description_eu: "",
      price: 0,
      period: "documento",
      features: doc,
      highlighted: false,
      order: 0,
    };
    const { error } = existente
      ? await db.from("prices").update(row).eq("id", existente.id)
      : await db.from("prices").insert(row);
    if (error) return { ok: false, error: error.message };

    revalidatePath("/[locale]", "page");
    revalidatePath("/[locale]/precios", "page");
    revalidatePath("/[locale]/masajes", "page");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Error inesperado." };
  }
}
