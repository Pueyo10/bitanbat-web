"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  Dumbbell,
  Music,
  Heart,
  Baby,
  MapPin,
  Sparkles,
} from "lucide-react";

const classHighlights = [
  {
    icon: Dumbbell,
    nameEs: "Entrenamiento Funcional",
    nameEu: "Entrenamendu Funtzionala",
    descEs: "Mejora tu fuerza y resistencia con ejercicios funcionales adaptados a todos los niveles.",
    descEu: "Hobetu zure indarra eta erresistentzia maila guztietara egokitutako ariketa funtzionalekin.",
    color: "#FFEB3B",
  },
  {
    icon: Heart,
    nameEs: "Pilates & Barrefit",
    nameEu: "Pilates & Barrefit",
    descEs: "Trabaja la flexibilidad, el equilibrio y el core con nuestras clases de pilates y barrefit.",
    descEu: "Landu malgutasuna, oreka eta core-a gure pilates eta barrefit klaseetan.",
    color: "#4CAF50",
  },
  {
    icon: Music,
    nameEs: "Danza",
    nameEu: "Dantza",
    descEs: "Sevillanas, bachata, salsa, urbano, zumba... encuentra tu estilo y disfruta bailando.",
    descEu: "Sevillanoak, bachata, salsa, urbanoa, zumba... aurkitu zure estiloa eta gozatu dantzatzen.",
    color: "#E91E63",
  },
  {
    icon: Baby,
    nameEs: "Infantil",
    nameEu: "Haurrak",
    descEs: "Clases de predantza, funcional y urbano para los más pequeños (desde 3 años).",
    descEu: "Predantza, funtzional eta urbano klaseak txikienentzat (3 urtetik aurrera).",
    color: "#FF9800",
  },
  {
    icon: Sparkles,
    nameEs: "Bungee & Jumping",
    nameEu: "Bungee & Jumping",
    descEs: "Vive la experiencia del bungee fitness y jumping: diversión y resultados garantizados.",
    descEu: "Bizi bungee fitness eta jumping esperientzia: dibertigarria eta emaitza ziurrak.",
    color: "#00BCD4",
  },
  {
    icon: MapPin,
    nameEs: "2 Locales",
    nameEu: "2 Lokal",
    descEs: "Dos espacios dedicados en Hernani para que encuentres la clase perfecta para ti.",
    descEu: "Bi gune dedikatu Hernanin klase perfektua aurkitu dezazun.",
    color: "#C9A96E",
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
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-accent/30"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon size={24} style={{ color: item.color }} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.nameEs}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.descEs}
              </p>
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
