
"use client";

import { useAdminContext } from "@/lib/providers/AdminProvider";

export function useAdmin() {
  const { admin } = useAdminContext();

  return {
    admin,
    profile: admin.profile,
    id: admin.id,
    email: admin.email,
    fullName: admin.profile.full_name,
    role: admin.profile.role,
    isActive: admin.profile.is_active,
  };
}
