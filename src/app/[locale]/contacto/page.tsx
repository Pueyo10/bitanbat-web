"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Phone, Instagram, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactoPage() {
  const t = useTranslations("Contact");
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
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {SITE_CONFIG.location}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    2 locales en Hernani
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-accent" />
                </div>
                <div>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="font-semibold text-foreground hover:text-accent transition-colors"
                  >
                    {SITE_CONFIG.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Instagram size={20} className="text-accent" />
                </div>
                <div>
                  <a
                    href={SITE_CONFIG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground hover:text-accent transition-colors"
                  >
                    {SITE_CONFIG.instagramHandle}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 shadow-sm border border-border space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t("name")}
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t("email")}
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t("phone")}
              </label>
              <input
                type="tel"
                value={formState.phone}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, phone: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t("message")}
              </label>
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none"
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
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              <Send size={18} />
              {t("send")}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
