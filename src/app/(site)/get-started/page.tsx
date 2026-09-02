import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTrade } from "@/lib/data/trades";
import { productFaqs } from "@/lib/data/faqs";
import { LandingHero } from "@/components/LandingHero";
import { ServiceTiles } from "@/components/ServiceTiles";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Get free quotes",
  description:
    "Tell us what needs doing and we'll get licensed local trades to quote. Free, and no obligation to hire.",
};

/** One-tap starting points: the three most common jobs for the busiest trades. */
const commonJobs = ["plumber", "electrician", "handyman", "air-conditioning"].flatMap(
  (slug) =>
    (getTrade(slug)?.commonJobs ?? []).slice(0, 3).map((job) => ({ slug, job })),
);

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = params.prompt;
  const prefill = Array.isArray(raw) ? raw[0] : raw;

  return (
    <>
      <LandingHero
        image={{
          src: "/images/trades/painter.jpg",
          alt: "A roller laying fresh paint on a wall",
        }}
        eyebrow="Get free quotes"
        title="What needs doing?"
        copy="Tell your AI agent what needs doing — you don't need to know which trade. It asks a few quick questions, then finds licensed trades businesses in your area to quote. Free, no obligation."
        defaultJob={prefill}
      />

      {/* One-tap starts */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          Or start with a common job
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Pick the closest match and we&rsquo;ll begin with the right questions
          straight away.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {commonJobs.map(({ slug, job }) => (
            <li key={`${slug}-${job}`}>
              <Link
                href={`/chat?trade=${slug}&job=${encodeURIComponent(job)}`}
                className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:border-blue hover:text-blue"
              >
                {job}
                <ArrowRight className="h-3.5 w-3.5 text-muted" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Browse by trade */}
      <section className="border-y border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Browse by trade
            </h2>
            <Link
              href="/trades"
              className="hidden items-center gap-1 text-sm font-semibold text-blue hover:underline sm:inline-flex"
            >
              All services
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-8">
            <ServiceTiles />
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <HowItWorks heading="What happens next" withCta={false} />
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-cloud">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Your questions answered
          </h2>
          <div className="mt-8">
            <FAQAccordion items={productFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
