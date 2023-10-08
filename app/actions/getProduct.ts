import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ExtendedProduct } from "../global";
import camelcaseKeys from "camelcase-keys";

interface Params {
  supabase: SupabaseClient;
  perfumeId: string;
}
export async function getProduct({
  supabase,
  perfumeId,
}: Params): Promise<ExtendedProduct | null> {
  try {
    const { data: product, error: supabaseError } = await supabase
      .from("product")
      .select(
        `
      *, 
      product_inventory(id, product_id, quantity),
      product_category(name),
      product_brand(name, description),
      product_intensity(name),
      product_ocassion(name),
      product_scent_cluster(name),
      product_image(url)
      `
      )
      .eq("id", perfumeId)
      .single();

    if (supabaseError) {
      console.log(supabaseError);
      return null;
    }

    const camelCaseProduct = camelcaseKeys(product);

    return camelCaseProduct;
  } catch (error) {
    console.log(error);
    return null;
  }
}
