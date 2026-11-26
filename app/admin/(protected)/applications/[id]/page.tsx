
import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";

import ApplicationDetails from "@/components/admin/applications/ApplicationDetails";
import ApplicationsLoading from "@/components/Loading";

import { getAdminApplicationById } from "@/lib/services/admin-applications.service";

interface ApplicationPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ApplicationDetailsContent({
  params,
}: ApplicationPageProps) {
  await connection();

  // Access URL parameters inside Suspense.
  const { id } = await params;

  const application = await getAdminApplicationById(id);

  if (!application) {
    notFound();
  }

  return <ApplicationDetails application={application} />;
}

export default function ApplicationPage({
  params,
}: ApplicationPageProps) {
  return (
    <Suspense fallback={<ApplicationsLoading />}>
      <ApplicationDetailsContent params={params} />
    </Suspense>
  );
}
