"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

type MosaicItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

// Curated high-res images & videos showing dance, fitness, and community
const MOSAIC_SETS: MosaicItem[][] = [
  [
    // Team group photo at event (2268x4032)
    { type: "image", src: "/media/instagram/DPcKgNdDLja.jpg" },
    // Outdoor barrefit on Hernani street (1125x1500)
    { type: "image", src: "/media/instagram/DKtuhk7tJls.jpg" },
    // Jumping/trampoline class in action (1380x1692)
    { type: "image", src: "/media/instagram/CovIjuOr--K.jpg" },
    // Boxing training with gear (1440x1800)
    { type: "image", src: "/media/instagram/CoX5o7xrQiU.jpg" },
    // Kids dance class group (1440x1800)
    { type: "image", src: "/media/instagram/CysgTyXN9bz.jpg" },
    // Kickboxing class in gym (1126x1998)
    { type: "image", src: "/media/instagram/C-AdHmMNp8P.jpg" },
    // Dance class B&W video
    {
      type: "video",
      src: "/media/instagram/C3zoi2aN0yy.mp4",
      poster: "/media/instagram/C3zoi2aN0yy.jpg",
    },
    // Two founders with BitanBat logo (1200x1500)
    { type: "image", src: "/media/instagram/DJJhZLJtVmm.jpg" },
  ],
  [
    // 3 women in the gym (1440x1800)
    { type: "image", src: "/media/instagram/DJFCIaxNdyR.jpg" },
    // Training with dumbbells on trampoline (720x900)
    { type: "image", src: "/media/instagram/CqfHvhRt4KD.jpg" },
    // Bungee dance with tutus (1080x1920)
    { type: "image", src: "/media/instagram/C1rjE4Ttcmt.jpg" },
    // Bungee fitness splits in the air (1126x1998)
    { type: "image", src: "/media/instagram/C-DFo4ftz8W.jpg" },
    // Bungee studio with straps (1080x1920)
    { type: "image", src: "/media/instagram/C5wdLZ4N8yY.jpg" },
    // Group session in the gym (1440x1920)
    { type: "image", src: "/media/instagram/DSdoc0ngpqV.jpg" },
    // Bungee splits video
    {
      type: "video",
      src: "/media/instagram/C-DFo4ftz8W.mp4",
      poster: "/media/instagram/C-DFo4ftz8W.jpg",
    },
    // Dance class B&W artistic (1080x1920)
    { type: "image", src: "/media/instagram/C3zoi2aN0yy.jpg" },
  ],
];

export default function Hero() {
  const t = useTranslations("Hero");
  const [activeSet, setActiveSet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSet((prev) => (prev + 1) % MOSAIC_SETS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background mosaic */}
      {MOSAIC_SETS.map((set, setIndex) => (
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
                />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
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

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/logo.jpg"
            alt="BitanBat"
            width={120}
            height={120}
            className="mx-auto mb-8 rounded-full shadow-2xl ring-2 ring-accent/30"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4"
        >
          BITAN<span className="text-accent">bat</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-accent font-light mb-2"
        >
          {t("title")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-white/70 mb-10"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/horarios"
            className="px-8 py-3 bg-accent text-primary font-semibold rounded-full hover:bg-accent/90 transition-colors shadow-lg"
          >
            {t("cta")}
          </Link>
          <Link
            href="/sobre-nosotros"
            className="px-8 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
          >
            {t("ctaSecondary")}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-white/50" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
