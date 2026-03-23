"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background logo with overlay */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/logo.jpg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

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
            className="mx-auto mb-8 rounded-full shadow-2xl"
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
