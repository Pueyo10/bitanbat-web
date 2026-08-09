import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Phone, Smartphone, Ticket, Users, Crown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

export const revalidate = 3600;

/* ── Datos: tarifas oficiales 2026-2027 ───────────────── */

type Fila = {
  es: string;
  eu: string;
  detalleEs?: string;
  detalleEu?: string;
  precio: number;
};

type Seccion = {
  key: string;
  tituloEs: string;
  tituloEu: string;
  subEs?: string;
  subEu?: string;
  colEs?: string;
  colEu?: string;
  filas: Fila[];
};

const SECCIONES: Seccion[] = [
  {
    key: "dantza-txiki",
    tituloEs: "Dantza · Infantil y juvenil",
    tituloEu: "Dantza · Haurrak eta gaztiak",
    colEs: "Duración semanal",
    colEu: "Asteko iraupena",
    filas: [
      {
        es: "Predantza",
        eu: "Predantza",
        detalleEs: "1 hora a la semana",
        detalleEu: "Ordu 1 astean",
        precio: 35,
      },
      {
        es: "Urbano (infantil)",
        eu: "Urbano (haurrak)",
        detalleEs: "1 hora a la semana",
        detalleEu: "Ordu 1 astean",
        precio: 38,
      },
      {
        es: "Urbano intentsiboa",
        eu: "Urbano intentsiboa",
        detalleEs: "1 h 15 min a la semana",
        detalleEu: "1 h 15 min astean",
        precio: 42,
      },
    ],
  },
  {
    key: "dantza-helduak",
    tituloEs: "Dantza generala · Adultos",
    tituloEu: "Dantza generala · Helduak",
    subEs: "Salsa, bachata, sevillanas, FitGipsy… Packs combinables entre disciplinas de adultos",
    subEu: "Salsa, bachata, sevillanak, FitGipsy… Helduen diziplinen artean konbina daitezkeen packak",
    colEs: "Descripción",
    colEu: "Deskribapena",
    filas: [
      {
        es: "1 hora a la semana",
        eu: "Ordu 1 astean",
        detalleEs: "Clase de 1 hora semanal (ej. salsa, bachata o sevillanas)",
        detalleEu: "Asteko ordu 1eko klasea (adib. salsa, bachata edo sevillanak)",
        precio: 40,
      },
      {
        es: "1,5 horas a la semana",
        eu: "1,5 ordu astean",
        detalleEs: "Clase intensiva de 1 hora y 30 minutos",
        detalleEu: "Ordu 1 eta 30 minutuko klase intentsiboa",
        precio: 48,
      },
      {
        es: "2 horas a la semana (Pack 2)",
        eu: "2 ordu astean (2. packa)",
        detalleEs: "Combo de 2 clases semanales de 1 hora",
        detalleEu: "Asteko ordu 1eko 2 klaseren konboa",
        precio: 64,
      },
      {
        es: "2,5 horas a la semana",
        eu: "2,5 ordu astean",
        detalleEs: "1 clase de 1,5 h + 1 clase de 1 h",
        detalleEu: "1,5 orduko klase 1 + ordu 1eko klase 1",
        precio: 72,
      },
      {
        es: "3 horas a la semana (Pack 3)",
        eu: "3 ordu astean (3. packa)",
        detalleEs: "Combo de 3 clases semanales de 1 hora",
        detalleEu: "Asteko ordu 1eko 3 klaseren konboa",
        precio: 85,
      },
    ],
  },
  {
    key: "fitness-app",
    tituloEs: "Fitness con App",
    tituloEu: "Fitness Appekin",
    subEs: "BarreFit, Pilates, Fusión & Ritmo, Funcional… Reservas flexibles mediante la aplicación móvil",
    subEu: "BarreFit, Pilates, Fusión & Ritmo, Funtzionala… Erreserba malguak aplikazio mugikorraren bidez",
    filas: [
      { es: "4 clases al mes", eu: "4 klase hilean", precio: 40 },
      { es: "6 clases al mes", eu: "6 klase hilean", precio: 51 },
      { es: "8 clases al mes", eu: "8 klase hilean", precio: 58 },
      { es: "12 clases al mes", eu: "12 klase hilean", precio: 69 },
      { es: "Clases ilimitadas", eu: "Klase mugagabeak", precio: 90 },
    ],
  },
];

const SECCIONES_CORTAS: Seccion[] = [
  {
    key: "fitness-bereziak",
    tituloEs: "Fitness bereziak",
    tituloEu: "Fitness bereziak",
    subEs: "Clases fijas, independientes de la App",
    subEu: "Klase finkoak, Appetik kanpo",
    filas: [
      { es: "Bungee", eu: "Bungee", precio: 40 },
      { es: "Total Body", eu: "Total Body", precio: 58 },
    ],
  },
  {
    key: "yoga",
    tituloEs: "Yoga",
    tituloEu: "Yoga",
    filas: [
      { es: "Público general", eu: "Publiko orokorra", precio: 42 },
      { es: "Ikasleak / Alumnos", eu: "Ikasleak", precio: 38 },
    ],
  },
];

