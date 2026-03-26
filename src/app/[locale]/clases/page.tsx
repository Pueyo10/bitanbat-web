import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ClassType } from "@/types/database";
import PageHero from "@/components/ui/PageHero";
import ClassesContent from "./ClassesContent";
import { ArrowRight, Clock3, Phone, Sparkles, Users } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const classHighlights = [
  {
    key: "dance",
    titleEs: "Danza con identidad",
    titleEu: "Nortasuneko dantza",
    descEs: "Clases con ritmo, técnica y presencia. Desde iniciación hasta niveles más expresivos.",
    descEu: "Erritmoa, teknika eta presentzia duten klaseak. Hasiberrietatik maila adierazkorretara.",
    icon: Sparkles,
  },
  {
    key: "fitness",
    titleEs: "Entrena con intención",
    titleEu: "Intentzioz entrenatu",
    descEs: "Sesiones para ganar fuerza, energía y constancia sin perder el gusto por moverte.",
    descEu: "Indarra, energia eta jarraikortasuna irabazteko saioak, mugitzeko gogoa galdu gabe.",
    icon: Users,
  },
  {
    key: "schedule",
    titleEs: "Encuentra tu horario",
    titleEu: "Aurkitu zure ordutegia",
    descEs: "Consulta el horario y elige la disciplina que mejor encaje con tu ritmo semanal.",
    descEu: "Ikusi ordutegia eta aukeratu zure asteko erritmoarekin hobekien egokitzen den diziplina.",
    icon: Clock3,
  },
] as const;

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
  const { data } = await supabase.from("classes").select("*").order("name");
  const classes = (data || []) as ClassType[];

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Diziplinak" : "Disciplinas"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/15 to-transparent" />
        <div className="absolute left-0 top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-0 bottom-12 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-8">
            <div className="max-w-3xl space-y-6">
              <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium">
                {locale === "eu" ? "Aukeratu zure bidea" : "Elige tu camino"}
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground max-w-3xl">
                {locale === "eu"
                  ? "Mugimendua landu eta zure erritmoa aurkitu."
                  : "Una selección pensada para moverte con intención."}
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
                {locale === "eu"
                  ? "Dantza, fitness eta ongizatea espazio berean elkartzen dira. Aukeratu zure energia, erritmoa eta helburua, eta hasi zentzuzko zerbait eraikitzen."
                  : "Danza, fitness y bienestar se encuentran en un mismo espacio. Elige tu energía, tu ritmo y tu objetivo para empezar a construir algo que encaje contigo."}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {classHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="border-t border-accent/20 pt-5">
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-accent" />
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                        {locale === "eu" ? "Laburpena" : "Resumen"}
                      </p>
                    </div>
                    <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">
                      {locale === "eu" ? item.titleEu : item.titleEs}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {locale === "eu" ? item.descEu : item.descEs}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <ClassesContent classes={classes} locale={locale} />
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_auto] lg:items-center">
            <div className="space-y-4">
              <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium">
                {locale === "eu" ? "Hurrengo pausoa" : "Tu siguiente paso"}
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white max-w-3xl">
                {locale === "eu"
                  ? "Etorri eta zurekin bat datorren klasea probatu."
                  : "Ven a probar la clase que mejor encaje contigo."}
              </h2>
              <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">
                {locale === "eu"
                  ? "Gomendatuko dizugu nondik hasi, zein ordutegi den egokiena eta nola aurreratu zure erritmoan, presiorik gabe."
                  : "Te ayudamos a decidir por dónde empezar, qué horario te conviene mejor y cómo avanzar a tu ritmo, sin presión."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-heading text-lg font-semibold text-primary transition-all duration-300 hover:bg-white hover:scale-105"
              >
                {locale === "eu" ? "Kontaktatu" : "Contactar"}
                <ArrowRight size={18} />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 font-heading text-lg font-medium text-white transition-all duration-300 hover:bg-white/10"
              >
                <Phone size={18} />
                {SITE_CONFIG.phoneFormatted}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
