"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";
import type { Schedule } from "@/types/database";
import { DAYS_ES, DAYS_EU } from "@/lib/constants";

interface WeeklyCalendarProps {
  schedules: Schedule[];
}

function getTimeSlots(schedules: Schedule[]): string[] {
  const times = new Set<string>();
  for (const s of schedules) {
    times.add(s.start_time.slice(0, 5));
  }
  return Array.from(times).sort();
}

export default function WeeklyCalendar({ schedules }: WeeklyCalendarProps) {
  const locale = useLocale();
  const days = locale === "eu" ? DAYS_EU : DAYS_ES;
  const { timeSlots, schedulesByCell, schedulesByDay } = useMemo(() => {
    const byCell = new Map<string, Schedule[]>();
    const byDay = new Map<number, Schedule[]>();

    for (const schedule of schedules) {
      const time = schedule.start_time.slice(0, 5);
      const cellKey = `${schedule.day_of_week}-${time}`;
      const cell = byCell.get(cellKey);
      if (cell) cell.push(schedule);
      else byCell.set(cellKey, [schedule]);

      const day = byDay.get(schedule.day_of_week);
      if (day) day.push(schedule);
      else byDay.set(schedule.day_of_week, [schedule]);
    }

    for (const daySchedules of byDay.values()) {
      daySchedules.sort((a, b) => a.start_time.localeCompare(b.start_time));
    }

    return {
      timeSlots: getTimeSlots(schedules),
      schedulesByCell: byCell,
      schedulesByDay: byDay,
    };
  }, [schedules]);
  const todayIdx = (new Date().getDay() + 6) % 7;

  return (
    <div className="overflow-x-auto">
      {/* Desktop view */}
      <table
        aria-label={
          locale === "eu"
            ? "Asteko klaseen ordutegia"
            : "Horario semanal de clases"
        }
        className="hidden lg:table w-full border-collapse"
      >
        <thead className="sticky top-0 z-10 bg-primary">
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-white/60 border-b border-border w-20">

            </th>
            {days.map((day, i) => (
              <th
                key={i}
                className="p-3 text-center text-sm font-semibold text-white border-b border-border"
              >
                {i === todayIdx ? (
                  <span className="inline-block rounded-full bg-accent px-4 py-1 text-primary">
                    {day}
                  </span>
                ) : (
                  day
                )}
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
                const cellSchedules =
                  schedulesByCell.get(`${dayIndex}-${time}`) ?? [];
                return (
                  <td
                    key={dayIndex}
                    className={`p-1.5 align-top ${
                      dayIndex === todayIdx ? "bg-accent/[0.07]" : ""
                    }`}
                  >
                    {cellSchedules.map((s) => (
                      <div
                        key={s.id}
                        className="rounded-lg px-2 py-1.5 mb-1 text-xs font-medium shadow-sm"
                        style={{
                          backgroundColor: s.class?.color || "#9CA3AF",
                          color: isLightColor(s.class?.color || "#9CA3AF")
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
      <div className="lg:hidden space-y-6">
        {days.map((day, dayIndex) => {
          const daySchedules = schedulesByDay.get(dayIndex) ?? [];
          const isToday = dayIndex === todayIdx;

          const dayHeading = (
            <h3
              className={`flex items-center gap-2 text-lg font-semibold text-foreground mb-3 border-b pb-2 ${
                isToday ? "border-accent" : "border-border"
              }`}
            >
              {day}
              {isToday && (
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                  {locale === "eu" ? "Gaur" : "Hoy"}
                </span>
              )}
            </h3>
          );

          if (daySchedules.length === 0) {
            return (
              <div key={dayIndex}>
                {dayHeading}
                <p className="text-sm text-muted-foreground italic">
                  {locale === "eu" ? "Klaserik ez" : "Sin clases"}
                </p>
              </div>
            );
          }

          return (
            <div key={dayIndex}>
              {dayHeading}
              <div className="space-y-2">
                {daySchedules.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 shadow-sm"
                    style={{
                      backgroundColor: s.class?.color || "#9CA3AF",
                      color: isLightColor(s.class?.color || "#9CA3AF")
                        ? "#0A0A0A"
                        : "#FFFFFF",
                    }}
                  >
                    <div className="text-sm font-bold whitespace-nowrap">
                      {s.start_time.slice(0, 5)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm truncate">
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

      <p className="text-xs text-muted-foreground text-center mt-4">
        {locale === "eu"
          ? "Koloreak diziplina bakoitzari dagozkie"
          : "Los colores corresponden a cada disciplina"}
      </p>
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return false;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
