"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { MapPin, Phone, Instagram, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoPlayer from "@/components/ui/VideoPlayer";
import Button from "@/components/ui/Button";

export default function SobreNosotrosPage() {
  const t = useTranslations("About");
  const tHome = useTranslations("Home");
  const locale = useLocale();
  const isBasque = locale === "eu";

  const values = [
    {
      number: "01",
      title: isBasque ? "Mugimendua" : "Movimiento",
      accent: isBasque ? "klase bizigarriak" : "clases con ritmo",
      text: isBasque
        ? "Dantza eta fitness diziplinak, energia eta teknika uztartzen dituztenak. Gorputza esnatzeko klaseak, astea markatzen dutenak."
        : "Disciplinas de danza y fitness que combinan energía y técnica. Clases que despiertan el cuerpo y marcan el ritmo de la semana.",
    },
    {
      number: "02",
      title: isBasque ? "Komunitatea" : "Comunidad",
      accent: isBasque ? "familia giroa" : "ambiente cercano",
      text: isBasque
        ? "Gimnasioa baino gehiago: izenak ezagutzen diren lekua. Hemen jendea elkarrekin entrenatzen da, eta elkarrekin gelditzen da."
        : "Más que un gimnasio: un lugar donde la gente se conoce por su nombre. Aquí se entrena en compañía y se queda en compañía.",
    },
    {
      number: "03",
      title: isBasque ? "Zaintza" : "Cuidado",
      accent: isBasque ? "espazio atsegina" : "espacio cuidado",
      text: isBasque
        ? "Xehetasunak axola zaizkigu: espazioa, harrera eta pertsona bakoitzaren erritmoa. Maila eta adin guztiek dute lekua."
        : "Nos importan los detalles: el espacio, la acogida y el ritmo de cada persona. Todos los niveles y edades tienen su sitio.",
    },
  ] as const;

  return (
    <>
      {/* ============ HERO — editorial, dark chapter ============ */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.14),transparent_40%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 right-0 select-none font-heading font-bold uppercase text-display-xl text-outline opacity-40"
        >
          Bitan
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="hero-line mb-6 text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
            <span style={{ "--line-delay": "0.1s" } as React.CSSProperties}>
              {isBasque ? "Nor gara" : "Quiénes somos"} — Hernani
            </span>
          </p>

          <h1 className="font-heading font-bold text-white text-display-xl">
            <span className="hero-line">
              <span
                className="uppercase"
                style={{ "--line-delay": "0.25s" } as React.CSSProperties}
              >
                {t("title")}
              </span>
            </span>
            <span className="hero-line md:ml-[8vw]">
              <span
                className="font-serif-display italic font-normal lowercase text-accent"
                style={{ "--line-delay": "0.4s" } as React.CSSProperties}
              >
                {isBasque ? "indarra & grazia" : "fuerza & gracia"}
              </span>
            </span>
          </h1>

          <p className="hero-line mt-10 max-w-md text-base leading-relaxed text-white/60 md:ml-[8vw] md:text-xl">
            <span style={{ "--line-delay": "0.6s" } as React.CSSProperties}>
              {t("subtitle")}
            </span>
          </p>
        </div>
      </section>

      {/* ============ 01 — FOUNDERS PHOTO, asymmetric bleed ============ */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 items-end gap-y-12 md:gap-x-10">
            <div className="col-span-12 md:col-span-4">
              <ScrollReveal variant="slide-left">
                <p className="text-sm font-medium uppercase tracking-[0.32em] text-accent">
                  01 — {isBasque ? "Gure espazioa" : "Nuestro espacio"}
                </p>
                <h2 className="mt-6 font-heading text-3xl font-bold uppercase leading-tight text-foreground md:text-4xl">
                  Bitan<span className="text-accent">Bat</span>
                </h2>
                <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted-foreground">
                  {isBasque
                    ? "Mugimendua, komunitatea eta zaintza leku berean. Bi ahots, asmo bakarra."
                    : "Movimiento, comunidad y cuidado en un mismo lugar. Dos voces, una sola intención."}
                </p>

                <div className="mt-10 grid gap-4 border-t border-accent/40 pt-6 text-sm">
                  <p className="flex items-center gap-3 text-muted-foreground">
                    <MapPin size={16} className="shrink-0 text-accent" />
                    {SITE_CONFIG.location}
                  </p>
                  <p className="flex items-center gap-3 text-muted-foreground">
                    <Phone size={16} className="shrink-0 text-accent" />
                    {SITE_CONFIG.phoneFormatted}
                  </p>
                  <a
                    href={SITE_CONFIG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-accent"
                  >
                    <Instagram size={16} className="shrink-0 text-accent" />
                    {SITE_CONFIG.instagramHandle}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <div className="col-span-12 md:col-span-8 md:-mr-[6vw]">
              <ScrollReveal variant="slide-right">
                <figure>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                    <Image
                      src="/media/instagram/DJJhZLJtVmm.jpg"
                      alt="BitanBat Dantza & Fitness - Fundadoras"
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-4 border-t border-accent/40 pt-4">
                    <span className="text-xs font-medium uppercase tracking-[0.32em] text-accent">
                      {isBasque ? "Sortzaileak" : "Las fundadoras"}
                    </span>
                    <span className="font-serif-display text-lg italic lowercase text-muted-foreground">
                      {isBasque ? "bi, bat balira bezala" : "dos que se mueven como una"}
                    </span>
                  </figcaption>
                </figure>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 02 — HISTORY, oversized statement ============ */}
      <section className="relative overflow-hidden bg-background pb-20 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-accent/40 pt-12 md:pt-16">
            <ScrollReveal>
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-accent">
                02 — {isBasque ? "Gure historia" : "Nuestra historia"}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="mt-10 max-w-5xl font-heading text-3xl font-bold leading-[1.15] text-foreground md:ml-[8vw] md:text-5xl">
                {isBasque ? (
                  <>
                    <span className="font-serif-display italic font-normal lowercase text-accent">
                      dantza
                    </span>{" "}
                    eta fitness zentroa gara Hernanin, eta{" "}
                    <span className="font-serif-display italic font-normal lowercase text-accent">
                      mugimenduarekiko
                    </span>{" "}
                    pasioak elkartzen gaitu — adin eta maila guztietarako
                    klaseak, teilatu beraren azpian.
                  </>
                ) : (
                  <>
                    Somos un centro de{" "}
                    <span className="font-serif-display italic font-normal lowercase text-accent">
                      danza
                    </span>{" "}
                    y fitness en Hernani donde la{" "}
                    <span className="font-serif-display italic font-normal lowercase text-accent">
                      pasión
                    </span>{" "}
                    por el movimiento nos une — clases para todas las edades y
                    niveles, bajo un mismo techo.
                  </>
                )}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ 03 — VALUES, numbered editorial list ============ */}
      <section className="relative overflow-hidden bg-background pb-24 md:pb-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-0 select-none font-heading font-bold uppercase text-display-xl text-outline-dark opacity-50"
        >
          Bat
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.32em] text-accent">
              03 — {isBasque ? "Gure balioak" : "Nuestros valores"}
            </p>
          </ScrollReveal>

          <div>
            {values.map((value, i) => (
              <ScrollReveal key={value.number} delay={i * 0.1}>
                <div className="group grid grid-cols-12 items-baseline gap-y-4 border-t border-accent/40 py-8 transition-colors duration-500 md:gap-x-8 md:py-12">
                  <span className="col-span-2 text-sm font-medium tracking-[0.2em] text-accent md:col-span-1">
                    {value.number}
                  </span>
                  <h3 className="col-span-10 md:col-span-5">
                    <span className="block font-heading font-bold uppercase text-display-md text-foreground transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                      {value.title}
                    </span>
                    <span className="mt-1 block font-serif-display text-xl italic lowercase text-accent md:text-2xl">
                      {value.accent}
                    </span>
                  </h3>
                  <p className="col-span-12 max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8">
                    {value.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-accent/40" />
          </div>
        </div>
      </section>

      {/* ============ 04 — COMMUNITY + TESTIMONIALS, dark cinematic ============ */}
      <section className="relative overflow-hidden bg-primary py-24 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.12),transparent_36%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 bottom-10 select-none font-heading font-bold uppercase text-display-xl text-outline opacity-30"
        >
          Familia
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
            <div className="col-span-12 md:col-span-5">
              <ScrollReveal>
                <p className="text-sm font-medium uppercase tracking-[0.32em] text-accent">
                  04 — {isBasque ? "Komunitatea" : "Comunidad"}
                </p>
                <h2 className="mt-6 font-heading font-bold uppercase text-display-md text-white">
                  {t("communityTitle")}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
                  {t("communitySubtitle")}
                </p>
              </ScrollReveal>
            </div>

            <div className="col-span-12 md:col-span-7 md:-mr-[6vw]">
              <ScrollReveal variant="slide-right" delay={0.15}>
                <VideoPlayer
                  src="/media/instagram/DM0z5uHNGa5.mp4"
                  poster="/media/instagram/DM0z5uHNGa5.jpg"
                />
              </ScrollReveal>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-24 border-t border-accent/40 pt-12 md:mt-32 md:pt-16">
            <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
              <div className="col-span-12 md:col-span-4">
                <ScrollReveal>
                  <p className="text-sm font-medium uppercase tracking-[0.32em] text-accent">
                    {isBasque ? "Testigantzak" : "Testimonios"}
                  </p>
                  <h2 className="mt-6 font-heading text-3xl font-bold uppercase leading-tight text-white md:text-5xl">
                    {t("testimonialsTitle")}
                  </h2>
                  <p className="mt-6 max-w-sm text-base leading-relaxed text-white/60 md:text-lg">
                    {t("testimonialsSubtitle")}
                  </p>
                </ScrollReveal>
              </div>

              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
                  <ScrollReveal delay={0.1}>
                    <VideoPlayer
                      src="/media/instagram/DS28hFZDNUA.mp4"
                      poster="/media/instagram/DS28hFZDNUA.jpg"
                    />
                  </ScrollReveal>
                  <ScrollReveal delay={0.22} className="md:mt-16">
                    <VideoPlayer
                      src="/media/instagram/DSz35eLDIio.mp4"
                      poster="/media/instagram/DSz35eLDIio.jpg"
                    />
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA — light, left-anchored ============ */}
      <section className="relative overflow-hidden bg-background py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-accent">
              {isBasque ? "Prest gaude" : "Estamos listos"}
            </p>
          </ScrollReveal>

          <h2 className="mt-8 font-heading font-bold text-foreground text-display-lg">
            <ScrollReveal>
              <span className="block uppercase">
                {isBasque ? "Hurrengo" : "El siguiente"}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <span className="block md:ml-[8vw]">
                <span className="font-serif-display italic font-normal lowercase text-accent">
                  {isBasque ? "pausoa" : "paso"}
                </span>
              </span>
            </ScrollReveal>
          </h2>

          <div className="mt-12 grid grid-cols-12 gap-y-8 md:gap-x-10">
            <div className="col-span-12 md:col-span-5 md:col-start-4">
              <ScrollReveal delay={0.2}>
                <p className="border-l-2 border-accent pl-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {isBasque
                    ? "Helarazi zure ideia eta guk erantzun, antolatu eta gidatuko zaitugu."
                    : "Cuéntanos tu idea y nosotros te responderemos, organizaremos y te guiaremos."}
                </p>
              </ScrollReveal>
            </div>
            <div className="col-span-12 flex items-end md:col-span-3 md:col-start-10">
              <ScrollReveal delay={0.3}>
                <Button href="/contacto">
                  {tHome("ctaButton")}
                  <ArrowUpRight size={18} />
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
