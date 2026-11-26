
import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import type {
  SeminaryApplicationDetails,
  SeminaryApplicationProgramme,
} from "@/lib/types/helper.type";

export async function getAdminApplicationById(
  applicationId: string,
): Promise<SeminaryApplicationDetails | null> {
  const supabase = await createSupabaseServerClient();

  // Step 1: Fetch the main application.
  const { data: application, error: applicationError } = await supabase
    .from("seminary_applications")
    .select(`
      id,
      reference_number,
      full_name,
      date_of_birth,
      nic_passport_number,
      nationality,
      residential_address,
      district_city,
      postal_code,
      mobile_whatsapp,
      email,
      preferred_language,
      highest_qualification,
      institution_name,
      year_completed,
      field_of_study,
      other_theological_training,
      programme_interest,
      preferred_starting_period,
      heard_about_heartland,
      current_church,
      denomination_affiliation,
      church_address,
      church_pastor_name,
      ministry_role,
      years_in_church_ministry,
      current_ministry_setting,
      spiritual_background,
      theological_study_purpose,
      declaration_accepted,
      declaration_signed_name,
      declaration_date,
      status,
      internal_notes,
      submitted_at,
      created_at,
      updated_at
    `)
    .eq("id", applicationId)
    .maybeSingle();

  if (applicationError) {
    console.error("Failed to fetch application details:", {
      message: applicationError.message,
      code: applicationError.code,
      details: applicationError.details,
      hint: applicationError.hint,
    });

    throw new Error("APPLICATION_DETAILS_FETCH_FAILED");
  }

  // No application found.
  if (!application) {
    return null;
  }

  // Step 2: Fetch all programmes selected by this applicant.
  const { data: programmes, error: programmesError } = await supabase
    .from("seminary_application_programmes")
    .select(`
      application_id,
      programme_code,
      programme_label,
      created_at
    `)
    .eq("application_id", applicationId)
    .order("created_at", { ascending: true });

  if (programmesError) {
    console.error("Failed to fetch selected programmes:", {
      message: programmesError.message,
      code: programmesError.code,
      details: programmesError.details,
      hint: programmesError.hint,
    });

    throw new Error("APPLICATION_PROGRAMMES_FETCH_FAILED");
  }

  // Step 3: Return the application with its selected programmes.
  return {
    ...application,
    selected_programmes:
      (programmes ?? []) as SeminaryApplicationProgramme[],
  } as SeminaryApplicationDetails;
}
