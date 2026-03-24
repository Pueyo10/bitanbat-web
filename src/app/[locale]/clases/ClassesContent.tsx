"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import type { ClassType, ClassCategory } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

const classImages: Record<string, string> = {
  "entrenamiento-funcional": "/media/instagram/DPyvmA2DMOz.jpg",
  "e-funcional-txikiak": "/media/instagram/DQr2HDKjIGL.jpg",
  pilates: "/media/instagram/DOeahntDL-l.jpg",
  barrefit: "/media/instagram/DOeahntDL-l.jpg",
  boxeo: "/media/instagram/DQuAp30DIEu.jpg",
  "boxeo-txiki": "/media/instagram/DQr2HDKjIGL.jpg",
  yoga: "/media/instagram/DUiBayBDNcI.jpg",
  bungee: "/media/instagram/DQaCTUNjPo9.jpg",
  bachata: "/media/instagram/DVV5mABCGfn.jpg",
  salsa: "/media/instagram/DVV5mABCGfn.jpg",
  sevillanas: "/media/instagram/DRkhijgjMzh.jpg",
  urbano: "/media/instagram/DOI7CdOjLRg.jpg",
  zumba: "/media/instagram/DS40jDNjC5W.jpg",
  jumping: "/media/instagram/DQaCTUNjPo9.jpg",
  masajes: "/media/instagram/DUDUHlZjPlW.jpg",
  fitgipsy: "/media/instagram/DRkhijgjMzh.jpg",
  predantza: "/media/instagram/DQr2HDKjIGL.jpg",
  "hatha-vinyasa": "/media/instagram/DU5Riz4DLBU.jpg",
};

const filters: { key: string; value: ClassCategory | "all" | "kids" }[] = [
  { key: "filterAll", value: "all" },
  { key: "filterDance", value: "dantza" },
  { key: "filterFitness", value: "fitness" },
  { key: "filterWellness", value: "wellness" },
  { key: "filterKids", value: "kids" },
];

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
    if (activeFilter === "all") return classes;
    if (activeFilter === "kids") return classes.filter((c) => c.min_age !== null);
    return classes.filter((c) => c.category === activeFilter);
  }, [activeFilter, classes]);

  return (
    <>
      <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-muted-foreground border border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {t(f.key)}
          </button>
        ))}
      </ScrollReveal>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((cls, i) => {
          const img = classImages[cls.slug] || cls.image_url;
          return (
            <ScrollReveal key={cls.id} delay={i * 0.05}>
              <div className="group relative h-72 overflow-hidden rounded-lg cursor-pointer">
                {img ? (
                  <Image
                    src={img}
                    alt={cls.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: cls.color }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">
                    {cls.name}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2">
                    {getLocalizedField(cls, "description", locale)}
                  </p>
                  {cls.min_age && (
                    <p className="mt-2 text-xs font-medium text-accent">
                      {cls.min_age}
                      {cls.max_age ? `-${cls.max_age}` : "+"}{" "}
                      {locale === "eu" ? "urte" : "años"}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </motion.div>
    </>
  );
}
