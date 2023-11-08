"use client";
import { motion } from "framer-motion";

import { ExtendedProduct } from "@/app/global";
import ProductCard from "./ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import NoResults from "./NoResults";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { getProducts } from "@/app/actions/getProducts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/Button";
import { SlidersHorizontal } from "lucide-react";
import useMenuModal from "@/hooks/useMenuModal";

interface ProductListProps {
  initData: ExtendedProduct[];
  queryParams: {
    brandId: string;
    intensityId: string | string[];
    ocassionId: string | string[];
    scentClusterId: string | string[];
    order: string;
  };
}

export const revalidate = 0;

const ProductList: React.FC<ProductListProps> = ({ initData, queryParams }) => {
  const { onClick } = useMenuModal();

  const lastItem = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastItem.current,
    threshold: 1,
  });

  const supabase = createClientComponentClient();

  const href = typeof window !== "undefined" ? window.location.href : "";

  const { data, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [`${href} query`],
    queryFn: async ({ pageParam = 6 }) => {
      const data = await getProducts({
        supabase,
        brandId: queryParams.brandId,
        intensityId: queryParams.intensityId,
        ocassionId: queryParams.ocassionId,
        scentClusterId: queryParams.scentClusterId,
        from: pageParam,
        order: queryParams.order,
      });
      return data;
    },
    initialData: { pages: [initData], pageParams: [0] },
    staleTime: 0,
    getNextPageParam: (lastPage, pages) => pages.length * 6,
    onError: (error: any) => {
      return toast.error("Something went wrong.");
    },
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const key=`${queryParams.brandId || "brandId"}-${queryParams.intensityId || "intensityId"}-${queryParams.ocassionId || "ocassionId"}-${queryParams.scentClusterId?.[0] || "scentClusterId"}-${queryParams.order || "order"}`

  const allData: ExtendedProduct[] =
    data?.pages.flatMap((products) => products) ?? initData;

  return (
    <div className="pt-[30vh]">
      {allData.length === 0 && <NoResults key={key}/>}
      <motion.div
        initial={{ y: 800 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 "
        key={key}

      >
        {allData.map((item, index) => {
          if (index === allData.length - 1) {
            return (
              <div ref={ref} key={item.id}>
                <ProductCard data={item} />
              </div>
            );
          } else {
            return (
              <div key={item.id}>
                <ProductCard data={item} />
              </div>
            );
          }
        })}
      </motion.div>

      <Button
        className="fixed bottom-5 left-5 flex items-center justify-center"
        variant="outline"
        onClick={() => onClick("filter")}
      >
        <span>Filters</span>{" "}
        <SlidersHorizontal size={13} className="ml-3 mb-[2px]" />
      </Button>
    </div>
  );
};

export default ProductList;
