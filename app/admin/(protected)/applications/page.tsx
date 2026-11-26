
import { Suspense } from "react";
import { connection } from "next/server";

import ApplicationsOverview from "@/components/admin/applications/ApplicationsOverview";
import ApplicationsLoading from "@/components/Loading";

import { getAdminApplications } from "@/lib/services/admin-applications.service";

async function ApplicationsContent() {
  await connection();

  const result = await getAdminApplications({
    page: 1,
    pageSize: 10,
  });

  return <ApplicationsOverview initialData={result} />;
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<ApplicationsLoading />}>
      <ApplicationsContent />
    </Suspense>
  );
}
