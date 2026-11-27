import { NextRequest, NextResponse } from "next/server";

import { requireAdminRole } from "@/lib/services/admin-auth.service";
import { updateAdminApplicationStatus } from "@/lib/services/admin-application-status.service";
import { sendApplicationStatusEmail } from "@/lib/services/application-email.service";

import type { ApplicationStatus } from "@/lib/types/helper.type";

const VALID_STATUSES: ApplicationStatus[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "ACCEPTED",
  "REJECTED",
];

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    // 1. Verify Super Admin.
    const admin = await requireAdminRole(["SUPER_ADMIN"]);

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 403 },
      );
    }

    // 2. Get application ID.
    const { id: applicationId } = await params;

    if (!applicationId) {
      return NextResponse.json(
        { success: false, message: "Application ID is required." },
        { status: 400 },
      );
    }

    // 3. Validate requested status.
    const body = await request.json().catch(() => null);
    const requestedStatus = body?.status;

    if (
      typeof requestedStatus !== "string" ||
      !VALID_STATUSES.includes(requestedStatus as ApplicationStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid application status.",
          allowedStatuses: VALID_STATUSES,
        },
        { status: 400 },
      );
    }

    const status = requestedStatus as ApplicationStatus;

    // 4. Update application.
    const result = await updateAdminApplicationStatus(applicationId, status);

    // 5. Avoid duplicate emails.
    if (!result.changed) {
      return NextResponse.json({
        success: true,
        message: "The application already has this status.",
        application: result.application,
        email: {
          sent: false,
          skipped: true,
          message: "No status change was made, so no email was sent.",
        },
      });
    }

    // 6. Send status-specific email.
    try {
      console.info(`[Application Email] Sending ${status} notification`, {
        applicationId,
        applicantEmail: result.application.email,
      });

      const emailResponse = await sendApplicationStatusEmail({
        applicantName: result.application.full_name,
        applicantEmail: result.application.email,
        referenceNumber: result.application.nic_passport_number,
        status,
      });

      console.info(`[Application Email] ${status} delivery details`, {
        applicationId,
        messageId: emailResponse.messageId,
        accepted: emailResponse.accepted,
        rejected: emailResponse.rejected,
        response: emailResponse.response,
      });

      return NextResponse.json({
        success: true,
        message: "Application status updated and email sent successfully.",
        application: result.application,
        previousStatus: result.previousStatus,
        email: {
          sent: true,
          message: `${status} notification email sent successfully.`,
        },
      });
    } catch (emailError) {
      console.error(
        `[Application Email] Failed to send ${status} notification`,
        {
          applicationId,
          applicantEmail: result.application.email,
          error: emailError instanceof Error ? emailError.message : emailError,
        },
      );

      return NextResponse.json({
        success: true,
        message: "Application status updated, but the email could not be sent.",
        application: result.application,
        previousStatus: result.previousStatus,
        email: {
          sent: false,
          message: `The application status was updated, but the ${status} notification email failed.`,
        },
      });
    }
  } catch (error) {
    console.error("Application status update failed:", error);

    if (error instanceof Error && error.message === "APPLICATION_NOT_FOUND") {
      return NextResponse.json(
        { success: false, message: "Application not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update application status.",
      },
      { status: 500 },
    );
  }
}
