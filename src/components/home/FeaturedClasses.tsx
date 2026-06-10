"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

const classHighlights = [
  {
    nameEs: "Entrenamiento Funcional",
    nameEu: "Entrenamendu Funtzionala",
    descEs: "Fuerza, resistencia y resultados. Adaptado a todos los niveles.",
    descEu: "Indarra, erresistentzia eta emaitzak. Maila guztietara egokitua.",
    image: "/media/bitanbat/functional-training.jpg",
  },
  {
    nameEs: "Bachata",
    nameEu: "Bachata",
    descEs: "Clases desde iniciacion hasta nivel intermedio/avanzado.",
    descEu: "Hasieratik maila ertain/aurreratura arteko klaseak.",
    image: "/media/bitanbat/bachata-couple.jpg",
  },
  {
    nameEs: "Bungee",
    nameEu: "Bungee",
    descEs: "Fitness con arnes de bungee. Una experiencia unica de entrenamiento.",
    descEu: "Bungee arnesarekin fitnessa. Entrenamendu esperientzia berezia.",
    image: "/media/bitanbat/bungee-class.jpg",
  },
  {
    nameEs: "Barrefit",
    nameEu: "Barrefit",
    descEs: "Combina ballet, pilates y fitness para un cuerpo tonificado.",
    descEu: "Baleta, pilatesa eta fitnessa uztartzen dituen klasea.",
    image: "/media/bitanbat/barrefit-class.jpg",
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
    image: "/media/bitanbat/predantza-class.jpg",
  },
];

export default function FeaturedClasses() {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16 md:mb-20">
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
            {locale === "eu" ? "Diziplinak" : "Disciplinas"}
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground">
            {t("featuredTitle")}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {classHighlights.map((item, i) => (
            <ScrollReveal key={item.nameEs} delay={i * 0.08}>
              <Link
                href="/clases"
                className="group relative block aspect-[4/3] overflow-hidden rounded-lg cursor-pointer sm:aspect-[3/4] lg:aspect-[4/5]"
              >
                <Image
                  src={item.image}
                  alt={locale === "eu" ? item.nameEu : item.nameEs}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  <h3 className="font-heading text-xl md:text-3xl font-bold text-white mb-2">
                    {locale === "eu" ? item.nameEu : item.nameEs}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base max-w-md">
                    {locale === "eu" ? item.descEu : item.descEs}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-16">
          <Link
            href="/clases"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-heading font-semibold text-lg rounded-full hover:bg-white/90 hover:shadow-xl transition-all duration-300"
          >
            {locale === "eu" ? "Klase guztiak ikusi" : "Ver todas las clases"}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
