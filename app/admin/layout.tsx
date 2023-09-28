import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNavBar from "./components/AdminNavBar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data: activeSession } = await supabase.auth.getSession();

  if (!activeSession) {
    return redirect("/");
  }

  const { data: user } = await supabase.from("user").select("*").single();

  if (user?.role !== "admin") {
    return redirect("/");
  }

  return (
    <>
      <AdminNavBar />

      <div className="px-7">{children}</div>
      </>
  );
}
