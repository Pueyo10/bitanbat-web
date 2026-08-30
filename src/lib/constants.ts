// Pantalla de "web en construcción": ponlo en false para abrir la web
export const CONSTRUCTION_MODE = false;

// Filas de la tabla classes que no son clases de cara al publico:
// no se muestran como tarjeta en /clases aunque tengan horario.
export const CLASSES_HIDDEN_FROM_LIST: readonly string[] = ["masajes", "open"];

export const SITE_CONFIG = {
  name: "BitanBat",
  fullName: "BitanBat - Dantza & Fitness",
  phone: "747436503",
  phoneFormatted: "747 436 503",
  whatsapp: "https://wa.me/34747436503",
  location: "Hernani, Gipuzkoa",
  // Ficha de Google Business (CID): abre la ubicacion en Google Maps
  maps: "https://maps.google.com/?cid=5199943363790475113",
  instagram: "https://www.instagram.com/bitanbat_/",
  instagramHandle: "@bitanbat_",
} as const;

export const DAYS_ES = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
] as const;

export const DAYS_EU = [
  "Astelehena",
  "Asteartea",
  "Asteazkena",
  "Osteguna",
  "Ostirala",
] as const;

export const CLASS_COLORS: Record<string, string> = {
  "entrenamiento-funcional": "#FFEB3B",
  "e-funcional-txikiak": "#FFEB3B",
  "e-funcional-txiki": "#FFEB3B",
  sevillanas: "#E91E63",
  fitgipsy: "#9C27B0",
  predantza: "#FF9800",
  zumba: "#FFEB3B",
  bungee: "#00BCD4",
  urbano: "#9C27B0",
  bachata: "#E91E63",
  salsa: "#FF5722",
  pilates: "#4CAF50",
  barrefit: "#4CAF50",
  yoga: "#8BC34A",
  jumping: "#00BCD4",
  masajes: "#795548",
} as const;

export const SCHEDULE_HOURS = [
  "09:00", "09:30", "10:00", "10:30", "10:45", "11:00", "11:30",
  "13:00", "13:30",
  "15:00", "16:00", "17:00", "18:00", "18:05", "18:15", "18:30",
  "19:00", "19:10", "19:15",
  "20:00", "20:15",
] as const;
