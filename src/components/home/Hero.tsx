"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
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
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-primary">
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
                  className="object-cover grayscale opacity-35 animate-ken-burns"
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
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-35 animate-ken-burns"
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
        <p className="text-accent text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-5 md:mb-8">
          {t("tagline")}
        </p>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
          {t("title")}
          <br />
          <span className="text-accent">{t("titleAccent")}</span>
          <br />
          {t("titleEnd")}
        </h1>

        <p className="text-lg md:text-xl text-white/60 mb-8 md:mb-12 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white/60 drop-shadow-lg" size={28} />
      </div>
    </section>
  );
}
