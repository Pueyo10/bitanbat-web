"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const classHighlights = [
  {
    nameEs: "Entrenamiento Funcional",
    nameEu: "Entrenamendu Funtzionala",
    descEs: "Fuerza, resistencia y resultados. Adaptado a todos los niveles.",
    descEu: "Indarra, erresistentzia eta emaitzak. Maila guztietara egokitua.",
    image: "/media/bitanbat/entrenamiento-funcional.jpg",
  },
  {
    nameEs: "Bachata",
    nameEu: "Bachata",
    descEs: "Clases desde iniciacion hasta nivel intermedio/avanzado.",
    descEu: "Hasieratik maila ertain/aurreratura arteko klaseak.",
    image: "/media/bitanbat/bachata.jpg",
  },
  {
    nameEs: "Bungee",
    nameEu: "Bungee",
    descEs: "Fitness con arnes de bungee. Una experiencia unica de entrenamiento.",
    descEu: "Bungee arnesarekin fitnessa. Entrenamendu esperientzia berezia.",
    image: "/media/bitanbat/bungee.jpg",
  },
  {
    nameEs: "Barrefit",
    nameEu: "Barrefit",
    descEs: "Combina ballet, pilates y fitness para un cuerpo tonificado.",
    descEu: "Baleta, pilatesa eta fitnessa uztartzen dituen klasea.",
    image: "/media/bitanbat/barrefit.jpg",
  },
  {
    nameEs: "Boxeo",
    nameEu: "Boxeoa",
    descEs: "Potencia, tecnica y descarga. Entrenamiento de cuerpo completo.",
    descEu: "Potentzia, teknika eta deskarga. Gorputz osoko entrenamendua.",
    image: "/media/bitanbat/boxing-class.jpg",
  },
  {
    nameEs: "Predantza",
    nameEu: "Predantza",
    descEs: "Iniciacion a la danza para los mas pequenos.",
    descEu: "Txikienentzako dantzarako hastapena.",
    image: "/media/bitanbat/predantza.jpg",
  },
];

// Editorial rhythm: wide / tall pairs, offset on alternating rows
const CARD_LAYOUT = [
  "md:col-span-7 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3] md:aspect-[3/4] md:mt-20",
  "md:col-span-5 aspect-[4/3] md:aspect-[3/4]",
  "md:col-span-7 aspect-[4/3] md:mt-20",
  "md:col-span-7 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3] md:aspect-[3/4] md:mt-20",
] as const;

export default function FeaturedClasses() {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <section className="bg-primary py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <ScrollReveal>
            <p className="text-accent text-sm tracking-[0.32em] uppercase font-medium mb-5">
              {locale === "eu" ? "Diziplinak" : "Disciplinas"}
            </p>
            <h2 className="font-heading font-bold text-white text-display-md">
              {t("featuredTitle")}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Link
              href="/clases"
              className="group inline-flex items-center gap-2 border-b border-accent/50 pb-1 font-heading text-sm uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-accent"
            >
              {locale === "eu" ? "Klase guztiak" : "Ver todas las clases"}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-12 md:gap-6">
          {classHighlights.map((item, i) => (
            <ScrollReveal
              key={item.nameEs}
              delay={(i % 2) * 0.12}
              className={CARD_LAYOUT[i]}
            >
              <Link
                href="/clases"
                className="group relative block h-full w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src={item.image}
                  alt={locale === "eu" ? item.nameEu : item.nameEs}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500" />

                <span className="absolute right-5 top-5 font-heading text-sm font-semibold tracking-[0.2em] text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="mb-2 flex items-center gap-3 font-heading text-2xl font-bold text-white md:text-3xl">
                    {locale === "eu" ? item.nameEu : item.nameEs}
                    <ArrowUpRight
                      size={22}
                      className="text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </h3>
                  <p className="max-w-md text-sm text-white/65 md:text-base">
                    {locale === "eu" ? item.descEu : item.descEs}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
