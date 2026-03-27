"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck, ChevronRight, Crown, Sparkles } from "lucide-react";
import type { ClassType, ClassCategory } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

const classImages: Record<string, string> = {
  "entrenamiento-funcional": "/media/instagram/DPyvmA2DMOz.jpg",
  pilates: "/media/instagram/Ch-babUsd9k.jpg",
  barrefit: "/media/instagram/DKtuhk7tJls.jpg",
  boxeo: "/media/instagram/CoX5o7xrQiU.jpg",
  "boxeo-txiki": "/media/instagram/CoX5o7xrQiU.jpg",
  yoga: "/media/instagram/DUiBayBDNcI.jpg",
  bungee: "/media/instagram/DQaCTUNjPo9.jpg",
  bachata: "/media/instagram/DB65K-0tLqq.jpg",
  salsa: "/media/instagram/DB65K-0tLqq.jpg",
  sevillanas: "/media/instagram/DRkhijgjMzh.jpg",
  urbano: "/media/instagram/DOI7CdOjLRg.jpg",
  zumba: "/media/instagram/DGu3i1DNSVW.jpg",
  jumping: "/media/instagram/DQaCTUNjPo9.jpg",
  masajes: "/media/instagram/DUDUHlZjPlW.jpg",
  fitgipsy: "/media/instagram/C1rjE4Ttcmt.jpg",
  predantza: "/media/instagram/CysgTyXN9bz.jpg",
  "hatha-vinyasa": "/media/instagram/DU5Riz4DLBU.jpg",
};

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
    const visible = classes.filter((c) => c.slug !== "e-funcional-txikiak");
    if (activeFilter === "all") return visible;
    if (activeFilter === "kids") return visible.filter((c) => c.min_age !== null);
    return visible.filter((c) => c.category === activeFilter);
  }, [activeFilter, classes]);

  const activeFilterLabel =
    filters.find((filter) => filter.value === activeFilter)?.key ?? "filterAll";

  return (
    <>
      <div className="mb-10">
        <div className="flex flex-wrap justify-center gap-2 rounded-3xl border border-border bg-white/80 backdrop-blur-xl p-2 shadow-[0_18px_60px_rgba(10,10,10,0.06)]">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              aria-pressed={activeFilter === f.value}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
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

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
      >
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

                    <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
                      <div>
                        <p className="mb-2 text-[0.65rem] uppercase tracking-[0.24em] text-white/45">
                          {locale === "eu" ? "Informazioa" : "Información"}
                        </p>
                        <p className="font-heading text-3xl font-bold text-accent">
                          {cls.min_age
                            ? `${cls.min_age}${cls.max_age ? `-${cls.max_age}` : "+"}`
                            : locale === "eu"
                              ? "Maila guztietarako"
                              : "Todos los niveles"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white/85 backdrop-blur-sm">
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
      </motion.div>
    </>
  );
}
