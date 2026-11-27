
import { Suspense } from "react";

import { connection } from "next/server";

import ApplicationDetails from "@/components/admin/applications/ApplicationDetails";
import ApplicationsLoading from "@/components/Loading";

interface ApplicationPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ApplicationDetailsContent({
  params,
}: ApplicationPageProps) {
  await connection();

  const { id } = await params;

  return <ApplicationDetails applicationId={id} key={id} />;
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
