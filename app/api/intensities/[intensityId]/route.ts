import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkIfUserIsAdmin } from "@/lib/authUtils";

export async function GET(
  req: Request,
  { params }: { params: { intensityId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: intensity, error: supabaseError } = await supabase
      .from("product_intensity")
      .select("*")
      .eq("id", params.intensityId)
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[INTENSITY_GET_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    if (!params.intensityId) {
      return new NextResponse("Intensity id is required", { status: 400 });
    }

    return NextResponse.json(intensity);
  } catch (error) {
    console.log("[INTENSITY_GET_SUPABASE_ERROR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { intensityId: string } }
) {
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

    if (!params.intensityId) {
      return new NextResponse("Intensity id is required", { status: 400 });
    }

    console.log(params.intensityId)
    const { data: intensity, error: supabaseError } = await supabase
      .from("product_intensity")
      .update({ name: name, description: description, rating: rating })
      .eq("id", params.intensityId)
      .select()
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[INTENSITY_PATCH_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(intensity);
  } catch (error) {
    console.log("[INTENSITY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { intensityId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const isAdmin = checkIfUserIsAdmin(supabase);

    if (!isAdmin) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.intensityId) {
      return new NextResponse("Intensity id id is required", { status: 400 });
    }
    const { data: intensity, error: supabaseError } = await supabase
      .from("product_intensity")
      .delete()
      .eq("id", params.intensityId);

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[INTENSITY_DELETE_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(intensity);
  } catch (error) {
    console.log("[INTENSITY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
