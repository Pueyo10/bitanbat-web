"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Schedule, ClassType, Location } from "@/types/database";
import { DAYS_ES } from "@/lib/constants";
import { Plus, Trash2, Save } from "lucide-react";

export default function AdminHorariosPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeLocation, setActiveLocation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    class_id: "",
    day_of_week: 0,
    start_time: "09:00",
    end_time: "10:00",
    notes: "",
  });

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const [locRes, clsRes] = await Promise.all([
        supabase.from("locations").select("*"),
        supabase.from("classes").select("*").order("name"),
      ]);
      if (locRes.data) {
        setLocations(locRes.data as Location[]);
        setActiveLocation(locRes.data[0]?.id || "");
      }
      if (clsRes.data) setClasses(clsRes.data as ClassType[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!activeLocation) return;
    async function fetchSchedules() {
      const supabase = createClient();
      const { data } = await supabase
        .from("schedules")
        .select("*, class:classes(*)")
        .eq("location_id", activeLocation)
        .order("day_of_week")
        .order("start_time");
      if (data) setSchedules(data as Schedule[]);
    }
    fetchSchedules();
  }, [activeLocation]);

  async function handleAdd() {
    const supabase = createClient();
    const { error } = await supabase.from("schedules").insert({
      class_id: form.class_id,
      location_id: activeLocation,
      day_of_week: form.day_of_week,
      start_time: form.start_time,
      end_time: form.end_time,
      notes: form.notes || null,
      is_active: true,
    });
    if (!error) {
      setShowForm(false);
      // Refresh
      const { data } = await supabase
        .from("schedules")
        .select("*, class:classes(*)")
        .eq("location_id", activeLocation)
        .order("day_of_week")
        .order("start_time");
      if (data) setSchedules(data as Schedule[]);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta clase del horario?")) return;
    const supabase = createClient();
    await supabase.from("schedules").delete().eq("id", id);
    setSchedules((s) => s.filter((x) => x.id !== id));
  }

  async function handleToggle(id: string, active: boolean) {
    const supabase = createClient();
    await supabase.from("schedules").update({ is_active: !active }).eq("id", id);
    setSchedules((s) =>
      s.map((x) => (x.id === id ? { ...x, is_active: !active } : x))
    );
  }

  if (loading) return <div className="text-muted-foreground">Cargando...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Horarios
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
        >
          <Plus size={18} />
          Añadir clase
        </button>
      </div>

      {/* Location tabs */}
      <div className="flex gap-2 mb-6">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setActiveLocation(loc.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeLocation === loc.id
                ? "bg-primary text-primary-foreground"
                : "bg-white text-muted-foreground border border-border hover:bg-muted"
            }`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 border border-border mb-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Clase
              </label>
              <select
                value={form.class_id}
                onChange={(e) => setForm((f) => ({ ...f, class_id: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border text-sm"
              >
                <option value="">Seleccionar...</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Día
              </label>
              <select
                value={form.day_of_week}
                onChange={(e) =>
                  setForm((f) => ({ ...f, day_of_week: Number(e.target.value) }))
                }
                className="w-full px-3 py-2 rounded-lg border border-border text-sm"
              >
                {DAYS_ES.map((day, i) => (
                  <option key={i} value={i}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Inicio
              </label>
              <input
                type="time"
                value={form.start_time}
                onChange={(e) => setForm((f) => ({ ...f, start_time: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Fin
              </label>
              <input
                type="time"
                value={form.end_time}
                onChange={(e) => setForm((f) => ({ ...f, end_time: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Notas
              </label>
              <input
                type="text"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="avanz., inc...."
                className="w-full px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={!form.class_id}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            Guardar
          </button>
        </div>
      )}

      {/* Schedule table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Día
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Hora
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Clase
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Notas
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Activo
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {schedules.map((s) => (
              <tr key={s.id} className={!s.is_active ? "opacity-50" : ""}>
                <td className="px-4 py-3 text-sm">
                  {DAYS_ES[s.day_of_week]}
                </td>
                <td className="px-4 py-3 text-sm font-medium">
                  {s.start_time.slice(0, 5)} - {s.end_time.slice(0, 5)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${s.class?.color || "#CCC"}30`,
                      color: s.class?.color || "#666",
                    }}
                  >
                    {s.class?.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {s.notes || "-"}
                </td>
                <td className="px-4 py-3">
                  <button
                    role="switch"
                    aria-checked={s.is_active}
                    aria-label={`Clase activa: ${s.class?.name ?? ""}`}
                    onClick={() => handleToggle(s.id, s.is_active)}
                    className={`w-8 h-5 rounded-full transition-colors ${
                      s.is_active ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        s.is_active ? "translate-x-3.5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
