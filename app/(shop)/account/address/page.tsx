import camelcaseKeys from "camelcase-keys";
import AccountMenu from "../../(auth)/components/AccountMenu";
import AddressManager from "./components/AddressManager";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { camelCaseAddress } from "@/app/global";
import { getAddresses } from "@/app/actions/getAddresses";

export const dynamic = "force-dynamic";




const AddressPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let addresses: camelCaseAddress[] = [];

  if (user) {
    addresses = await getAddresses({ supabase, userId: user.id });
  }

  return (
    <AccountMenu title="Your addresses">
      <AddressManager initialData={addresses} />
    </AccountMenu>
  );
};

export default AddressPage;
