

import { getOrdersAdmin } from "@/app/actions/getOrdersAdmin";
import { AdminOrder } from "@/app/global";
import { Button } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { formatPrice } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import camelcaseKeys from "camelcase-keys";
import { cookies } from "next/headers";
import SeenButton from "./components/SeenButton";


const OrdersPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const data = await getOrdersAdmin({ supabase });

  if (!data || data.length === 0) {
    return null;
  }
  const camelcaseOrders: AdminOrder[] = camelcaseKeys(data, {
    deep: true,
  });



  return (
    <div className="pb-20">
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      {camelcaseOrders.map((order) => (
        <div
          className="flex  border flex-col rounded-sm p-4 mb-4 gap-4 pt-4"
          key={order.id}
        >
          <div className="flex gap-4 items-center text-sm">
            <div className="">
              <span className="text-muted-foreground">Placed:</span>{" "}
              <span className="">
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }).format(new Date(order.createdAt))}
              </span>
            </div>
            <div className="h-3 w-[2px] bg-secondary-foreground" />
            <div>
              <span className="text-muted-foreground">Total:</span>{" "}
              <span className="text-sm">{formatPrice(order.total)}</span>
            </div>
            <div className="h-3 w-[2px] bg-secondary-foreground" />

            <div>
              <span className="text-muted-foreground">Order No.:</span>{" "}
              <span className="text-sm">{order.id.slice(0, 8)}</span>
            </div>
            <div className="h-3 w-[2px] bg-secondary-foreground" />

            <div className="text-sm ">
              <span className="text-muted-foreground">Status:</span>{" "}
              <span className="text-sm">
                {" "}
                {order.isPaid ? "Paid" : "Not Paid"}
              </span>
            </div>
          </div>
          <div className="flex gap-5 lg:gap-12 text-sm">
            <div className="flex flex-col gap-1">
              <h2 className="uppercase tracking-wider text-xs mb-2">
                Customer
              </h2>
              <p>
                {order.addressId.firstName} {order.addressId.lastName}
              </p>
              <p>
                {order.addressId.addressLine1} {order.addressId.addressLine2}
              </p>
              <p>
                {order.addressId.postalCode} {order.addressId.city}
              </p>
              <p>{order.addressId.country}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="uppercase tracking-wider text-xs mb-2">Order</h2>
              {order.orderItems.map((item) => (
                <div>
                  <p>
                    {item.product.name}, {item.product.productBrand.name},{" "}
                    {item.product.volume}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Qty: {item.quantity}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end items-center gap-3">
              <SeenButton orderId={order.id} orderSeen={order.seen}/>
              <Button variant="outline">Details</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
