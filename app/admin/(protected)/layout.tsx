
import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { getAuthenticatedAdmin } from "@/lib/services/admin-auth.service";
import AdminProvider from "@/lib/providers/AdminProvider";

interface ProtectedAdminLayoutProps {
  children: ReactNode;
}

async function ProtectedContent({
  children,
}: ProtectedAdminLayoutProps) {
  // Start request-time rendering before authentication.
  await connection();

  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    redirect("/admin");
  }

  return (
    <AdminProvider admin={admin}>
      {children}
    </AdminProvider>
  );
}

export default function ProtectedAdminLayout({
  children,
}: ProtectedAdminLayoutProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 p-8">
          Loading admin portal...
        </div>
      }
    >
      <ProtectedContent>
        {children}
      </ProtectedContent>
    </Suspense>
  );
}
