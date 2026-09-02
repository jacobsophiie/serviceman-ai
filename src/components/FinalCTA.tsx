import Link from "next/link";

/** Closing call to action — a flat navy band, one button. */
export function FinalCTA({
  heading = "Ready to get it sorted?",
  copy = "Tell us what you need and we'll get you quotes from licensed local tradies — free, with no obligation to hire.",
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
    <section className="bg-navy">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-white/80">
            {copy}
          </p>
        </div>
        <Link
          href={href}
          className="shrink-0 rounded-md bg-white px-6 py-3 text-base font-semibold text-navy transition-colors hover:bg-cloud"
        >
          Get free quotes
        </Link>
      </div>
    </section>
  );
}
