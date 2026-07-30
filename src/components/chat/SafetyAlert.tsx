import { AlertTriangle, ShieldAlert } from "lucide-react";
import type { SafetyNotice } from "@/lib/engine";

export function SafetyAlert({ notice }: { notice: SafetyNotice }) {
  const danger = notice.level === "danger";
  return (
    <div
      role="alert"
      className={`flex gap-3 rounded-2xl border p-4 ${
        danger
          ? "border-danger/30 bg-danger/5"
          : "border-warning/30 bg-warning/5"
      }`}
    >
      <span
        className={`mt-0.5 shrink-0 ${danger ? "text-danger" : "text-warning"}`}
        aria-hidden
      >
        {danger ? (
          <ShieldAlert className="h-5 w-5" />
        ) : (
          <AlertTriangle className="h-5 w-5" />
        )}
      </span>
      <div>
        <p
          className={`text-sm font-semibold ${
            danger ? "text-danger" : "text-warning"
          }`}
        >
          {notice.title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink">{notice.body}</p>
      </div>
    </div>
  );
}
