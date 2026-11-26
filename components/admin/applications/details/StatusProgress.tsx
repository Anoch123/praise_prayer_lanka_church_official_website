import { Check, Clock, Send, UserMinus, X } from "lucide-react";

import { panelClass, statusColors } from "./utils";

// How many steps are complete for each status.
const completedSteps: Record<string, number> = {
  SUBMITTED: 1,
  UNDER_REVIEW: 2,
  ACCEPTED: 3,
  REJECTED: 3,
};

export default function StatusProgress({ status }: { status: string }) {
  if (status === "WITHDRAWN") {
    return (
      <div className={`${panelClass} flex items-center gap-3`}>
        <UserMinus size={20} className="shrink-0 text-slate-500" />
        <p className="text-sm font-medium text-slate-600">
          This application was withdrawn.
        </p>
      </div>
    );
  }

  const completed = completedSteps[status];

  // Unknown statuses have no place on the timeline.
  if (!completed) return null;

  const decision =
    status === "ACCEPTED"
      ? "Accepted"
      : status === "REJECTED"
        ? "Rejected"
        : "Decision";

  const steps = [
    { label: "Submitted", icon: Send },
    { label: "Under Review", icon: Clock },
    { label: decision, icon: status === "REJECTED" ? X : Check },
  ];

  return (
    <section aria-label="Application progress" className={panelClass}>
      <ol className="flex">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const done = index < completed;
          const current = index === completed - 1;
          // The final step takes the colour of the decision.
          const color =
            index === 2 ? (statusColors[status] ?? "#2f62b5") : "#2f62b5";

          return (
            <li
              key={step.label}
              aria-current={current ? "step" : undefined}
              className="relative flex flex-1 flex-col items-center text-center"
            >
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className={`absolute right-1/2 top-5 h-0.5 w-full ${
                    done ? "bg-[#2f62b5]" : "bg-slate-200"
                  }`}
                />
              )}
              <span
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                  done ? "text-white" : "bg-slate-100 text-slate-400"
                } ${current ? "ring-4 ring-slate-200" : ""}`}
                style={done ? { backgroundColor: color } : undefined}
              >
                <Icon size={18} />
              </span>
              <span
                className={`mt-3 text-xs font-semibold sm:text-sm ${
                  done ? "text-[#0f1a2b]" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}