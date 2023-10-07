"use client";

import { ExtendedProduct } from "@/app/global";
import ProductCard from "./ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import NoResults from "./NoResults";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { getProducts } from "@/app/actions/getProduct";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface ProductListProps {
  initData: ExtendedProduct[];
  queryParams: {
    brandId: string;
    intensityId: string;
    ocassionId: string;
    scentClusterId: string;
  };
}

const ProductList: React.FC<ProductListProps> = ({ initData, queryParams }) => {
  const lastItem = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastItem.current,
    threshold: 1,
  });

  const supabase = createClientComponentClient();

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,

  } = useInfiniteQuery({
    queryKey: [`query`],
    queryFn: async ({ pageParam = 6 }) => {
      console.log(pageParam);
      const data = await getProducts({
        supabase,
        brandId: queryParams.brandId,
        intensityId: queryParams.intensityId,
        ocassionId: queryParams.ocassionId,
        scentClusterId: queryParams.scentClusterId,
        from: pageParam,
      });
      return data;
    },
    initialData: { pages: [initData], pageParams: [0] },
    getNextPageParam: (lastPage, pages) => pages.length * 6,
    onError: (error: any) => {
      return toast.error("Something went wrong.");
    },
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log("fetching");
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const allData: ExtendedProduct[] =
    data?.pages.flatMap((products) => products) ?? initData;

  return (
    <>
      {allData.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {allData.map((item, index) => {
          if (index === initData.length - 1) {
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
      </div>
    </>
  );
};

export default ProductList;
