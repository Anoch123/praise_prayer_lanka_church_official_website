"use client";

import { COMMON_TEXTS } from "@/lib/constants/helper_data";
import AdminShell from "../layout/AdminShell";
import WelcomeBanner from "./WelcomeBanner";
import { useAdmin } from "@/hooks/useAdmin";

export default function DashboardOverview() {
  const { fullName } = useAdmin();

  return (
    <AdminShell
      title="Admin Dashboard"
      subtitle={COMMON_TEXTS.App_name}
      adminName={fullName}
    >
      <WelcomeBanner adminName={fullName} />
    </AdminShell>
  );
}