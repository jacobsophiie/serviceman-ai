import { Check } from "lucide-react";
import { progressStages } from "@/lib/engine";

export function JobProgress({ current }: { current: number }) {
  return (
    <div aria-label="Creating your job request">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        Creating your job request
      </p>
      <ol className="mt-3 space-y-2.5">
        {progressStages.map((stage, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li key={stage} className="flex items-center gap-2.5 text-sm">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  done
                    ? "bg-success text-white"
                    : active
                      ? "bg-blue text-white"
                      : "border border-line bg-white text-muted"
                }`}
                aria-hidden
              >
                {done ? <Check className="h-3 w-3" /> : index + 1}
              </span>
              <span
                className={
                  active
                    ? "font-semibold text-ink"
                    : done
                      ? "text-ink"
                      : "text-muted"
                }
              >
                {stage}
                {active && <span className="sr-only"> (current step)</span>}
                {done && <span className="sr-only"> (complete)</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
