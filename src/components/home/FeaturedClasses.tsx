"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

const classHighlights = [
  {
    nameEs: "Entrenamiento Funcional",
    nameEu: "Entrenamendu Funtzionala",
    descEs:
      "Fuerza, resistencia y resultados. Adaptado a todos los niveles.",
    descEu:
      "Indarra, erresistentzia eta emaitzak. Maila guztietara egokitua.",
    image: "/media/instagram/DPyvmA2DMOz.jpg",
  },
  {
    nameEs: "Danza",
    nameEu: "Dantza",
    descEs:
      "Sevillanas, bachata, salsa, urbano, zumba... encuentra tu ritmo.",
    descEu:
      "Sevillanoak, bachata, salsa, urbanoa, zumba... aurkitu zure erritmoa.",
    image: "/media/instagram/DRkhijgjMzh.jpg",
  },
  {
    nameEs: "Bungee & Jumping",
    nameEu: "Bungee & Jumping",
    descEs: "Diversión en el aire. Una experiencia única con resultados reales.",
    descEu: "Dibertigarria airean. Esperientzia bakarra emaitza errealekin.",
    image: "/media/instagram/DQaCTUNjPo9.jpg",
  },
  {
    nameEs: "Pilates & Barrefit",
    nameEu: "Pilates & Barrefit",
    descEs: "Flexibilidad, equilibrio y core. Tu cuerpo te lo agradecerá.",
    descEu: "Malgutasuna, oreka eta core-a. Zure gorputzak eskertu egingo dizu.",
    image: "/media/instagram/DOeahntDL-l.jpg",
  },
  {
    nameEs: "Boxeo",
    nameEu: "Boxeoa",
    descEs: "Potencia, técnica y descarga. El mejor entrenamiento de cuerpo completo.",
    descEu: "Potentzia, teknika eta deskarga. Gorputz osoko entrenamendua.",
    image: "/media/instagram/CoX5o7xrQiU.jpg",
  },
  {
    nameEs: "Infantil",
    nameEu: "Haurrak",
    descEs: "Predantza, funcional y urbano para los más pequeños.",
    descEu: "Predantza, funtzional eta urbano txikienentzat.",
    image: "/media/instagram/DQr2HDKjIGL.jpg",
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
              <div className="group relative h-72 md:h-80 overflow-hidden rounded-lg cursor-pointer">
                <Image
                  src={item.image}
                  alt={locale === "eu" ? item.nameEu : item.nameEs}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                    {locale === "eu" ? item.nameEu : item.nameEs}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base max-w-md">
                    {locale === "eu" ? item.descEu : item.descEs}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-16">
          <Link
            href="/clases"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-heading font-semibold text-lg rounded-full hover:bg-secondary hover:scale-105 transition-all duration-300"
          >
            {locale === "eu" ? "Klase guztiak ikusi" : "Ver todas las clases"}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
