import { SupabaseClient } from "@supabase/supabase-js";

export async function checkIfUserIsAdmin(supabase: SupabaseClient) {
  const { data: activeSession } = await supabase.auth.getSession();

  if (!activeSession) {
    return false;
  }

  const { data: user } = await supabase.from("user").select("*").single();

  if (!user || user.role !== "admin") {
    return false;
  }

  return true;
}
