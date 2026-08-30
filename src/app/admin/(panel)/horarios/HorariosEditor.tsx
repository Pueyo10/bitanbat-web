"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { DAYS_ES } from "@/lib/constants";
import { SESION_CADUCADA } from "../../types";
import {
  deleteSession,
  publish,
  saveSession,
  type SessionInput,
} from "./actions";

interface Location {
  id: string;
  name: string;
}
interface ClassOption {
  id: string;
  name: string;
  slug: string;
  category: string;
}
interface Session {
  id: string;
  class_id: string;
  location_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  notes: string | null;
}
interface Notice {
  type: "ok" | "error";
  text: string;
}

/** Mismas pestañas que ve la gente en la web. */
const TABS = [
  { key: "all", label: "Todas" },
  { key: "dantza", label: "Danza" },
  { key: "fitness", label: "Fitness" },
  { key: "wellness", label: "Pilates & Bienestar" },
] as const;

const hhmm = (t: string) => t.slice(0, 5);

function unaHoraDespues(t: string) {
  const [h, m] = t.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return t;
  return `${String((h + 1) % 24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const INPUT =
  "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-base outline-none transition-colors focus:border-accent";
const LABEL =
  "mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-black/45";

export default function HorariosEditor({
  locations,
  classes,
  sessions,
}: {
  locations: Location[];
  classes: ClassOption[];
  sessions: Session[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<string>("all");
  const [form, setForm] = useState<SessionInput | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [pending, startTransition] = useTransition();

  const classById = useMemo(
    () => new Map(classes.map((c) => [c.id, c])),
    [classes]
  );
  const locationById = useMemo(
    () => new Map(locations.map((l) => [l.id, l])),
    [locations]
  );

  const byDay = useMemo(() => {
    const days: Session[][] = [[], [], [], [], []];
    for (const s of sessions) {
      const category = classById.get(s.class_id)?.category;
      if (tab === "all" || category === tab) days[s.day_of_week]?.push(s);
    }
    return days;
  }, [sessions, tab, classById]);

  /** Sin sesión se vuelve al login; cualquier otro error se muestra. */
  function fallo(error: string) {
    if (error === SESION_CADUCADA) {
      router.replace("/admin/login");
      return;
    }
    setNotice({ type: "error", text: error });
  }

  /** Local más habitual de esa clase, para no tener que elegirlo cada vez. */
  function localHabitual(classId: string) {
    const cuenta = new Map<string, number>();
    for (const s of sessions) {
      if (s.class_id === classId) {
        cuenta.set(s.location_id, (cuenta.get(s.location_id) ?? 0) + 1);
      }
    }
    let mejor = locations[0]?.id ?? "";
    let max = 0;
    for (const [loc, n] of cuenta) {
      if (n > max) {
        max = n;
        mejor = loc;
      }
    }
    return mejor;
  }

  function nueva(day: number) {
    setNotice(null);
    const primera =
      classes.find((c) => tab === "all" || c.category === tab) ?? classes[0];
    const classId = primera?.id ?? "";
    setForm({
      class_id: classId,
      location_id: localHabitual(classId),
      day_of_week: day,
      start_time: "10:00",
      end_time: "11:00",
      notes: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editar(s: Session) {
    setNotice(null);
    setForm({
      id: s.id,
      class_id: s.class_id,
      location_id: s.location_id,
      day_of_week: s.day_of_week,
      start_time: hhmm(s.start_time),
      end_time: hhmm(s.end_time),
      notes: s.notes ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function guardar() {
    if (!form) return;
    startTransition(async () => {
      const r = await saveSession(form);
      if (r.ok) {
        setForm(null);
        setNotice({ type: "ok", text: "Guardado y publicado en la web." });
        router.refresh();
      } else {
        fallo(r.error);
      }
    });
  }

  function borrar(s: Session) {
    const nombre = classById.get(s.class_id)?.name ?? "esta clase";
    const ok = window.confirm(
      `¿Quitar ${nombre} del ${DAYS_ES[s.day_of_week]} a las ${hhmm(s.start_time)}?`
    );
    if (!ok) return;
    startTransition(async () => {
      const r = await deleteSession(s.id);
      if (r.ok) {
        setNotice({ type: "ok", text: "Clase quitada y web actualizada." });
        router.refresh();
      } else {
        fallo(r.error);
      }
    });
  }

  function republicar() {
    startTransition(async () => {
      const r = await publish();
      if (r.ok) setNotice({ type: "ok", text: "Web actualizada." });
      else fallo(r.error);
    });
  }

  const grupos = TABS.filter((t) => t.key !== "all").map((t) => ({
    ...t,
    clases: classes.filter((c) => c.category === t.key),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Horarios</h1>
          <p className="mt-1 text-sm text-black/55">
            Cada cambio se publica en la web al guardar.
          </p>
        </div>
        <button
          type="button"
          onClick={republicar}
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-accent disabled:opacity-50"
        >
          <RefreshCw size={15} className={pending ? "animate-spin" : ""} />
          Actualizar web
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => {
              setTab(t.key);
              setForm(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              t.key === tab
                ? "bg-[#0f0e0c] text-white"
                : "border border-black/10 bg-white text-black/60 hover:border-black/30"
            }`}
          >
            {t.label}
          </button>
        ))}
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

      {form && (
        <div className="rounded-2xl border border-accent/50 bg-white p-4 shadow-md md:p-5">
          <h2 className="mb-4 font-heading text-lg font-bold">
            {form.id ? "Editar clase" : "Nueva clase"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className={LABEL}>Clase</span>
              <select
                value={form.class_id}
                onChange={(e) => {
                  const classId = e.target.value;
                  setForm({
                    ...form,
                    class_id: classId,
                    location_id: form.id ? form.location_id : localHabitual(classId),
                  });
                }}
                className={INPUT}
              >
                {grupos.map((g) => (
                  <optgroup key={g.key} label={g.label}>
                    {g.clases.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={LABEL}>Día</span>
              <select
                value={form.day_of_week}
                onChange={(e) =>
                  setForm({ ...form, day_of_week: Number(e.target.value) })
                }
                className={INPUT}
              >
                {DAYS_ES.map((d, i) => (
                  <option key={d} value={i}>
                    {d}
                  </option>
                ))}
              </select>
            </label>

            {locations.length > 1 && (
              <label className="block">
                <span className={LABEL}>Local</span>
                <select
                  value={form.location_id}
                  onChange={(e) =>
                    setForm({ ...form, location_id: e.target.value })
                  }
                  className={INPUT}
                >
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label className="block">
              <span className={LABEL}>Empieza</span>
              <input
                type="time"
                required
                value={form.start_time}
                onChange={(e) => {
                  const v = e.target.value;
                  setForm({
                    ...form,
                    start_time: v,
                    end_time: form.id ? form.end_time : unaHoraDespues(v),
                  });
                }}
                className={INPUT}
              />
            </label>

            <label className="block">
              <span className={LABEL}>Termina</span>
              <input
                type="time"
                required
                value={form.end_time}
                onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                className={INPUT}
              />
            </label>

            <label className="block sm:col-span-2">
              <span className={LABEL}>Nota (opcional)</span>
              <input
                type="text"
                maxLength={40}
                placeholder="p. ej. avanzado · 7-9 urte · iniciación"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className={INPUT}
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={guardar}
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-heading text-sm font-semibold text-primary transition-colors hover:bg-[#d9bb82] disabled:opacity-50"
            >
              <Check size={16} />
              {pending ? "Guardando…" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => setForm(null)}
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/5"
            >
              <X size={16} />
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {DAYS_ES.map((dia, day) => (
          <section
            key={dia}
            className="min-w-0 rounded-2xl border border-black/10 bg-white/70 p-3 md:p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-base font-bold">
                {dia}
                <span className="ml-2 text-xs font-normal text-black/40">
                  {byDay[day].length}
                </span>
              </h2>
              <button
                type="button"
                onClick={() => nueva(day)}
                className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-[#d9bb82]"
              >
                <Plus size={14} />
                Añadir
              </button>
            </div>

            {byDay[day].length === 0 ? (
              <p className="py-3 text-center text-sm text-black/40">Sin clases</p>
            ) : (
              <ul className="space-y-2">
                {byDay[day].map((s) => {
                  const c = classById.get(s.class_id);
                  return (
                    <li
                      key={s.id}
                      className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm"
                    >
                      <span className="w-14 shrink-0 leading-tight">
                        <span className="block font-heading text-sm font-bold">
                          {hhmm(s.start_time)}
                        </span>
                        <span className="block text-[0.68rem] text-black/40">
                          {hhmm(s.end_time)}
                        </span>
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm">
                        {c?.name ?? "—"}
                        {s.notes && (
                          <span className="ml-1 text-black/45">· {s.notes}</span>
                        )}
                        {locations.length > 1 && (
                          <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-[0.65rem] text-black/45">
                            {locationById.get(s.location_id)?.name ?? "?"}
                          </span>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => editar(s)}
                        aria-label="Editar"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-black/55 transition-colors hover:bg-black/5 hover:text-black"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => borrar(s)}
                        aria-label="Quitar"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-red-600 transition-colors hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
