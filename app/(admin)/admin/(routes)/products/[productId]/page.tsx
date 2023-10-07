import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProductForm from "./components/ProductForm";
import camelcaseKeys from "camelcase-keys";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: product, error: productError } = await supabase
    .from("product")
    .select("*, product_image(*), product_inventory(product_id, quantity)")
    .eq("id", params.productId)
    .single();

  const camelCaseProduct = productError ? null : camelcaseKeys(product);

  const { data: brands, error: brandError } = await supabase
    .from("product_brand")
    .select("*");

  const { data: categories, error: categoryError } = await supabase
    .from("product_category")
    .select("*");

  const { data: intensities, error: intensityError } = await supabase
    .from("product_intensity")
    .select("*");

  const { data: ocassions, error: ocassionError } = await supabase
    .from("product_ocassion")
    .select("*");

  const { data: scentClusters, error: scentClusterError } = await supabase
    .from("product_scent_cluster")
    .select("*");

  if (
    brandError ||
    categoryError ||
    intensityError ||
    ocassionError ||
    scentClusterError
  ) {
    return null;
  }

  console.log(camelCaseProduct);

  return (
    <>
      <ProductForm
        initialData={camelCaseProduct}
        brands={brands}
        categories={categories}
        intensities={intensities}
        ocassions={ocassions}
        scentClusters={scentClusters}
      />
    </>
  );
};

export default ProductPage;
