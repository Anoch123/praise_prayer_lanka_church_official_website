
"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  AdminApplicationApiResponse,
  ApplicationStatus,
  SeminaryApplicationDetails,
} from "@/lib/types/helper.type";

interface StatusUpdateResponse {
  success: boolean;
  message: string;
  application?: {
    id: string;
    status: ApplicationStatus;
  };
  email?: {
    sent: boolean;
    skipped?: boolean;
    message: string;
  };
}

interface UseAdminApplicationResult {
  application: SeminaryApplicationDetails | null;
  isLoading: boolean;
  error: string | null;
  isUpdatingStatus: boolean;
  statusUpdateMessage: string | null;
  statusUpdateError: string | null;
  emailResult: StatusUpdateResponse["email"] | null;
  refreshApplication: () => Promise<void>;
  updateApplicationStatus: (
    status: ApplicationStatus,
  ) => Promise<boolean>;
}

export function useAdminApplication(
  applicationId: string,
): UseAdminApplicationResult {
  const [application, setApplication] =
    useState<SeminaryApplicationDetails | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusUpdateMessage, setStatusUpdateMessage] =
    useState<string | null>(null);
  const [statusUpdateError, setStatusUpdateError] =
    useState<string | null>(null);
  const [emailResult, setEmailResult] =
    useState<StatusUpdateResponse["email"] | null>(null);

  const fetchApplication = useCallback(
    async (signal?: AbortSignal, silent = false) => {
      if (!applicationId) {
        setApplication(null);
        setError("Application ID is missing.");
        setIsLoading(false);
        return;
      }

      if (!silent) {
        setIsLoading(true);
        setError(null);
      }

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
            if (!silent) setError(null);
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

        if (!silent) {
          setApplication(null);
          setError(
            err instanceof Error
              ? err.message
              : "An unexpected error occurred while loading the application.",
          );
        }
      } finally {
        if (!signal?.aborted && !silent) {
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
    await fetchApplication(undefined, true);
  }, [fetchApplication]);

  const updateApplicationStatus = useCallback(
    async (status: ApplicationStatus): Promise<boolean> => {
      if (!applicationId || isUpdatingStatus) {
        return false;
      }

      setIsUpdatingStatus(true);
      setStatusUpdateMessage(null);
      setStatusUpdateError(null);
      setEmailResult(null);

      try {
        const response = await fetch(
          `/api/admin/applications/${encodeURIComponent(applicationId)}/status`,
          {
            method: "PATCH",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
          },
        );

        const result =
          (await response.json()) as StatusUpdateResponse;

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to update application status.",
          );
        }

        setStatusUpdateMessage(result.message);
        setEmailResult(result.email ?? null);

        // Refresh the complete application details without
        // displaying the initial full-page loading state.
        await fetchApplication(undefined, true);

        return true;
      } catch (err) {
        setStatusUpdateError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while updating the status.",
        );

        return false;
      } finally {
        setIsUpdatingStatus(false);
      }
    },
    [applicationId, isUpdatingStatus, fetchApplication],
  );

  return {
    application,
    isLoading,
    error,
    isUpdatingStatus,
    statusUpdateMessage,
    statusUpdateError,
    emailResult,
    refreshApplication,
    updateApplicationStatus,
  };
}
