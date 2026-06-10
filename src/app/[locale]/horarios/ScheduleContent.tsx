"use client";

import { useMemo, useState } from "react";
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

  const filtered = useMemo(
    () => schedules.filter((s) => s.location_id === activeLocation),
    [activeLocation, schedules]
  );

  return (
    <>
      <div className="flex justify-center mb-8">
        <LocationTabs
          activeTab={activeLocation}
          onTabChange={setActiveLocation}
        />
      </div>

      <div
        key={activeLocation}
        className="animate-fade-in bg-white rounded-lg shadow-sm border border-border p-4 md:p-6"
      >
        <WeeklyCalendar schedules={filtered} />
      </div>
    </>
  );
}
