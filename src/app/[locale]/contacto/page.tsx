"use client";

import { useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowUpRight,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactoPage() {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full border-0 border-b border-white/25 bg-transparent px-0 py-4 text-lg text-white outline-none transition-colors duration-300 focus:border-accent focus:ring-0";
  const labelClasses =
    "mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-white/45";

  return (
    <>
      {/* Hero + form — asymmetric editorial two-column, dark */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.14),transparent_38%)]" />
        <div
          aria-hidden="true"
          className="text-outline pointer-events-none absolute -bottom-10 left-0 hidden select-none font-heading text-[16vw] font-bold uppercase leading-none opacity-50 lg:block"
        >
          Kaixo
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
            {/* Left — monumental title + editorial contact list */}
            <div className="lg:col-span-5">
              <p className="hero-line mb-6 text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
                <span
                  style={{ "--line-delay": "0.1s" } as React.CSSProperties}
                >
                  {locale === "eu" ? "Kontaktua" : "Contacto"} — Hernani
                </span>
              </p>

              <h1 className="font-heading font-bold text-white text-display-md">
                <span className="hero-line">
                  <span
                    className="uppercase"
                    style={{ "--line-delay": "0.25s" } as React.CSSProperties}
                  >
                    {locale === "eu" ? "Hitz egingo" : "¿Hablamos?"}
                  </span>
                </span>
                <span className="hero-line">
                  <span
                    className="font-serif-display italic font-normal lowercase text-accent"
                    style={{ "--line-delay": "0.4s" } as React.CSSProperties}
                  >
                    {locale === "eu" ? "dugu?" : "escríbenos"}
                  </span>
                </span>
              </h1>

              <p className="hero-line mt-8 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
                <span
                  style={{ "--line-delay": "0.55s" } as React.CSSProperties}
                >
                  {t("subtitle")}
                </span>
              </p>

              <ScrollReveal delay={0.2}>
                <ul className="mt-14 border-t border-white/10">
                  <li className="border-b border-white/10">
                    <a
                      href={SITE_CONFIG.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-6 py-6"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="font-heading text-xs font-medium tracking-[0.28em] text-accent">
                          01
                        </span>
                        <span>
                          <span className="block text-[11px] uppercase tracking-[0.28em] text-white/40">
                            {t("phone")}
                          </span>
                          <span className="mt-1.5 block font-heading text-xl font-semibold text-white transition-colors duration-300 group-hover:text-accent md:text-2xl">
                            {SITE_CONFIG.phoneFormatted}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight
                        size={20}
                        className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>

                  <li className="border-b border-white/10">
                    <div className="flex items-center justify-between gap-6 py-6">
                      <span className="flex items-baseline gap-5">
                        <span className="font-heading text-xs font-medium tracking-[0.28em] text-accent">
                          02
                        </span>
                        <span>
                          <span className="block text-[11px] uppercase tracking-[0.28em] text-white/40">
                            {locale === "eu" ? "Helbidea" : "Dirección"}
                          </span>
                          <span className="mt-1.5 block font-heading text-xl font-semibold text-white md:text-2xl">
                            {SITE_CONFIG.location}
                          </span>
                        </span>
                      </span>
                    </div>
                  </li>

                  <li className="border-b border-white/10">
                    <a
                      href={SITE_CONFIG.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-6 py-6"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="font-heading text-xs font-medium tracking-[0.28em] text-accent">
                          03
                        </span>
                        <span>
                          <span className="block text-[11px] uppercase tracking-[0.28em] text-white/40">
                            Instagram
                          </span>
                          <span className="mt-1.5 block font-heading text-xl font-semibold text-white transition-colors duration-300 group-hover:text-accent md:text-2xl">
                            {SITE_CONFIG.instagramHandle}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight
                        size={20}
                        className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                </ul>
              </ScrollReveal>
            </div>

            {/* Right — the form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollReveal variant="slide-right" delay={0.3}>
                <form
                  onSubmit={handleSubmit}
                  className="relative space-y-8 lg:border-l lg:border-white/10 lg:pl-12"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
                    {locale === "eu"
                      ? "Idatzi iezaguzu"
                      : "Envíanos un mensaje"}
                  </p>

                  <div>
                    <label htmlFor="contact-name" className={labelClasses}>
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
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={labelClasses}>
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
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className={labelClasses}>
                      {t("phone")}{" "}
                      <span className="font-normal normal-case tracking-normal text-white/30">
                        ({locale === "eu" ? "aukerakoa" : "opcional"})
                      </span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      pattern="[0-9+\s()-]{7,15}"
                      maxLength={20}
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, phone: e.target.value }))
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClasses}>
                      {t("message")}
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      aria-required="true"
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({
                          ...s,
                          message: e.target.value,
                        }))
                      }
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {status === "success" && (
                    <p
                      role="status"
                      aria-live="polite"
                      className="flex items-center gap-2 text-sm font-medium text-accent"
                    >
                      <CheckCircle size={16} className="shrink-0" />
                      {t("success")}
                    </p>
                  )}
                  {status === "error" && (
                    <div
                      id="contact-error"
                      role="alert"
                      aria-live="assertive"
                      className="flex items-start gap-2.5 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm font-medium text-red-300"
                    >
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      {t("error")}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    aria-describedby={
                      status === "error" ? "contact-error" : undefined
                    }
                    className={`group flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-10 py-4 font-heading text-lg font-semibold text-primary transition-all duration-300 hover:bg-white sm:w-auto${
                      submitting ? " cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {tCommon("sending")}
                      </>
                    ) : (
                      <>
                        {t("send")}
                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map — light, full-width editorial */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.32em] text-accent">
                  {locale === "eu" ? "Non gaude" : "Dónde estamos"}
                </p>
                <h2 className="font-heading font-bold text-foreground text-display-md">
                  <span className="uppercase">
                    {locale === "eu" ? "Bisitatu" : "Visítanos"}
                  </span>{" "}
                  <span className="font-serif-display italic font-normal lowercase text-accent">
                    {locale === "eu" ? "gaitzazu" : "en hernani"}
                  </span>
                </h2>
              </div>
              <p className="shrink-0 font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground md:pb-2">
                {SITE_CONFIG.location}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-accent/20 shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1109!2d-1.9767211!3d43.2689845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51af1990bc0659%3A0x4829e8f05ae18f69!2sbitanbat!5e0!3m2!1ses!2ses!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BitanBat - Hernani"
                className="h-[280px] w-full sm:h-[360px] md:h-[440px]"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
