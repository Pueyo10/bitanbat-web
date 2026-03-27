"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

type MosaicItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

const MOSAIC_SETS: MosaicItem[][] = [
  [
    { type: "image", src: "/media/instagram/DPcKgNdDLja.jpg" },
    { type: "image", src: "/media/instagram/DKtuhk7tJls.jpg" },
    { type: "video", src: "/media/instagram/C3zoi2aN0yy.mp4", poster: "/media/instagram/C3zoi2aN0yy.jpg" },
    { type: "image", src: "/media/instagram/CoX5o7xrQiU.jpg" },
    { type: "image", src: "/media/instagram/CysgTyXN9bz.jpg" },
    { type: "video", src: "/media/instagram/C-AdHmMNp8P.mp4", poster: "/media/instagram/C-AdHmMNp8P.jpg" },
    { type: "image", src: "/media/instagram/CovIjuOr--K.jpg" },
    { type: "image", src: "/media/instagram/DJJhZLJtVmm.jpg" },
  ],
  [
    { type: "video", src: "/media/instagram/C-DFo4ftz8W.mp4", poster: "/media/instagram/C-DFo4ftz8W.jpg" },
    { type: "image", src: "/media/instagram/DJFCIaxNdyR.jpg" },
    { type: "image", src: "/media/instagram/CqfHvhRt4KD.jpg" },
    { type: "video", src: "/media/instagram/C1rjE4Ttcmt.mp4", poster: "/media/instagram/C1rjE4Ttcmt.jpg" },
    { type: "image", src: "/media/instagram/C5wdLZ4N8yY.jpg" },
    { type: "video", src: "/media/instagram/C56VQfcNr-m.mp4", poster: "/media/instagram/C56VQfcNr-m.jpg" },
    { type: "image", src: "/media/instagram/DSdoc0ngpqV.jpg" },
    { type: "image", src: "/media/instagram/C3zoi2aN0yy.jpg" },
  ],
];

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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
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
                  style={{ animationDelay: `${i * 3}s` }}
                  priority={setIndex === 0}
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
                  style={{ animationDelay: `${i * 3}s` }}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
        <p className="text-accent text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-8">
          {t("tagline")}
        </p>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9] tracking-tight">
          {t("title")}
          <br />
          <span className="text-accent">{t("titleAccent")}</span>
          <br />
          {t("titleEnd")}
        </h1>

        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/horarios"
            className="w-full sm:w-auto text-center px-10 py-4 bg-accent text-primary font-heading font-semibold text-lg rounded-full hover:bg-accent/90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {t("cta")}
          </Link>
          <Link
            href="/sobre-nosotros"
            className="w-full sm:w-auto text-center px-10 py-4 border border-white/30 text-white font-medium text-lg rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white/40" size={28} />
      </div>
    </section>
  );
}
