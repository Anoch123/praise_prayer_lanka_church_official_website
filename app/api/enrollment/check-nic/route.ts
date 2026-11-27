
import { NextRequest, NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const nicPassport =
      typeof body.nic_passport_number === "string"
        ? body.nic_passport_number.trim()
        : "";

    if (!nicPassport) {
      return NextResponse.json(
        {
          success: false,
          message: "NIC / Passport number is required.",
        },
        { status: 400 },
      );
    }

    if (nicPassport.length > 12) {
      return NextResponse.json(
        {
          success: false,
          message: "NIC / Passport number is too long.",
        },
        { status: 400 },
      );
    }

    // Server-side privileged client.
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("seminary_applications")
      .select("id")
      .ilike("nic_passport_number", nicPassport)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("NIC duplicate check failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to verify NIC / Passport number. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        exists: Boolean(data),
        message: data
          ? "An application with this NIC / Passport number already exists."
          : "NIC / Passport number is available.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("NIC check API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    );
  }
}
