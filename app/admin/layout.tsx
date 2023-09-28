import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNavBar from "./components/AdminNavBar";
import { checkIfUserIsAdmin } from "@/lib/authUtils";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const isAdmin = await checkIfUserIsAdmin(supabase);

  if (!isAdmin) {
    return redirect("/");
  }

  return (
    <>
      <AdminNavBar />

      <div className="px-7">{children}</div>
    </>
  );
}
