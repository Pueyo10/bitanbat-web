"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Activity,
  Baby,
  BicepsFlexed,
  DoorOpen,
  Dumbbell,
  Flame,
  Flower2,
  Leaf,
  Music,
  PersonStanding,
  Sparkles,
  Wind,
  type LucideIcon,
} from "lucide-react";

export interface BoardSession {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  notes: string | null;
  location_id: string;
  class: { name: string; slug: string; category: string } | null;
}

const DAY_KEYS = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const;

/** Un cuadro por disciplina, como en el diseño original. */
const BOARDS = [
  { key: "dantza", es: "Danza", eu: "Dantza" },
  { key: "fitness", es: "Fitness", eu: "Fitness" },
  { key: "wellness", es: "Pilates & Bienestar", eu: "Pilates & Ongizatea" },
] as const;

const ICONS: Record<string, LucideIcon> = {
  barrefit: Dumbbell,
  "entrenamiento-funcional": Dumbbell,
  "e-funcional-txiki": Dumbbell,
  pilates: Activity,
  yoga: Leaf,
  "hatha-vinyasa": Leaf,
  salsa: Music,
  bachata: Music,
  urbano: PersonStanding,
  zumba: Flame,
  jumping: Wind,
  bungee: Wind,
  sevillanas: Flower2,
  fitgipsy: Flower2,
  predantza: Baby,
  totalbody: BicepsFlexed,
  open: DoorOpen,
};

function hora(t: string) {
  const [h, m] = t.split(":");
  return `${Number(h)}:${m}`;
}

function minutos(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

/** Tono de la tarjeta según la disciplina, como en el diseño original. */
function tono(session: BoardSession) {
  if (session.class?.slug === "open") {
    return {
      card: "bg-[#3d3a37]",
      time: "text-white",
      name: "text-white",
      icon: "text-white",
    };
  }
  const category = session.class?.category;
  const card =
    category === "dantza"
      ? "bg-[#e5a688]"
      : category === "wellness"
        ? "bg-[#ecbea6]"
        : "bg-[#e2a07f]";
  return { card, time: "text-white", name: "text-[#2a1f1a]", icon: "text-[#532d16]" };
}

function Card({ session }: { session: BoardSession }) {
  const Icon = (session.class && ICONS[session.class.slug]) || Sparkles;
  const t = tono(session);
  const larga = minutos(session.end_time) - minutos(session.start_time) >= 120;

  return (
    <article
      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 shadow-[0_1px_2px_rgba(80,40,20,0.12)] ${t.card}`}
    >
      <Icon
        size={22}
        strokeWidth={1.8}
        className={`shrink-0 ${t.icon}`}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1 text-center">
        <p
          className={`font-heading text-[15px] font-bold leading-tight [text-shadow:0_1px_1px_rgba(80,40,20,0.25)] ${t.time}`}
        >
          {hora(session.start_time)}
          {larga && ` – ${hora(session.end_time)}`}
        </p>
        <p
          className={`text-[11.5px] font-semibold uppercase leading-tight tracking-wide ${t.name}`}
        >
          {session.class?.name ?? "—"}
        </p>
        {session.notes && (
          <p className={`text-[10px] uppercase leading-tight opacity-75 ${t.name}`}>
            {session.notes}
          </p>
        )}
      </div>
    </article>
  );
}

export default function ScheduleBoards({ sessions }: { sessions: BoardSession[] }) {
  const t = useTranslations("Schedule");
  const locale = useLocale();

  const boards = useMemo(() => {
    const usadas = new Set(sessions.map((s) => s.class?.category));
    return BOARDS.filter((b) => usadas.has(b.key));
  }, [sessions]);

  const [board, setBoard] = useState<string>(boards[0]?.key ?? "");
  const [today, setToday] = useState<number | null>(null);

  // se calcula tras montar para no desincronizar servidor y cliente
  useEffect(() => {
    setToday((new Date().getDay() + 6) % 7);
  }, []);

  const byDay = useMemo(() => {
    const days: BoardSession[][] = [[], [], [], [], []];
    for (const s of sessions) {
      if (s.class?.category === board) days[s.day_of_week]?.push(s);
    }
    for (const d of days) {
      d.sort((a, b) => minutos(a.start_time) - minutos(b.start_time));
    }
    return days;
  }, [sessions, board]);

  return (
    <div className="space-y-6">
      {boards.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {boards.map((b) => (
            <button
              key={b.key}
              type="button"
              onClick={() => setBoard(b.key)}
              aria-pressed={b.key === board}
              className={`rounded-full px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-[0.14em] transition-colors ${
                b.key === board
                  ? "bg-primary text-white shadow-md"
                  : "border border-primary/15 bg-white/80 text-primary/60 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {locale === "eu" ? b.eu : b.es}
            </button>
          ))}
        </div>
      )}

      <div
        key={board}
        className="animate-fade-in rounded-3xl bg-[linear-gradient(160deg,#d99a80_0%,#f1c4ae_100%)] p-2.5 shadow-[0_24px_70px_rgba(120,70,45,0.22)] md:p-4"
      >
        <div className="grid grid-cols-1 gap-3 rounded-2xl bg-[#f5d9cb]/90 p-2 md:grid-cols-5 md:gap-2 md:p-3">
          {DAY_KEYS.map((key, day) => (
            <section
              key={key}
              className="flex flex-col overflow-hidden rounded-xl bg-[#f9e6db]"
            >
              <h3
                className={`bg-[#b5613f] px-3 py-2.5 text-center font-heading text-sm font-bold uppercase tracking-[0.12em] text-white ${
                  today === day ? "ring-2 ring-inset ring-white/70" : ""
                }`}
              >
                {t(key)}
              </h3>
              <div className="flex flex-1 flex-col gap-2 p-2 md:min-h-[14rem] md:p-2.5">
                {byDay[day].length === 0 ? (
                  <p className="py-4 text-center text-xs text-[#8a5c45]/60">—</p>
                ) : (
                  byDay[day].map((s) => <Card key={s.id} session={s} />)
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
