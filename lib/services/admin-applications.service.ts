
import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import type {
  AdminApplicationsFilters,
  AdminApplicationsResponse,
  SeminaryApplication,
  SeminaryApplicationDetails,
  SeminaryApplicationProgramme,
} from "@/lib/types/helper.type";

interface GetAdminApplicationsParams {
  page?: number;
  pageSize?: number;
  filters?: AdminApplicationsFilters;
}

/**
 * Retrieve paginated applications for the admin listing.
 */
export async function getAdminApplications({
  page = 1,
  pageSize = 10,
  filters = {},
}: GetAdminApplicationsParams = {}): Promise<AdminApplicationsResponse> {
  const supabase = await createSupabaseServerClient();

  const safePage = Math.max(1, Math.floor(page));
  const safePageSize = Math.min(100, Math.max(1, Math.floor(pageSize)));

  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  let query = supabase
    .from("seminary_applications")
    .select(
      `
        id,
        reference_number,
        full_name,
        email,
        mobile_whatsapp,
        programme_interest,
        status,
        submitted_at,
        created_at,
        updated_at
      `,
      { count: "exact" },
    );

  // Search by applicant name, email or reference number.
  const search = filters.search?.trim();

  if (search) {
    const escapedSearch = search.replace(/[,%()]/g, "");

    if (escapedSearch) {
      query = query.or(
        [
          `full_name.ilike.%${escapedSearch}%`,
          `email.ilike.%${escapedSearch}%`,
          `reference_number.ilike.%${escapedSearch}%`,
        ].join(","),
      );
    }
  }

  // Filter by application status.
  if (filters.status && filters.status !== "ALL") {
    query = query.eq("status", filters.status);
  }

  // Existing programme_interest filter.
  if (filters.programme?.trim()) {
    query = query.eq("programme_interest", filters.programme.trim());
  }

  // Fetch the current page of applications.
  const { data, count, error } = await query
    .order("submitted_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Admin applications query failed:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    throw new Error("APPLICATIONS_FETCH_FAILED");
  }

  const applications = data ?? [];
  const total = count ?? 0;

  // If there are no applications, return an empty result.
  if (applications.length === 0) {
    return {
      applications: [],
      total,
      page: safePage,
      pageSize: safePageSize,
      totalPages: Math.ceil(total / safePageSize),
    };
  }

  // Collect application IDs from the current page.
  const applicationIds = applications.map(
    (application) => application.id,
  );

  // Fetch selected programmes for all applications in one query.
  const { data: programmes, error: programmesError } = await supabase
    .from("seminary_application_programmes")
    .select(`
      application_id,
      programme_code,
      programme_label,
      created_at
    `)
    .in("application_id", applicationIds)
    .order("created_at", { ascending: true });

  if (programmesError) {
    console.error("Failed to fetch programmes for applications:", {
      message: programmesError.message,
      code: programmesError.code,
      details: programmesError.details,
      hint: programmesError.hint,
    });

    throw new Error("APPLICATIONS_PROGRAMMES_FETCH_FAILED");
  }

  // Group programmes by application ID.
  const programmesByApplication = new Map<
    string,
    SeminaryApplicationProgramme[]
  >();

  for (const programme of programmes ?? []) {
    const existing =
      programmesByApplication.get(programme.application_id) ?? [];

    existing.push(programme as SeminaryApplicationProgramme);

    programmesByApplication.set(
      programme.application_id,
      existing,
    );
  }

  // Attach selected programmes to each application.
  const applicationsWithProgrammes = applications.map(
    (application) => ({
      ...application,
      selected_programmes:
        programmesByApplication.get(application.id) ?? [],
    }),
  );

  return {
    applications:
      applicationsWithProgrammes as SeminaryApplication[],
    total,
    page: safePage,
    pageSize: safePageSize,
    totalPages: Math.ceil(total / safePageSize),
  };
}

/**
 * Retrieve one complete application and its selected programmes.
 */
export async function getAdminApplicationById(
  applicationId: string,
): Promise<SeminaryApplicationDetails | null> {
  const supabase = await createSupabaseServerClient();

  // Retrieve the main application.
  const { data: application, error: applicationError } =
    await supabase
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

  if (!application) {
    return null;
  }

  console.log("dfhidsuf " , applicationId);

  // Retrieve all programmes selected by this applicant.
  const { data: programmes, error: programmesError } =
    await supabase
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
    console.error("Failed to fetch application programmes:", {
      message: programmesError.message,
      code: programmesError.code,
      details: programmesError.details,
      hint: programmesError.hint,
    });

    throw new Error("APPLICATION_PROGRAMMES_FETCH_FAILED");
  }

  return {
    ...application,
    selected_programmes:
      (programmes ?? []) as SeminaryApplicationProgramme[],
  } as SeminaryApplicationDetails;
}
