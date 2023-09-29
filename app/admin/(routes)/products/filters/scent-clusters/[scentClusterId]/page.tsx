import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ScentClusterForm from "./components/ScentClusterForm";

const CategoryPage = async ({
  params,
}: {
  params: { scentClusterId: string };
}) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: category, error: supabaseError } = await supabase
    .from("product_scent_cluster")
    .select("*")
    .eq("id", params.scentClusterId)
    .single();


  return (
    <>
      <ScentClusterForm initialData={category} />
    </>
  );
};

export default CategoryPage;
