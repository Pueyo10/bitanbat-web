"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import type { Tarifas, TarifaFormato } from "@/lib/tarifas";
import { SESION_CADUCADA } from "../../types";
import { saveTarifas } from "./actions";

/* ── Estado del editor: igual que el documento pero con ids estables
      y los precios como texto (para poder borrar y reescribir el campo) ── */

interface FilaEd {
  id: string;
  es: string;
  eu: string;
  detalleEs: string;
  detalleEu: string;
  precio: string;
}
interface SeccionEd {
  id: string;
  key: string;
  formato: TarifaFormato;
  tituloEs: string;
  tituloEu: string;
  subEs: string;
  subEu: string;
  colEs: string;
  colEu: string;
  filas: FilaEd[];
}
interface Doc {
  secciones: SeccionEd[];
  sueltaPrecio: string;
  sueltaTextoEs: string;
  sueltaTextoEu: string;
  notaEs: string;
  notaEu: string;
  masajes: {
    precio: string;
    precioUsuarios: string;
    premiumPrecio: string;
    premiumPrecioUsuarios: string;
  };
}
interface Notice {
  type: "ok" | "error";
  text: string;
}

let contador = 0;
const uid = () => `e${Date.now().toString(36)}${(contador++).toString(36)}`;
const precioTxt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));
const precioNum = (s: string) => Number(s.replace(",", ".")) || 0;

function aEditor(t: Tarifas): Doc {
  return {
    secciones: t.secciones.map((s) => ({
      ...s,
      id: uid(),
      filas: s.filas.map((f) => ({ ...f, id: uid(), precio: precioTxt(f.precio) })),
    })),
    sueltaPrecio: precioTxt(t.sueltaPrecio),
    sueltaTextoEs: t.sueltaTextoEs,
    sueltaTextoEu: t.sueltaTextoEu,
    notaEs: t.notaEs,
    notaEu: t.notaEu,
    masajes: {
      precio: precioTxt(t.masajes.precio),
      precioUsuarios: precioTxt(t.masajes.precioUsuarios),
      premiumPrecio: precioTxt(t.masajes.premiumPrecio),
      premiumPrecioUsuarios: precioTxt(t.masajes.premiumPrecioUsuarios),
    },
  };
}

/** Los ids del editor sobran: normalizarTarifas() los descarta en el servidor. */
function aDocumento(d: Doc): Tarifas {
  return {
    secciones: d.secciones.map((s) => ({
      ...s,
      filas: s.filas.map((f) => ({ ...f, precio: precioNum(f.precio) })),
    })),
    sueltaPrecio: precioNum(d.sueltaPrecio),
    sueltaTextoEs: d.sueltaTextoEs,
    sueltaTextoEu: d.sueltaTextoEu,
    notaEs: d.notaEs,
    notaEu: d.notaEu,
    masajes: {
      precio: precioNum(d.masajes.precio),
      precioUsuarios: precioNum(d.masajes.precioUsuarios),
      premiumPrecio: precioNum(d.masajes.premiumPrecio),
      premiumPrecioUsuarios: precioNum(d.masajes.premiumPrecioUsuarios),
    },
  };
}

function mover<T>(lista: T[], i: number, dir: -1 | 1) {
  const j = i + dir;
  if (j < 0 || j >= lista.length) return lista;
  const copia = [...lista];
  [copia[i], copia[j]] = [copia[j], copia[i]];
  return copia;
}

/* ── Estilos ── */

const INPUT =
  "w-full rounded-lg border border-black/10 bg-white px-2.5 py-2 text-sm outline-none transition-colors focus:border-accent";
const LABEL =
  "mb-1 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-black/45";
const ICON_BTN =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-black/50 transition-colors hover:bg-black/5 hover:text-black disabled:opacity-30";
const CARD = "rounded-2xl border border-black/10 bg-white p-4 shadow-sm md:p-5";

function Precio({
  value,
  onChange,
  etiqueta,
}: {
  value: string;
  onChange: (v: string) => void;
  etiqueta?: string;
}) {
  return (
    <label className="block">
      {etiqueta && <span className={LABEL}>{etiqueta}</span>}
      <span className="flex items-center gap-1">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, ""))}
          className={`${INPUT} w-24 text-right font-heading text-base font-bold`}
        />
        <span className="text-sm font-bold text-black/40">€</span>
      </span>
    </label>
  );
}

