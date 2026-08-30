"use server";

import { revalidatePath } from "next/cache";
import sharp from "sharp";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ActionResult } from "../../types";

const BUCKET = "class-images";
const CATEGORIES: readonly string[] = ["dantza", "fitness", "wellness"];
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

function publishSite() {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/horarios", "page");
  revalidatePath("/[locale]/clases", "page");
}

function mensaje(e: unknown) {
  return e instanceof Error ? e.message : "Error inesperado.";
}

function slugify(s: string) {
  return (
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/&/g, " y ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "clase"
  );
}

function texto(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function entero(fd: FormData, key: string) {
  const v = texto(fd, key);
  if (!v) return null;
  const n = Number(v);
  return Number.isInteger(n) && n >= 0 ? n : null;
}

export async function saveClass(fd: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const id = texto(fd, "id") || null;
    const name = texto(fd, "name");
    const category = texto(fd, "category");
    if (!name) return { ok: false, error: "El nombre es obligatorio." };
    if (!CATEGORIES.includes(category)) {
      return { ok: false, error: "Categoría no válida." };
    }
    const min_age = entero(fd, "min_age");
    const max_age = entero(fd, "max_age");
    if (min_age !== null && max_age !== null && max_age < min_age) {
      return { ok: false, error: "La edad máxima no puede ser menor que la mínima." };
    }

    const db = createAdminClient();

    // slug unico solo al crear; al editar se conserva (lo usan las fotos por defecto)
    let slug: string | undefined;
    if (!id) {
      const base = slugify(name);
      slug = base;
      for (let i = 2; i < 50; i++) {
        const { data } = await db
          .from("classes")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();
        if (!data) break;
        slug = `${base}-${i}`;
      }
    }

    let image_url: string | undefined;
    const file = fd.get("image");
    if (file instanceof File && file.size > 0) {
      if (!file.type.startsWith("image/")) {
        return { ok: false, error: "El archivo tiene que ser una imagen." };
      }
      if (file.size > MAX_IMAGE_BYTES) {
        return { ok: false, error: "La imagen no puede pesar más de 8 MB." };
      }
      // Las fotos de móvil pesan varios MB: se reducen a 1600px y se guardan en webp.
      const original = Buffer.from(await file.arrayBuffer());
      let buffer: Buffer = original;
      let contentType = file.type;
      let ext =
        (file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") ||
        "jpg";
      try {
        buffer = await sharp(original)
          .rotate()
          .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer();
        contentType = "image/webp";
        ext = "webp";
      } catch {
        // si no se puede procesar, se sube tal cual
      }
      const path = `${slug ?? id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await db.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType, upsert: false });
      if (uploadError) {
        return { ok: false, error: `No se pudo subir la foto: ${uploadError.message}` };
      }
      image_url = db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    }

    const row: Record<string, unknown> = {
      name,
      category,
      description_es: texto(fd, "description_es"),
      description_eu: texto(fd, "description_eu"),
      min_age,
      max_age,
    };
    if (image_url) row.image_url = image_url;
    if (slug) row.slug = slug;

    const { error } = id
      ? await db.from("classes").update(row).eq("id", id)
      : await db.from("classes").insert(row);
    if (error) return { ok: false, error: error.message };

    publishSite();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: mensaje(e) };
  }
}

export async function deleteClass(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const db = createAdminClient();
    const { error } = await db.from("classes").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    publishSite();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: mensaje(e) };
  }
}
