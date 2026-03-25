"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoPlayer from "@/components/ui/VideoPlayer";

const treatments = [
  {
    id: "ventosas",
    image: "/media/instagram/CmJ86qCNkAa.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "drenajelinfatico",
    image: "/media/instagram/CoDWQMELtOh.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "reflexologia",
    image: "/media/instagram/CoDWQMELtOh.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "descontracturante",
    image: "/media/instagram/ClTYGnaNqXA.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "relajante",
    image: "/media/instagram/DUDUHlZjPlW.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "maderoterapia",
    image: "/media/instagram/CmWMSL8tXuX.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "craneo",
    image: "/media/instagram/CmJ86qCNkAa.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "bitanbat",
    image: "/media/instagram/ClTYGnaNqXA.jpg",
    price: "65",
    memberPrice: "60",
    duration: "90 min",
    featured: true,
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
              <VideoPlayer src="/media/instagram/DUDUHlZjPlW.mp4" poster="/media/instagram/DUDUHlZjPlW.jpg" />
              <VideoPlayer src="/media/instagram/DWMe9ngjCSl.mp4" poster="/media/instagram/DWMe9ngjCSl.jpg" />
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {treatments.map((treatment, i) => (
              <ScrollReveal key={treatment.id} delay={i * 0.06}>
                <div className={`group rounded-lg overflow-hidden bg-muted ${treatment.featured ? "ring-2 ring-accent sm:col-span-2 lg:col-span-1" : ""}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={treatment.image}
                      alt={t(`${treatment.id}Name`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {treatment.featured && (
                      <div className="absolute top-3 left-3 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                        PREMIUM
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-1.5">
                      {t(`${treatment.id}Name`)}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {t(`${treatment.id}Desc`)}
                    </p>
                    <div className="flex items-end justify-between">
                      <div className="space-y-0.5">
                        <span className="font-heading text-2xl font-bold text-accent">
                          {treatment.price}&euro;
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {t("memberPrice")}: <span className="font-semibold text-foreground">{treatment.memberPrice}&euro;</span>
                        </p>
                      </div>
                      {treatment.duration && (
                        <span className="text-muted-foreground text-sm">
                          {treatment.duration}
                        </span>
                      )}
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
