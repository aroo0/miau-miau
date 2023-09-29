import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ItensityForm from "./components/IntensityForm";

const IntensityPage = async ({
  params,
}: {
  params: { intensityId: string};
}) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: intensity, error: supabaseError } = await supabase
    .from("product_intensity")
    .select("*")
    .eq("id", params.intensityId)
    .single();

  return (
    <>
      <ItensityForm initialData={intensity} />
    </>
  );
};

export default IntensityPage;
