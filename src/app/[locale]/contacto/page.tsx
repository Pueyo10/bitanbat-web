"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Phone, Instagram, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactoPage() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Hitz egin" : "Hablemos"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact info */}
            <ScrollReveal variant="slide-left">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground text-lg">
                        {SITE_CONFIG.location}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {locale === "eu" ? "2 lokal Hernanin" : "2 locales en Hernani"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <a
                        href={`tel:${SITE_CONFIG.phone}`}
                        className="font-heading font-semibold text-foreground text-lg hover:text-accent transition-colors"
                      >
                        {SITE_CONFIG.phoneFormatted}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Instagram size={20} className="text-accent" />
                    </div>
                    <div>
                      <a
                        href={SITE_CONFIG.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading font-semibold text-foreground text-lg hover:text-accent transition-colors"
                      >
                        {SITE_CONFIG.instagramHandle}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal variant="slide-right">
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border text-foreground focus:border-accent focus:ring-0 outline-none transition-colors text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border text-foreground focus:border-accent focus:ring-0 outline-none transition-colors text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, phone: e.target.value }))
                    }
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border text-foreground focus:border-accent focus:ring-0 outline-none transition-colors text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">
                    {t("message")}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border text-foreground focus:border-accent focus:ring-0 outline-none transition-colors text-lg resize-none"
                  />
                </div>

                {status === "success" && (
                  <p className="text-sm text-green-600 font-medium">
                    {t("success")}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-destructive font-medium">
                    {t("error")}
                  </p>
                )}

                <button
                  type="submit"
                  className="px-10 py-4 bg-primary text-primary-foreground font-heading font-semibold text-lg rounded-full hover:bg-secondary hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Send size={18} />
                  {t("send")}
                </button>
              </motion.form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
