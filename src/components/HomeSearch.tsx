"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";

/**
 * The home page's job search: what you need done + where. Both go straight
 * into the chat, which skips its location question when a suburb is given.
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

export function HomeSearch() {
  const router = useRouter();
  const [job, setJob] = useState("");
  const [suburb, setSuburb] = useState("");
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
        router.push(`/chat?${params}`);
      }}
      className="rounded-lg bg-white p-2 shadow-xl shadow-navy/25"
    >
      <div className="flex flex-col gap-2 md:flex-row">
        <label className="flex flex-1 items-center gap-3 rounded-md border border-line px-4 focus-within:border-blue">
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
            className="h-12 w-full min-w-0 bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
          />
        </label>
        <label className="flex items-center gap-3 rounded-md border border-line px-4 focus-within:border-blue md:w-60">
          <MapPin className="h-5 w-5 shrink-0 text-muted" aria-hidden />
          <span className="sr-only">Suburb or postcode</span>
          <input
            type="text"
            value={suburb}
            onChange={(event) => setSuburb(event.target.value)}
            placeholder="Suburb or postcode"
            autoComplete="postal-code"
            className="h-12 w-full min-w-0 bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="h-12 shrink-0 rounded-md bg-blue px-6 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
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
