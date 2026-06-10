"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoPlayer from "@/components/ui/VideoPlayer";
import Button from "@/components/ui/Button";

const treatments = [
  {
    id: "ventosas",
    image: "/media/bitanbat/massage-treatment.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "drenajelinfatico",
    image: "/media/bitanbat/massage-treatment.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "reflexologia",
    image: "/media/bitanbat/massage-treatment.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "descontracturante",
    image: "/media/bitanbat/massage-treatment.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "relajante",
    image: "/media/bitanbat/massage-treatment.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "maderoterapia",
    image: "/media/bitanbat/massage-treatment.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "craneo",
    image: "/media/bitanbat/massage-treatment.jpg",
    price: "40",
    memberPrice: "35",
  },
  {
    id: "bitanbat",
    image: "/media/bitanbat/massage-treatment.jpg",
    price: "65",
    memberPrice: "60",
    duration: "90 min",
    featured: true,
  },
];

/* Staggered offsets for the experience stats */
const STAT_OFFSETS = ["", "sm:mt-8", "sm:mt-16"] as const;

export default function MasajesPage() {
  const t = useTranslations("Massage");
  const tCommon = useTranslations("Common");
  const locale = useLocale();

  const regularTreatments = treatments.filter((tr) => !tr.featured);
  const premium =
    treatments.find((tr) => tr.featured) ?? treatments[treatments.length - 1];

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
      {/* ── HERO — editorial, bleeding image ───────────── */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.14),transparent_38%)]" />
        <p
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-6 left-[-2vw] whitespace-nowrap font-heading font-bold uppercase text-display-xl text-outline opacity-40"
        >
          {locale === "eu" ? "Ongizatea" : "Bienestar"}
        </p>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">
            <div className="col-span-12 md:col-span-7">
              <p className="hero-line mb-6 text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
                <span style={{ "--line-delay": "0.1s" } as React.CSSProperties}>
                  {locale === "eu" ? "Zure momentua" : "Tu momento"}
                </span>
              </p>

              <h1 className="font-heading font-bold text-white">
                <span className="hero-line">
                  <span
                    className="block uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em]"
                    style={{ "--line-delay": "0.25s" } as React.CSSProperties}
                  >
                    {t("title")}
                  </span>
                </span>
                <span className="hero-line mt-4 md:ml-[6vw]">
                  <span
                    className="block font-serif-display italic font-normal lowercase leading-[1.1] text-accent text-3xl md:text-5xl"
                    style={{ "--line-delay": "0.4s" } as React.CSSProperties}
                  >
                    {t("subtitle")}
                  </span>
                </span>
              </h1>

              <div className="hero-line mt-12 md:mt-16">
                <span
                  className="flex flex-wrap gap-x-10 gap-y-3 border-t border-accent/40 pt-6 font-heading text-xs uppercase tracking-[0.2em] text-white/50 md:text-sm"
                  style={{ "--line-delay": "0.6s" } as React.CSSProperties}
                >
                  <span>
                    <span className="text-accent/70">08</span>{" "}
                    {locale === "eu" ? "Tratamendu" : "Tratamientos"}
                  </span>
                  <span>60–90 min</span>
                  <span>Hernani</span>
                </span>
              </div>
            </div>

            {/* Bleeding image — escapes the container to the right */}
            <div className="col-span-12 md:col-span-5">
              <ScrollReveal delay={0.35}>
                <div className="group relative md:mt-10">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:w-[calc(100%+9vw)] md:rounded-r-none">
                    <Image
                      src="/media/bitanbat/massage-treatment.jpg"
                      alt={t("title")}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
                    <div className="absolute right-4 top-4 rounded-full border border-accent/40 bg-primary/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
                      Wellness
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO — typographic chapter ────────────────── */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">
            <div className="col-span-12 md:col-span-7">
              <ScrollReveal>
                <p className="mb-6 text-sm uppercase tracking-[0.32em] text-accent font-medium">
                  {locale === "eu" ? "Masajeak & Tratamenduak" : "Masajes & Tratamientos"}
                </p>
                <h2 className="font-heading font-bold uppercase text-foreground text-display-md">
                  {t("introTitle")}
                </h2>
              </ScrollReveal>

              <div className="mt-12 grid gap-6 sm:grid-cols-3 md:mt-20">
                {experiencePoints.map((point, i) => (
                  <ScrollReveal key={point.value} delay={0.2 + i * 0.08}>
                    <div className={`border-t border-accent/40 pt-5 ${STAT_OFFSETS[i]}`}>
                      <p className="font-heading text-2xl font-bold text-foreground">
                        {point.value}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {point.label}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 md:col-start-9 md:mt-24">
              <ScrollReveal delay={0.15}>
                <div className="space-y-6 border-l-2 border-accent pl-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {t("introText")}
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {t("introText2")}
                  </p>
                </div>
                <div className="mt-10">
                  <Button
                    href={SITE_CONFIG.whatsapp}
                    external
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    <Phone size={18} />
                    {locale === "eu" ? "Erreserbatu" : "Reservar cita"}
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── TREATMENTS — numbered editorial list 01-07 ── */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
            <ScrollReveal>
              <p className="mb-5 text-sm uppercase tracking-[0.32em] text-accent font-medium">
                {locale === "eu" ? "Tratamenduak" : "Tratamientos"}
              </p>
              <h2 className="font-heading font-bold uppercase text-white text-display-md">
                {t("treatmentsTitle")}
              </h2>
              <p className="mt-5 max-w-xl text-base text-white/60 md:text-lg">
                {t("treatmentsSubtitle")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <Link
                href="/precios"
                className="group inline-flex items-center gap-2 border-b border-accent/50 pb-1 font-heading text-sm uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-accent"
              >
                {locale === "eu" ? "Tarifak ikusi" : "Ver tarifas completas"}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </ScrollReveal>
          </div>

          <div>
            {regularTreatments.map((treatment, i) => (
              <ScrollReveal key={treatment.id} delay={Math.min(i * 0.05, 0.2)}>
                <div className="group grid grid-cols-12 items-start gap-x-4 gap-y-3 border-t border-white/10 py-7 transition-colors duration-500 hover:border-accent/60 md:py-9">
                  <span className="col-span-2 pt-1 font-heading text-xs font-semibold tracking-[0.2em] text-white/35 transition-colors duration-500 group-hover:text-accent md:col-span-1 md:text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="col-span-10 font-heading text-xl font-bold uppercase text-white transition-colors duration-500 group-hover:text-accent sm:text-2xl md:col-span-5 md:text-3xl">
                    {t(`${treatment.id}Name`)}
                  </h3>
                  <p className="col-span-10 col-start-3 text-sm leading-relaxed text-white/55 md:col-span-4 md:col-start-auto md:pt-1.5">
                    {t(`${treatment.id}Desc`)}
                  </p>
                  <div className="col-span-10 col-start-3 md:col-span-2 md:col-start-auto md:text-right">
                    <p className="font-serif-display italic text-3xl leading-none text-accent md:text-4xl">
                      {treatment.price}€
                    </p>
                    <p className="mt-2 text-xs text-white/50">
                      {t("memberPrice")}:{" "}
                      <span className="font-semibold text-white/85">
                        {treatment.memberPrice}€
                      </span>
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ── 08 MASAJE BITANBAT — premium feature ───────── */}
      <section className="relative overflow-hidden border-y border-accent/40 bg-[#16110A] py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,110,0.18),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 items-center gap-y-12 md:gap-x-10">
            <div className="col-span-12 md:col-span-7">
              <ScrollReveal>
                <div className="flex flex-wrap items-center gap-5">
                  <span className="font-heading text-sm font-semibold tracking-[0.2em] text-accent">
                    08
                  </span>
                  <span className="inline-flex items-center rounded-full border border-accent/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
                    {tCommon("premium")}
                  </span>
                </div>
                <h2 className="mt-8 font-heading font-bold uppercase text-white text-display-md">
                  {t("bitanbatName")}
                </h2>
                <p className="mt-3 font-serif-display italic text-2xl lowercase text-accent md:ml-[4vw] md:text-3xl">
                  {premium.duration}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
                  {t("bitanbatDesc")}
                </p>
                <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6">
                  <p className="leading-none">
                    <span className="font-heading text-6xl font-bold text-white md:text-7xl">
                      {premium.price}
                    </span>
                    <span className="ml-1 font-serif-display italic text-4xl text-accent">
                      €
                    </span>
                  </p>
                  <p className="pb-1 text-sm text-white/55">
                    {t("memberPrice")}:{" "}
                    <span className="font-semibold text-accent">
                      {premium.memberPrice}€
                    </span>
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="col-span-12 md:col-span-5">
              <ScrollReveal delay={0.2}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={premium.image}
                    alt={t("bitanbatName")}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16110A]/60 via-transparent to-transparent" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPACE — video showcase ─────────────────────── */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 grid grid-cols-12 gap-y-8 md:mb-20">
            <div className="col-span-12 md:col-span-7">
              <ScrollReveal>
                <p className="mb-5 text-sm uppercase tracking-[0.32em] text-accent font-medium">
                  {locale === "eu" ? "Gure espazioa" : "Nuestro espacio"}
                </p>
                <h2 className="font-heading font-bold uppercase text-foreground text-display-md">
                  {t("spaceTitle")}
                </h2>
              </ScrollReveal>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 md:self-end">
              <ScrollReveal delay={0.15}>
                <p className="border-l-2 border-accent pl-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {spaceNote}
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <ScrollReveal>
              <VideoPlayer
                src="/media/instagram/DUDUHlZjPlW.mp4"
                poster="/media/instagram/DUDUHlZjPlW.jpg"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.12} className="sm:mt-12">
              <VideoPlayer
                src="/media/instagram/DWMe9ngjCSl.mp4"
                poster="/media/instagram/DWMe9ngjCSl.jpg"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── GIFT CARD — final serif band ───────────────── */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-32">
        <p
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-4 right-[-2vw] whitespace-nowrap font-heading font-bold uppercase text-display-xl text-outline opacity-40"
        >
          {locale === "eu" ? "Oparitu" : "Regala"}
        </p>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 items-center gap-y-12 md:gap-x-10">
            <div className="col-span-12 md:col-span-5">
              <ScrollReveal variant="slide-left">
                <div className="group relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/media/bitanbat/massage-gift.jpg"
                    alt="Opari Txartela - Tarjeta regalo"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                </div>
              </ScrollReveal>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <ScrollReveal variant="slide-right">
                <p className="text-sm uppercase tracking-[0.32em] text-accent font-medium">
                  {locale === "eu" ? "Opari ezin hobea" : "El regalo perfecto"}
                </p>
                <h2 className="mt-6 text-display-md">
                  <span className="font-serif-display italic font-normal lowercase text-accent">
                    {t("giftTitle")}
                  </span>
                </h2>
                <p className="mt-8 max-w-lg border-t border-accent/40 pt-8 text-base leading-relaxed text-white/65 md:text-lg">
                  {t("giftText")}
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button
                    href={SITE_CONFIG.whatsapp}
                    external
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    <Phone size={18} />
                    {SITE_CONFIG.phoneFormatted}
                  </Button>
                  <Button
                    href="/contacto"
                    variant="secondary"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    {locale === "eu" ? "Kontaktatu" : "Contactar"}
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
