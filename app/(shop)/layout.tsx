import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ShopNavBar from "./components/ShopNavBar";
import { getFilterTable } from "../actions/getFilterTable";
import { Brand, Intensity, Ocassion, ScentCluster } from "../global";
import DialogProvider from "@/providers/DialogProvider";

export const dynamic = "force-dynamic";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const brands: Brand[] = await getFilterTable({
    supabase,
    table: "product_brand",
  });
  const intensities: Intensity[] = await getFilterTable({
    supabase,
    table: "product_intensity",
  });
  const ocassions: Ocassion[] = await getFilterTable({
    supabase,
    table: "product_ocassion",
  });
  const scentClusters: ScentCluster[] = await getFilterTable({
    supabase,
    table: "product_scent_cluster",
  });

  return (
    <>
      <ShopNavBar

        session={session}
      />
      <DialogProvider         brands={brands}
        intensities={intensities}
        ocassions={ocassions}
        scentClusters={scentClusters} />
        

      <div className="w-full h-full">{children}</div>
    </>
  );
}
