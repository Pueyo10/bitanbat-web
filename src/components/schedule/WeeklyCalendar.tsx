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
  const { timeSlots, schedulesByCell, schedulesByDay, legend } =
    useMemo(() => {
      const byCell = new Map<string, Schedule[]>();
      const byDay = new Map<number, Schedule[]>();
      const legendMap = new Map<string, string>();

      for (const schedule of schedules) {
        const time = schedule.start_time.slice(0, 5);
        const cellKey = `${schedule.day_of_week}-${time}`;
        const cell = byCell.get(cellKey);
        if (cell) cell.push(schedule);
        else byCell.set(cellKey, [schedule]);

        const day = byDay.get(schedule.day_of_week);
        if (day) day.push(schedule);
        else byDay.set(schedule.day_of_week, [schedule]);

        const className = schedule.class?.name;
        if (className && !legendMap.has(className)) {
          legendMap.set(className, schedule.class?.color || "#9CA3AF");
        }
      }

      for (const daySchedules of byDay.values()) {
        daySchedules.sort((a, b) => a.start_time.localeCompare(b.start_time));
      }

      return {
        timeSlots: getTimeSlots(schedules),
        schedulesByCell: byCell,
        schedulesByDay: byDay,
        legend: Array.from(legendMap, ([name, color]) => ({ name, color })).sort(
          (a, b) => a.name.localeCompare(b.name)
        ),
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
        className="hidden w-full border-collapse lg:table"
      >
        <thead className="sticky top-0 z-10 bg-primary">
          <tr>
            <th className="w-24 border-b border-accent/40 px-4 py-5 text-left font-heading text-[11px] font-medium uppercase tracking-[0.28em] text-white/40">
              {locale === "eu" ? "Ordua" : "Hora"}
            </th>
            {days.map((day, i) => (
              <th
                key={i}
                className="border-b border-accent/40 px-3 py-5 text-center font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85"
              >
                {i === todayIdx ? (
                  <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 tracking-[0.28em] text-primary">
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
            <tr key={time} className="border-b border-border/60">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 align-top font-heading text-sm font-semibold tabular-nums text-foreground/60">
                {time}
              </td>
              {[0, 1, 2, 3, 4].map((dayIndex) => {
                const cellSchedules =
                  schedulesByCell.get(`${dayIndex}-${time}`) ?? [];
                return (
                  <td
                    key={dayIndex}
                    className={`p-2 align-top ${
                      dayIndex === todayIdx ? "bg-accent/[0.07]" : ""
                    }`}
                  >
                    {cellSchedules.map((s) => (
                      <div
                        key={s.id}
                        className="mb-1.5 rounded-xl px-3 py-2 text-xs shadow-sm"
                        style={{
                          backgroundColor: s.class?.color || "#9CA3AF",
                          color: isLightColor(s.class?.color || "#9CA3AF")
                            ? "#0A0A0A"
                            : "#FFFFFF",
                        }}
                      >
                        <div className="truncate font-heading font-semibold tracking-wide">
                          {s.class?.name || ""}
                        </div>
                        {s.notes && (
                          <div className="mt-0.5 text-[10px] leading-snug opacity-80">
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
      <div className="space-y-8 lg:hidden">
        {days.map((day, dayIndex) => {
          const daySchedules = schedulesByDay.get(dayIndex) ?? [];
          const isToday = dayIndex === todayIdx;

          const dayHeading = (
            <h3
              className={`mb-4 flex items-center justify-between gap-3 border-b pb-3 ${
                isToday ? "border-accent" : "border-border"
              }`}
            >
              <span className="flex items-baseline gap-3">
                <span className="font-heading text-[11px] font-medium tracking-[0.28em] text-accent">
                  {String(dayIndex + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-lg font-bold uppercase tracking-tight text-foreground">
                  {day}
                </span>
              </span>
              {isToday && (
                <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {locale === "eu" ? "Gaur" : "Hoy"}
                </span>
              )}
            </h3>
          );

          if (daySchedules.length === 0) {
            return (
              <div key={dayIndex}>
                {dayHeading}
                <p className="font-serif-display text-base italic lowercase text-muted-foreground">
                  {locale === "eu" ? "klaserik ez" : "sin clases"}
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
                    className="flex items-center gap-4 rounded-xl px-4 py-3.5 shadow-sm"
                    style={{
                      backgroundColor: s.class?.color || "#9CA3AF",
                      color: isLightColor(s.class?.color || "#9CA3AF")
                        ? "#0A0A0A"
                        : "#FFFFFF",
                    }}
                  >
                    <div className="whitespace-nowrap font-heading text-sm font-bold tabular-nums">
                      {s.start_time.slice(0, 5)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-heading text-sm font-semibold tracking-wide">
                        {s.class?.name}
                      </div>
                      {s.notes && (
                        <div className="text-xs opacity-80">{s.notes}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend — disciplines by color */}
      <div className="mt-10 border-t border-accent/30 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          {locale === "eu"
            ? "Koloreak diziplina bakoitzari dagozkie"
            : "Los colores corresponden a cada disciplina"}
        </p>
        {legend.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
            {legend.map((item) => (
              <li key={item.name} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-heading text-xs font-medium uppercase tracking-[0.12em] text-foreground/70">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
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
