"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

/**
 * The entry point into the job flow: say what you need, then straight into
 * the quick quote form at /quote (location → job questions → contact).
 */

const examplePrompts = [
  "My kitchen sink is leaking",
  "I need an electrician in Sydney",
  "The paint is peeling from my ceiling",
  "My garden is completely overgrown",
  "I need someone to repair a broken fence",
  "My air conditioner is not cooling",
  "I need a handyman in Melbourne",
  "There is water coming through the roof",
];

export function JobStart({
  heading = "Tell us what you need",
  defaultValue = "",
  tradeSlug,
  locationSlug,
}: {
  heading?: string;
  defaultValue?: string;
  tradeSlug?: string;
  locationSlug?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const [exampleIndex, setExampleIndex] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setExampleIndex((i) => (i + 1) % examplePrompts.length),
      3500,
    );
    return () => clearInterval(id);
  }, []);

  function start() {
    const params = new URLSearchParams();
    const prompt = value.trim();
    if (prompt) params.set("prompt", prompt);
    if (tradeSlug) params.set("trade", tradeSlug);
    if (locationSlug) params.set("location", locationSlug);
    router.push(params.size > 0 ? `/quote?${params}` : "/quote");
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
        <h2 className="font-display text-lg font-bold text-navy">{heading}</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            start();
          }}
          className="mt-3 flex flex-col gap-2.5 sm:flex-row"
        >
          <label htmlFor="job-start-input" className="sr-only">
            What do you need help with?
          </label>
          <input
            id="job-start-input"
            ref={input}
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="What do you need help with?"
            className="min-w-0 flex-1 rounded-2xl border border-line bg-cloud px-4 py-3.5 text-base text-ink placeholder:text-muted focus:border-blue focus:outline-none"
            autoComplete="off"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-blue px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            Get free quotes
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </form>
        <p className="mt-3 flex h-8 items-center gap-2 text-sm text-muted" aria-live="polite">
          Try:
          <button
            type="button"
            onClick={() => setValue(examplePrompts[exampleIndex])}
            className="max-w-full truncate rounded-full bg-blue-tint px-3 py-1 font-medium text-blue transition-colors hover:bg-blue/15"
          >
            &ldquo;{examplePrompts[exampleIndex]}&rdquo;
          </button>
        </p>
      </div>
    </div>
  );
}
