import Headling from "@/components/ui/Headling";
import React from "react";
import CategoryForm from "./components/CategoryForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: category, error: supabaseError } = await supabase
    .from("product_category")
    .select("*")
    .eq("id", params.categoryId)
    .single();

  console.log(category);

  return (
    <>
      <CategoryForm initialData={category} />
    </>
  );
};

export default CategoryPage;
