"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const classHighlights = [
  {
    nameEs: "Entrenamiento Funcional",
    nameEu: "Entrenamendu Funtzionala",
    descEs: "Mejora tu fuerza y resistencia con ejercicios funcionales adaptados a todos los niveles.",
    descEu: "Hobetu zure indarra eta erresistentzia maila guztietara egokitutako ariketa funtzionalekin.",
    color: "#FFEB3B",
    image: "/media/instagram/DPyvmA2DMOz.jpg",
  },
  {
    nameEs: "Pilates & Barrefit",
    nameEu: "Pilates & Barrefit",
    descEs: "Trabaja la flexibilidad, el equilibrio y el core con nuestras clases de pilates y barrefit.",
    descEu: "Landu malgutasuna, oreka eta core-a gure pilates eta barrefit klaseetan.",
    color: "#4CAF50",
    image: "/media/instagram/DOeahntDL-l.jpg",
  },
  {
    nameEs: "Danza",
    nameEu: "Dantza",
    descEs: "Sevillanas, bachata, salsa, urbano, zumba... encuentra tu estilo y disfruta bailando.",
    descEu: "Sevillanoak, bachata, salsa, urbanoa, zumba... aurkitu zure estiloa eta gozatu dantzatzen.",
    color: "#E91E63",
    image: "/media/instagram/DRkhijgjMzh.jpg",
  },
  {
    nameEs: "Infantil",
    nameEu: "Haurrak",
    descEs: "Clases de predantza, funcional y urbano para los mas pequenos (desde 3 anos).",
    descEu: "Predantza, funtzional eta urbano klaseak txikienentzat (3 urtetik aurrera).",
    color: "#FF9800",
    image: "/media/instagram/DQr2HDKjIGL.jpg",
  },
  {
    nameEs: "Bungee & Jumping",
    nameEu: "Bungee & Jumping",
    descEs: "Vive la experiencia del bungee fitness y jumping: diversion y resultados garantizados.",
    descEu: "Bizi bungee fitness eta jumping esperientzia: dibertigarria eta emaitza ziurrak.",
    color: "#00BCD4",
    image: "/media/instagram/DQaCTUNjPo9.jpg",
  },
  {
    nameEs: "Yoga & Wellness",
    nameEu: "Yoga & Wellness",
    descEs: "Yoga, masajes y bienestar. Conecta cuerpo y mente en un espacio dedicado a ti.",
    descEu: "Yoga, masajeak eta ongizatea. Konektatu gorputza eta adimena zuretzat dedikatutako espazio batean.",
    color: "#8BC34A",
    image: "/media/instagram/DUiBayBDNcI.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturedClasses() {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("featuredTitle")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("featuredSubtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {classHighlights.map((item) => (
            <motion.div
              key={item.nameEs}
              variants={itemVariants}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-accent/30"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={locale === "eu" ? item.nameEu : item.nameEs}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div
                  className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {locale === "eu" ? item.nameEu : item.nameEs}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {locale === "eu" ? item.nameEu : item.nameEs}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {locale === "eu" ? item.descEu : item.descEs}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/clases"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-secondary transition-colors"
          >
            {t("featuredTitle")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
