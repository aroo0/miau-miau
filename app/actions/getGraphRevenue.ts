import { checkIfUserIsAdmin } from "@/lib/authUtils";
import { SupabaseClient } from "@supabase/supabase-js";

interface GraphData {
  name: string;
  total: number
}

export const getGraphRevenue = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const isAdmin = checkIfUserIsAdmin(supabase);

  if (!isAdmin) {
    return null;
  }

  const { data: paidOrders, error } = await supabase
    .from("order")
    .select("*, order_items(*, product(price))")
    .eq("is_paid", true);

  if (error) {
    console.log(error);
    return null;
  }

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = new Date(order.created_at).getMonth();
    let revenueForOrder = 0;
    for (const item of order.order_items) {
      revenueForOrder += item.product.price
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }


  return graphData;
};
