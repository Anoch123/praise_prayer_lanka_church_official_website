"use client";

import AdminShell from "@/components/admin/layout/AdminShell";
import { useAdmin } from "@/hooks/useAdmin";

import type { AdminApplicationsResponse } from "@/lib/types/helper.type";

import ApplicationCards from "../applications/overview/ApplicationCards";
import ApplicationsHero from "../applications/overview/ApplicationsHero";
import ApplicationsTable from "../applications/overview/ApplicationsTable";
import EmptyState from "../applications/overview/EmptyState";
import SearchField from "../applications/overview/SearchField";
import StatusFilter from "../applications/overview/StatusFilter";
import { useApplicationFilters } from "../applications/overview/useApplicationFilters";

interface ApplicationsOverviewProps {
  initialData: AdminApplicationsResponse;
}

export default function ApplicationsOverview({
  initialData,
}: ApplicationsOverviewProps) {
  const { fullName } = useAdmin();
  const { applications, total } = initialData;
  const filters = useApplicationFilters(applications);

  return (
    <AdminShell
      title="Applications"
      subtitle="Manage Seminary Applications"
      adminName={fullName}
    >
      <ApplicationsHero total={total} />

      <section
        aria-label="All applications"
        className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(15,26,43,0.06)]"
      >
        {applications.length === 0 ? (
          <EmptyState
            title="No applications found"
            message="Submitted applications will appear here."
          />
        ) : (
          <>
            <div className="space-y-4 p-4 md:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#0f1a2b]">
                    All Applications
                  </h2>
                  <p aria-live="polite" className="text-sm text-slate-500">
                    Showing {filters.results.length} of {applications.length}{" "}
                    loaded
                  </p>
                </div>
                <SearchField
                  value={filters.query}
                  onChange={filters.setQuery}
                />
              </div>

              <StatusFilter
                selected={filters.status}
                onSelect={filters.setStatus}
                countFor={filters.countFor}
              />
            </div>

            {filters.results.length === 0 ? (
              <EmptyState
                title="No matching applications"
                message="Try a different search or status."
                onReset={filters.reset}
              />
            ) : (
              <>
                <ApplicationsTable applications={filters.results} />
                <ApplicationCards applications={filters.results} />
              </>
            )}
          </>
        )}
      </section>
    </AdminShell>
  );
}