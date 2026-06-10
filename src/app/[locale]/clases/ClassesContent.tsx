"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ClassType, ClassCategory } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

const classImages: Record<string, string> = {
  "e-funcional-txikiak": "/media/bitanbat/functional-kids-young.jpg",
  "e-funcional-txiki": "/media/bitanbat/functional-kids-older.jpg",
  "entrenamiento-funcional": "/media/bitanbat/functional-training.jpg",
  pilates: "/media/bitanbat/pilates-class.jpg",
  barrefit: "/media/bitanbat/barrefit-class.jpg",
  boxeo: "/media/bitanbat/boxing-class.jpg",
  "boxeo-txiki": "/media/bitanbat/boxing-kids.jpg",
  yoga: "/media/bitanbat/yoga-class.jpg",
  bungee: "/media/bitanbat/bungee-class.jpg",
  bachata: "/media/bitanbat/bachata-couple.jpg",
  salsa: "/media/bitanbat/salsa-dance-couple.jpg",
  sevillanas: "/media/bitanbat/sevillanas-class.jpg",
  urbano: "/media/bitanbat/urban-dance.jpg",
  zumba: "/media/bitanbat/zumba-class.jpg",
  fitgipsy: "/media/bitanbat/fitgipsy-class.jpg",
  predantza: "/media/bitanbat/predantza-class.jpg",
};

const scheduledClassSlugs = new Set([
  "bachata",
  "barrefit",
  "boxeo",
  "boxeo-txiki",
  "bungee",
  "e-funcional-txikiak",
  "e-funcional-txiki",
  "entrenamiento-funcional",
  "fitgipsy",
  "pilates",
  "predantza",
  "salsa",
  "sevillanas",
  "urbano",
  "yoga",
  "zumba",
]);

const filters: { key: string; value: ClassCategory | "all" | "kids" }[] = [
  { key: "filterAll", value: "all" },
  { key: "filterDance", value: "dantza" },
  { key: "filterFitness", value: "fitness" },
  { key: "filterWellness", value: "wellness" },
  { key: "filterKids", value: "kids" },
];

const categoryLabels: Record<string, { es: string; eu: string }> = {
  dantza: { es: "Danza", eu: "Dantza" },
  fitness: { es: "Fitness", eu: "Fitness" },
  wellness: { es: "Bienestar", eu: "Ongizatea" },
  kids: { es: "Infantil", eu: "Haurrak" },
};

// Editorial rhythm after the full-width opener: wide / tall pairs with offsets
const CARD_LAYOUT = [
  { span: "md:col-span-7", aspect: "aspect-[4/3] md:aspect-[16/10]" },
  { span: "md:col-span-5 md:mt-20", aspect: "aspect-[4/3] md:aspect-[4/5]" },
  { span: "md:col-span-5", aspect: "aspect-[4/3] md:aspect-[4/5]" },
  { span: "md:col-span-7 md:mt-16", aspect: "aspect-[4/3] md:aspect-[16/10]" },
] as const;

const imageHoverClass =
  "object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]";

