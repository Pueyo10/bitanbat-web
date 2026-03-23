"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { ClassType, ClassCategory } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";

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

export default function ClasesPage() {
  const t = useTranslations("Classes");
  const locale = useLocale();
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClasses() {
      const supabase = createClient();
      const { data } = await supabase.from("classes").select("*").order("name");
      if (data) setClasses(data as ClassType[]);
      setLoading(false);
    }
    fetchClasses();
  }, []);

  const filtered = classes.filter((c) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "kids") return c.min_age !== null;
    return c.category === activeFilter;
  });

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {t(f.key)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">...</div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((cls) => {
              const img = classImages[cls.slug] || cls.image_url;
              return (
                <motion.div
                  key={cls.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow"
                >
                  {img ? (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={img}
                        alt={cls.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div
                        className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow"
                        style={{ backgroundColor: cls.color }}
                      >
                        {cls.name}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-3"
                      style={{ backgroundColor: cls.color }}
                    />
                  )}
                  <div className="p-5">
                    {!img && (
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {cls.name}
                      </h3>
                    )}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {getLocalizedField(cls, "description", locale)}
                    </p>
                    {cls.min_age && (
                      <p className="mt-3 text-xs font-medium text-accent">
                        {cls.min_age}
                        {cls.max_age ? `-${cls.max_age}` : "+"}{" "}
                        {locale === "eu" ? "urte" : "anos"}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
