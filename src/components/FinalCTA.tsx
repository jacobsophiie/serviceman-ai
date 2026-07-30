import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Closing call to action. Deliberately a single button — the camera-or-chat
 * choice belongs in step two of the job flow, not here.
 */
export function FinalCTA({
  heading = "Ready to get it sorted?",
  copy = "Tell us what you need and we'll prepare your job request for suitable local tradies. It takes only a few minutes, and you don't need to know which trade you need.",
  chatPrompt,
}: {
  heading?: string;
  copy?: string;
  /** Pre-fills the job form with page context, e.g. "I need a plumber in Melbourne". */
  chatPrompt?: string;
}) {
  const href = chatPrompt
    ? `/get-started?prompt=${encodeURIComponent(chatPrompt)}`
    : "/get-started";

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      {/* A contained card, not a full-bleed band — keeps it distinct from the navy footer below */}
      <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center shadow-lift sm:px-10 sm:py-16">
        {/* Soft glows so the closing block doesn't read flat */}
        <div
          className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue/30 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-sun/20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            {copy}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sun px-8 py-4 text-base font-bold text-navy transition-colors hover:bg-[#e29612]"
            >
              Get free quotes
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Free to submit · No need to know the trade
          </p>
        </div>
      </div>
    </section>
  );
}
