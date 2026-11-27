import type { AdminApplicationsResponse } from "@/lib/types/helper.type";

export type ApplicationRow = AdminApplicationsResponse["applications"][number];

export const statusOptions = [
  { value: "SUBMITTED", label: "Submitted", color: "#2f62b5" },
  { value: "ACCEPTED", label: "Accepted", color: "#0d9488" },
  { value: "REJECTED", label: "Rejected", color: "#be123c" },
];

export function formatDate(value: string | null | undefined) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getInitials(name: string | null | undefined) {
  return (name ?? "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}