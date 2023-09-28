import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { format } from "date-fns";


import React from 'react'
import { CategoryColumn } from './components/Columns';
import CategoryClient from './components/CategoryClient';

const CategoriesPage = async () => {

  const supabase =  createServerComponentClient<Database>({ cookies });

  const { data: categories, error: supabaseError } = await supabase
  .from("product_category")
  .select("*");

  if(supabaseError) {
    return null
  }

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    createdAt: format(new Date(item.created_at), "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 py-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}

export default CategoriesPage