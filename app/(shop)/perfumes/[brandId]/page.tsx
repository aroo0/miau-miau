import { getProducts } from "@/app/actions/getProducts";
import { Product } from "@/app/global";
import PerfumesFilters from "@/components/PerfumeMenu";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/Container";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

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

  console.log(scentClusterId);
  console.log(intensityId);
  console.log(scentClusterId);
  console.log(order)

  const initData = await getProducts({
    supabase,
    brandId,
    intensityId,
    ocassionId,
    scentClusterId,
    from: 0,
    order: order
  });

  const { data: categoryData, error: categoryError } = await supabase
    .from("product_category")
    .select("*")
    .eq("name", "Perfumes")
    .single();

  const { data: brandData, error: brandError } = await supabase
    .from("product_brand")
    .select("*")
    .eq("id", brandId)
    .single();

  return (
    <Container>
      <div className="flex-col  flex gap-4 items-center h-[80vh] justify-center">
        <h1 className="text-9xl text-center">
          Perfumes
          <br />
          <span className="italic">{brandData ? brandData.name : "All"}</span>
        </h1>
        <p className="text-sm">
          {brandData ? brandData.description : categoryData.description}
        </p>
      </div>
      <ProductList initData={initData} queryParams={queryParams} />
    </Container>
  );
};

export default PerfumesPage;
