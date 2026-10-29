// If the date string can be parsed, show it as a day / month block; otherwise show a calendar icon.
export function parseDate(input: string): { day: string; month: string } | null {
  const d = new Date(input);
  if (isNaN(d.getTime())) return null;
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
}