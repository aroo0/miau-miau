import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AccountMenu from "../../(auth)/components/AccountMenu";
import { getOrders } from "@/app/actions/getOrders";
import camelcaseKeys from "camelcase-keys";
import { CustomerOrder } from "@/app/global";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";
const UserOrders = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const orders = await getOrders({ supabase, userId: user!.id });

  if (!orders || orders.length === 0) {
    return null;
  }
  // @ts-ignore
  const camelcaseOrders: CustomerOrder[] = camelcaseKeys(orders, {
    deep: true,
  });

  return (
    <AccountMenu title="Your Orders">
      <div className="pb-8">
        {camelcaseOrders.map((order) => (
          <div className="flex  border flex-col rounded-sm p-4 mb-4 gap-4">
            <div className="flex gap-4 items-center text-sm">
              <div className=""><span className="text-muted-foreground">Placed:</span> <span className="">{new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).format(new Date(order.createdAt))}</span></div>
              <div  className="h-3 w-[2px] bg-secondary-foreground"/>
              <div><span className="text-muted-foreground">Total:</span> <span className="text-sm">{formatPrice(order.total)}</span></div>
              <div  className="h-3 w-[2px] bg-secondary-foreground"/>

              <div><span className="text-muted-foreground">Order No.:</span> <span className="text-sm">{order.id.slice(0, 8)}</span></div>
            </div>
            <div className="flex justify-between items-center">
            <div className="text-sm"><span className="text-muted-foreground">Status:</span> <span className="text-sm">              {order.isPaid ? "Paid" : "In progress"}
</span></div>

            <div><Button variant="outline">Order Details</Button></div>
            </div>




      
           
          </div>
        ))}
      </div>
    </AccountMenu>
  );
};

export default UserOrders;
