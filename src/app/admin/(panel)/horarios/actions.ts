"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ActionResult } from "../../types";

export interface SessionInput {
  id?: string;
  class_id: string;
  location_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  notes: string;
}

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Regenera las páginas públicas afectadas para que el cambio se vea al momento. */
function publishSite() {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/horarios", "page");
  revalidatePath("/[locale]/clases", "page");
}

function mensaje(e: unknown) {
  return e instanceof Error ? e.message : "Error inesperado.";
}

export async function saveSession(input: SessionInput): Promise<ActionResult> {
  try {
    await requireAdmin();

    if (!input.class_id) return { ok: false, error: "Elige una clase." };
    if (!input.location_id) return { ok: false, error: "Elige un local." };
    if (
      !Number.isInteger(input.day_of_week) ||
      input.day_of_week < 0 ||
      input.day_of_week > 4
    ) {
      return { ok: false, error: "Día no válido." };
    }
    if (!TIME.test(input.start_time) || !TIME.test(input.end_time)) {
      return { ok: false, error: "Hora no válida." };
    }
    if (input.end_time <= input.start_time) {
      return {
        ok: false,
        error: "La hora de fin tiene que ser posterior a la de inicio.",
      };
    }

    const row = {
      class_id: input.class_id,
      location_id: input.location_id,
      day_of_week: input.day_of_week,
      start_time: input.start_time,
      end_time: input.end_time,
      notes: input.notes.trim() || null,
      is_active: true,
      updated_at: new Date().toISOString(),
    };

    const db = createAdminClient();
    const { error } = input.id
      ? await db.from("schedules").update(row).eq("id", input.id)
      : await db.from("schedules").insert(row);
    if (error) return { ok: false, error: error.message };

    publishSite();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: mensaje(e) };
  }
}

export async function deleteSession(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const db = createAdminClient();
    const { error } = await db.from("schedules").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    publishSite();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: mensaje(e) };
  }
}

export async function publish(): Promise<ActionResult> {
  try {
    await requireAdmin();
    publishSite();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: mensaje(e) };
  }
}
