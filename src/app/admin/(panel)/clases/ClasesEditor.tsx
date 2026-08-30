"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Eye, EyeOff, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import type { ClassType } from "@/types/database";
import { CLASSES_HIDDEN_FROM_LIST } from "@/lib/constants";
import { CLASS_IMAGES } from "@/lib/class-images";
import { deleteClass, saveClass } from "./actions";

const CATEGORIAS = [
  { value: "dantza", label: "Danza" },
  { value: "fitness", label: "Fitness" },
  { value: "wellness", label: "Bienestar" },
] as const;

interface Notice {
  type: "ok" | "error";
  text: string;
}

const INPUT =
  "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-base outline-none transition-colors focus:border-accent";
const LABEL =
  "mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-black/45";

export default function ClasesEditor({
  classes,
  sessionsByClass,
}: {
  classes: ClassType[];
  sessionsByClass: Record<string, number>;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<ClassType | "new" | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [pending, startTransition] = useTransition();

  const current = editing === "new" ? null : editing;
  const currentImg = current ? current.image_url || CLASS_IMAGES[current.slug] : undefined;

  function esVisible(c: ClassType) {
    return (sessionsByClass[c.id] ?? 0) > 0 && !CLASSES_HIDDEN_FROM_LIST.includes(c.slug);
  }

  function abrir(target: ClassType | "new") {
    setNotice(null);
    setEditing(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    startTransition(async () => {
      const r = await saveClass(fd);
      if (r.ok) {
        setEditing(null);
        setNotice({ type: "ok", text: "Guardado y publicado en la web." });
        router.refresh();
      } else {
        setNotice({ type: "error", text: r.error });
      }
    });
  }

  function borrar(c: ClassType) {
    const n = sessionsByClass[c.id] ?? 0;
    const aviso =
      n > 0 ? `\n\nOjo: también desaparecerán sus ${n} sesiones del horario.` : "";
    if (!window.confirm(`¿Eliminar la clase «${c.name}»?${aviso}`)) return;
    startTransition(async () => {
      const r = await deleteClass(c.id);
      if (r.ok) {
        setNotice({ type: "ok", text: "Clase eliminada y web actualizada." });
        router.refresh();
      } else {
        setNotice({ type: "error", text: r.error });
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Clases</h1>
          <p className="mt-1 text-sm text-black/55">
            Una clase aparece en la web cuando tiene al menos una sesión en el horario.
          </p>
        </div>
        <button
          type="button"
          onClick={() => abrir("new")}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-[#d9bb82]"
        >
          <Plus size={16} />
          Nueva clase
        </button>
      </div>

      {notice && (
        <p
          role="status"
          className={`rounded-xl border px-4 py-3 text-sm ${
            notice.type === "ok"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {notice.text}
        </p>
      )}

      {editing && (
        <form
          key={current?.id ?? "new"}
          onSubmit={onSubmit}
          className="rounded-2xl border border-accent/50 bg-white p-4 shadow-md md:p-5"
        >
          <h2 className="mb-4 font-heading text-lg font-bold">
            {current ? `Editar «${current.name}»` : "Nueva clase"}
          </h2>
          {current && <input type="hidden" name="id" value={current.id} />}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={LABEL}>Nombre</span>
              <input
                name="name"
                required
                maxLength={60}
                defaultValue={current?.name ?? ""}
                className={INPUT}
              />
            </label>

            <label className="block">
              <span className={LABEL}>Categoría</span>
              <select
                name="category"
                defaultValue={current?.category ?? "fitness"}
                className={INPUT}
              >
                {CATEGORIAS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className={LABEL}>Descripción (castellano)</span>
              <textarea
                name="description_es"
                rows={3}
                maxLength={300}
                defaultValue={current?.description_es ?? ""}
                className={INPUT}
              />
            </label>

            <label className="block sm:col-span-2">
              <span className={LABEL}>Descripción (euskera)</span>
              <textarea
                name="description_eu"
                rows={3}
                maxLength={300}
                defaultValue={current?.description_eu ?? ""}
                className={INPUT}
              />
            </label>

            <label className="block">
              <span className={LABEL}>Edad mínima (opcional)</span>
              <input
                name="min_age"
                type="number"
                min={0}
                max={99}
                inputMode="numeric"
                defaultValue={current?.min_age ?? ""}
                className={INPUT}
              />
            </label>

            <label className="block">
              <span className={LABEL}>Edad máxima (opcional)</span>
              <input
                name="max_age"
                type="number"
                min={0}
                max={99}
                inputMode="numeric"
                defaultValue={current?.max_age ?? ""}
                className={INPUT}
              />
            </label>

            <div className="sm:col-span-2">
              <span className={LABEL}>Foto</span>
              <div className="flex items-center gap-4">
                {currentImg && (
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-black/5">
                    <Image
                      src={currentImg}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                )}
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-black/25 px-4 py-3 text-sm text-black/65 transition-colors hover:border-accent hover:text-black">
                  <Upload size={16} />
                  {currentImg ? "Cambiar foto" : "Subir foto"}
                  <input name="image" type="file" accept="image/*" className="sr-only" />
                </label>
              </div>
              <p className="mt-1.5 text-xs text-black/45">
                Si no subes ninguna, se usa la foto que ya tenga la clase.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-heading text-sm font-semibold text-primary transition-colors hover:bg-[#d9bb82] disabled:opacity-50"
            >
              <Check size={16} />
              {pending ? "Guardando…" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/5"
            >
              <X size={16} />
              Cancelar
            </button>
          </div>
        </form>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {classes.map((c) => {
          const visible = esVisible(c);
          const n = sessionsByClass[c.id] ?? 0;
          const img = c.image_url || CLASS_IMAGES[c.slug];
          return (
            <li
              key={c.id}
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-black/10 bg-white p-3 shadow-sm"
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-black/5">
                {img && (
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-sm font-bold">{c.name}</p>
                <p className="text-xs text-black/50">
                  {CATEGORIAS.find((k) => k.value === c.category)?.label ?? c.category}
                  {" · "}
                  {n} {n === 1 ? "sesión" : "sesiones"}
                </p>
                <p
                  className={`mt-1 inline-flex items-center gap-1 text-[0.7rem] font-medium ${
                    visible ? "text-emerald-700" : "text-black/40"
                  }`}
                >
                  {visible ? <Eye size={12} /> : <EyeOff size={12} />}
                  {visible ? "Visible en la web" : "No aparece en la web"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => abrir(c)}
                aria-label="Editar"
                className="flex h-9 w-9 items-center justify-center rounded-full text-black/55 transition-colors hover:bg-black/5 hover:text-black"
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                onClick={() => borrar(c)}
                aria-label="Eliminar"
                className="flex h-9 w-9 items-center justify-center rounded-full text-red-600 transition-colors hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
