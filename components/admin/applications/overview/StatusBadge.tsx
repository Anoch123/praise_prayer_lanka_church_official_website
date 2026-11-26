import { statusOptions } from "../overview/utils";

export default function StatusBadge({ status }: { status: string }) {
  const option = statusOptions.find((item) => item.value === status);
  const color = option?.color ?? "#64748b";

  return (
    <span
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold text-[#0f1a2b]"
      style={{ backgroundColor: `${color}1a` }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {option?.label ?? status.replaceAll("_", " ")}
    </span>
  );
}