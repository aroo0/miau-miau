import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ExtendedProduct } from "../global";
import camelcaseKeys from "camelcase-keys";

interface Query {
  supabase: SupabaseClient;
  perfumeId: string
  brandId?: string;
  intensityId?: string;
  ocassionId?: string;
  scentClusterId?: string;
  isFeatured?: boolean;
  from?: number;
  
}
export async function getRandomSimilarProducts({
  supabase,
  perfumeId,
  brandId,
  intensityId,
  ocassionId,
  scentClusterId,
  isFeatured,
  from=0,
}: Query): Promise<ExtendedProduct[] | []> {
  try {
    const brand = brandId === "all" ? null : brandId;

    let query = supabase
      .from("random_product")
      .select(
        `
      *, 
      product_inventory(id, product_id, quantity),
      product_category(name),
      product_brand(name),
      product_intensity(name),
      product_ocassion(name),
      product_scent_cluster(name),
      product_image(url)
      `
      )
      .neq("is_archived", true)
      .neq("id", perfumeId);

    if (ocassionId) {
      query = query.eq("occasion_id", ocassionId);
    }

    if (scentClusterId) {
      query = query.eq("scent_cluster_id", scentClusterId);
    }

    if (intensityId) {
      query = query.eq("intensity_id", intensityId);
    }
    if (isFeatured) {
      query = query.eq("is_featured", isFeatured);
    }

    if (brand) {
      query = query.eq("brand_id", brand);
    }

    const to = from + 5;

    const { data: products, error: supabaseError } = await query
    .order("created_at", { ascending: false })
      .range(from, to).limit(6);

    if (supabaseError) {
      console.log(supabaseError);
      return [];
    }

    const camelCaseProduct = camelcaseKeys(products);


    return camelCaseProduct;
  } catch (error) {
    console.log(error);
    return [];
  }
}
