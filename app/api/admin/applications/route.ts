import { NextRequest, NextResponse } from "next/server";
import { getAdminApplications } from "@/lib/services/admin-applications.service";
import type {
  AdminApplicationsFilters,
  ApplicationStatus,
} from "@/lib/types/helper.type";

const APPLICATION_STATUSES: ApplicationStatus[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "ACCEPTED",
  "REJECTED"
];

function isApplicationStatus(value: string): value is ApplicationStatus {
  return APPLICATION_STATUSES.includes(value as ApplicationStatus);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pageSize") ?? 10);

    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 100
    ) {
      return NextResponse.json(
        { error: "Invalid pagination parameters." },
        { status: 400 }
      );
    }

    const statusParam = searchParams.get("status") ?? "ALL";

    if (
      statusParam !== "ALL" &&
      !isApplicationStatus(statusParam)
    ) {
      return NextResponse.json(
        { error: "Invalid application status." },
        { status: 400 }
      );
    }

    const filters: AdminApplicationsFilters = {
      search: searchParams.get("search") ?? "",
      status: statusParam,
      programme: searchParams.get("programme") ?? "",
    };

    const result = await getAdminApplications({
      page,
      pageSize,
      filters,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("GET ADMIN APPLICATIONS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to retrieve applications." },
      { status: 500 }
    );
  }
}