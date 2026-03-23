"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

const treatments = [
  {
    id: "quiromasaje",
    image: "/media/instagram/ClTYGnaNqXA.jpg",
    price: "38",
    duration: "50 min",
  },
  {
    id: "descontracturante",
    image: "/media/instagram/CoDWQMELtOh.jpg",
    price: "42",
    duration: "50 min",
  },
  {
    id: "ventosas",
    image: "/media/instagram/CmJ86qCNkAa.jpg",
    price: "40",
    duration: "45 min",
  },
  {
    id: "reflexologia",
    image: "/media/instagram/CoDWQMELtOh.jpg",
    price: "38",
    duration: "45 min",
  },
  {
    id: "maderoterapia",
    image: "/media/instagram/CmWMSL8tXuX.jpg",
    price: "45",
    duration: "50 min",
  },
];

export default function MasajesPage() {
  const t = useTranslations("Massage");
  const locale = useLocale();

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Zure momentua" : "Tu momento"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Intro section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <ScrollReveal variant="slide-left">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src="/media/instagram/ClTYGnaNqXA.jpg"
                  alt={t("title")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal variant="slide-right">
              <div className="space-y-6">
                <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium">
                  {locale === "eu" ? "Masajeak & Tratamenduak" : "Masajes & Tratamientos"}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  {t("introTitle")}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("introText")}
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("introText2")}
                </p>
                <div className="pt-4">
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-full hover:bg-secondary hover:scale-105 transition-all duration-300"
                  >
                    <Phone size={18} />
                    {locale === "eu" ? "Erreserbatu" : "Reservar cita"}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Video showcase */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
              {locale === "eu" ? "Gure espazioa" : "Nuestro espacio"}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              {t("spaceTitle")}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="rounded-lg overflow-hidden">
                <video
                  src="/media/instagram/DUDUHlZjPlW.mp4"
                  poster="/media/instagram/DUDUHlZjPlW.jpg"
                  controls
                  playsInline
                  className="w-full"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <video
                  src="/media/instagram/DWMe9ngjCSl.mp4"
                  poster="/media/instagram/DWMe9ngjCSl.jpg"
                  controls
                  playsInline
                  className="w-full"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Treatments grid */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
              {locale === "eu" ? "Tratamenduak" : "Tratamientos"}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t("treatmentsTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("treatmentsSubtitle")}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment, i) => (
              <ScrollReveal key={treatment.id} delay={i * 0.08}>
                <div className="group rounded-lg overflow-hidden bg-muted">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={treatment.image}
                      alt={t(`${treatment.id}Name`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {t(`${treatment.id}Name`)}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {t(`${treatment.id}Desc`)}
                    </p>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="font-heading text-2xl font-bold text-accent">
                          {treatment.price}&euro;
                        </span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {treatment.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gift card + CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <ScrollReveal variant="slide-left">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/media/instagram/CmJ86qCNkAa.jpg"
                  alt="Opari Txartela - Tarjeta regalo"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal variant="slide-right">
              <div className="space-y-6">
                <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium">
                  {locale === "eu" ? "Opari ezin hobea" : "El regalo perfecto"}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                  {t("giftTitle")}
                </h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  {t("giftText")}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-primary font-heading font-semibold rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
                  >
                    <Phone size={18} />
                    {SITE_CONFIG.phoneFormatted}
                  </a>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 px-8 py-3 border border-white/30 text-white font-heading font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    {locale === "eu" ? "Kontaktatu" : "Contactar"}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
