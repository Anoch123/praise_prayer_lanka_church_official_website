
"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  AdminApplicationsFilters,
  AdminApplicationsResponse,
} from "@/lib/types/helper.type";

interface UseAdminApplicationsReturn {
  data: AdminApplicationsResponse | null;
  isLoading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  filters: AdminApplicationsFilters;
  setPage: (page: number) => void;
  setFilters: (filters: AdminApplicationsFilters) => void;
  refreshApplications: () => Promise<void>;
}

export function useAdminApplications(
  initialPage = 1,
  initialPageSize = 10,
): UseAdminApplicationsReturn {
  const [data, setData] =
    useState<AdminApplicationsResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);

  const [filters, setFiltersState] =
    useState<AdminApplicationsFilters>({
      search: "",
      status: "ALL",
      programme: "",
    });

  const fetchApplications = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          search: filters.search ?? "",
          status: filters.status ?? "ALL",
          programme: filters.programme ?? "",
        });

        const response = await fetch(
          `/api/admin/applications?${params.toString()}`,
          {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
            signal,
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Failed to load applications.",
          );
        }

        setData(result as AdminApplicationsResponse);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred.",
        );

        setData(null);
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
        }
      }
    },
    [page, pageSize, filters],
  );

  useEffect(() => {
    const controller = new AbortController();

    void fetchApplications(controller.signal);

    return () => controller.abort();
  }, [fetchApplications]);

  const setFilters = useCallback(
    (newFilters: AdminApplicationsFilters) => {
      setFiltersState(newFilters);
      setPage(1);
    },
    [],
  );

  const refreshApplications = useCallback(async () => {
    await fetchApplications();
  }, [fetchApplications]);

  return {
    data,
    isLoading,
    error,
    page,
    pageSize,
    filters,
    setPage,
    setFilters,
    refreshApplications,
  };
}
