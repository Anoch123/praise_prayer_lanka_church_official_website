
import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ApplicationStatus } from "@/lib/types/helper.type";

export interface UpdatedApplicationStatus {
  id: string;
  reference_number: string | null;
  full_name: string;
  email: string;
  status: ApplicationStatus;
}

export async function updateAdminApplicationStatus(
  applicationId: string,
  status: ApplicationStatus,
): Promise<{
  application: UpdatedApplicationStatus;
  previousStatus: ApplicationStatus;
  changed: boolean;
}> {
  const supabase = await createSupabaseServerClient();

  const { data: existingApplication, error: fetchError } = await supabase
    .from("seminary_applications")
    .select("id, reference_number, full_name, email, status")
    .eq("id", applicationId)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (!existingApplication) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  const previousStatus = existingApplication.status as ApplicationStatus;

  // Avoid sending duplicate status emails when nothing changed.
  if (previousStatus === status) {
    return {
      application: existingApplication as UpdatedApplicationStatus,
      previousStatus,
      changed: false,
    };
  }

  const { data: updatedApplication, error: updateError } = await supabase
    .from("seminary_applications")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select("id, reference_number, full_name, email, status")
    .single();

  if (updateError || !updatedApplication) {
    throw new Error(
      updateError?.message || "Failed to update application status.",
    );
  }

  return {
    application: updatedApplication as UpdatedApplicationStatus,
    previousStatus,
    changed: true,
  };
}
