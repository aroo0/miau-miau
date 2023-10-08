import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkIfUserIsAdmin } from "@/lib/authUtils";
import AdminNavBar from "../(admin)/admin/components/AdminNavBar";
import ShopNavBar from "./components/ShopNavBar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });





  return (
    <>
      <ShopNavBar />

      <div className="lg:px-8">{children}</div>
    </>
  );
}
