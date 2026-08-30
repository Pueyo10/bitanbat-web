import { createClient } from "@/lib/supabase/server";
import HorariosEditor from "./HorariosEditor";

export const dynamic = "force-dynamic";

export default async function AdminHorarios() {
  const supabase = await createClient();
  const [{ data: locations }, { data: classes }, { data: sessions }] =
    await Promise.all([
      supabase.from("locations").select("id,name").order("name"),
      supabase.from("classes").select("id,name,slug,category").order("name"),
      supabase
        .from("schedules")
        .select("id,class_id,location_id,day_of_week,start_time,end_time,notes")
        .eq("is_active", true)
        .order("day_of_week")
        .order("start_time"),
    ]);

  return (
    <HorariosEditor
      locations={locations ?? []}
      classes={classes ?? []}
      sessions={sessions ?? []}
    />
  );
}
