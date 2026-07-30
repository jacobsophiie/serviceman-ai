import Link from "next/link";
import { ArrowRight, Camera, FileText, Handshake } from "lucide-react";

/**
 * The three-step explainer, shown on the home page, /how-it-works and every
 * landing page. `tradesLabel` makes step two specific to the page — an
 * electrician page promises quotes from electricians, not generic "tradies".
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
      icon: Camera,
      tile: "bg-blue-tint text-blue",
      title: "Show us or tell us",
      copy: "Use your camera or describe the problem in your own words. You don't need to know what it's called or which trade you need.",
    },
    {
      icon: FileText,
      tile: "bg-sun-tint text-sun-deep",
      title: `Get quotes from trusted ${tradesLabel}`,
      copy: `We turn your description into a clear job request and send it to suitable local ${tradesLabel}, who come back to you with quotes.`,
    },
    {
      icon: Handshake,
      tile: "bg-mint-tint text-success",
      title: "Choose the best tradie for the job",
      copy: "Compare the quotes that come back, ask any questions you still have, and go ahead with the one that suits you.",
    },
  ];

  return (
    <div>
      {heading && (
        <h2 className="mb-10 font-display text-3xl font-bold text-navy sm:text-4xl">
          {heading}
        </h2>
      )}
      <ol className="relative grid gap-4 sm:grid-cols-3 sm:gap-6">
        {/* Connecting line between the steps on desktop */}
        <div
          className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-line sm:block"
          aria-hidden
        />
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative flex flex-col gap-3 rounded-3xl border border-line bg-white p-6 shadow-soft"
          >
            <div className="flex items-center gap-3.5">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-blue bg-white font-display text-xl font-extrabold text-blue"
                aria-label={`Step ${index + 1}`}
              >
                {index + 1}
              </span>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${step.tile}`}
              >
                <step.icon className="h-6 w-6" aria-hidden />
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold text-navy">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">{step.copy}</p>
          </li>
        ))}
      </ol>
      {withCta && (
        <div className="mt-9 flex justify-center">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 rounded-full bg-blue px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            Get free quotes
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
