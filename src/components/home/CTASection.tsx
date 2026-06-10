"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

export default function CTASection() {
  const t = useTranslations("Home");

  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,170,110,0.08)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-1/2 h-[28rem] w-[min(37.5rem,115vw)] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl sm:h-[37.5rem]" />

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-6">
            {t("ctaEyebrow")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h2 className="font-heading font-bold text-white mb-6 text-display-lg">
            {t("ctaTitle")}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <p className="text-white/50 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            {t("ctaSubtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={0.24}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/contacto" className="group">
            {t("ctaButton")}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>
          <Button href="/clases" variant="secondary">
            {t("ctaSecondaryButton")}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
