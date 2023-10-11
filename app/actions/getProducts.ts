import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ExtendedProduct } from "../global";
import camelcaseKeys from "camelcase-keys";

interface Query {
  supabase: SupabaseClient;
  brandId?: string;
  intensityId?: string | string[];
  ocassionId?: string | string[];
  scentClusterId?: string | string[];
  isFeatured?: boolean;
  from: number;
  order?: string
}
export async function getProducts({
  supabase,
  brandId,
  intensityId,
  ocassionId,
  scentClusterId,
  isFeatured,
  from,
  order='date-ascending',
}: Query): Promise<ExtendedProduct[] | []> {
  try {
    const brand = brandId === "all" ? null : brandId;

    let query = supabase
      .from("product")
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
      .neq("is_archived", true);

    if (ocassionId) {
      query = query.in(
        "occasion_id",
        typeof ocassionId === "string" ? [ocassionId] : [...ocassionId]
      );
    }

    if (scentClusterId) {
      query = query.in(
        "scent_cluster_id",
        typeof scentClusterId === "string"
          ? [scentClusterId]
          : [...scentClusterId]
      );
    }

    if (intensityId) {
      query = query.in(
        "intensity_id",
        typeof intensityId === "string" ? [intensityId] : [...intensityId]
      );
    }
    if (isFeatured) {
      query = query.eq("is_featured", isFeatured);
    }

    if (brand) {
      query = query.eq("brand_id", brand);
    }

    const to = from + 5;

    const orderObj = {
      column: order.split("-")[0] === 'date' ? 'created_at' : 'price',
      ascending: order.split("-")[1] === 'ascending'
    }

    const { data: products, error: supabaseError } = await query
      .order(orderObj.column, { ascending: orderObj.ascending })
      .range(from, to);

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
