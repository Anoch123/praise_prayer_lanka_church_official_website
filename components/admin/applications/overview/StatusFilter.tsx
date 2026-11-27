
interface StatusFilterProps {
  selected: string;
  onSelect: (value: string) => void;
  countFor: (value: string) => number;
}

const options = [
  { value: "ALL", label: "All", color: "" },
  { value: "SUBMITTED", label: "Submitted", color: "#2f62b5" },
  { value: "UNDER_REVIEW", label: "Under Review", color: "#d97706" },
  { value: "ACCEPTED", label: "Accepted", color: "#16a34a" },
  { value: "REJECTED", label: "Rejected", color: "#dc2626" },
];

export default function StatusFilter({
  selected,
  onSelect,
  countFor,
}: StatusFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter by status"
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const active = selected === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(option.value)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f62b5] ${
              active
                ? "bg-[#0f1a2b] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {option.color && (
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: option.color }}
              />
            )}

            {option.label}

            <span
              className={`rounded-full px-2 text-xs tabular-nums ${
                active ? "bg-white/20" : "bg-white text-slate-600"
              }`}
            >
              {countFor(option.value)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
