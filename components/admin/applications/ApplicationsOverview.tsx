
"use client";

import AdminShell from "@/components/admin/layout/AdminShell";
import { useAdmin } from "@/hooks/useAdmin";
import { useAdminApplications } from "@/hooks/useAdminApplications";

import ApplicationCards from "../applications/overview/ApplicationCards";
import ApplicationsHero from "../applications/overview/ApplicationsHero";
import ApplicationsTable from "../applications/overview/ApplicationsTable";
import EmptyState from "../applications/overview/EmptyState";
import SearchField from "../applications/overview/SearchField";
import StatusFilter from "../applications/overview/StatusFilter";
import { useApplicationFilters } from "../applications/overview/useApplicationFilters";

export default function ApplicationsOverview() {
  const { fullName } = useAdmin();

  const {
    data,
    isLoading,
    error,
    filters: apiFilters,
    setFilters,
    refreshApplications,
  } = useAdminApplications(1, 10);

  const applications = data?.applications ?? [];
  const total = data?.total ?? 0;

  // Keep the existing status-count helper.
  // Do not use its locally filtered results for displaying applications.
  const localFilters = useApplicationFilters(applications);

  const handleSearchChange = (search: string) => {
    setFilters({
      ...apiFilters,
      search,
    });
  };

  const handleStatusChange = (status: string) => {
    if (
      status !== "ALL" &&
      status !== "SUBMITTED" &&
      status !== "ACCEPTED"
    ) {
      return;
    }

    setFilters({
      ...apiFilters,
      status,
    });
  };

  const handleReset = () => {
    setFilters({
      search: "",
      status: "ALL",
      programme: "",
    });
  };

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
        <div className="space-y-4 p-4 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#0f1a2b]">
                All Applications
              </h2>

              <p aria-live="polite" className="text-sm text-slate-500">
                {isLoading
                  ? "Loading applications..."
                  : `Showing ${applications.length} of ${total} applications`}
              </p>
            </div>

            <SearchField
              value={apiFilters.search ?? ""}
              onChange={handleSearchChange}
            />
          </div>

          <StatusFilter
            selected={apiFilters.status ?? "ALL"}
            onSelect={handleStatusChange}
            countFor={localFilters.countFor}
          />
        </div>

        {isLoading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#2f62b5] border-t-transparent" />
              <p className="text-sm text-slate-500">
                Loading applications...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <h3 className="font-semibold text-red-600">
              Unable to load applications
            </h3>

            <p className="mt-2 text-sm text-slate-500">{error}</p>

            <button
              type="button"
              onClick={() => void refreshApplications()}
              className="mt-4 rounded-lg bg-[#2f62b5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#274f94]"
            >
              Try Again
            </button>
          </div>
        ) : applications.length === 0 ? (
          <EmptyState
            title="No applications found"
            message="No applications match your search or selected status."
            onReset={handleReset}
          />
        ) : (
          <>
            <ApplicationsTable applications={applications} />
            <ApplicationCards applications={applications} />
          </>
        )}
      </section>
    </AdminShell>
  );
}
