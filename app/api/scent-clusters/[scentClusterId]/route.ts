import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkIfUserIsAdmin } from "@/lib/authUtils";

export async function GET(
  req: Request,
  { params }: { params: { scentClusterId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: scentCluster, error: supabaseError } = await supabase
      .from("product_scent_cluster")
      .select("*")
      .eq("id", params.scentClusterId)
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[SCENT_CLUSTER_GET_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    if (!params.scentClusterId) {
      return new NextResponse("Scent cluster id is required", { status: 400 });
    }

    return NextResponse.json(scentCluster);
  } catch (error) {
    console.log("[SCENT_CLUSTER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { scentClusterId: string } }
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

    if (!params.scentClusterId) {
      return new NextResponse("Scent cluster id is required", { status: 400 });
    }
    const { data: scentCluster, error: supabaseError } = await supabase
      .from("product_scent_cluster")
      .update({ name: name, description: description })
      .eq("id", params.scentClusterId)
      .select()
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[SCENT_CLUSTER_POST_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(scentCluster);
  } catch (error) {
    console.log("[SCENT_CLUSTER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { scentClusterId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const isAdmin = checkIfUserIsAdmin(supabase);

    if (!isAdmin) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.scentClusterId) {
      return new NextResponse("Scent cluster id is required", { status: 400 });
    }
    const { data: scentCluster, error: supabaseError } = await supabase
      .from("product_scent_cluster")
      .delete()
      .eq("id", params.scentClusterId);

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[SCENT_CLUSTER_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(scentCluster);
  } catch (error) {
    console.log("[SCENT_CLUSTER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
