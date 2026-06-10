"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import WeeklyCalendar from "@/components/schedule/WeeklyCalendar";
import LocationTabs from "@/components/schedule/LocationTabs";
import type { Schedule } from "@/types/database";

const LOCAL_1_ID = "11111111-1111-1111-1111-111111111111";

export default function ScheduleContent({
  schedules,
}: {
  schedules: Schedule[];
}) {
  const locale = useLocale();
  const [activeLocation, setActiveLocation] = useState(LOCAL_1_ID);

  const filtered = useMemo(
    () => schedules.filter((s) => s.location_id === activeLocation),
    [activeLocation, schedules]
  );

  return (
    <>
      {/* Editorial header row — tabs left, weekly count right */}
      <div className="mb-12 flex flex-col gap-8 border-b border-accent/30 pb-10 md:mb-16 md:flex-row md:items-end md:justify-between">
        <LocationTabs
          activeTab={activeLocation}
          onTabChange={setActiveLocation}
        />
        <p className="shrink-0 font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground md:pb-1.5">
          <span className="text-accent">{filtered.length}</span>{" "}
          {locale === "eu" ? "klase astean" : "clases / semana"}
        </p>
      </div>

      <div
        key={activeLocation}
        className="animate-fade-in rounded-2xl border border-accent/20 bg-white/85 p-4 shadow-[0_24px_70px_rgba(16,15,12,0.08)] backdrop-blur-sm md:p-8"
      >
        <WeeklyCalendar schedules={filtered} />
      </div>
    </>
  );
}
