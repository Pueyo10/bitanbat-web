import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ClassType } from "@/types/database";
import ClassesContent from "./ClassesContent";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowUpRight, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const revalidate = 3600;

export default async function ClasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Classes");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .order("name");
  if (error) {
    console.error("Error fetching classes:", error);
  }
  const classes = (data || []) as ClassType[];

  return (
    <>
      {/* Hero — strength (sans) meets grace (serif) */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-16 md:pt-44 md:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[5vw] top-[14%] select-none font-heading text-[20vw] font-bold uppercase leading-none tracking-tight text-outline opacity-50"
        >
          Bitan
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="hero-line mb-6 text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
            <span style={{ "--line-delay": "0.1s" } as React.CSSProperties}>
              {locale === "eu" ? "Diziplinak — Hernani" : "Disciplinas — Hernani"}
            </span>
          </p>

          <h1 className="font-heading font-bold uppercase text-white text-display-lg">
            <span className="hero-line">
              <span style={{ "--line-delay": "0.25s" } as React.CSSProperties}>
                {locale === "eu" ? "Gure" : "Nuestras"}
              </span>
            </span>
            <span className="hero-line">
              <span
                className="font-serif-display lowercase italic font-normal text-accent"
                style={{ "--line-delay": "0.4s" } as React.CSSProperties}
              >
                {locale === "eu" ? "klaseak" : "clases"}
              </span>
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="hero-line max-w-xl text-base leading-relaxed text-white/60 md:ml-[8vw] md:text-xl">
              <span style={{ "--line-delay": "0.6s" } as React.CSSProperties}>
                {t("subtitle")}
              </span>
            </p>
            <p className="hero-line font-heading text-xs uppercase tracking-[0.24em] text-white/40 md:text-sm">
              <span style={{ "--line-delay": "0.75s" } as React.CSSProperties}>
                Dantza · Fitness · Wellness
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Listing — light chapter */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ClassesContent classes={classes} locale={locale} />
        </div>
      </section>

      {/* CTA — dark chapter */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[3vw] bottom-[4%] select-none font-heading text-[18vw] font-bold uppercase leading-none tracking-tight text-outline opacity-40"
        >
          Bat
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36 lg:px-8">
          <ScrollReveal>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
              {locale === "eu" ? "Hurrengo pausoa" : "Tu siguiente paso"}
            </p>
            <h2 className="max-w-4xl font-heading font-bold uppercase text-white text-display-md">
              {locale === "eu" ? (
                <>
                  Probatu klase bat{" "}
                  <span className="font-serif-display lowercase italic font-normal text-accent">
                    zure erritmoan
                  </span>
                </>
              ) : (
                <>
                  Prueba una clase{" "}
                  <span className="font-serif-display lowercase italic font-normal text-accent">
                    a tu ritmo
                  </span>
                </>
              )}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:ml-[8vw] md:text-lg">
              {locale === "eu"
                ? "Gomendatuko dizugu nondik hasi, zein ordutegi den egokiena eta nola aurreratu zure erritmoan, presiorik gabe."
                : "Te ayudamos a decidir por dónde empezar, qué horario te conviene mejor y cómo avanzar a tu ritmo, sin presión."}
            </p>

            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10 md:ml-[8vw]">
              <Link
                href="/contacto"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-heading text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-colors duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:bg-white"
              >
                {locale === "eu" ? "Kontaktatu" : "Contactar"}
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-2 self-start border-b border-accent/50 pb-1 font-heading text-sm font-medium uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-accent sm:self-auto"
              >
                <Phone size={16} />
                {SITE_CONFIG.phoneFormatted}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
