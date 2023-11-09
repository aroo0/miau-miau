import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getServiceSupabase } from "@/lib/serverSupbase";

interface Product {
  itemId: string;
  quantity: number;
}

export async function POST(req: Request) {
  const { addressId, products } = await req.json(); // .json is taking body of request

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return new NextResponse("Unathorized", { status: 401 });
  }

  if (!addressId) {
    return new NextResponse("Address id is required ", { status: 400 });
  }

  if (products.length === 0) {
    return new NextResponse("Products are required ", { status: 400 });
  }

  // Looking for ids in your product all, you use in selector

  const productTable: { [itemId: string]: number } = {};

  products.forEach((product: Product) => {
    productTable[product.itemId] = product.quantity;
  });

  const { data: productData, error: supabaseError } = await supabase
    .from("product")
    .select("id, name, price")
    .in("id", Object.keys(productTable));

  // Adding items to Stripe Checkout

  if (supabaseError) {
    // Handle Supabase-specific error
    console.error("[CHECKOUT_SUPABASE_ERROR]", supabaseError);
    return new NextResponse("Supabase error", { status: 500 });
  }

  // Prepering items
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  productData.forEach((product) => {
    line_items.push({
      quantity: productTable[product.id],
      price_data: {
        currency: "EUR",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
    });
  });

  // Create order entry in DB
  let total = 0;

  productData.forEach((product) => {
    total += product.price * productTable[product.id];
  });

  const { data: order, error: orderError } = await supabase
    .from("order")
    .insert({
      user_id: session.user.id,
      is_paid: false,
      address_id: addressId,
      total: total,
    })
    .select()
    .single();

  if (orderError) {
    // Handle Supabase-specific error
    console.error("[ORDER_ERROR_SUPABASE_ERROR]", orderError);
    return new NextResponse("Supabase error", { status: 500 });
  }

  const serverSupabase = getServiceSupabase();

  productData.forEach(async (product) => {
    const { error: orderItemError } = await serverSupabase
      .from("order_items")
      .insert({
        // @ts-ignore
        order_id: order.id,
        product_id: product.id,
        quantity: productTable[product.id],
      });
    if (orderItemError) {
      // Handle Supabase-specific error
      console.error("[ORDER__ITEM_ERROR_SUPABASE_ERROR]", orderItemError);
      return new NextResponse("Supabase error", { status: 500 });
    }
  });



  // // Create session stripe

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.NEXT_PUBLIC_PAGE_URL}/cart?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_PAGE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: stripeSession.url });
}
