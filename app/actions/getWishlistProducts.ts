import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { WishListType } from "../global";
interface Query {
  supabase: SupabaseClient;
  userId: string;
}

export async function getWishlistProducts({
  supabase,
  userId,
}: Query): Promise<WishListType[] | []> {
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

    const formattedWishlist: WishListType[] = wishlist.map(
      (wishlistItem: any) => {
        return {
          id: wishlistItem.product_id,
          name: wishlistItem.product.name,
          brand: wishlistItem.product.product_brand.name,
          price: wishlistItem.product.price,
          productImages: wishlistItem.product.product_image.map(
            (image: any) => image.url
          ),
        };
      }
    );

    return formattedWishlist;
  } catch (error) {
    console.log(error);
    return [];
  }
}
