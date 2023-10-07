import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { format } from "date-fns";

import React from "react";
import ScentClusterClient from "./scent-clusters/components/ScentClusterClient";
import { ScentClusterColumn } from "./scent-clusters/components/Columns";
import FilterApiCalls from "./components/FilterApiCalls";
import OcassionClient from "./ocassions/components/OcassionClient";
import { OcassionColumn } from "./ocassions/components/Columns";
import IntenisityClient from "./intensities/components/ItensityClient";
import { ItensityColumn } from "./intensities/components/Columns";

const FilterPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: ocassions, error: ocassionError } = await supabase
    .from("product_ocassion")
    .select("*");

  

  const { data: scentClusters, error: scentClusterError } = await supabase
    .from("product_scent_cluster")
    .select("*");

    
  const { data: intensities, error: intensitiesError } = await supabase
  .from("product_intensity")
  .select("*");

  if (scentClusterError || ocassionError || intensitiesError) {
    return null;
  }

  const formattedScentClusters: ScentClusterColumn[] = scentClusters.map(
    (item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      createdAt: format(new Date(item.created_at), "MMMM do, yyyy"),
    })
  );

  const formattedOcassions: OcassionColumn[] = ocassions.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    createdAt: format(new Date(item.created_at), "MMMM do, yyyy"),
  }));

  const formattedIntensities: ItensityColumn[] = intensities.map((item) => ({
    id: item.id,
    name: item.name,
    rating: item.rating,
    description: item.description,
    createdAt: format(new Date(item.created_at), "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 py-6">
        <ScentClusterClient data={formattedScentClusters} />
        <OcassionClient data={formattedOcassions} />
        <IntenisityClient data={formattedIntensities} />

        {/* API */}
        <FilterApiCalls />
      </div>
    </div>
  );
};

export default FilterPage;
