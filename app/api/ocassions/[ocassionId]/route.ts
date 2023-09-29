import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkIfUserIsAdmin } from "@/lib/authUtils";

export async function GET(
  req: Request,
  { params }: { params: { ocassionId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: ocassion, error: supabaseError } = await supabase
      .from("product_ocassion")
      .select("*")
      .eq("id", params.ocassionId)
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[OCASSION_GET_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    if (!params.ocassionId) {
      return new NextResponse("Ocassion id is required", { status: 400 });
    }

    return NextResponse.json(ocassion);
  } catch (error) {
    console.log("[OCASSION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { ocassionId: string } }
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

    if (!params.ocassionId) {
      return new NextResponse("Ocassion id id is required", { status: 400 });
    }
    const { data: ocassion, error: supabaseError } = await supabase
      .from("product_ocassion")
      .update({ name: name, description: description })
      .eq("id", params.ocassionId)
      .select()
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[OCASSION_POST_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(ocassion);
  } catch (error) {
    console.log("[OCASSION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { ocassionId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const isAdmin = checkIfUserIsAdmin(supabase);

    if (!isAdmin) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.ocassionId) {
      return new NextResponse("Ocassion id id is required", { status: 400 });
    }
    const { data: ocassion, error: supabaseError } = await supabase
      .from("product_ocassion")
      .delete()
      .eq("id", params.ocassionId);

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[OCASSION_POST_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(ocassion);
  } catch (error) {
    console.log("[OCASSION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
