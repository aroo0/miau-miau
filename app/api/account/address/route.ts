import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await req.json();

    const {
      firstName,
      lastName,
      telephone,
      company,
      addressOne,
      addressTwo,
      country,
      city,
      zip,
      primary,
    } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!firstName) {
      return new NextResponse("First Name is required", { status: 400 });
    }
    if (!lastName) {
      return new NextResponse("Last Name is required", { status: 400 });
    }

    if (!telephone) {
      return new NextResponse("Telephone is required", { status: 400 });
    }

    if (!addressOne) {
      return new NextResponse("Address One is required", { status: 400 });
    }
    if (!country) {
      return new NextResponse("Country is required", { status: 400 });
    }
    if (!city) {
      return new NextResponse("City is required", { status: 400 });
    }
    if (!zip) {
      return new NextResponse("Zip is required", { status: 400 });
    }

    //  Add product

    const { data: address, error: supabaseAddressError } = await supabase
      .from("user_addresses")
      .insert({
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        telephone: telephone,
        company: company ? company : null,
        address_line1: addressOne,
        address_line2: addressTwo ? addressTwo : null,
        country: country,
        city: city,
        postcal_code: zip,
        primary: primary ? primary : false,
      })
      .select("id")
      .single();

    if (supabaseAddressError) {
      // Handle Supabase-specific error
      console.error("[ADDRESS_POST_SUPABASE_ERROR]", supabaseAddressError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
