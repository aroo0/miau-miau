import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import BrandForm from "./components/BrandForm";

const BrandPage = async ({
  params,
}: {
  params: { brandId: string};
}) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: brand, error: supabaseError } = await supabase
    .from("product_brand")
    .select("*")
    .eq("id", params.brandId)
    .single();


  return (
    <>
      <BrandForm initialData={brand} />
    </>
  );
};

export default BrandPage;
