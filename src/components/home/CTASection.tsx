"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-32">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,170,110,0.08)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      {/* Decorative lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-6"
        >
          {locale === "eu" ? "Batu gure familiara" : "Únete a nuestra familia"}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          {t("ctaTitle")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
        >
          {t("ctaSubtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-accent text-primary font-heading font-semibold text-lg rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
          >
            {t("ctaButton")}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/clases"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-heading font-medium rounded-full hover:bg-white/5 hover:border-white/30 transition-all duration-300"
          >
            {locale === "eu" ? "Klaseak ikusi" : "Ver clases"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
