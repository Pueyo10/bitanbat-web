"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BadgeCheck, ChevronRight, Crown, Sparkles } from "lucide-react";
import type { ClassType, ClassCategory } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

const classImages: Record<string, string> = {
  "e-funcional-txikiak": "/media/bitanbat/functional-kids-young.jpg",
  "e-funcional-txiki": "/media/bitanbat/e-funcional-txiki.jpg",
  "entrenamiento-funcional": "/media/bitanbat/entrenamiento-funcional.jpg",
  pilates: "/media/bitanbat/pilates.jpg",
  barrefit: "/media/bitanbat/barrefit.jpg",
  boxeo: "/media/bitanbat/boxing-class.jpg",
  "boxeo-txiki": "/media/bitanbat/boxing-kids.jpg",
  yoga: "/media/bitanbat/yoga.jpg",
  bungee: "/media/bitanbat/bungee.jpg",
  bachata: "/media/bitanbat/bachata.jpg",
  salsa: "/media/bitanbat/salsa.jpg",
  sevillanas: "/media/bitanbat/sevillanas-class.jpg",
  urbano: "/media/bitanbat/urbano-adultos.jpg",
  zumba: "/media/bitanbat/zumba.jpg",
  fitgipsy: "/media/bitanbat/fitgypsy.jpg",
  jumping: "/media/bitanbat/jumping.jpg",
  predantza: "/media/bitanbat/predantza.jpg",
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
  "jumping",
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
      <div className="mb-10">
        <div className="flex flex-wrap justify-center gap-2 rounded-3xl border border-border bg-white/80 backdrop-blur-xl p-2 shadow-[0_18px_60px_rgba(10,10,10,0.06)]">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              aria-pressed={activeFilter === f.value}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-transparent text-muted-foreground border border-transparent hover:border-border hover:bg-background hover:text-foreground"
              }`}
            >
              {activeFilter === f.value && <Sparkles size={14} />}
              {t(f.key)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground text-base md:text-lg">
            {locale === "eu"
              ? "Ez dago klaserik kategoria honetan"
              : "No hay clases en esta categoría"}
          </p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {filtered.map((cls, i) => {
          const img = classImages[cls.slug] || cls.image_url;
          const categoryLabel = categoryLabels[cls.category ?? ""] ?? {
            es: "Clase",
            eu: "Klase",
          };

          return (
            <ScrollReveal key={cls.id} delay={i * 0.05}>
              <article className="group relative overflow-hidden rounded-3xl border border-border bg-white shadow-[0_18px_50px_rgba(10,10,10,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(10,10,10,0.14)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {img ? (
                    <Image
                      src={img}
                      alt={cls.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: cls.color }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent" />

                  <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                      {locale === "eu" ? categoryLabel.eu : categoryLabel.es}
                    </span>
                    {cls.min_age && (
                      <span className="inline-flex items-center rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                        {locale === "eu"
                          ? `${cls.min_age}${cls.max_age ? `-${cls.max_age}` : "+"} urte`
                          : `${cls.min_age}${cls.max_age ? `-${cls.max_age}` : "+"} años`}
                      </span>
                    )}
                    {cls.slug === "bungee" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                        <Crown size={12} />
                        PREMIUM
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="space-y-2">
                      <h3 className="font-heading text-2xl md:text-[1.75rem] font-bold text-white leading-tight">
                        {cls.name}
                      </h3>
                      <p className="text-white/72 text-sm md:text-[0.95rem] leading-relaxed line-clamp-3 max-w-md">
                        {getLocalizedField(cls, "description", locale)}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                      <div>
                        <p className="mb-2 text-[0.65rem] uppercase tracking-[0.24em] text-white/45">
                          {locale === "eu" ? "Informazioa" : "Información"}
                        </p>
                        <p className="font-heading text-xl font-bold text-accent sm:text-3xl">
                          {locale === "eu" ? "Maila guztietarako" : "Todos los niveles"}
                        </p>
                      </div>
                      <div className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white/85 backdrop-blur-sm sm:flex">
                        <BadgeCheck size={14} className="text-accent" />
                        {locale === "eu" ? "Aukera sendoa" : "Opción sólida"}
                        <ChevronRight size={13} />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
      )}
    </>
  );
}
