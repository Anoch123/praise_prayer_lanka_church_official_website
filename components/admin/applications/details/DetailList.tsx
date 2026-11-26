import { display, type DetailValue } from "./utils";

export interface DetailItem {
  label: string;
  value: DetailValue;
  /** Span the full width, for long answers. */
  wide?: boolean;
}

interface DetailListProps {
  items: DetailItem[];
  columns?: 1 | 2;
}

export default function DetailList({ items, columns = 2 }: DetailListProps) {
  return (
    <dl
      className={`grid grid-cols-1 gap-x-8 gap-y-6 ${
        columns === 2 ? "sm:grid-cols-2" : ""
      }`}
    >
      {items.map((item) => {
        const text = display(item.value);
        const missing = text === "Not provided";

        return (
          <div
            key={item.label}
            className={
              item.wide && columns === 2 ? "min-w-0 sm:col-span-2" : "min-w-0"
            }
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {item.label}
            </dt>
            <dd
              className={`mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed ${
                missing ? "italic text-slate-400" : "font-medium text-[#0f1a2b]"
              } ${item.wide && !missing ? "rounded-xl bg-slate-50 p-4" : ""}`}
            >
              {text}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}