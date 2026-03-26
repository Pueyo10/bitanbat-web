"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { MapPin, Phone, Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoPlayer from "@/components/ui/VideoPlayer";

export default function SobreNosotrosPage() {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Nor gara" : "Quienes somos"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="relative overflow-hidden py-20 md:py-28 bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,110,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(10,10,10,0.06),transparent_30%)]" />
        <div className="pointer-events-none absolute left-0 top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-40 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-28">
            <ScrollReveal variant="slide-left">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-primary/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-muted shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
                  <div className="relative aspect-square">
                    <Image
                      src="/media/instagram/DJJhZLJtVmm.jpg"
                      alt="BitanBat Dantza & Fitness - Fundadoras"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-6 md:p-8">
                    <p className="text-xs tracking-[0.24em] uppercase text-accent font-medium">
                      {locale === "eu" ? "Gure espazioa" : "Nuestro espacio"}
                    </p>
                    <p className="mt-2 max-w-sm text-sm md:text-base text-white/85">
                      {locale === "eu"
                        ? "Mugimendua, komunitatea eta zaintza leku berean."
                        : "Movimiento, comunidad y cuidado en un mismo lugar."}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-right">
              <div className="space-y-6 md:max-w-xl">
                <div className="inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-accent">
                  {locale === "eu" ? "Gure istorioa" : "Nuestra historia"}
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  BITAN<span className="text-accent">BAT</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {locale === "eu"
                    ? "Dantza eta fitness zentroa gara Hernanin, non mugimenduarekiko pasioak elkartzen gaituen. Adin eta maila guztietarako klase ugari eskaintzen ditugu."
                    : "Somos un centro de danza y fitness en Hernani donde la pasion por el movimiento nos une. Ofrecemos una amplia variedad de clases para todas las edades y niveles."}
                </p>
                <div className="grid gap-5 pt-2 sm:grid-cols-3">
                  <div className="border-t border-accent/25 pt-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {locale === "eu" ? "Mugimendua" : "Movimiento"}
                    </p>
                    <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                      {locale === "eu" ? "Klase bizigarriak" : "Clases con ritmo"}
                    </p>
                  </div>
                  <div className="border-t border-accent/25 pt-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {locale === "eu" ? "Komunitatea" : "Comunidad"}
                    </p>
                    <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                      {locale === "eu" ? "Familia giroa" : "Ambiente cercano"}
                    </p>
                  </div>
                  <div className="border-t border-accent/25 pt-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {locale === "eu" ? "Zaintza" : "Cuidado"}
                    </p>
                    <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                      {locale === "eu" ? "Espazio atsegina" : "Espacio cuidado"}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 border-t border-border/70 pt-6 text-sm">
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

          <ScrollReveal className="mb-20 md:mb-28">
            <div className="border-t border-primary/15 pt-10 md:pt-12">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
                  {locale === "eu" ? "Komunitatea" : "Comunidad"}
                </p>
                <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
                  {t("communityTitle")}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {t("communitySubtitle")}
                </p>
              </div>
              <div className="max-w-3xl mx-auto overflow-hidden rounded-[1.75rem] border border-primary/10 bg-primary p-3 shadow-[0_24px_70px_rgba(0,0,0,0.16)]">
                <VideoPlayer
                  src="/media/instagram/DM0z5uHNGa5.mp4"
                  poster="/media/instagram/DM0z5uHNGa5.jpg"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-t border-border/70 pt-10 md:pt-12 text-center">
              <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
                {locale === "eu" ? "Testigantzak" : "Testimonios"}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("testimonialsTitle")}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {t("testimonialsSubtitle")}
              </p>
              <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <VideoPlayer
                  src="/media/instagram/DS28hFZDNUA.mp4"
                  poster="/media/instagram/DS28hFZDNUA.jpg"
                />
                <VideoPlayer
                  src="/media/instagram/DSz35eLDIio.mp4"
                  poster="/media/instagram/DSz35eLDIio.jpg"
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-20 md:mt-28">
            <div className="border-t border-accent/20 px-2 pt-8 text-center md:pt-10">
              <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
                {locale === "eu" ? "Prest gaude" : "Estamos listos"}
              </p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-4">
                {locale === "eu"
                  ? "Batu zaitez hurrengo pausora"
                  : "Demos el siguiente paso"}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {locale === "eu"
                  ? "Helarazi zure ideia eta guk erantzun, antolatu eta gidatuko zaitugu."
                  : "Cuéntanos tu idea y nosotros te responderemos, organizaremos y te guiaremos."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
