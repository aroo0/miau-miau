import { SupabaseClient } from "@supabase/supabase-js";
import camelcaseKeys from "camelcase-keys";

export const getAddresses = async ({
  supabase,
  userId,
  isDefault = false,
}: {
  supabase: SupabaseClient;
  userId: string;
  isDefault?: boolean;
}) => {
  let query = supabase.from("user_addresses").select("*").eq("user_id", userId);

  if (isDefault) {
    query = query.eq("primary", true);
  }

  const { data } = await query;

  const addresses = data ? camelcaseKeys(data) : [];

  return addresses;
};
