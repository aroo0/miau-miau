import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Hero from "./components/Hero";

export const dynamic = "force-dynamic";

async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full h-full px-[-8]">
      <Hero />
    </div>
  );
}

export default Page;

