"use client";

import { Brand, Category, ExtendedProduct } from "@/app/global";
import ProductList from "@/components/ProductList";
import { motion } from "framer-motion";

interface PerfumesContentProps {
  initData: ExtendedProduct[];
  brandData?: Brand;
  categoryData: Category;
  queryParams: queryParams;
}

interface queryParams {
  brandId: string;
  intensityId: string | string[];
  ocassionId: string | string[];
  scentClusterId: string | string[];
  order: string;
}

const PerfumesContent: React.FC<PerfumesContentProps> = ({
  initData,
  brandData,
  categoryData,
  queryParams,
}) => {
  return (
    <>
      <motion.div
        key={Math.random()}
        initial={{ opacity: 0}}
        transition={{ ease: "easeInOut", duration: 2, times: [0, 0.7, 1] }}
        animate={{
          opacity: [0, 1, 0],
          zIndex: 20,
          transitionEnd: { display: "none" }

          
        }}
        
        className=" absolute inset-0 flex-col  flex gap-4 items-center h-[100vh] justify-center px-6"
      >
        <h1 className="text-4xl md:text-9xl text-center ">
          Perfumes
          <br />
          <span className="italic">
            {brandData
              ? brandData.name
              : queryParams.brandId.charAt(0).toUpperCase() +
                queryParams.brandId.slice(1)}
          </span>
        </h1>
        {/* <p className="text-sm text-center ">
          {brandData ? brandData.description : categoryData.description}
        </p> */}
      </motion.div>
        <ProductList initData={initData} queryParams={queryParams} />
    </>
  );
};

export default PerfumesContent;
