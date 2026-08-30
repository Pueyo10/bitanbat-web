import { setRequestLocale } from "next-intl/server";
import { leerTarifas } from "@/lib/tarifas-server";
import MasajesContent from "./MasajesContent";

export const revalidate = 3600;

export default async function MasajesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tarifas = await leerTarifas();
  return <MasajesContent masajes={tarifas.masajes} />;
}
