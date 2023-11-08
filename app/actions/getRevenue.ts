import { checkIfUserIsAdmin } from "@/lib/authUtils";
import { getServiceSupabase } from "@/lib/serverSupbase";
import { SupabaseClient } from "@supabase/supabase-js";
import camelcaseKeys from "camelcase-keys";

export const getRevenue = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const isAdmin = checkIfUserIsAdmin(supabase);

  if (!isAdmin) {
    return null;
  }

  const serverSupabase = getServiceSupabase();

  const { data, error } = await serverSupabase.rpc("calculate_paid_total");

  if (error) {
    console.log(error);
  }

  return data;
};
