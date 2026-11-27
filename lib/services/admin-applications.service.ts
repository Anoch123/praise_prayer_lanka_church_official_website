
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

  const search = filters.search?.trim();
  const escapedSearch = search?.replace(/[,%()]/g, "") ?? "";
  const programme = filters.programme?.trim();

  // Apply the same search and programme filters to every query.
  // Status is applied separately so each tab gets its own count.
  function applyCommonFilters(query: any) {
    let filteredQuery = query;

    if (escapedSearch) {
      filteredQuery = filteredQuery.or(
        [
          `full_name.ilike.%${escapedSearch}%`,
          `email.ilike.%${escapedSearch}%`,
          `nic_passport_number.ilike.%${escapedSearch}%`,
          `reference_number.ilike.%${escapedSearch}%`,
          `programme_interest.ilike.%${escapedSearch}%`,
        ].join(","),
      );
    }

    if (programme) {
      filteredQuery = filteredQuery.eq("programme_interest", programme);
    }

    return filteredQuery;
  }

  // Get counts across ALL matching records, not just the current page.
  async function getStatusCount(status?: string): Promise<number> {
    let countQuery = supabase
      .from("seminary_applications")
      .select("id", { count: "exact", head: true });

    countQuery = applyCommonFilters(countQuery);

    if (status) {
      countQuery = countQuery.eq("status", status);
    }

    const { count, error } = await countQuery;

    if (error) {
      console.error("Application status count failed:", {
        status,
        message: error.message,
        code: error.code,
      });

      throw new Error("APPLICATION_STATUS_COUNTS_FAILED");
    }

    return count ?? 0;
  }

  const [allCount, submittedCount, acceptedCount, rejectedCount] =
    await Promise.all([
      getStatusCount(),
      getStatusCount("SUBMITTED"),
      getStatusCount("ACCEPTED"),
      getStatusCount("REJECTED"),
    ]);

  const statusCounts = {
    ALL: allCount,
    SUBMITTED: submittedCount,
    ACCEPTED: acceptedCount,
    REJECTED: rejectedCount,
  };

  // Get the current page of applications.
  let applicationsQuery = supabase
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
        nic_passport_number,
        submitted_at,
        created_at,
        updated_at
      `,
      { count: "exact" },
    );

  applicationsQuery = applyCommonFilters(applicationsQuery);

  if (filters.status && filters.status !== "ALL") {
    applicationsQuery = applicationsQuery.eq("status", filters.status);
  }

  const {
    data,
    count,
    error,
  } = await applicationsQuery
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

  if (applications.length === 0) {
    return {
      applications: [],
      total,
      page: safePage,
      pageSize: safePageSize,
      totalPages: Math.ceil(total / safePageSize),
      statusCounts,
    };
  }

  const applicationIds = applications.map(
    (application) => application.id,
  );

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
    statusCounts,
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
