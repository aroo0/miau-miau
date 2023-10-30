import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { addressId: string } }
) {
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

    const { data: address, error: supabaseAddressError } = await supabase
      .from("user_addresses")
      .update({
        first_name: firstName,
        last_name: lastName,
        telephone: telephone,
        company: company ? company : null,
        address_line1: addressOne,
        address_line2: addressTwo ? addressTwo : null,
        country: country,
        city: city,
        postal_code: zip,
        primary: primary,
      })
      .eq("id", params.addressId)
      .select("id")
      .single();

    if (supabaseAddressError) {
      // Handle Supabase-specific error
      console.error("[ADDRESS_UPDATE_SUPABASE_ERROR]", supabaseAddressError);
      return new NextResponse("Supabase error", { status: 500 });
    }

    // Update primary address

    if (primary) {
      const { data, error: settingPrimaryError } = await supabase
        .from("user_addresses")
        .update({ primary: false })
        .eq("user_id", user.id)
        .neq("id", address.id)
        .select();

      if (settingPrimaryError) {
        // Handle Supabase-specific error
        console.log(settingPrimaryError)
        console.error("[ADDRESS_UPDATE_SUPABASE_ERROR]", supabaseAddressError);
        return new NextResponse("Supabase error", { status: 500 });
      }
    }

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
