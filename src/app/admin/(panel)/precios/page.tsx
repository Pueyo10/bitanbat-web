import { leerTarifas } from "@/lib/tarifas-server";
import PreciosEditor from "./PreciosEditor";

export const dynamic = "force-dynamic";

export default async function AdminPrecios() {
  const tarifas = await leerTarifas();
  return <PreciosEditor inicial={tarifas} />;
}
