"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Manifesto() {
  const t = useTranslations("Home");

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-y-12">
          <div className="col-span-12 md:col-span-9">
            <ScrollReveal>
              <p className="mb-8 text-sm uppercase tracking-[0.32em] text-accent font-medium">
                {t("manifestoEyebrow")}
              </p>
            </ScrollReveal>

            <h2 className="font-heading font-bold text-foreground text-display-lg">
              <ScrollReveal>
                <span className="block uppercase">{t("manifestoWord1")}</span>
              </ScrollReveal>
              <ScrollReveal delay={0.12}>
                <span className="block pl-[8vw]">
                  <span className="font-serif-display italic font-normal lowercase text-accent">
                    &amp; {t("manifestoWord2")}
                  </span>
                </span>
              </ScrollReveal>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-7">
            <ScrollReveal delay={0.24}>
              <p className="border-l-2 border-accent pl-6 text-lg md:text-xl leading-relaxed text-muted-foreground">
                {t("manifestoText")}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
