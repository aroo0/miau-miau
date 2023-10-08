import { checkIfUserIsAdmin } from "@/lib/authUtils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const isAdmin = checkIfUserIsAdmin(supabase);

    const body = await req.json();

    const { data: user } = await supabase.from("user").select("id").single();

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

    if (!user) {
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
    if (!volume) {
      return new NextResponse("Volume is required", { status: 400 });
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

    //  Add product

    const { data: product, error: supabaseProductError } = await supabase
      .from("product")
      .insert({
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
        is_featured: isFeatured ? isFeatured : false,
        is_archived: isArchived ? isArchived : false,
        created_by: user.id,
      })
      .select("id")
      .single();

    if (supabaseProductError) {
      // Handle Supabase-specific error
      console.error("[PRODUCT_POST_SUPABASE_ERROR]", supabaseProductError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    //  Add product inventory

    const { error: supabaseInventoryError } = await supabase
      .from("product_inventory")
      .insert({ product_id: product.id, quantity: quantity });

    if (supabaseProductError) {
      // Handle Supabase-specific error
      console.error("[PRODUCT_POST_SUPABASE_ERROR]", supabaseInventoryError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    //  Add images

    for (const image of productImage) {
      const { data: img, error: supabaseImageError } = await supabase
        .from("product_image")
        .insert({ product_id: product.id, url: image.url });

      if (supabaseImageError) {
        // Handle Supabase-specific error
        console.error(
          "[PRODUCT_IMAGE_POST_SUPABASE_ERROR]",
          supabaseImageError
        );
        return new NextResponse("Supabase error", { status: 500 });
      }
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {

    const supabase = createRouteHandlerClient<Database>({ cookies });

    let query = supabase
      .from("product")
      .select(
        `
      *, 
      product_inventory(product_id, quantity),
      product_category(name),
      product_brand(name),
      product_intensity(name),
      product_ocassion(name),
      product_scent_cluster(name)
      `
      )
      .neq("is_archived", true);

    const { data: products, error: supabaseError } = await query;

    if (supabaseError) {
      console.error("[PRODUCTS_GET_SUPABASE_ERROR]", supabaseError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
