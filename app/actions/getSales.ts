import { checkIfUserIsAdmin } from "@/lib/authUtils";
import { SupabaseClient } from "@supabase/supabase-js";

export const getSales = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const isAdmin = checkIfUserIsAdmin(supabase);

  if (!isAdmin) {
    return null;
  }


  const { data, error } = await supabase.from("order").select("id").eq("is_paid", true)

  if (error) {
    console.log(error);
    return 0
  }

  return data.length;
};
