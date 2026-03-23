"use client";

import { useLocale } from "next-intl";
import type { Schedule } from "@/types/database";
import { DAYS_ES, DAYS_EU } from "@/lib/constants";

interface WeeklyCalendarProps {
  schedules: Schedule[];
}

function getTimeSlots(schedules: Schedule[]): string[] {
  const times = new Set<string>();
  schedules.forEach((s) => {
    times.add(s.start_time.slice(0, 5));
  });
  return Array.from(times).sort();
}

export default function WeeklyCalendar({ schedules }: WeeklyCalendarProps) {
  const locale = useLocale();
  const days = locale === "eu" ? DAYS_EU : DAYS_ES;
  const timeSlots = getTimeSlots(schedules);

  return (
    <div className="overflow-x-auto">
      {/* Desktop view */}
      <table className="hidden md:table w-full border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-muted-foreground border-b border-border w-20">

            </th>
            {days.map((day, i) => (
              <th
                key={i}
                className="p-3 text-center text-sm font-semibold text-foreground border-b border-border"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time} className="border-b border-border/50">
              <td className="p-2 text-sm font-medium text-muted-foreground whitespace-nowrap">
                {time}
              </td>
              {[0, 1, 2, 3, 4].map((dayIndex) => {
                const cellSchedules = schedules.filter(
                  (s) =>
                    s.day_of_week === dayIndex &&
                    s.start_time.slice(0, 5) === time
                );
                return (
                  <td key={dayIndex} className="p-1 align-top">
                    {cellSchedules.map((s) => (
                      <div
                        key={s.id}
                        className="rounded-lg px-2 py-1.5 mb-1 text-xs font-medium shadow-sm"
                        style={{
                          backgroundColor: s.class?.color || "#CCCCCC",
                          color: isLightColor(s.class?.color || "#CCCCCC")
                            ? "#0A0A0A"
                            : "#FFFFFF",
                        }}
                      >
                        <div className="font-semibold truncate">
                          {s.class?.name || ""}
                        </div>
                        {s.notes && (
                          <div className="opacity-80 text-[10px]">
                            {s.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile view - day by day */}
      <div className="md:hidden space-y-6">
        {days.map((day, dayIndex) => {
          const daySchedules = schedules
            .filter((s) => s.day_of_week === dayIndex)
            .sort((a, b) => a.start_time.localeCompare(b.start_time));

          if (daySchedules.length === 0) return null;

          return (
            <div key={dayIndex}>
              <h3 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-2">
                {day}
              </h3>
              <div className="space-y-2">
                {daySchedules.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 shadow-sm"
                    style={{
                      backgroundColor: s.class?.color || "#CCCCCC",
                      color: isLightColor(s.class?.color || "#CCCCCC")
                        ? "#0A0A0A"
                        : "#FFFFFF",
                    }}
                  >
                    <div className="text-sm font-bold whitespace-nowrap">
                      {s.start_time.slice(0, 5)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {s.class?.name}
                      </div>
                      {s.notes && (
                        <div className="opacity-80 text-xs">{s.notes}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
