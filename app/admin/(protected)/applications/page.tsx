
import { Suspense } from "react";
import { connection } from "next/server";

import ApplicationsOverview from "@/components/admin/applications/ApplicationsOverview";
import ApplicationsLoading from "@/components/Loading";

async function ApplicationsContent() {
  await connection();

  return <ApplicationsOverview />;
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<ApplicationsLoading />}>
      <ApplicationsContent />
    </Suspense>
  );
}
