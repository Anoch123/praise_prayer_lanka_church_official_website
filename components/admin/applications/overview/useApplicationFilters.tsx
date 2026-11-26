import { useState } from "react";

import type { ApplicationRow } from "./utils";

export function useApplicationFilters(applications: ApplicationRow[]) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");

  const term = query.trim().toLowerCase();

  const matchingSearch = applications.filter((application) =>
    [
      application.full_name,
      application.email,
      application.reference_number,
      application.programme_interest,
    ].some((field) => field?.toLowerCase().includes(term)),
  );

  const results =
    status === "ALL"
      ? matchingSearch
      : matchingSearch.filter((application) => application.status === status);

  // Tab counts follow the search, so they match what a click will show.
  const countFor = (value: string) =>
    value === "ALL"
      ? matchingSearch.length
      : matchingSearch.filter((application) => application.status === value)
          .length;

  function reset() {
    setQuery("");
    setStatus("ALL");
  }

  return { query, setQuery, status, setStatus, results, countFor, reset };
}