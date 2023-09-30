import { checkIfUserIsAdmin } from "@/lib/authUtils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const isAdmin = checkIfUserIsAdmin(supabase);

    const body = await req.json();

    const { name, description } = body;

    if (!isAdmin) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const { data: ocassion, error: supabaseError } = await supabase
      .from("product_ocassion")
      .insert([{ name: name, description: description }])
      .select()
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[OCASSIONS_POST_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(ocassion);
  } catch (error) {
    console.log("[OCASION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: ocassions, error: supabaseError } = await supabase
      .from("product_ocassion")
      .select("*");

    if (supabaseError) {
      console.error("[OCASSIONS_GET_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(ocassions);
  } catch (error) {
    console.log("[OCASSIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
