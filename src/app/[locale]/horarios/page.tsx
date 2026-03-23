import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import type { Schedule } from "@/types/database";
import PageHero from "@/components/ui/PageHero";
import ScheduleContent from "./ScheduleContent";

export default async function HorariosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Schedule");

  const supabase = await createClient();
  const { data } = await supabase
    .from("schedules")
    .select("*, class:classes(*)")
    .eq("is_active", true)
    .order("day_of_week")
    .order("start_time");

  const schedules = (data || []) as Schedule[];

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Asteko ordutegia" : "Horario semanal"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScheduleContent schedules={schedules} />
        </div>
      </section>
    </>
  );
}