export default function ClassesContent({
  classes,
  locale,
}: {
  classes: ClassType[];
  locale: string;
}) {
  const t = useTranslations("Classes");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const visible = classes.filter((c) => scheduledClassSlugs.has(c.slug));
    if (activeFilter === "all") return visible;
    if (activeFilter === "kids") return visible.filter((c) => c.min_age !== null);
    return visible.filter((c) => c.category === activeFilter);
  }, [activeFilter, classes]);

  return (
    <>
      {/* Filters — minimalist tabs with animated gold underline */}
      <ScrollReveal>
        <div className="mb-14 flex flex-wrap items-center justify-between gap-x-10 gap-y-2 border-b border-border md:mb-20">
          <div className="flex flex-wrap gap-x-6 md:gap-x-10">
            {filters.map((f) => {
              const isActive = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  aria-pressed={isActive}
                  className={`group relative inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-[0.22em] transition-colors duration-300 md:text-sm ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(f.key)}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-40 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <p className="hidden min-h-11 items-center font-heading text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:flex">
            <span className="mr-2 text-accent">
              {String(filtered.length).padStart(2, "0")}
            </span>
            {locale === "eu" ? "klase" : "clases"}
          </p>
        </div>
      </ScrollReveal>

      {filtered.length === 0 ? (
        <div className="py-24 md:ml-[8vw] md:py-32">
          <p className="font-serif-display text-4xl lowercase italic text-accent md:text-5xl">
            {locale === "eu" ? "laster gehiago" : "próximamente"}
          </p>
          <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
            {locale === "eu"
              ? "Ez dago klaserik kategoria honetan"
              : "No hay clases en esta categoría"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-y-14 md:grid-cols-12 md:gap-x-6 md:gap-y-24">
          {filtered.map((cls, i) => {
            const img = classImages[cls.slug] || cls.image_url;
            const categoryLabel = categoryLabels[cls.category ?? ""] ?? {
              es: "Clase",
              eu: "Klase",
            };
            const category = locale === "eu" ? categoryLabel.eu : categoryLabel.es;
            const number = String(i + 1).padStart(2, "0");
            const ageLabel = cls.min_age
              ? `${cls.min_age}${cls.max_age ? `-${cls.max_age}` : "+"} ${
                  locale === "eu" ? "urte" : "años"
                }`
              : null;
            const description = getLocalizedField(cls, "description", locale);

            // Full-width editorial opener
            if (i === 0) {
              return (
                <ScrollReveal key={cls.id} className="md:col-span-12">
                  <Link
                    href="/horarios"
                    className="group grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end md:gap-8"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-8 md:aspect-[16/9]">
                      {img ? (
                        <Image
                          src={img}
                          alt={cls.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 66vw"
                          className={imageHoverClass}
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: cls.color }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                      <span className="absolute right-5 top-5 font-heading text-sm font-semibold tracking-[0.2em] text-white/50">
                        {number}
                      </span>
                    </div>

                    <div className="md:col-span-4 md:pb-1">
                      <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-[0.28em] text-accent">
                        {category}
                        {ageLabel && (
                          <span className="text-muted-foreground">{ageLabel}</span>
                        )}
                        {cls.slug === "bungee" && (
                          <span className="font-serif-display text-lg font-normal lowercase italic tracking-normal">
                            premium
                          </span>
                        )}
                      </p>
                      <h3 className="mt-3 flex items-start gap-3 font-heading text-3xl font-bold uppercase leading-[0.95] text-foreground md:text-5xl">
                        {cls.name}
                        <ArrowUpRight
                          size={28}
                          className="mt-1 shrink-0 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                        />
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground line-clamp-4 md:text-base">
                        {description}
                      </p>
                      <p className="mt-6 border-t border-accent/40 pt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {locale === "eu" ? "Maila guztietarako" : "Todos los niveles"}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            }

            const layout = CARD_LAYOUT[(i - 1) % CARD_LAYOUT.length];
            return (
              <ScrollReveal
                key={cls.id}
                delay={(i % 2) * 0.12}
                className={layout.span}
              >
                <Link href="/horarios" className="group block">
                  <div
                    className={`relative overflow-hidden rounded-2xl ${layout.aspect}`}
                  >
                    {img ? (
                      <Image
                        src={img}
                        alt={cls.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={imageHoverClass}
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: cls.color }}
                      />
                    )}
                    <span className="absolute right-5 top-5 font-heading text-sm font-semibold tracking-[0.2em] text-white/50">
                      {number}
                    </span>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-[0.28em] text-accent">
                        {category}
                        {ageLabel && (
                          <span className="text-muted-foreground">{ageLabel}</span>
                        )}
                        {cls.slug === "bungee" && (
                          <span className="font-serif-display text-base font-normal lowercase italic tracking-normal">
                            premium
                          </span>
                        )}
                      </p>
                      <h3 className="mt-2 font-heading text-2xl font-bold uppercase text-foreground md:text-3xl">
                        {cls.name}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground line-clamp-2 md:text-base">
                        {description}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={22}
                      className="mt-2 shrink-0 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </>
  );
}
