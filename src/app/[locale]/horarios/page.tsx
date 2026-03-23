"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import WeeklyCalendar from "@/components/schedule/WeeklyCalendar";
import LocationTabs from "@/components/schedule/LocationTabs";
import { createClient } from "@/lib/supabase/client";
import type { Schedule } from "@/types/database";
import PageHero from "@/components/ui/PageHero";

const LOCAL_1_ID = "11111111-1111-1111-1111-111111111111";

export default function HorariosPage() {
  const t = useTranslations("Schedule");
  const locale = useLocale();
  const [activeLocation, setActiveLocation] = useState(LOCAL_1_ID);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchedules() {
      setLoading(true);
      const supabase = createClient();
      const { data } = await supabase
        .from("schedules")
        .select("*, class:classes(*)")
        .eq("location_id", activeLocation)
        .eq("is_active", true)
        .order("day_of_week")
        .order("start_time");

      if (data) {
        setSchedules(data as Schedule[]);
      }
      setLoading(false);
    }

    fetchSchedules();
  }, [activeLocation]);

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Asteko ordutegia" : "Horario semanal"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <LocationTabs
              activeTab={activeLocation}
              onTabChange={setActiveLocation}
            />
          </div>

          <motion.div
            key={activeLocation}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-border p-4 md:p-6"
          >
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                {t("title")}...
              </div>
            ) : (
              <WeeklyCalendar schedules={schedules} />
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
