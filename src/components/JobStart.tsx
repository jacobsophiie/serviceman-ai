"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Camera, MessageCircle, Pencil } from "lucide-react";

/**
 * The single entry point into the job flow, in two steps:
 *
 *   1. Say what you need  →  "Get free quotes"
 *   2. Choose how to explain it  →  camera or chat
 *
 * Splitting it keeps one decision on screen at a time; presenting camera and
 * chat side by side up front made the page read as two competing CTAs.
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
  cameraCopy = "Point your camera at the problem and talk it through with our AI agent.",
}: {
  heading?: string;
  defaultValue?: string;
  tradeSlug?: string;
  locationSlug?: string;
  cameraCopy?: string;
}) {
  const [step, setStep] = useState<"describe" | "choose">("describe");
  const [value, setValue] = useState(defaultValue);
  const [exampleIndex, setExampleIndex] = useState(0);
  const chooseHeading = useRef<HTMLHeadingElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setExampleIndex((i) => (i + 1) % examplePrompts.length),
      3500,
    );
    return () => clearInterval(id);
  }, []);

  const prompt = value.trim();

  function buildHref(base: string, withContext: boolean) {
    const params = new URLSearchParams();
    if (prompt) params.set("prompt", prompt);
    if (withContext && tradeSlug) params.set("trade", tradeSlug);
    if (withContext && locationSlug) params.set("location", locationSlug);
    return params.size > 0 ? `${base}?${params}` : base;
  }

  /* ------------------------------------------------ step 2: pick a channel */

  if (step === "choose") {
    const options = [
      {
        href: buildHref("/camera", false),
        icon: Camera,
        title: "Show us with your camera",
        copy: cameraCopy,
        primary: true,
      },
      {
        href: buildHref("/chat", true),
        icon: MessageCircle,
        title: "Tell us what needs to be done",
        copy: "Answer a few questions from our AI agent in a chat.",
        primary: false,
      },
    ];

    return (
      <div className="w-full max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue">
          Step 2 of 2
        </p>

        <div className="mt-3 rounded-3xl border border-line bg-white p-5 shadow-soft">
          <h2
            ref={chooseHeading}
            tabIndex={-1}
            className="font-display text-lg font-bold text-navy focus:outline-none"
          >
            How would you like to explain it?
          </h2>

          {prompt && (
            <div className="mt-3 flex items-start gap-2 rounded-2xl bg-cloud px-4 py-3">
              <p className="min-w-0 flex-1 text-sm leading-relaxed text-ink">
                &ldquo;{prompt}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  setStep("describe");
                  window.setTimeout(() => input.current?.focus(), 0);
                }}
                className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-blue hover:underline"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden />
                Edit
              </button>
            </div>
          )}

          <div className="mt-4 flex flex-col gap-3">
            {options.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className="group flex items-center gap-4 rounded-2xl border border-line p-4 transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-soft"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                    option.primary
                      ? "bg-navy text-white group-hover:bg-blue"
                      : "bg-cloud text-blue"
                  }`}
                >
                  <option.icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-bold text-navy">
                    {option.title}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted">
                    {option.copy}
                  </span>
                </span>
                <ArrowRight
                  className="hidden h-5 w-5 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-blue sm:block"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStep("describe")}
          className="mt-3 px-1 text-sm font-medium text-muted hover:text-ink"
        >
          ← Back
        </button>
      </div>
    );
  }

  /* --------------------------------------------- step 1: say what you need */

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
        <h2 className="font-display text-lg font-bold text-navy">{heading}</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setStep("choose");
            window.setTimeout(() => chooseHeading.current?.focus(), 0);
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
