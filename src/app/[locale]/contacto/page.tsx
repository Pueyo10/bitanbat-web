"use client";

import { useState, type FormEvent } from "react";
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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

      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(10,10,10,0.05),transparent_30%)]" />
        <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-16 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
            <ScrollReveal variant="slide-left">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-accent">
                    {locale === "eu" ? "Kontaktua" : "Contacto"}
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                    {locale === "eu" ? "Gertu gaude" : "Estamos cerca"}
                  </h2>
                  <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                    {locale === "eu"
                      ? "Zalantzak, erreserbak edo proiektu berezi bat baduzu, idatz iezaguzu eta ahalik eta azkarren erantzungo dizugu."
                      : "Si tienes dudas, quieres reservar o necesitas algo especial, escríbenos y te responderemos lo antes posible."}
                  </p>
                </div>

                <div className="grid gap-6">
                  <div className="flex items-start gap-4 border-b border-border/70 pb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/70">
                      <MapPin size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {SITE_CONFIG.location}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {locale === "eu" ? "2 lokal Hernanin" : "2 locales en Hernani"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-b border-border/70 pb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/70">
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <a
                        href={SITE_CONFIG.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading text-lg font-semibold text-foreground transition-colors hover:text-accent"
                      >
                        {SITE_CONFIG.phoneFormatted}
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {locale === "eu" ? "Dei zuzenean" : "Llama directamente"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/70">
                      <Instagram size={20} className="text-accent" />
                    </div>
                    <div>
                      <a
                        href={SITE_CONFIG.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading text-lg font-semibold text-foreground transition-colors hover:text-accent"
                      >
                        {SITE_CONFIG.instagramHandle}
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {locale === "eu" ? "Eguneroko momentuak" : "Momentos del día a día"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-right">
              <motion.form onSubmit={handleSubmit} className="relative space-y-6 md:pl-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-accent/35 to-transparent md:block" />
                <div className="relative">
                  <p className="mb-4 text-accent text-sm font-medium uppercase tracking-[0.2em]">
                    {locale === "eu" ? "Idatzi iezaguzu" : "Escríbenos"}
                  </p>
                  <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                    {locale === "eu" ? "Hasi elkarrizketa bat" : "Empecemos la conversación"}
                  </h2>
                  <p className="mt-3 max-w-xl text-lg text-muted-foreground">
                    {locale === "eu"
                      ? "Mezu labur bat nahikoa da. Guk adieraziko dizugu hurrengo urratsa."
                      : "Un mensaje corto basta. Nosotros te guiamos con el siguiente paso."}
                  </p>
                </div>

                <div className="relative">
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {t("name")}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    aria-required="true"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    className="w-full border-0 border-b-2 border-primary/12 bg-transparent px-0 py-3 text-lg text-foreground outline-none transition-colors focus:border-accent focus:ring-0"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {t("email")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    aria-required="true"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className="w-full border-0 border-b-2 border-primary/12 bg-transparent px-0 py-3 text-lg text-foreground outline-none transition-colors focus:border-accent focus:ring-0"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {t("phone")}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, phone: e.target.value }))
                    }
                    className="w-full border-0 border-b-2 border-primary/12 bg-transparent px-0 py-3 text-lg text-foreground outline-none transition-colors focus:border-accent focus:ring-0"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {t("message")}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    aria-required="true"
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className="w-full resize-none border-0 border-b-2 border-primary/12 bg-transparent px-0 py-3 text-lg text-foreground outline-none transition-colors focus:border-accent focus:ring-0"
                  />
                </div>

                {status === "success" && (
                  <p role="status" aria-live="polite" className="text-sm font-medium text-green-700">
                    {t("success")}
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" aria-live="assertive" className="text-sm font-medium text-red-600">
                    {t("error")}
                  </p>
                )}

                <button
                  type="submit"
                  className="relative z-10 flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-heading text-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-secondary"
                >
                  <Send size={18} />
                  {t("send")}
                </button>
              </motion.form>
            </ScrollReveal>
          </div>
        </div>

        <div className="relative mt-20 md:mt-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-8">
                <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
                  {locale === "eu" ? "Non gaude" : "Dónde estamos"}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {locale === "eu" ? "Bisitatu gaitzazu" : "Visítanos"}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {SITE_CONFIG.location}
                </p>
              </div>
              <div className="overflow-hidden rounded-[1.75rem] border border-border/70 shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1109!2d-1.9767211!3d43.2689845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51af1990bc0659%3A0x4829e8f05ae18f69!2sbitanbat!5e0!3m2!1ses!2ses!4v1"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BitanBat - Hernani"
                  className="w-full"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="relative mt-20 md:mt-28">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-4 text-accent text-sm font-medium uppercase tracking-[0.2em]">
              {locale === "eu" ? "Prest gaude" : "Estamos listos"}
            </p>
            <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-4xl">
              {locale === "eu"
                ? "Batu zaitez hurrengo pausora"
                : "Demos el siguiente paso"}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {locale === "eu"
                ? "Helarazi zure ideia eta guk erantzun, antolatu eta gidatuko zaitugu."
                : "Cuéntanos tu idea y nosotros te responderemos, organizaremos y te guiaremos."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
