import { getProducts } from "@/app/actions/getProducts";

import ProductList from "@/components/ProductList";
import Container from "@/components/ui/Container";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PerfumesContent from "./components/PerfumesContent";

interface PerfumesPageProps {
  params: {
    brandId: string;
  };
  searchParams: {
    intensityId: string | string[];
    ocassionId: string | string[];
    scentClusterId: string | string[];
    order: string
  };
}
export const revalidate = 0;
export const dynamic = 'force-dynamic'


const PerfumesPage: React.FC<PerfumesPageProps> = async ({
  params: { brandId },
  searchParams: { intensityId, ocassionId, scentClusterId, order },
}) => {
  const queryParams = {
    brandId,
    intensityId,
    ocassionId,
    scentClusterId,
    order
  };
  const supabase = createServerActionClient({ cookies });

  const initData = await getProducts({
    supabase,
    brandId,
    intensityId,
    ocassionId,
    scentClusterId,
    from: 0,
    order: order
  });


  const { data: categoryData } = await supabase
    .from("product_category")
    .select("*")
    .eq("name", "Perfumes")
    .single();

  const { data: brandData } = await supabase
    .from("product_brand")
    .select("*")
    .eq("id", brandId)
    .single();


  return (
    <Container>
      <PerfumesContent queryParams={queryParams} initData={initData} categoryData={categoryData} brandData={brandData}/>
    </Container>
  );
};

export default PerfumesPage;
