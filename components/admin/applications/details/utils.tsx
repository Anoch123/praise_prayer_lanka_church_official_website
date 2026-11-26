export type DetailValue = string | number | null | undefined;

export function formatDate(value: string | null | undefined) {
  if (!value) return "Not provided";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not provided";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function display(value: DetailValue) {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return String(value);
}

export function getInitials(name: string | null | undefined) {
  return (name ?? "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export const statusColors: Record<string, string> = {
  SUBMITTED: "#2f62b5",
  UNDER_REVIEW: "#d97706",
  ACCEPTED: "#0d9488",
  REJECTED: "#be123c",
  WITHDRAWN: "#64748b",
};

export const panelClass =
  "rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(15,26,43,0.06)]";