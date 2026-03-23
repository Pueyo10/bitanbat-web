"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function CTASection() {
  const t = useTranslations("Home");

  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {t("ctaTitle")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-lg mb-10 max-w-2xl mx-auto"
        >
          {t("ctaSubtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contacto"
            className="px-8 py-3 bg-accent text-primary font-semibold rounded-full hover:bg-accent/90 transition-colors shadow-lg"
          >
            {t("ctaButton")}
          </Link>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="px-8 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Phone size={18} />
            {SITE_CONFIG.phoneFormatted}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
