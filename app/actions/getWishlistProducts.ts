import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ShortProductType } from "../global";
interface Query {
  supabase: SupabaseClient;
  userId: string;
}

export async function getWishlistProducts({
  supabase,
  userId,
}: Query): Promise<ShortProductType[] | []> {
  try {
    const { data: wishlist, error: supabaseError } = await supabase
      .from("wishlist")
      .select(
        `*, product(name, brand_id, price,  product_brand(name), product_image(url)))`
      )
      .eq("user_id", userId);

    if (supabaseError) {
      console.log(supabaseError);
      return [];
    }

    const formattedWishlist: ShortProductType[] = wishlist.map(
      (wishlistItem: any) => {
        return {
          id: wishlistItem.product_id,
          name: wishlistItem.product.name,
          brandId: wishlistItem.product.brand_id,
          productBrand: wishlistItem.product.product_brand,
          price: wishlistItem.product.price,
          productImage: wishlistItem.product.product_image,
        };
      }
    );

    return formattedWishlist;
  } catch (error) {
    console.log(error);
    return [];
  }
}
