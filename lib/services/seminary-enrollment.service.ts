
import "server-only";

import { createSupabaseAdminClient } from "../supabase/admin";

type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json | undefined };

export interface SeminarySubmission {
  idempotencyKey: string;
  application: Json;
  references: Json;
}

export type SeminarySubmissionResult = {
  success: boolean;
  duplicate: boolean;
  application_id: string;
  reference_number: string;
};

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isSeminarySubmissionResult(
  value: unknown,
): value is SeminarySubmissionResult {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.success === true &&
    typeof value.duplicate === "boolean" &&
    typeof value.application_id === "string" &&
    typeof value.reference_number === "string"
  );
}

export async function submitSeminaryApplication(
  submission: SeminarySubmission,
): Promise<SeminarySubmissionResult> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.rpc(
    "submit_seminary_application",
    {
      p_idempotency_key: submission.idempotencyKey,
      p_application: submission.application,
      p_references: submission.references,
    },
  );

  if (error) {
    // Keep technical database details in server logs only.
    console.error(
      "Seminary submission database error:",
      error,
    );

    throw new Error("APPLICATION_SUBMISSION_FAILED");
  }

  if (!isSeminarySubmissionResult(data)) {
    console.error(
      "Invalid response from submit_seminary_application RPC.",
    );

    throw new Error("INVALID_SUBMISSION_RESPONSE");
  }

  return {
    success: data.success,
    duplicate: data.duplicate,
    application_id: data.application_id,
    reference_number: data.reference_number,
  };
}