const masajeTreatments = [
  "Ventosas",
  "Drenaje linfático",
  "Reflexología podal",
  "Descontracturante",
  "Relajante",
  "Maderoterapia",
  "Cráneo facial",
];

/* ── Página ───────────────────────────────────────────── */

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Prices");
  const tCommon = await getTranslations("Common");
  const tMassage = await getTranslations("Massage");
  const eu = locale === "eu";

  const cuotaMes = eu ? "Kuota / hilabetea" : "Cuota / mes";

  return (
    <>
      <PageHero
        label={eu ? "Planak" : "Planes"}
        title={t("title")}
        subtitle={t("subtitle")}
        serif
      />

      {/* ── TARIFAS ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,170,110,0.05)_0%,transparent_60%)]" />

        <div className="relative mx-auto max-w-5xl space-y-14 px-4 sm:px-6 lg:px-8">
          {SECCIONES.map((sec) => (
            <ScrollReveal key={sec.key}>
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-5 w-[3px] rounded-full bg-accent" />
                  <h2 className="font-heading text-xl font-bold text-white md:text-2xl">
                    {eu ? sec.tituloEu : sec.tituloEs}
                  </h2>
                </div>
                {sec.subEs && (
                  <p className="mt-2 pl-[15px] text-sm leading-relaxed text-white/50">
                    {eu ? sec.subEu : sec.subEs}
                  </p>
                )}
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                <div className="hidden items-center gap-4 border-b border-white/[0.08] bg-white/[0.04] px-5 py-2.5 sm:flex">
                  <span className="flex-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                    {eu ? "Modalitatea" : "Modalidad"}
                  </span>
                  {sec.colEs && (
                    <span className="flex-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                      {eu ? sec.colEu : sec.colEs}
                    </span>
                  )}
                  <span className="w-28 text-right text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                    {cuotaMes}
                  </span>
                </div>

                {sec.filas.map((fila, i) => (
                  <div
                    key={fila.es}
                    className={`flex flex-col gap-1 px-5 py-3.5 transition-colors hover:bg-white/[0.04] sm:flex-row sm:items-center sm:gap-4 ${
                      i > 0 ? "border-t border-white/[0.06]" : ""
                    }`}
                  >
                    <span className="flex-1 font-medium text-white">
                      {eu ? fila.eu : fila.es}
                    </span>
                    {sec.colEs && (
                      <span className="flex-1 text-sm text-white/50">
                        {eu ? fila.detalleEu : fila.detalleEs}
                      </span>
                    )}
                    <span className="sm:w-28 sm:text-right">
                      <span className="font-heading text-2xl font-bold text-accent">
                        {fila.precio}
                      </span>
                      <span className="ml-0.5 font-heading text-base font-bold text-accent/60">
                        €
                      </span>
                      <span className="ml-1 text-xs text-white/40">{t("perMonth")}</span>
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ))}

          {/* Fitness bereziak + Yoga */}
          <div className="grid gap-6 md:grid-cols-2">
            {SECCIONES_CORTAS.map((sec, idx) => (
              <ScrollReveal key={sec.key} delay={idx * 0.08}>
                <div className="h-full">
                  {/* altura fija: asi las dos tablas arrancan a la misma altura
                      aunque solo una de las secciones tenga subtitulo */}
                  <div className="mb-5 md:min-h-[3.6rem]">
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className="h-5 w-[3px] rounded-full bg-accent" />
                      <h2 className="font-heading text-xl font-bold text-white md:text-2xl">
                        {eu ? sec.tituloEu : sec.tituloEs}
                      </h2>
                    </div>
                    {sec.subEs && (
                      <p className="mt-2 pl-[15px] text-sm text-white/50">
                        {eu ? sec.subEu : sec.subEs}
                      </p>
                    )}
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                    {sec.filas.map((fila, i) => (
                      <div
                        key={fila.es}
                        className={`flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.04] ${
                          i > 0 ? "border-t border-white/[0.06]" : ""
                        }`}
                      >
                        <span className="font-medium text-white">
                          {eu ? fila.eu : fila.es}
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="font-heading text-2xl font-bold text-accent">
                            {fila.precio}
                          </span>
                          <span className="ml-0.5 font-heading text-base font-bold text-accent/60">
                            €
                          </span>
                          <span className="ml-1 text-xs text-white/40">{t("perMonth")}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Clase suelta */}
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl border border-accent/35 bg-gradient-to-br from-accent/[0.09] to-transparent p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex max-w-2xl gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                    <Ticket size={17} />
                  </span>
                  <div>
                    <h2 className="mb-3 font-heading text-xl font-bold text-white md:text-2xl">
                      {eu ? "Klase soltea" : "Clase suelta"}
                      <span className="ml-2 text-sm font-normal text-accent/70">
                        1 klasea soltea
                      </span>
                    </h2>
                    <p className="text-sm leading-relaxed text-white/60">
                    {eu ? (
                      <>
                        <span className="font-semibold text-white">
                          Edonorentzat eskuragarri:
                        </span>{" "}
                        ez da beharrezkoa Appa erabiltzea ez bonurik izatea. Eskolako
                        diziplina eta klase guztietarako balio du: dantza, fitness,
                        bungee, total body, yoga… Klase puntuala da, konpromisorik eta
                        matrikularik gabe.
                      </>
                    ) : (
                      <>
                        <span className="font-semibold text-white">
                          Disponible para cualquier persona:
                        </span>{" "}
                        no hace falta usar la App ni tener un bono. Válida para todas las
                        disciplinas y clases de la escuela: danza, fitness, bungee, total
                        body, yoga… Es una clase puntual, sin compromiso ni matrícula.
                      </>
                    )}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-left md:text-right">
                  <span className="font-heading text-5xl font-bold text-accent">12</span>
                  <span className="ml-1 font-heading text-2xl font-bold text-accent/60">
                    €
                  </span>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                    {eu ? "klaseko" : "por clase"}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Gestión y reservas */}
          <ScrollReveal>
            <div className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
              <Smartphone size={16} className="mt-0.5 shrink-0 text-accent" />
              <p className="text-sm text-white/55">
                <span className="font-semibold text-white/80">
                  {eu ? "Kudeaketa eta erreserbak:" : "Gestión y reservas:"}
                </span>{" "}
                {eu
                  ? "Kuotak hilabetekoak dira. Fitness klaseen erreserbak aplikazio mugikorraren bidez kudeatzen dira."
                  : "Las cuotas son mensuales. Las reservas de Fitness se gestionan mediante la aplicación móvil."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── MASAJES ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#070707] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,170,110,0.04)_0%,transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                {t("masajesDesc")}
              </p>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                {t("masajes")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {masajeTreatments.map((name, i) => (
              <ScrollReveal key={name} delay={i * 0.04}>
                <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                  <p className="mb-3 text-sm font-medium text-white">{name}</p>
                  <div>
                    <span className="font-heading text-3xl font-bold text-accent">40</span>
                    <span className="font-heading text-lg font-bold text-accent/60">€</span>
                  </div>
                  <div className="mx-auto my-2.5 h-px w-8 bg-white/[0.08]" />
                  <p className="text-xs text-white/60">
                    <Users size={10} className="mr-1 inline" />
                    {eu ? "Erabiltzaileak" : "Usuarios"}:{" "}
                    <span className="font-bold text-accent/80">35€</span>
                  </p>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={masajeTreatments.length * 0.04}>
              <div className="relative">
                <div className="absolute -inset-2 rounded-3xl bg-accent/10 blur-xl motion-safe:animate-glow-pulse" />
                <div className="relative overflow-hidden rounded-2xl p-[1.5px]">
                  <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,#C9A96E_0%,transparent_25%,transparent_75%,#C9A96E_100%)] motion-safe:animate-spin-slow" />
                  <div className="relative rounded-[14px] bg-[#0a0a0a] p-5 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                    <div className="mb-3 inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase text-accent">
                      <Crown size={10} />
                      {tCommon("premium")}
                    </div>
                    <p className="mb-3 text-sm font-medium text-white">
                      {tMassage("bitanbatName")}
                    </p>
                    <div>
                      <span className="font-heading text-3xl font-bold text-accent">65</span>
                      <span className="font-heading text-lg font-bold text-accent/60">€</span>
                    </div>
                    <div className="mx-auto my-2.5 h-px w-8 bg-white/[0.08]" />
                    <p className="text-xs text-white/60">
                      <Users size={10} className="mr-1 inline" />
                      {eu ? "Erabiltzaileak" : "Usuarios"}:{" "}
                      <span className="font-bold text-accent/80">60€</span>
                    </p>
                    <p className="mt-1 text-[11px] text-white/60">90 min</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="mt-8 text-center">
              <Link
                href="/masajes"
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 px-6 py-2.5 text-sm font-medium text-accent transition-all duration-300 hover:border-accent/50 hover:bg-accent/5"
              >
                {eu ? "Tratamendu guztiak ikusi" : "Ver todos los tratamientos"} →
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              <a
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-center font-heading font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 sm:w-auto"
              >
                <div className="absolute inset-0 bg-accent" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-yellow-500/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Phone size={18} className="relative text-primary" />
                <span className="relative text-primary">{SITE_CONFIG.phoneFormatted}</span>
              </a>
              <Button href="/contacto" variant="secondary" size="md" className="w-full sm:w-auto">
                {eu ? "Kontaktatu" : "Contactar"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
