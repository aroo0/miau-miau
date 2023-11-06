import { SupabaseClient } from "@supabase/supabase-js";
import camelcaseKeys from "camelcase-keys";


export const getOrders = async ({
  supabase,
  userId,
}: {
  supabase: SupabaseClient;
  userId: string;
}) => {

  const { data } = await supabase.from("order").select("id,total, is_paid, created_at, order_items(id, quantity, product_id, product(id, brand_id, name))").eq("user_id", userId);
  






  return data;
};
