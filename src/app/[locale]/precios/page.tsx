import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Phone, Gift, Users, Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const revalidate = 3600;

const dantzaPrices = [
  { name: "Predantza", hours: "1H", price: 30 },
  { name: "Urbano", hours: "1H", price: 35 },
  { name: "Urbano", hours: "1H 15min", price: 38 },
  { name: "Sevillanas / FitGipsy", hours: "1H", price: 38 },
  { name: "Sevillanas / FitGipsy", hours: "1.5H", price: 45 },
  { name: "Sevillanas / FitGipsy", hours: "2H", price: 70 },
  { name: "Sevillanas / FitGipsy", hours: "2.5H", price: 75 },
  { name: "Salsa", hours: "1H", price: 38 },
  { name: "Bachata", hours: "1H", price: 38 },
  { name: "Bachata", hours: "2H", price: 70 },
];

const fitnessPrices = [
  { sessions: 4, price: 38 },
  { sessions: 8, price: 55 },
  { sessions: 12, price: 93 },
  { sessions: 16, price: 105 },
  { sessions: 20, price: 137 },
  { sessions: 24, price: 156 },
];

const boxeoPrices = [
  { sessions: 4, price: 38 },
  { sessions: 8, price: 58 },
];

const yogaPrices = [
  { sessions: 4, price: 45, studentPrice: 35 },
  { sessions: 8, price: 70, studentPrice: 55 },
  { sessions: 12, price: 85, studentPrice: 65 },
];

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Prices");

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Planak" : "Planes"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* DANTZA */}
          <ScrollReveal>
            <div className="bg-white rounded-xl border border-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-[#E91E63]" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  {t("dantza")}
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-6">{t("dantzaDesc")}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">
                        {locale === "eu" ? "Diziplina" : "Disciplina"}
                      </th>
                      <th className="text-center py-2 px-4 text-muted-foreground font-medium">
                        {t("week")}
                      </th>
                      <th className="text-right py-2 pl-4 text-muted-foreground font-medium">
                        {t("perMonth")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dantzaPrices.map((item, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-3 pr-4 font-medium text-foreground">{item.name}</td>
                        <td className="py-3 px-4 text-center text-muted-foreground">{item.hours}</td>
                        <td className="py-3 pl-4 text-right">
                          <span className="font-heading font-bold text-lg text-accent">{item.price}€</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* FITNESS */}
          <ScrollReveal>
            <div className="bg-white rounded-xl border-2 border-accent p-6 md:p-8 relative">
              <div className="absolute -top-3 left-6">
                <span className="bg-accent text-primary text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} />
                  {t("featured")}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-[#4CAF50]" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  {t("fitness")}
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{t("fitnessDesc")}</p>
              <p className="text-xs text-accent font-medium mb-6">{t("fitnessClasses")}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {fitnessPrices.map((item) => (
                  <div key={item.sessions} className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">
                      {item.sessions} {t("sessions")}
                    </p>
                    <p className="font-heading text-2xl font-bold text-accent">{item.price}€</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* BOXEO + YOGA row */}
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-white rounded-xl border border-border p-6 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#F44336]" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    {t("boxeo")}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {boxeoPrices.map((item) => (
                    <div key={item.sessions} className="text-center p-4 rounded-lg bg-muted">
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.sessions} {t("sessions")}
                      </p>
                      <p className="font-heading text-2xl font-bold text-accent">{item.price}€</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-xl border border-border p-6 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#9C27B0]" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    {t("yoga")}
                  </h2>
                </div>
                <div className="space-y-3">
                  {yogaPrices.map((item) => (
                    <div key={item.sessions} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <span className="text-sm text-muted-foreground">
                        {item.sessions} {t("sessions")}
                      </span>
                      <div className="text-right">
                        <span className="font-heading text-lg font-bold text-accent">{item.price}€</span>
                        <p className="text-xs text-muted-foreground">
                          {t("yogaStudents")}: <span className="font-semibold text-foreground">{item.studentPrice}€</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* MASAJES */}
          <ScrollReveal>
            <div className="bg-white rounded-xl border border-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-[#795548]" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  {t("masajes")}
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-6">{t("masajesDesc")}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === "eu" ? "Saioa" : "Sesión"}
                  </p>
                  <p className="font-heading text-2xl font-bold text-accent">40€</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Users size={10} className="inline mr-1" />35€
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted border border-accent/30">
                  <p className="text-xs text-muted-foreground mb-1">BitanBat 90min</p>
                  <p className="font-heading text-2xl font-bold text-accent">65€</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Users size={10} className="inline mr-1" />60€
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/masajes"
                  className="text-accent text-sm font-medium hover:underline"
                >
                  {locale === "eu" ? "Tratamendu guztiak ikusi →" : "Ver todos los tratamientos →"}
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* DESCUENTOS */}
          <ScrollReveal>
            <div className="bg-primary rounded-xl p-6 md:p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Gift size={24} className="text-accent" />
                <h2 className="font-heading text-2xl font-bold">
                  {t("discounts")}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/10">
                  <Users size={20} className="text-accent shrink-0" />
                  <p className="text-sm">{t("familyDiscount")}</p>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/10">
                  <span className="text-accent font-bold text-lg shrink-0">10€</span>
                  <p className="text-sm">{t("singleClass")}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-heading font-semibold rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
                >
                  <Phone size={18} />
                  {SITE_CONFIG.phoneFormatted}
                </a>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-heading font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  {locale === "eu" ? "Kontaktatu" : "Contactar"}
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  );
}
