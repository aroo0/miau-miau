import { getProducts } from "@/app/actions/getProducts";
import { Product } from "@/app/global";
import NoResults from "@/components/NoResults";
import ProductCard from "@/components/ProductCard";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/Container";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface PerfumesPageProps {
  params: {
    brandId: string;
  };
  searchParams: {
    intensityId: string;
    ocassionId: string;
    scentClusterId: string;
  };
}

export const revalidate = 0; // no cache

const PerfumesPage: React.FC<PerfumesPageProps> = async ({
  params: { brandId },
  searchParams: { intensityId, ocassionId, scentClusterId },
}) => {
  const queryParams = {
    brandId,
    intensityId,
    ocassionId,
    scentClusterId,
  };
  const supabase = createServerActionClient({ cookies });

  const initData = await getProducts({
    supabase,
    brandId,
    intensityId,
    ocassionId,
    scentClusterId,
    from: 0,
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
          <span className="italic">{brandData ? brandData : "All"}</span>
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
