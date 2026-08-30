/**
 * Tarifas de la web. Se guardan como un único documento JSON en la tabla
 * `prices` (fila con name_es = TARIFAS_CLAVE, columna `features`), editable
 * desde el panel. Si no existe la fila se usan los valores por defecto.
 *
 * Este módulo no importa nada de servidor: lo usan también los componentes
 * cliente del panel.
 */

export interface TarifaFila {
  es: string;
  eu: string;
  detalleEs: string;
  detalleEu: string;
  precio: number;
}

export type TarifaFormato = "tabla" | "corta";

export interface TarifaSeccion {
  key: string;
  /** "tabla": ancho completo con columna de detalle; "corta": tarjeta a media anchura */
  formato: TarifaFormato;
  tituloEs: string;
  tituloEu: string;
  subEs: string;
  subEu: string;
  colEs: string;
  colEu: string;
  filas: TarifaFila[];
}

export interface TarifasMasajes {
  precio: number;
  precioUsuarios: number;
  premiumPrecio: number;
  premiumPrecioUsuarios: number;
}

export interface Tarifas {
  secciones: TarifaSeccion[];
  sueltaPrecio: number;
  sueltaTextoEs: string;
  sueltaTextoEu: string;
  notaEs: string;
  notaEu: string;
  masajes: TarifasMasajes;
}

export const TARIFAS_CLAVE = "tarifas";

export const TARIFAS_POR_DEFECTO: Tarifas = {
  secciones: [
    {
      key: "dantza-txiki",
      formato: "tabla",
      tituloEs: "Dantza · Infantil y juvenil",
      tituloEu: "Dantza · Haurrak eta gaztiak",
      subEs: "",
      subEu: "",
      colEs: "Duración semanal",
      colEu: "Asteko iraupena",
      filas: [
        { es: "Predantza", eu: "Predantza", detalleEs: "1 hora a la semana", detalleEu: "Ordu 1 astean", precio: 35 },
        { es: "Urbano (infantil)", eu: "Urbano (haurrak)", detalleEs: "1 hora a la semana", detalleEu: "Ordu 1 astean", precio: 38 },
        { es: "Urbano intentsiboa", eu: "Urbano intentsiboa", detalleEs: "1 h 15 min a la semana", detalleEu: "1 h 15 min astean", precio: 42 },
      ],
    },
    {
      key: "dantza-helduak",
      formato: "tabla",
      tituloEs: "Dantza generala · Adultos",
      tituloEu: "Dantza generala · Helduak",
      subEs: "Salsa, bachata, sevillanas, FitGipsy… Packs combinables entre disciplinas de adultos",
      subEu: "Salsa, bachata, sevillanak, FitGipsy… Helduen diziplinen artean konbina daitezkeen packak",
      colEs: "Descripción",
      colEu: "Deskribapena",
      filas: [
        { es: "1 hora a la semana", eu: "Ordu 1 astean", detalleEs: "Clase de 1 hora semanal (ej. salsa, bachata o sevillanas)", detalleEu: "Asteko ordu 1eko klasea (adib. salsa, bachata edo sevillanak)", precio: 40 },
        { es: "1,5 horas a la semana", eu: "1,5 ordu astean", detalleEs: "Clase intensiva de 1 hora y 30 minutos", detalleEu: "Ordu 1 eta 30 minutuko klase intentsiboa", precio: 48 },
        { es: "2 horas a la semana (Pack 2)", eu: "2 ordu astean (2. packa)", detalleEs: "Combo de 2 clases semanales de 1 hora", detalleEu: "Asteko ordu 1eko 2 klaseren konboa", precio: 70 },
        { es: "2,5 horas a la semana", eu: "2,5 ordu astean", detalleEs: "1 clase de 1,5 h + 1 clase de 1 h", detalleEu: "1,5 orduko klase 1 + ordu 1eko klase 1", precio: 75 },
        { es: "3 horas a la semana (Pack 3)", eu: "3 ordu astean (3. packa)", detalleEs: "Combo de 3 clases semanales de 1 hora", detalleEu: "Asteko ordu 1eko 3 klaseren konboa", precio: 85 },
      ],
    },
    {
      key: "fitness-app",
      formato: "tabla",
      tituloEs: "Fitness con App",
      tituloEu: "Fitness Appekin",
      subEs: "BarreFit, Pilates, Fusión & Ritmo, Funcional… Reservas flexibles mediante la aplicación móvil",
      subEu: "BarreFit, Pilates, Fusión & Ritmo, Funtzionala… Erreserba malguak aplikazio mugikorraren bidez",
      colEs: "",
      colEu: "",
      filas: [
        { es: "4 clases al mes", eu: "4 klase hilean", detalleEs: "", detalleEu: "", precio: 40 },
        { es: "6 clases al mes", eu: "6 klase hilean", detalleEs: "", detalleEu: "", precio: 51 },
        { es: "8 clases al mes", eu: "8 klase hilean", detalleEs: "", detalleEu: "", precio: 58 },
        { es: "12 clases al mes", eu: "12 klase hilean", detalleEs: "", detalleEu: "", precio: 69 },
        { es: "Clases ilimitadas", eu: "Klase mugagabeak", detalleEs: "", detalleEu: "", precio: 90 },
      ],
    },
    {
      key: "fitness-bereziak",
      formato: "corta",
      tituloEs: "Fitness bereziak",
      tituloEu: "Fitness bereziak",
      subEs: "Clases fijas, independientes de la App",
      subEu: "Klase finkoak, Appetik kanpo",
      colEs: "",
      colEu: "",
      filas: [
        { es: "Bungee", eu: "Bungee", detalleEs: "", detalleEu: "", precio: 40 },
        { es: "Total Body", eu: "Total Body", detalleEs: "", detalleEu: "", precio: 58 },
      ],
    },
    {
      key: "yoga",
      formato: "corta",
      tituloEs: "Yoga",
      tituloEu: "Yoga",
      subEs: "",
      subEu: "",
      colEs: "",
      colEu: "",
      filas: [
        { es: "Público general", eu: "Publiko orokorra", detalleEs: "", detalleEu: "", precio: 42 },
        { es: "Ikasleak / Alumnos", eu: "Ikasleak", detalleEs: "", detalleEu: "", precio: 38 },
      ],
    },
  ],
  sueltaPrecio: 12,
  sueltaTextoEs:
    "Disponible para cualquier persona: no hace falta usar la App ni tener un bono. Válida para todas las disciplinas y clases de la escuela: danza, fitness, bungee, total body, yoga… Es una clase puntual, sin compromiso ni matrícula.",
  sueltaTextoEu:
    "Edonorentzat eskuragarri: ez da beharrezkoa Appa erabiltzea ez bonurik izatea. Eskolako diziplina eta klase guztietarako balio du: dantza, fitness, bungee, total body, yoga… Klase puntuala da, konpromisorik eta matrikularik gabe.",
  notaEs:
    "Las cuotas son mensuales. Las reservas de Fitness se gestionan mediante la aplicación móvil.",
  notaEu:
    "Kuotak hilabetekoak dira. Fitness klaseen erreserbak aplikazio mugikorraren bidez kudeatzen dira.",
  masajes: {
    precio: 40,
    precioUsuarios: 35,
    premiumPrecio: 65,
    premiumPrecioUsuarios: 60,
  },
};

