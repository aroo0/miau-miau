import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

import { getServiceSupabase } from "@/lib/serverSupbase";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  const supabase = getServiceSupabase();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // update files in order

  if (event.type === "checkout.session.completed") {
    const { error: updatedPaidError } = await supabase
      .from("order")
      .update({
        is_paid: true,
      })
      .eq("id", session.metadata?.orderId);

    if (updatedPaidError) {
      // Handle Supabase-specific error
      console.error("[WEBHOOK_SUAPBASE_ERROR]", updatedPaidError);
      return new NextResponse("WEBHOOK error", { status: 500 });
    }

    const { error: updateInventoryError } = await supabase.rpc("subtract_quantity_from_inventory", {
      orderid: session.metadata?.orderId,
    });

    if (updateInventoryError) {
      // Handle Supabase-specific error
      console.error("[WEBHOOK_SUAPBASE_ERROR]", updateInventoryError);
      return new NextResponse("WEBHOOK error", { status: 500 });
    }

    if (updatedPaidError) {
      // Handle Supabase-specific error
      console.error("[WEBHOOK_SUAPBASE_ERROR]", updatedPaidError);
      return new NextResponse("WEBHOOK error", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