/* ── Editor ── */

export default function PreciosEditor({ inicial }: { inicial: Tarifas }) {
  const router = useRouter();
  const base = useMemo(() => aEditor(inicial), [inicial]);
  const [doc, setDoc] = useState<Doc>(base);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [pending, startTransition] = useTransition();

  // si el servidor manda datos nuevos (tras guardar), se parte de ellos
  useEffect(() => {
    setDoc(base);
    setDirty(false);
  }, [base]);

  // aviso al cerrar la pestaña con cambios sin guardar
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  function actualizar(fn: (d: Doc) => Doc) {
    setDoc((d) => fn(d));
    setDirty(true);
    setNotice(null);
  }
  const setSeccion = (id: string, patch: Partial<SeccionEd>) =>
    actualizar((d) => ({
      ...d,
      secciones: d.secciones.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  const setFila = (sid: string, fid: string, patch: Partial<FilaEd>) =>
    actualizar((d) => ({
      ...d,
      secciones: d.secciones.map((s) =>
        s.id === sid
          ? { ...s, filas: s.filas.map((f) => (f.id === fid ? { ...f, ...patch } : f)) }
          : s
      ),
    }));

  function guardar() {
    startTransition(async () => {
      const r = await saveTarifas(aDocumento(doc));
      if (r.ok) {
        setDirty(false);
        setNotice({ type: "ok", text: "Precios guardados y publicados en la web." });
        router.refresh();
      } else if (r.error === SESION_CADUCADA) {
        // sin sesión: al login (los cambios se pierden, pero el aviso de
        // beforeunload no aplica a navegaciones internas)
        setDirty(false);
        router.replace("/admin/login");
      } else {
        setNotice({ type: "error", text: r.error });
      }
    });
  }

  function descartar() {
    if (!window.confirm("¿Descartar los cambios sin guardar?")) return;
    setDoc(base);
    setDirty(false);
    setNotice(null);
  }

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="font-heading text-2xl font-bold">Precios</h1>
        <p className="mt-1 text-sm text-black/55">
          Cambia importes y textos y pulsa «Guardar y publicar». Los campos en euskera son
          opcionales: si están vacíos se muestra el castellano.
        </p>
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

      {/* ── Secciones ── */}
      {doc.secciones.map((sec, si) => (
        <section key={sec.id} className={CARD}>
          <div className="mb-4 flex items-start justify-between gap-3">
            <span className="rounded-full bg-black/5 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-black/50">
              {sec.formato === "tabla" ? "Tabla" : "Tarjeta corta"}
            </span>
            <span className="flex gap-1">
              <button type="button" aria-label="Subir sección" disabled={si === 0} onClick={() => actualizar((d) => ({ ...d, secciones: mover(d.secciones, si, -1) }))} className={ICON_BTN}>
                <ChevronUp size={16} />
              </button>
              <button type="button" aria-label="Bajar sección" disabled={si === doc.secciones.length - 1} onClick={() => actualizar((d) => ({ ...d, secciones: mover(d.secciones, si, 1) }))} className={ICON_BTN}>
                <ChevronDown size={16} />
              </button>
              <button
                type="button"
                aria-label="Quitar sección"
                onClick={() => {
                  if (!window.confirm(`¿Quitar la sección «${sec.tituloEs || "sin título"}» con todas sus líneas?`)) return;
                  actualizar((d) => ({ ...d, secciones: d.secciones.filter((s) => s.id !== sec.id) }));
                }}
                className={`${ICON_BTN} text-red-600 hover:bg-red-50 hover:text-red-700`}
              >
                <Trash2 size={16} />
              </button>
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={LABEL}>Título</span>
              <input value={sec.tituloEs} onChange={(e) => setSeccion(sec.id, { tituloEs: e.target.value })} className={`${INPUT} font-heading font-bold`} />
            </label>
            <label className="block">
              <span className={LABEL}>Título (euskera)</span>
              <input value={sec.tituloEu} onChange={(e) => setSeccion(sec.id, { tituloEu: e.target.value })} className={INPUT} />
            </label>
            <label className="block">
              <span className={LABEL}>Subtítulo</span>
              <input value={sec.subEs} onChange={(e) => setSeccion(sec.id, { subEs: e.target.value })} className={INPUT} />
            </label>
            <label className="block">
              <span className={LABEL}>Subtítulo (euskera)</span>
              <input value={sec.subEu} onChange={(e) => setSeccion(sec.id, { subEu: e.target.value })} className={INPUT} />
            </label>
            {sec.formato === "tabla" && (
              <>
                <label className="block">
                  <span className={LABEL}>Columna de detalle (vacío = sin columna)</span>
                  <input value={sec.colEs} onChange={(e) => setSeccion(sec.id, { colEs: e.target.value })} className={INPUT} placeholder="p. ej. Duración semanal" />
                </label>
                <label className="block">
                  <span className={LABEL}>Columna de detalle (euskera)</span>
                  <input value={sec.colEu} onChange={(e) => setSeccion(sec.id, { colEu: e.target.value })} className={INPUT} />
                </label>
              </>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {sec.filas.map((fila, fi) => (
              <div key={fila.id} className="rounded-xl bg-[#f6f3ee] p-3">
                <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto_auto]">
                  <label className="block">
                    <span className={LABEL}>Modalidad</span>
                    <input value={fila.es} onChange={(e) => setFila(sec.id, fila.id, { es: e.target.value })} className={INPUT} />
                  </label>
                  <label className="block">
                    <span className={LABEL}>Modalidad (euskera)</span>
                    <input value={fila.eu} onChange={(e) => setFila(sec.id, fila.id, { eu: e.target.value })} className={INPUT} />
                  </label>
                  <Precio etiqueta="Precio / mes" value={fila.precio} onChange={(v) => setFila(sec.id, fila.id, { precio: v })} />
                  <span className="flex items-end gap-0.5 pb-0.5">
                    <button type="button" aria-label="Subir línea" disabled={fi === 0} onClick={() => setSeccion(sec.id, { filas: mover(sec.filas, fi, -1) })} className={ICON_BTN}>
                      <ChevronUp size={15} />
                    </button>
                    <button type="button" aria-label="Bajar línea" disabled={fi === sec.filas.length - 1} onClick={() => setSeccion(sec.id, { filas: mover(sec.filas, fi, 1) })} className={ICON_BTN}>
                      <ChevronDown size={15} />
                    </button>
                    <button type="button" aria-label="Quitar línea" onClick={() => setSeccion(sec.id, { filas: sec.filas.filter((f) => f.id !== fila.id) })} className={`${ICON_BTN} text-red-600 hover:bg-red-50 hover:text-red-700`}>
                      <Trash2 size={15} />
                    </button>
                  </span>
                </div>
                {sec.formato === "tabla" && sec.colEs && (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <label className="block">
                      <span className={LABEL}>{sec.colEs}</span>
                      <input value={fila.detalleEs} onChange={(e) => setFila(sec.id, fila.id, { detalleEs: e.target.value })} className={INPUT} />
                    </label>
                    <label className="block">
                      <span className={LABEL}>{sec.colEu || sec.colEs} (euskera)</span>
                      <input value={fila.detalleEu} onChange={(e) => setFila(sec.id, fila.id, { detalleEu: e.target.value })} className={INPUT} />
                    </label>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setSeccion(sec.id, {
                  filas: [...sec.filas, { id: uid(), es: "", eu: "", detalleEs: "", detalleEu: "", precio: "" }],
                })
              }
              className="inline-flex items-center gap-1 rounded-full border border-black/15 px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent"
            >
              <Plus size={14} />
              Añadir línea
            </button>
          </div>
        </section>
      ))}

      <div className="flex flex-wrap gap-2">
        {(["tabla", "corta"] as const).map((formato) => (
          <button
            key={formato}
            type="button"
            onClick={() =>
              actualizar((d) => ({
                ...d,
                secciones: [
                  ...d.secciones,
                  { id: uid(), key: `seccion-${d.secciones.length + 1}`, formato, tituloEs: "", tituloEu: "", subEs: "", subEu: "", colEs: "", colEu: "", filas: [] },
                ],
              }))
            }
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-black/25 px-4 py-2 text-sm text-black/65 transition-colors hover:border-accent hover:text-black"
          >
            <Plus size={15} />
            {formato === "tabla" ? "Nueva sección (tabla)" : "Nueva sección (tarjeta corta)"}
          </button>
        ))}
      </div>

      {/* ── Clase suelta ── */}
      <section className={CARD}>
        <h2 className="mb-4 font-heading text-lg font-bold">Clase suelta</h2>
        <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
          <Precio etiqueta="Precio / clase" value={doc.sueltaPrecio} onChange={(v) => actualizar((d) => ({ ...d, sueltaPrecio: v }))} />
          <div className="grid gap-3">
            <label className="block">
              <span className={LABEL}>Texto (lo que va antes de los dos puntos sale en negrita)</span>
              <textarea rows={3} value={doc.sueltaTextoEs} onChange={(e) => actualizar((d) => ({ ...d, sueltaTextoEs: e.target.value }))} className={INPUT} />
            </label>
            <label className="block">
              <span className={LABEL}>Texto (euskera)</span>
              <textarea rows={3} value={doc.sueltaTextoEu} onChange={(e) => actualizar((d) => ({ ...d, sueltaTextoEu: e.target.value }))} className={INPUT} />
            </label>
          </div>
        </div>
      </section>

      {/* ── Nota ── */}
      <section className={CARD}>
        <h2 className="mb-1 font-heading text-lg font-bold">Gestión y reservas</h2>
        <p className="mb-4 text-xs text-black/50">Nota al pie de las tarifas. Déjala vacía para ocultarla.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={LABEL}>Nota</span>
            <textarea rows={2} value={doc.notaEs} onChange={(e) => actualizar((d) => ({ ...d, notaEs: e.target.value }))} className={INPUT} />
          </label>
          <label className="block">
            <span className={LABEL}>Nota (euskera)</span>
            <textarea rows={2} value={doc.notaEu} onChange={(e) => actualizar((d) => ({ ...d, notaEu: e.target.value }))} className={INPUT} />
          </label>
        </div>
      </section>

      {/* ── Masajes ── */}
      <section className={CARD}>
        <h2 className="mb-1 font-heading text-lg font-bold">Masajes</h2>
        <p className="mb-4 text-xs text-black/50">Se aplican en /precios y en /masajes.</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Precio etiqueta="Tratamientos" value={doc.masajes.precio} onChange={(v) => actualizar((d) => ({ ...d, masajes: { ...d.masajes, precio: v } }))} />
          <Precio etiqueta="Tratamientos · usuarios" value={doc.masajes.precioUsuarios} onChange={(v) => actualizar((d) => ({ ...d, masajes: { ...d.masajes, precioUsuarios: v } }))} />
          <Precio etiqueta="Masaje BitanBat" value={doc.masajes.premiumPrecio} onChange={(v) => actualizar((d) => ({ ...d, masajes: { ...d.masajes, premiumPrecio: v } }))} />
          <Precio etiqueta="Masaje BitanBat · usuarios" value={doc.masajes.premiumPrecioUsuarios} onChange={(v) => actualizar((d) => ({ ...d, masajes: { ...d.masajes, premiumPrecioUsuarios: v } }))} />
        </div>
      </section>

      {/* ── Barra de guardado ── */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <span className="text-xs text-black/50">
            {dirty ? "Hay cambios sin guardar." : "Todo guardado."}
          </span>
          <span className="flex gap-2">
            <button
              type="button"
              onClick={descartar}
              disabled={!dirty || pending}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5 disabled:opacity-40"
            >
              <RotateCcw size={14} />
              Descartar
            </button>
            <button
              type="button"
              onClick={guardar}
              disabled={!dirty || pending}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 font-heading text-sm font-semibold text-primary transition-colors hover:bg-[#d9bb82] disabled:opacity-40"
            >
              <Check size={16} />
              {pending ? "Guardando…" : "Guardar y publicar"}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
