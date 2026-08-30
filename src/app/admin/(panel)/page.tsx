import Link from "next/link";
import { CalendarDays, Euro, LayoutGrid, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const supabase = await createClient();
  const [{ count: sessions }, { count: classes }] = await Promise.all([
    supabase
      .from("schedules")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
    supabase.from("classes").select("*", { count: "exact", head: true }),
  ]);

  const cards = [
    {
      href: "/admin/horarios",
      title: "Horarios",
      description: "Añade, mueve o quita clases del cuadro semanal.",
      stat: `${sessions ?? 0} sesiones a la semana`,
      icon: CalendarDays,
    },
    {
      href: "/admin/clases",
      title: "Clases",
      description: "Crea clases nuevas y cambia descripciones o fotos.",
      stat: `${classes ?? 0} clases`,
      icon: LayoutGrid,
    },
    {
      href: "/admin/precios",
      title: "Precios",
      description: "Cuotas, packs, clase suelta y precios de masajes.",
      stat: "Tarifas de la web",
      icon: Euro,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold">Hola 👋</h1>
        <p className="mt-1 text-sm text-black/55">
          ¿Qué quieres cambiar hoy?
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, title, description, stat, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
          >
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Icon size={22} />
            </span>
            <h2 className="font-heading text-lg font-bold">{title}</h2>
            <p className="mt-1 text-sm text-black/60">{description}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-black/40">
              {stat}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3.5 text-sm text-black/70">
        <Zap size={18} className="mt-0.5 shrink-0 text-accent" />
        <p>
          Todo lo que guardes aquí <strong>se publica en la web al momento</strong>.
          No hace falta avisar a nadie ni esperar.
        </p>
      </div>
    </div>
  );
}
