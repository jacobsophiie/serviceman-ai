"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";

/**
 * The job search used in every hero: what you need done + where. Both go
 * straight into the chat, which skips its location question when a suburb
 * is given. `tradeSlug`/`locationSlug` carry landing-page context through.
 */

const examples = [
  "Fix a leaking kitchen tap",
  "Install downlights in the living room",
  "Service a split system air conditioner",
  "Repaint the outside of the house",
  "Mow and edge an overgrown lawn",
  "Replace a hot water system",
  "Regrout a shower",
  "Clear a blocked drain",
];

export function HomeSearch({
  defaultJob = "",
  defaultSuburb = "",
  tradeSlug,
  locationSlug,
  tone = "dark",
}: {
  defaultJob?: string;
  defaultSuburb?: string;
  tradeSlug?: string;
  locationSlug?: string;
  /** "dark" sits on a photo/navy hero; "light" sits on a white page. */
  tone?: "dark" | "light";
}) {
  const router = useRouter();
  const [job, setJob] = useState(defaultJob);
  const [suburb, setSuburb] = useState(defaultSuburb);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setExampleIndex((i) => (i + 1) % examples.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const prompt = job.trim();
        if (!prompt) {
          setError("Tell us what you need done to get started.");
          return;
        }
        const params = new URLSearchParams({ prompt });
        if (suburb.trim()) params.set("suburb", suburb.trim());
        if (tradeSlug) params.set("trade", tradeSlug);
        if (locationSlug) params.set("location", locationSlug);
        router.push(`/chat?${params}`);
      }}
      className={
        tone === "dark"
          ? "rounded-xl bg-white p-2.5 shadow-2xl shadow-navy/30"
          : "rounded-xl border border-line bg-white p-2.5"
      }
    >
      <div className="flex flex-col gap-2.5 md:flex-row md:items-stretch">
        <label className="search-field flex flex-1 items-center gap-3 rounded-lg border border-line px-4">
          <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden />
          <span className="sr-only">What do you need done?</span>
          <input
            type="text"
            value={job}
            onChange={(event) => {
              setJob(event.target.value);
              if (error) setError("");
            }}
            placeholder={`e.g. ${examples[exampleIndex]}`}
            autoComplete="off"
            className="h-14 w-full min-w-0 bg-transparent text-base text-ink placeholder:text-muted focus:outline-none sm:text-[17px]"
          />
        </label>
        <span
          className="hidden shrink-0 items-center px-1 text-base font-medium text-muted md:flex"
          aria-hidden
        >
          in
        </span>
        <label className="search-field flex items-center gap-3 rounded-lg border border-line px-4 md:w-64">
          <MapPin className="h-5 w-5 shrink-0 text-muted" aria-hidden />
          <span className="sr-only">Suburb or postcode</span>
          <input
            type="text"
            value={suburb}
            onChange={(event) => setSuburb(event.target.value)}
            placeholder="Suburb or postcode"
            autoComplete="postal-code"
            className="h-14 w-full min-w-0 bg-transparent text-base text-ink placeholder:text-muted focus:outline-none sm:text-[17px]"
          />
        </label>
        <button
          type="submit"
          className="h-14 shrink-0 rounded-lg bg-blue px-7 text-base font-semibold text-white transition-colors hover:bg-blue-deep sm:text-[17px]"
        >
          Get free quotes
        </button>
      </div>
      {error && (
        <p className="px-2 pb-1 pt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
