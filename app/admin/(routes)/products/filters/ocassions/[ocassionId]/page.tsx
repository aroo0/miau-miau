import Headling from "@/components/ui/Heading";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import OcassionForm from "./components/OcassionForm";

const OcassionPage = async ({
  params,
}: {
  params: { ocassionId: string};
}) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: ocassion, error: supabaseError } = await supabase
    .from("product_ocassion")
    .select("*")
    .eq("id", params.ocassionId)
    .single();

  return (
    <>
      <OcassionForm initialData={ocassion} />
    </>
  );
};

export default OcassionPage;
