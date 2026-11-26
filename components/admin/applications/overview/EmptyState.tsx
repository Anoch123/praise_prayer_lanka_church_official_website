import { FileText } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
  onReset?: () => void;
}

export default function EmptyState({
  title,
  message,
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <FileText size={26} />
      </span>
      <p className="mt-4 font-semibold text-[#0f1a2b]">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{message}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 rounded-xl bg-[#2f62b5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#274f94]"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}