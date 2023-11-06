import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Shipping from "./components/Shipping"
import { cookies } from "next/headers";


export const dynamic = 'force-dynamic'


const Checkout = async () => {

  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();


  return (
    
    <Shipping session={session} />
   )
}

export default Checkout