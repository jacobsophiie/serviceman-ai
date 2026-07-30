"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

/**
 * The "doing the work" moment shown while a job request is submitted —
 * steps tick off one by one before the confirmation appears.
 */
export function SearchingSteps({
  steps,
  onFinished,
  heading = "Finding your tradies…",
}: {
  steps: string[];
  onFinished: () => void;
  heading?: string;
}) {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const stepMs = reduced ? 250 : 1100;
    const id = setInterval(
      () => setDoneCount((count) => Math.min(count + 1, steps.length)),
      stepMs,
    );
    return () => clearInterval(id);
  }, [steps.length]);

  useEffect(() => {
    if (doneCount < steps.length) return;
    const id = setTimeout(onFinished, 450);
    return () => clearTimeout(id);
  }, [doneCount, steps.length, onFinished]);

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
      <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
        {heading}
      </h2>
      <ul className="mt-6 space-y-4" aria-live="polite">
        {steps.map((step, index) => {
          const state =
            index < doneCount
              ? "done"
              : index === doneCount
                ? "active"
                : "pending";
          return (
            <li
              key={step}
              className={`flex items-center gap-3 text-[15px] transition-opacity duration-300 ${
                state === "pending" ? "opacity-35" : "opacity-100"
              }`}
            >
              {state === "done" ? (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint-tint text-success">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
              ) : state === "active" ? (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                </span>
              ) : (
                <span
                  className="h-7 w-7 shrink-0 rounded-full border-2 border-line"
                  aria-hidden
                />
              )}
              <span
                className={
                  state === "done" ? "font-medium text-ink" : "text-ink"
                }
              >
                {step}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
