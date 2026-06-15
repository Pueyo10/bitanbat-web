import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ClassType } from "@/types/database";
import PageHero from "@/components/ui/PageHero";
import ClassesContent from "./ClassesContent";
import { ArrowRight, Phone } from "lucide-react";
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
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-heading text-lg font-semibold text-primary transition-all duration-300 hover:bg-white hover:scale-105"
              >
                {locale === "eu" ? "Kontaktatu" : "Contactar"}
                <ArrowRight size={18} />
              </Link>
              <a
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 font-heading text-lg font-medium text-white transition-all duration-300 hover:bg-white/10"
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
