import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { panelClass } from "./utils";

interface DetailSectionProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}

export default function DetailSection({
  title,
  icon: Icon,
  children,
}: DetailSectionProps) {
  return (
    <section className={panelClass}>
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2f62b5]/10 text-[#2f62b5]">
          <Icon size={19} />
        </span>
        <h2 className="text-base font-semibold text-[#0f1a2b]">{title}</h2>
      </div>

      {children}
    </section>
  );
}