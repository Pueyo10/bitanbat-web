"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import WeeklyCalendar from "@/components/schedule/WeeklyCalendar";
import LocationTabs from "@/components/schedule/LocationTabs";
import { createClient } from "@/lib/supabase/client";
import type { Schedule } from "@/types/database";

const LOCAL_1_ID = "11111111-1111-1111-1111-111111111111";

export default function HorariosPage() {
  const t = useTranslations("Schedule");
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
          <p className="text-muted-foreground text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="flex justify-center">
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
          className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6"
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
    </div>
  );
}