const MAX_SECCIONES = 12;
const MAX_FILAS = 20;

type Obj = Record<string, unknown>;

function obj(v: unknown): Obj {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : {};
}

function txt(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function num(v: unknown, porDefecto: number) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : porDefecto;
}

/** Devuelve un documento con la forma correcta pase lo que pase con la entrada. */
export function normalizarTarifas(raw: unknown): Tarifas {
  const d = TARIFAS_POR_DEFECTO;
  const r = obj(raw);

  const seccionesRaw = Array.isArray(r.secciones) ? r.secciones : d.secciones;
  const secciones: TarifaSeccion[] = seccionesRaw
    .slice(0, MAX_SECCIONES)
    .map((s, i): TarifaSeccion => {
      const o = obj(s);
      const filasRaw = Array.isArray(o.filas) ? o.filas : [];
      return {
        key: txt(o.key, 40) || `seccion-${i + 1}`,
        formato: o.formato === "corta" ? "corta" : "tabla",
        tituloEs: txt(o.tituloEs, 80),
        tituloEu: txt(o.tituloEu, 80),
        subEs: txt(o.subEs, 200),
        subEu: txt(o.subEu, 200),
        colEs: txt(o.colEs, 40),
        colEu: txt(o.colEu, 40),
        filas: filasRaw
          .slice(0, MAX_FILAS)
          .map((f): TarifaFila => {
            const x = obj(f);
            return {
              es: txt(x.es, 80),
              eu: txt(x.eu, 80),
              detalleEs: txt(x.detalleEs, 120),
              detalleEu: txt(x.detalleEu, 120),
              precio: num(x.precio, 0),
            };
          })
          .filter((f) => f.es || f.eu),
      };
    })
    .filter((s) => s.tituloEs || s.tituloEu || s.filas.length > 0);

  const m = obj(r.masajes);
  return {
    secciones,
    sueltaPrecio: num(r.sueltaPrecio, d.sueltaPrecio),
    sueltaTextoEs: "sueltaTextoEs" in r ? txt(r.sueltaTextoEs, 400) : d.sueltaTextoEs,
    sueltaTextoEu: "sueltaTextoEu" in r ? txt(r.sueltaTextoEu, 400) : d.sueltaTextoEu,
    notaEs: "notaEs" in r ? txt(r.notaEs, 300) : d.notaEs,
    notaEu: "notaEu" in r ? txt(r.notaEu, 300) : d.notaEu,
    masajes: {
      precio: num(m.precio, d.masajes.precio),
      precioUsuarios: num(m.precioUsuarios, d.masajes.precioUsuarios),
      premiumPrecio: num(m.premiumPrecio, d.masajes.premiumPrecio),
      premiumPrecioUsuarios: num(m.premiumPrecioUsuarios, d.masajes.premiumPrecioUsuarios),
    },
  };
}

/** Formatea un precio sin decimales innecesarios (40 → "40", 42.5 → "42,50"). */
export function formatearPrecio(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ",");
}
