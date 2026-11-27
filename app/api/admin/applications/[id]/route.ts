
import { NextRequest, NextResponse } from "next/server";

import { getAdminApplicationById } from "@/lib/services/admin-applications.service";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Application ID is required." },
        { status: 400 },
      );
    }

    const application = await getAdminApplicationById(id);

    if (!application) {
      return NextResponse.json(
        {
          application: null,
          message: "Application not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { application },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("GET ADMIN APPLICATION ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to retrieve application details.",
      },
      { status: 500 },
    );
  }
}
