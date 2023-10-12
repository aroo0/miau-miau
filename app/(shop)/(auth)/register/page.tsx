import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterForm from "../account/components/RegisterForm";

export const dynamic = "force-dynamic";

const Join = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full w-full sm:pb-20  items-center justify-center ">
      <RegisterForm />
    </div>
  );
};

export default Join;
