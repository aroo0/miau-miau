import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

interface Params {
  supabase: SupabaseClient;
  userId: string;
  productId: string
}
export async function getWishlistProduct({
  supabase,
  userId,
  productId
}: Params): Promise<boolean> {
  try {
    const { data: inWishlist, error: supabaseError } = await supabase
      .from("wishlist")
      .select(
      )
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    if (supabaseError) {
      console.log(supabaseError);
      return false;
    }

    console.log(inWishlist)

    return !!inWishlist;
  } catch (error) {
    console.log(error);
    return false;
  }
}
