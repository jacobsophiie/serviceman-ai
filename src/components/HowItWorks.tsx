import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The three-step explainer, shown on the home page, /how-it-works and every
 * landing page. `tradesLabel` makes step two specific to the page — an
 * electrician page promises electricians, not generic "tradies".
 */
export function HowItWorks({
  tradesLabel = "tradies",
  heading = "How Serviceman.ai works",
  withCta = true,
}: {
  tradesLabel?: string;
  heading?: string;
  withCta?: boolean;
}) {
  const steps = [
    {
      title: "Tell us what you need done",
      copy: "Describe the job in your own words and answer a few quick questions. You don't need to know what it's called or which trade you need.",
    },
    {
      title: `Your AI agent finds the best local ${tradesLabel}`,
      copy: `It turns your answers into a clear job brief, then goes out to licensed ${tradesLabel} in your area and gets them to quote.`,
    },
    {
      title: "Get multiple quotes, choose the best",
      copy: "Compare the quotes that come back and go ahead with the one that suits you — no obligation to hire.",
    },
  ];

  return (
    <div>
      {heading && (
        <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          {heading}
        </h2>
      )}
      <ol className={`grid gap-8 md:grid-cols-3 ${heading ? "mt-10" : ""}`}>
        {steps.map((step, index) => (
          <li key={step.title} className="border-t-2 border-line pt-5">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue bg-white font-display text-base font-bold text-blue"
              aria-label={`Step ${index + 1}`}
            >
              {index + 1}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-navy">
              {step.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {step.copy}
            </p>
          </li>
        ))}
      </ol>
      {withCta && (
        <div className="mt-10">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 rounded-md bg-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            Get free quotes
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
