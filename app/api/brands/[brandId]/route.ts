import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkIfUserIsAdmin } from "@/lib/authUtils";

export async function GET(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: brand, error: supabaseError } = await supabase
      .from("product_brands")
      .select("*")
      .eq("id", params.brandId)
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[BRAND_GET_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { brandId: string } }
) {
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

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }
    const { data: brand, error: supabaseError } = await supabase
      .from("product_brand")
      .update({ name: name, description: description })
      .eq("id", params.brandId)
      .select()
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[BRAND_POST_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const isAdmin = checkIfUserIsAdmin(supabase);

    if (!isAdmin) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }
    const { data: brand, error: supabaseError } = await supabase
      .from("product_brand")
      .delete()
      .eq("id", params.brandId);

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[BRAND_POST_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
