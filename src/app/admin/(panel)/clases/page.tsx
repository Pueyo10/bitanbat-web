import { createClient } from "@/lib/supabase/server";
import type { ClassType } from "@/types/database";
import ClasesEditor from "./ClasesEditor";

export const dynamic = "force-dynamic";

export default async function AdminClases() {
  const supabase = await createClient();
  const [{ data: classes }, { data: scheduled }] = await Promise.all([
    supabase.from("classes").select("*").order("name"),
    supabase.from("schedules").select("class_id").eq("is_active", true),
  ]);

  const sessionsByClass: Record<string, number> = {};
  for (const s of scheduled ?? []) {
    sessionsByClass[s.class_id] = (sessionsByClass[s.class_id] ?? 0) + 1;
  }

  return (
    <ClasesEditor
      classes={(classes ?? []) as ClassType[]}
      sessionsByClass={sessionsByClass}
    />
  );
}
