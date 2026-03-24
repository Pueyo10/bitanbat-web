"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { MapPin, Phone, Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SobreNosotrosPage() {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Nor gara" : "Quiénes somos"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero section with local facade */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-28">
            <ScrollReveal variant="slide-left">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/media/instagram/DJJhZLJtVmm.jpg"
                  alt="BitanBat Dantza & Fitness - Fundadoras"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal variant="slide-right">
              <div className="space-y-6">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  BITAN<span className="text-accent">BAT</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {locale === "eu"
                    ? "Dantza eta Fitness... Dantza eta fitness zentroa gara Hernanin, non mugimenduarekiko pasioak elkartzen gaituen. Adin eta maila guztietarako klase ugari eskaintzen ditugu."
                    : "Dantza eta Fitness... Somos un centro de danza y fitness en Hernani donde la pasión por el movimiento nos une. Ofrecemos una amplia variedad de clases para todas las edades y niveles."}
                </p>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-3 text-muted-foreground">
                    <MapPin size={18} className="text-accent" />
                    {SITE_CONFIG.location}
                  </p>
                  <p className="flex items-center gap-3 text-muted-foreground">
                    <Phone size={18} className="text-accent" />
                    {SITE_CONFIG.phoneFormatted}
                  </p>
                  <a
                    href={SITE_CONFIG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Instagram size={18} className="text-accent" />
                    {SITE_CONFIG.instagramHandle}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Community video */}
          <ScrollReveal className="mb-20 md:mb-28 text-center">
            <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
              {locale === "eu" ? "Komunitatea" : "Comunidad"}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t("communityTitle")}
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              {t("communitySubtitle")}
            </p>
            <div className="max-w-2xl mx-auto rounded-lg overflow-hidden aspect-video">
              <video
                src="/media/instagram/DM0z5uHNGa5.mp4"
                poster="/media/instagram/DM0z5uHNGa5.jpg"
                controls
                playsInline
                preload="none"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Testimonials */}
          <ScrollReveal>
            <div className="bg-muted rounded-lg p-8 md:p-12 text-center">
              <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
                {locale === "eu" ? "Testigantzak" : "Testimonios"}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("testimonialsTitle")}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t("testimonialsSubtitle")}
              </p>
              <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="rounded-lg overflow-hidden aspect-video">
                  <video
                    src="/media/instagram/DS28hFZDNUA.mp4"
                    poster="/media/instagram/DS28hFZDNUA.jpg"
                    controls
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden aspect-video">
                  <video
                    src="/media/instagram/DSz35eLDIio.mp4"
                    poster="/media/instagram/DSz35eLDIio.jpg"
                    controls
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
