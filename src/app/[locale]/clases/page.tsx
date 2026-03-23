import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import type { ClassType } from "@/types/database";
import PageHero from "@/components/ui/PageHero";
import ClassesContent from "./ClassesContent";

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

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClassesContent classes={classes} locale={locale} />
        </div>
      </section>
    </>
  );
}
