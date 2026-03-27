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
  const experiencePoints = [
    {
      value: locale === "eu" ? "Banakakoa" : "Individual",
      label: locale === "eu" ? "Saioa zure beharretara" : "Sesion adaptada a tu cuerpo",
    },
    {
      value: "35EUR",
      label: locale === "eu" ? "Erabiltzaile prezioa" : "Precio para socios",
    },
    {
      value: "60-90",
      label: locale === "eu" ? "Minutuko saioak" : "Min por sesion",
    },
  ];
  const spaceNote =
    locale === "eu"
      ? "Gure txokoa lasaitasunerako, ongizaterako eta arreta pertsonalizaturako sortua dago."
      : "Nuestro espacio esta pensado para bajar el ritmo, cuidar el detalle y convertir cada sesion en una experiencia.";

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Zure momentua" : "Tu momento"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Intro section */}
      <section className="lux-section-light py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <ScrollReveal variant="slide-left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/80 shadow-[0_24px_70px_rgba(16,13,10,0.12)]">
                <Image
                  src="/media/instagram/ClTYGnaNqXA.jpg"
                  alt={t("title")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                <div className="absolute right-4 top-4 rounded-full bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-lg">
                  {locale === "eu" ? "Wellness" : "Wellness"}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="slide-right">
              <div className="space-y-6">
                <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium">
                  {locale === "eu" ? "Masajeak & Tratamenduak" : "Masajes & Tratamientos"}
                </p>
                <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
                  {t("introTitle")}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("introText")}
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("introText2")}
                </p>
                <div className="grid gap-5 pt-2 sm:grid-cols-3">
                  {experiencePoints.map((point) => (
                    <div key={point.value} className="border-t border-accent/20 pt-4">
                      <p className="font-heading text-lg font-bold text-foreground">
                        {point.value}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {point.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <a
                    href={SITE_CONFIG.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-heading font-semibold text-primary-foreground transition-all duration-300 hover:bg-secondary hover:scale-105"
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

      {/* Treatments grid */}
      <section className="lux-section-dark py-20 md:py-28 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
              {locale === "eu" ? "Tratamenduak" : "Tratamientos"}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
              {t("treatmentsTitle")}
            </h2>
            <p className="text-white/62 text-lg max-w-2xl mx-auto">
              {t("treatmentsSubtitle")}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {treatments.map((treatment, i) => (
              <ScrollReveal key={treatment.id} delay={i * 0.06}>
                <div
                  className={`lux-card-dark group relative overflow-hidden rounded-[1.5rem] ${
                    treatment.featured ? "ring-1 ring-accent/50 sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={treatment.image}
                      alt={t(`${treatment.id}Name`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/15 to-transparent" />
                    {treatment.featured && (
                      <div className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
                        PREMIUM
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/42">
                        {locale === "eu" ? "Ongizatea" : "Bienestar"}
                      </p>
                      {treatment.duration && (
                        <span className="text-sm text-white/52">
                          {treatment.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white mb-1.5">
                      {t(`${treatment.id}Name`)}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-2 text-white/60">
                      {t(`${treatment.id}Desc`)}
                    </p>
                    <div className="flex items-end justify-between">
                      <div className="space-y-0.5">
                        <span className="font-heading text-2xl font-bold text-gradient-gold">
                          {treatment.price}&euro;
                        </span>
                        <p className="text-xs text-white/48">
                          {t("memberPrice")}:{" "}
                          <span className="font-semibold text-white">{treatment.memberPrice}&euro;</span>
                        </p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/58">
                        {locale === "eu" ? "Zentroa" : "Centro"}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-12 text-center">
            <Link
              href="/precios"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-accent/35 bg-white/[0.03] px-8 py-3 font-heading font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-white/[0.06]"
            >
              {locale === "eu" ? "Tarifak ikusi" : "Ver tarifas completas"}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Video showcase */}
      <section className="lux-section-dark py-16 md:py-24 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12 text-center">
            <p className="mb-4 text-accent text-sm font-medium uppercase tracking-[0.2em]">
              {locale === "eu" ? "Gure espazioa" : "Nuestro espacio"}
            </p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
              {t("spaceTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/62 md:text-lg">
              {spaceNote}
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid max-w-4xl gap-6 sm:grid-cols-2 mx-auto">
              <VideoPlayer src="/media/instagram/DUDUHlZjPlW.mp4" poster="/media/instagram/DUDUHlZjPlW.jpg" />
              <VideoPlayer src="/media/instagram/DWMe9ngjCSl.mp4" poster="/media/instagram/DWMe9ngjCSl.jpg" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gift card + CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <ScrollReveal variant="slide-left">
              <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-white/10">
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
                    href={SITE_CONFIG.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-heading font-semibold text-primary transition-all duration-300 hover:bg-white hover:scale-105"
                  >
                    <Phone size={18} />
                    {SITE_CONFIG.phoneFormatted}
                  </a>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3 font-heading font-semibold text-white transition-all duration-300 hover:bg-white/10"
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
