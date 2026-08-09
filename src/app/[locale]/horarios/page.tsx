import { getTranslations, setRequestLocale } from "next-intl/server";
import { Download } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScheduleViewer from "@/components/ui/ScheduleViewer";

export const revalidate = 3600;

const SCHEDULES = [
  {
    key: "gelas",
    image: "/media/horarios/ordutegia-gelas-v5.png",
    pdf: "/media/horarios/ordutegia-gelas-v5.pdf",
    width: 3418,
    height: 2088,
    labelEs: "Salas 1 y 2 · Fitness & Dantza",
    labelEu: "1. eta 2. gelak · Fitness & Dantza",
  },
  {
    key: "clases",
    image: "/media/horarios/ordutegia-clases-v3.png",
    pdf: "/media/horarios/ordutegia-clases-v3.pdf",
    width: 2425,
    height: 1587,
    labelEs: "BarreFit · Pilates · Yoga · Bachata",
    labelEu: "BarreFit · Pilates · Yoga · Bachata",
  },
] as const;

export default async function HorariosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Schedule");

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

      {/* Horarios oficiales — tal cual el diseño original */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="pointer-events-none absolute left-0 top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-12 right-0 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8 md:space-y-24">
          {SCHEDULES.map((schedule) => (
            <ScrollReveal key={schedule.key}>
              <div className="mb-6 flex justify-end">
                <a
                  href={schedule.pdf}
                  download
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  <Download size={16} />
                  {locale === "eu" ? "PDFa deskargatu" : "Descargar PDF"}
                </a>
              </div>

              <ScheduleViewer
                src={schedule.image}
                alt={locale === "eu" ? schedule.labelEu : schedule.labelEs}
                width={schedule.width}
                height={schedule.height}
                hint={locale === "eu" ? "Handiago ikusi" : "Ver más grande"}
                closeLabel={locale === "eu" ? "Itxi" : "Cerrar"}
              />
            </ScrollReveal>
          ))}

          <p className="text-center text-sm text-muted-foreground">
            {locale === "eu"
              ? "Sakatu ordutegi baten gainean handiago ikusteko."
              : "Pulsa sobre un horario para verlo más grande."}
          </p>
        </div>
      </section>
    </>
  );
}
