import { getProduct } from "@/app/actions/getProduct";
import { getRandomSimilarProducts } from "@/app/actions/getRandomSimilarProducts";
import { getWishlistProduct } from "@/app/actions/getWishlistProduct";
import ProductDisplay from "@/components/ProductDisplay";
import { formatPrice } from "@/lib/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface PerfumePageProps {
  params: {
    brandId: string;
    perfumeId: string;
  };
}

const PerfumePage: React.FC<PerfumePageProps> = async ({
  params: { brandId, perfumeId },
}) => {
  const supabase = createServerActionClient({ cookies });



  const product = await getProduct({ supabase, perfumeId });

  const relatedProducts = await getRandomSimilarProducts({
    supabase,
    scentClusterId: product?.scentClusterId,
    perfumeId
  });
  
  if (!product || !relatedProducts) {
   return null;
 }

 const { data: { user } } = await supabase.auth.getUser()

 let inWishlist = false

 if(user) {
  inWishlist = await getWishlistProduct({supabase, userId: user.id, productId: perfumeId})
 }





  return (
    <div className="max-w-[1328px] mx-auto">
      <ProductDisplay product={product} relatedProducts={relatedProducts} inWishlist={inWishlist}/>
    </div>
  );
};

export default PerfumePage;
