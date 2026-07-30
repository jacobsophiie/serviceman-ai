"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { JobBrief } from "@/lib/types";

const loadingStages = [
  "Preparing your job",
  "Checking the details",
  "Finding suitable local trades businesses",
  "Submitting your request",
];

export function SubmissionConfirmation({
  brief,
  reference,
  onRestart,
}: {
  brief: JobBrief;
  reference: string;
  onRestart: () => void;
}) {
  const [stage, setStage] = useState(0);
  const done = stage >= loadingStages.length;

  useEffect(() => {
    if (done) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(
      () => setStage((s) => (reduced ? loadingStages.length : s + 1)),
      reduced ? 0 : 900,
    );
    return () => clearTimeout(id);
  }, [stage, done]);

  const tradeName = brief.tradeName
    ? brief.tradeName.charAt(0).toUpperCase() + brief.tradeName.slice(1)
    : "To be confirmed";

  if (!done) {
    return (
      <div
        className="flex flex-1 flex-col items-center justify-center px-4 py-16"
        aria-live="polite"
      >
        <Loader2 className="h-8 w-8 animate-spin text-blue" aria-hidden />
        <ul className="mt-8 space-y-3">
          {loadingStages.map((label, index) => (
            <li
              key={label}
              className={`flex items-center gap-2.5 text-sm transition-opacity ${
                index < stage
                  ? "text-success"
                  : index === stage
                    ? "font-semibold text-ink"
                    : "text-muted/50"
              }`}
            >
              {index < stage ? (
                <CheckCircle2 className="h-4 w-4" aria-hidden />
              ) : (
                <span
                  className={`h-4 w-4 rounded-full border ${
                    index === stage ? "soft-pulse border-blue" : "border-line"
                  }`}
                  aria-hidden
                />
              )}
              {label}
              {index === stage && <span className="sr-only"> (in progress)</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const submitted = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto w-full max-w-lg flex-1 px-4 py-12 sm:py-16">
      <div className="rise-in text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold text-navy">
          Your job request is ready
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          We&rsquo;ve collected the details local tradies need to understand
          the job. In the live platform, your request would now be sent to
          suitable businesses that service your area.
        </p>
      </div>

      <dl className="mt-8 divide-y divide-line rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-6">
        {[
          ["Job title", brief.title ?? "New job request"],
          ["Trade category", tradeName],
          ["Location", brief.suburb ?? "To be confirmed"],
          ["Job reference", reference],
          ["Date submitted", submitted],
          ["Preferred timeframe", brief.timing ?? brief.urgency ?? "Flexible"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              {label}
            </dt>
            <dd className="text-right text-sm font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 rounded-2xl border border-warning/30 bg-warning/5 px-4 py-3 text-center text-sm text-ink">
        Demo mode: No information has been sent to real trades businesses.
      </p>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="flex-1 rounded-full bg-blue px-6 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-blue-deep"
        >
          Submit another job
        </button>
        <Link
          href="/"
          className="flex-1 rounded-full border border-line px-6 py-3.5 text-center text-base font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
