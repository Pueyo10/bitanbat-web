import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Price } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Prices");

  const supabase = await createClient();
  const { data } = await supabase.from("prices").select("*").order("order");
  const prices = (data || []) as Price[];

  const getPeriodLabel = (period: string) => {
    const map: Record<string, string> = {
      mes: t("perMonth"),
      trimestre: t("perQuarter"),
      clase: t("perClass"),
    };
    return map[period] || `/${period}`;
  };

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Planak" : "Planes"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {prices.map((price, i) => (
              <ScrollReveal key={price.id} delay={i * 0.08}>
                <div
                  className={`relative bg-white rounded-lg p-8 border transition-shadow hover:shadow-lg ${
                    price.highlighted
                      ? "border-accent shadow-lg ring-2 ring-accent/20"
                      : "border-border"
                  }`}
                >
                  {price.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-accent text-primary text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                        <Star size={12} />
                        {t("featured")}
                      </span>
                    </div>
                  )}
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    {getLocalizedField(price, "name", locale)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {getLocalizedField(price, "description", locale)}
                  </p>
                  <div className="mb-8">
                    <span className="font-heading text-4xl font-bold text-foreground">
                      {price.price.toFixed(0)}€
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      {getPeriodLabel(price.period)}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {(price.features as string[]).map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <Check
                          size={16}
                          className="text-accent mt-0.5 shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
