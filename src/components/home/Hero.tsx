"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

type MosaicItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

const MOSAIC_SETS: MosaicItem[][] = [
  [
    { type: "image", src: "/media/bitanbat/functional-training.jpg" },
    { type: "image", src: "/media/bitanbat/studio-room.jpg" },
    { type: "image", src: "/media/bitanbat/boxing-class.jpg" },
    { type: "image", src: "/media/bitanbat/bungee-class.jpg" },
    { type: "image", src: "/media/bitanbat/sevillanas-class.jpg" },
    { type: "image", src: "/media/bitanbat/pilates-class.jpg" },
    { type: "image", src: "/media/bitanbat/urban-dance.jpg" },
    { type: "image", src: "/media/bitanbat/stage-show.jpg" },
  ],
  [
    { type: "image", src: "/media/bitanbat/massage-treatment.jpg" },
    { type: "image", src: "/media/bitanbat/yoga-class.jpg" },
    { type: "image", src: "/media/bitanbat/fitgipsy-class.jpg" },
    { type: "image", src: "/media/bitanbat/jumping-class.jpg" },
    { type: "image", src: "/media/bitanbat/bachata-couple.jpg" },
    { type: "image", src: "/media/bitanbat/barrefit-class.jpg" },
    { type: "image", src: "/media/bitanbat/kids-dance.jpg" },
    { type: "image", src: "/media/bitanbat/team-room.jpg" },
  ],
];

const ANIMATION_DELAYS = [
  "0s",
  "2.1s",
  "4.2s",
  "6.3s",
  "8.4s",
  "10.5s",
  "12.6s",
  "14.7s",
] as const;

const DISCIPLINES = [
  "Sevillanas",
  "Bachata",
  "Salsa",
  "Urbano",
  "Zumba",
  "Pilates",
  "BarreFit",
  "Bungee",
  "Jumping",
  "Boxeo",
  "FitGipsy",
  "Funcional",
  "Yoga",
] as const;

function DisciplinesMarquee() {
  const items = [...DISCIPLINES, ...DISCIPLINES];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/10 bg-primary/40 py-4 backdrop-blur-sm"
    >
      <div className="marquee-track">
        {items.map((d, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center font-heading text-sm uppercase tracking-[0.3em] text-white/45"
          >
            <span className="px-6">{d}</span>
            <span className="text-accent">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("Hero");
  const [activeSet, setActiveSet] = useState(0);
  const [secondSetLoaded, setSecondSetLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSecondSetLoaded(true), 3000);
    const interval = setInterval(() => {
      setActiveSet((prev) => (prev + 1) % MOSAIC_SETS.length);
    }, 8000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const sets = [MOSAIC_SETS[0], ...(secondSetLoaded ? [MOSAIC_SETS[1]] : [])];

  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-primary pb-28 pt-32 md:pb-36">
      {/* Background mosaic */}
      {sets.map((set, setIndex) => (
        <div
          key={setIndex}
          className={`absolute inset-0 grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 transition-opacity duration-[2000ms] ${
            activeSet === setIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {set.map((item, i) => (
            <div key={i} className="relative overflow-hidden">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={50}
                  className="object-cover grayscale opacity-25 animate-ken-burns"
                  style={{ animationDelay: ANIMATION_DELAYS[i] }}
                  priority={setIndex === 0 && i < 2}
                  loading={setIndex === 0 ? undefined : "lazy"}
                />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster={item.poster}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-25 animate-ken-burns"
                  style={{ animationDelay: ANIMATION_DELAYS[i] }}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/45 to-primary/90" />

      {/* Content — asymmetric, anchored to the lower left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="hero-line mb-6 text-accent text-sm md:text-base tracking-[0.32em] uppercase font-medium"
        >
          <span style={{ "--line-delay": "0.15s" } as React.CSSProperties}>
            {t("tagline")} — Hernani
          </span>
        </p>

        <h1 className="mb-8 font-heading font-bold text-white text-display-xl">
          <span className="hero-line">
            <span style={{ "--line-delay": "0.25s" } as React.CSSProperties}>
              {t("title")}
            </span>
          </span>
          <span className="hero-line">
            <span
              className="font-serif-display italic font-normal lowercase text-accent"
              style={{ "--line-delay": "0.4s" } as React.CSSProperties}
            >
              {t("titleAccent")}
            </span>
          </span>
          <span className="hero-line">
            <span style={{ "--line-delay": "0.55s" } as React.CSSProperties}>
              {t("titleEnd")}
            </span>
          </span>
        </h1>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            className="hero-line max-w-md text-lg md:text-xl text-white/60"
          >
            <span style={{ "--line-delay": "0.75s" } as React.CSSProperties}>
              {t("subtitle")}
            </span>
          </p>

          <div className="hero-line">
            <span
              className="flex flex-col gap-4 sm:flex-row"
              style={{ "--line-delay": "0.9s" } as React.CSSProperties}
            >
              <Button href="/horarios" className="w-full sm:w-auto shadow-lg">
                {t("cta")}
              </Button>
              <Button
                href="/sobre-nosotros"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                {t("ctaSecondary")}
              </Button>
            </span>
          </div>
        </div>
      </div>

      <DisciplinesMarquee />
    </section>
  );
}
