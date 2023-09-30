import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const ProductsPage = async ({ params }: { params: { productId: string } }) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: products, error: productError } = await supabase
    .from("product")
    .select("*, product_image(*), inventory(id, quantity)")
    .eq("id", params.productId);

  if (productError) {
    return null;
  }

  return <div>Admin only</div>;
};

export default ProductsPage;
