"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const treatmentIds = [
  "relajante",
  "descontracturante",
  "drenajelinfatico",
  "reflexologia",
  "maderoterapia",
  "bitanbat",
] as const;

export default function MassagesTeaser() {
  const t = useTranslations("Massage");
  const locale = useLocale();
  const isBasque = locale === "eu";

  return (
    <section className="lux-section-light overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Photo */}
          <ScrollReveal variant="slide-left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_24px_70px_rgba(16,13,10,0.14)] md:-ml-[4vw]">
              <Image
                src="/media/bitanbat/massage-treatment-v2.jpg"
                alt={t("title")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-lg">
                Wellness
              </span>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal variant="slide-right">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.32em] text-accent">
              {isBasque ? "Wellness · Zure momentua" : "Wellness · Tu momento"}
            </p>

            <h2 className="font-heading font-bold text-foreground text-display-md">
              <span className="block uppercase">
                {isBasque ? "Masajeak" : "Masajes"}
              </span>
              <span className="block font-serif-display text-[0.82em] font-normal italic lowercase text-accent">
                {isBasque ? "& tratamenduak" : "& tratamientos"}
              </span>
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>

            {/* Treatment options */}
            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-accent/30 pt-6 sm:grid-cols-2">
              {treatmentIds.map((id) => (
                <li
                  key={id}
                  className="flex items-center gap-3 text-sm text-foreground/80"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {t(`${id}Name`)}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Button href="/masajes" size="md">
                {isBasque ? "Masajeak ikusi" : "Ver masajes"}
                <ArrowUpRight size={18} />
              </Button>
              <p className="text-sm text-muted-foreground">
                {isBasque ? (
                  <>
                    <span className="font-semibold text-foreground">35€</span>{" "}
                    erabiltzaileak ·{" "}
                    <span className="font-semibold text-foreground">40€-tik</span>{" "}
                    ez-erabiltzaileak
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-foreground">35€</span>{" "}
                    usuarios ·{" "}
                    <span className="font-semibold text-foreground">desde 40€</span>{" "}
                    no usuarios
                  </>
                )}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
