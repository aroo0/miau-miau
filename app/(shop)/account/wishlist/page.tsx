import { getWishlistProducts } from "@/app/actions/getWishlistProducts";
import AccountMenu from "../../(auth)/components/AccountMenu";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import WishlistItem from "@/app/(shop)/account/wishlist/components/WishListItem";
import NoResults from "@/components/NoResults";

export const dynamic = 'force-dynamic'


const WishlistPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const wishlist = await getWishlistProducts({ supabase, userId: user!.id });

  return (
    <AccountMenu title="Wishlist">
      {wishlist.length === 0 && <NoResults />}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10">
        {wishlist.map((wishlistItem) => (
          <WishlistItem product={wishlistItem} />
        ))}
      </section>
    </AccountMenu>
  );
};

export default WishlistPage;
