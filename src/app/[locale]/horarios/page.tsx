import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import ScheduleBoards, {
  type BoardSession,
} from "@/components/schedule/ScheduleBoards";

export const revalidate = 3600;

export default async function HorariosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Schedule");

  const supabase = await createClient();
  const { data: sessionsData, error } = await supabase
    .from("schedules")
    .select(
      "id,day_of_week,start_time,end_time,notes,location_id,class:classes(name,slug,category)"
    )
    .eq("is_active", true)
    .order("day_of_week")
    .order("start_time");
  if (error) {
    console.error("Error fetching schedules:", error);
  }

  const sessions = (sessionsData ?? []) as unknown as BoardSession[];

  return (
    <>
      {/* Hero — editorial display, strength (sans) meets grace (serif) */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.14),transparent_38%)]" />
        <div
          aria-hidden="true"
          className="text-outline pointer-events-none absolute -bottom-8 right-0 hidden select-none font-heading text-[17vw] font-bold uppercase leading-none opacity-50 lg:block"
        >
          {locale === "eu" ? "Astea" : "Semana"}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="hero-line mb-6 text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
            <span style={{ "--line-delay": "0.1s" } as React.CSSProperties}>
              {locale === "eu" ? "Asteko ordutegia" : "Horario semanal"} —
              Hernani
            </span>
          </p>

          <h1 className="font-heading font-bold text-white text-display-lg">
            <span className="hero-line">
              <span
                className="uppercase"
                style={{ "--line-delay": "0.25s" } as React.CSSProperties}
              >
                {t("title")}
              </span>
            </span>
            <span className="hero-line">
              <span
                className="font-serif-display italic font-normal lowercase text-accent"
                style={{ "--line-delay": "0.4s" } as React.CSSProperties}
              >
                {locale === "eu" ? "zure erritmora" : "a tu ritmo"}
              </span>
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-6 md:ml-[8vw] md:flex-row md:items-end md:justify-between">
            <p className="hero-line max-w-xl text-base leading-relaxed text-white/65 md:text-xl">
              <span style={{ "--line-delay": "0.55s" } as React.CSSProperties}>
                {t("subtitle")}
              </span>
            </p>
            <p className="hero-line shrink-0 font-heading text-sm uppercase tracking-[0.2em] text-white/40">
              <span style={{ "--line-delay": "0.7s" } as React.CSSProperties}>
                {locale === "eu"
                  ? "Astelehena — Ostirala"
                  : "Lunes — Viernes"}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Cuadro semanal, dibujado desde la base de datos */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="pointer-events-none absolute left-0 top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-12 right-0 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8">
          {sessions.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">
              {locale === "eu"
                ? "Ordutegia laster argitaratuko dugu."
                : "Publicaremos el horario muy pronto."}
            </p>
          ) : (
            <ScheduleBoards sessions={sessions} />
          )}
        </div>
      </section>
    </>
  );
}
