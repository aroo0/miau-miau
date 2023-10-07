import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      {user ? (
        <div>
          Hey, {user.email}!
          <LogoutButton />
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}

export default Page;

