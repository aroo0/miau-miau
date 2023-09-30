import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkIfUserIsAdmin } from "@/lib/authUtils";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: product, error: supabaseError } = await supabase
      .from("product")
      .select("*")
      .eq("id", params.productId)
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[PRODUCT_GET_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const isAdmin = checkIfUserIsAdmin(supabase);

    const body = await req.json();

    const {
      name,
      description,
      price,
      categoryId,
      brandId,
      scentClusterId,
      intensityId,
      ocassionId,
      details,
      quantity,
      isFeatured,
      isArchived,
      images,
    } = body;

    if (!isAdmin) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!brandId) {
      return new NextResponse("Brand is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category is required", { status: 400 });
    }
    if (!scentClusterId) {
      return new NextResponse("Scent Cluster is required", { status: 400 });
    }
    if (!intensityId) {
      return new NextResponse("Intensity is required", { status: 400 });
    }
    if (!details) {
      return new NextResponse("Details is required", { status: 400 });
    }
    if (!ocassionId) {
      return new NextResponse("OCassion is required", { status: 400 });
    }
    if (!quantity) {
      return new NextResponse("Quantity is required", { status: 400 });
    }


    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    const { data: product, error: supabaseError } = await supabase
      .from("product")
      .update({
        name: name,
        description: description,
        price: price,
        category_id: categoryId,
        brand_id: brandId, 
        scent_cluster_id: scentClusterId,
        intensity_id: intensityId,
        occasion_id: ocassionId,
        details: details,
        is_featured: isFeatured ? isFeatured : false,
        is_archived: isArchived ? isArchived : false,
      })
      .eq("id", params.productId)
      .select()
      .single();

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[PRODUCT_POST_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const isAdmin = checkIfUserIsAdmin(supabase);

    if (!isAdmin) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    const { data: product, error: supabaseError } = await supabase
      .from("product")
      .delete()
      .eq("id", params.productId);

    if (supabaseError) {
      // Handle Supabase-specific error
      console.error("[PRODUCT_POST_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
