import { Search, X } from "lucide-react";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <div className="relative w-full lg:max-w-xs">
      <Search
        size={17}
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search applications"
        placeholder="Search name, email, nic/passport..."
        className="h-11 w-full rounded-xl bg-slate-100 pl-11 pr-11 text-sm text-[#0f1a2b] outline-none transition placeholder:text-slate-500 focus:bg-white focus:ring-2 focus:ring-[#2f62b5]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 hover:text-[#2f62b5]"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}