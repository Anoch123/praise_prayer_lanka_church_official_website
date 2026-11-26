
import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminProfile, AdminRole, AuthenticatedAdmin } from "../types/helper.type";

/**
 * Returns the currently authenticated and active administrator.
 *
 * Returns null when:
 * - No authenticated user exists.
 * - No admin profile exists.
 * - The admin profile is inactive.
 * - The profile cannot be verified.
 */
export async function getAuthenticatedAdmin():
  Promise<AuthenticatedAdmin | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("id, full_name, role, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (
    profileError ||
    !profile ||
    !profile.is_active
  ) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    profile: profile as AdminProfile,
  };
}

/**
 * Checks whether the authenticated administrator
 * has one of the specified roles.
 */
export async function requireAdminRole(
  allowedRoles: AdminRole[]
): Promise<AuthenticatedAdmin | null> {
  const admin = await getAuthenticatedAdmin();

  if (!admin || !allowedRoles.includes(admin.profile.role)) {
    return null;
  }

  return admin;
}
