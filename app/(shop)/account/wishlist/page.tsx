import { getWishlistProducts } from "@/app/actions/getWishlistProducts";
import AccountMenu from "../../(auth)/components/AccountMenu";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import WishlistItem from "@/components/WishlistItem";


interface WishlistPageProps {}

const WishlistPage: React.FC<WishlistPageProps> = async ({}) => {

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: { user } } = await supabase.auth.getUser()

  const wishlist = await getWishlistProducts({supabase, userId: user!.id})

   



  return (
    <AccountMenu title="Wishlist">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {wishlist.map((wishlistItem)=> (
          <WishlistItem data={wishlistItem}/>

        ))}

      </div>
    </AccountMenu>
  );
};

export default WishlistPage;
