import { checkIfUserIsAdmin } from "@/lib/authUtils";
import { SupabaseClient } from "@supabase/supabase-js";


export const getOrdersAdmin = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {

  const isAdmin = checkIfUserIsAdmin(supabase);

  if (!isAdmin) {
    return null;
  }

  const { data, error } = await supabase.from("order").select("*, order_items(id, quantity, product_id, product(id, brand_id, name, volume, product_brand(name))), address_id(*)")

  if (error) {
    console.log(error)
    return null
  }

  return data;
};
