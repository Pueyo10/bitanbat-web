"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WeeklyCalendar from "@/components/schedule/WeeklyCalendar";
import LocationTabs from "@/components/schedule/LocationTabs";
import type { Schedule } from "@/types/database";

const LOCAL_1_ID = "11111111-1111-1111-1111-111111111111";

export default function ScheduleContent({
  schedules,
}: {
  schedules: Schedule[];
}) {
  const [activeLocation, setActiveLocation] = useState(LOCAL_1_ID);

  const filtered = schedules.filter((s) => s.location_id === activeLocation);

  return (
    <>
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
        <WeeklyCalendar schedules={filtered} />
      </motion.div>
    </>
  );
}
