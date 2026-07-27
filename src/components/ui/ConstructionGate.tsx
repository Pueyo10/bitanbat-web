"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Instagram, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

type Lang = "es" | "eu";

const COPY: Record<
  Lang,
  { eyebrow: string; titleTop: string; titleAccent: string; subtitle: string; hint: string }
> = {
  es: {
    eyebrow: "Dantza & Fitness · Hernani, Gipuzkoa",
    titleTop: "Web en",
    titleAccent: "construcción",
    subtitle: "Estamos preparando algo especial. Muy pronto estará lista.",
    hint: "Mientras tanto, encuéntranos en",
  },
  eu: {
    eyebrow: "Dantza & Fitness · Hernani, Gipuzkoa",
    titleTop: "Webgunea",
    titleAccent: "eraikitzen",
    subtitle: "Zerbait berezia prestatzen ari gara. Oso laster egongo da prest.",
    hint: "Bitartean, aurki gaitzazu hemen",
  },
};

export default function ConstructionGate() {
  const initial: Lang = useLocale() === "eu" ? "eu" : "es";
  const [lang, setLang] = useState<Lang>(initial);
  const copy = COPY[lang];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#0a0908] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(201,169,110,0.16),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      {/* Selector de idioma del mensaje */}
      <div className="absolute right-4 top-4 z-10 flex gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1 sm:right-6 sm:top-6">
        {(["es", "eu"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`rounded-full px-3.5 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
              lang === l
                ? "bg-accent text-primary"
                : "text-white/55 hover:text-white"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="hero-line">
          <span style={{ "--line-delay": "0.12s" } as CSSProperties}>
            <span className="flex flex-col items-center gap-4">
              <Image
                src="/images/logo.jpg"
                alt="BitanBat"
                width={76}
                height={76}
                priority
                className="mx-auto rounded-full border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
              />
              <span className="font-heading text-lg font-bold tracking-[0.28em]">
                BITAN<span className="text-accent">BAT</span>
              </span>
            </span>
          </span>
        </div>

        <p className="hero-line mt-3 text-[0.62rem] uppercase tracking-[0.34em] text-white/45 md:text-xs">
          <span style={{ "--line-delay": "0.24s" } as CSSProperties}>
            {copy.eyebrow}
          </span>
        </p>

        <h1 className="mt-8">
          <span className="hero-line">
            <span
              className="block font-heading text-[clamp(2.6rem,8vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em]"
              style={{ "--line-delay": "0.38s" } as CSSProperties}
            >
              {copy.titleTop}
            </span>
          </span>
          <span className="hero-line">
            <span
              className="block font-serif-display text-[clamp(2.6rem,8vw,6.5rem)] font-normal lowercase italic leading-[1.05] text-accent"
              style={{ "--line-delay": "0.52s" } as CSSProperties}
            >
              {copy.titleAccent}
            </span>
          </span>
        </h1>

        <p className="hero-line mt-6 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
          <span style={{ "--line-delay": "0.72s" } as CSSProperties}>
            {copy.subtitle}
          </span>
        </p>

        <div className="hero-line mt-10">
          <span style={{ "--line-delay": "0.9s" } as CSSProperties}>
            <span className="flex flex-col items-center gap-4">
            <span className="text-[0.62rem] uppercase tracking-[0.3em] text-white/40">
              {copy.hint}
            </span>
            <span className="flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <Instagram size={16} />
                {SITE_CONFIG.instagramHandle}
              </a>
              <a
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <Phone size={16} />
                {SITE_CONFIG.phoneFormatted}
              </a>
            </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
