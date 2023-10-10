import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { format } from "date-fns";

import React from "react";
import ProductsClient from "./components/ProductsClient";
import { ProductColumn } from "./components/Columns";

const CategoriesPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: products, error: productError } = await supabase.from("product")
    .select(`
      *, 
      product_inventory(product_id, quantity),
      product_category(name),
      product_brand(name),
      product_intensity(name),
      product_ocassion(name),
      product_scent_cluster(name)
      `);


  if (productError) {
    console.log(productError)
    return null;
  }

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    volume: item.volume,
    quantity: item.product_inventory[0].quantity,
    description: item.description,
    category: item.product_category!.name,
    brand: item.product_brand!.name,
    scentCluster: item.product_scent_cluster!.name,
    isFeatured: item.is_featured!,
    isArchived: item.is_archived,
  

  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 py-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default CategoriesPage;
