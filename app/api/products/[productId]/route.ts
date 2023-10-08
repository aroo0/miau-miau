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
      volume,
      categoryId,
      brandId,
      scentClusterId,
      intensityId,
      occasionId,
      details,
      quantity,
      isFeatured,
      isArchived,
      productImage,
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
    if (!volume) {
      return new NextResponse("Volume is required", { status: 400 });
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
    if (!occasionId) {
      return new NextResponse("Ocassion is required", { status: 400 });
    }
    if (!quantity) {
      return new NextResponse("Quantity is required", { status: 400 });
    }

    if (productImage.length === 0) {
      return new NextResponse("At least one image is required", {
        status: 400,
      });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    //  updated images

    for (const image of productImage) {
      const { data: img, error: supabaseImageError } = await supabase
        .from("product_image")
        .upsert({ product_id: params.productId, url: image.url }, {onConflict: 'url', ignoreDuplicates: true});

      if (supabaseImageError) {
        // Handle Supabase-specific error
        console.error(
          "[PRODUCT_PATCH_IMAGE_SUPABASE_ERROR]",
          supabaseImageError
        );
        return new NextResponse("Supabase error", { status: 500 });
      }
    }

    //  update product

    const { data: product, error: supabaseProductError } = await supabase
      .from("product")
      .update({
        name: name,
        description: description,
        price: price,
        volume: volume,
        category_id: categoryId,
        brand_id: brandId,
        scent_cluster_id: scentClusterId,
        intensity_id: intensityId,
        occasion_id: occasionId,
        details: details,
        is_featured: isFeatured,
        is_archived: isArchived,
      })
      .eq("id", params.productId)
      .select()
      .single();

    if (supabaseProductError) {
      // Handle Supabase-specific error
      console.error("[PRODUCT_PATCH_SUPABASE_ERROR]", supabaseProductError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    // update product inventory

    const { error: supabaseInventoryError } = await supabase
      .from("product_inventory")
      .update({ product_id: product.id, quantity: quantity })
      .eq("product_id", params.productId);

    if (supabaseInventoryError) {
      // Handle Supabase-specific error
      console.error("[PRODUCT_PATCH_SUPABASE_ERROR]", supabaseInventoryError);
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

    // delete inventory

    const { error: supabaseInventoryError } = await supabase
      .from("product_inventory")
      .delete()
      .eq("product_id", params.productId);

    if (supabaseInventoryError) {
      // Handle Supabase-specific error
      console.error("[PRODUCT_DELETE_SUPABASE_ERROR]", supabaseInventoryError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    //  delete images

    const { error: suapbaseImageError } = await supabase
      .from("product_image")
      .delete()
      .eq("product_id", params.productId);

    if (suapbaseImageError) {
      // Handle Supabase-specific error
      console.error("[PRODUCT_DELETE_SUPABASE_ERROR]", suapbaseImageError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    //  delete product
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
