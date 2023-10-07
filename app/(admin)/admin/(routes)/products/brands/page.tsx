import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { format } from "date-fns";


import React from 'react'
import { BrandColumn } from './components/Columns';
import CategoryClient from './components/BrandClient';
import BrandClient from './components/BrandClient';

const BrandsPage = async () => {

  const supabase =  createServerComponentClient<Database>({ cookies });

  const { data: brands, error: supabaseError } = await supabase
  .from("product_brand")
  .select("*");

  if(supabaseError) {
    return null
  }

  const formattedBrands: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    createdAt: format(new Date(item.created_at), "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 py-6">
        <BrandClient data={formattedBrands} />
      </div>
    </div>
  );
}

export default BrandsPage