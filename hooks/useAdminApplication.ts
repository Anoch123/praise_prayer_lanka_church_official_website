
"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  AdminApplicationApiResponse,
  SeminaryApplicationDetails,
  UseAdminApplicationReturn,
} from "@/lib/types/helper.type";

export function useAdminApplication(
  applicationId: string,
): UseAdminApplicationReturn {
  const [application, setApplication] =
    useState<SeminaryApplicationDetails | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplication = useCallback(
    async (signal?: AbortSignal) => {
      if (!applicationId) {
        setApplication(null);
        setError("Application ID is missing.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/admin/applications/${encodeURIComponent(applicationId)}`,
          {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
            signal,
          },
        );

        const result =
          (await response.json()) as AdminApplicationApiResponse;

        if (!response.ok) {
          if (response.status === 404) {
            setApplication(null);
            setError(null);
            return;
          }

          throw new Error(
            result.error ||
              result.message ||
              "Failed to load application details.",
          );
        }

        setApplication(result.application ?? null);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setApplication(null);

        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while loading the application.",
        );
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
        }
      }
    },
    [applicationId],
  );

  useEffect(() => {
    const controller = new AbortController();

    void fetchApplication(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchApplication]);

  const refreshApplication = useCallback(async () => {
    await fetchApplication();
  }, [fetchApplication]);

  return {
    application,
    isLoading,
    error,
    refreshApplication,
  };
}
