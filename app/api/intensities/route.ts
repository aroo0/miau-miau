import { checkIfUserIsAdmin } from "@/lib/authUtils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const isAdmin = checkIfUserIsAdmin(supabase);

    const body = await req.json();

    const { name, description, rating } = body;

    if (!isAdmin) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!rating) {
      return new NextResponse("Rating is required", { status: 400 });
    }

    const { data: intensity, error: supabaseError } = await supabase
      .from("product_intensity")
      .insert([{ name: name, description: description, rating: rating }])
      .select()
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[INTENSITIES_POST_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(intensity);
  } catch (error) {
    console.log("[INTENSITIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: intensity, error: supabaseError } = await supabase
      .from("product_intensity")
      .select("*");

      if (supabaseError) {
        // Handle Supabase-specific error
        console.error("[INTENSITIES_POST_SUPABASE_ERROR]", supabaseError);
        return new NextResponse("Supabase error", { status: 500 });
      }
  
      return NextResponse.json(intensity);
    } catch (error) {
      console.log("[INTENSITIES_POST]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }