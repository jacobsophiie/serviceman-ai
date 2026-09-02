import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getTrade, trades } from "@/lib/data/trades";
import { getTradeDetail } from "@/lib/data/trade-detail";
import { tradeImage } from "@/lib/images";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TradeAbout } from "@/components/TradeAbout";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { TradeLocations } from "@/components/TradeLocations";
import { FinalCTA } from "@/components/FinalCTA";
import { LandingHero } from "@/components/LandingHero";

export function generateStaticParams() {
  return trades.map((trade) => ({ tradeSlug: trade.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tradeSlug: string }>;
}): Promise<Metadata> {
  const { tradeSlug } = await params;
  const trade = getTrade(tradeSlug);
  if (!trade) return {};
  const a = /^[aeiou]/i.test(trade.singular) ? "an" : "a";
  return {
    title: `Find ${a} ${trade.singular}`,
    description: `Need ${a} ${trade.singular}? Tell us what you need and answer a few quick questions — we'll create a clear request for suitable local ${trade.name.toLowerCase()}.`,
  };
}

export default async function TradePage({
  params,
}: {
  params: Promise<{ tradeSlug: string }>;
}) {
  const { tradeSlug } = await params;
  const trade = getTrade(tradeSlug);
  if (!trade) notFound();

  const article = /^[aeiou]/i.test(trade.singular) ? "an" : "a";
  const image = tradeImage(trade.slug);
  const faqs = [...trade.faqs, ...(getTradeDetail(trade.slug)?.faqs ?? [])];
  const related = trade.relatedTrades
    .map((slug) => getTrade(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <LandingHero
        image={image}
        eyebrow={trade.category}
        title={`Let our AI agent find the best ${trade.name.toLowerCase()} near you`}
        copy={trade.intro}
        defaultJob={`I need ${article} ${trade.singular}`}
        tradeSlug={trade.slug}
        tradesLabel={trade.name.toLowerCase()}
      />

      {/* How it works */}
      <section className="border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <HowItWorks
            tradesLabel={trade.name.toLowerCase()}
            withCta={false}
          />
        </div>
      </section>

      {/* Local areas */}
      <TradeLocations trade={trade} />

      {/* Common jobs */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-navy">
          Common {trade.category.toLowerCase()} jobs
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Pick the closest match and the AI agent will start with the right
          questions — or just describe the job in your own words.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trade.commonJobs.map((job) => (
            <li key={job}>
              <Link
                href={`/chat?trade=${trade.slug}&job=${encodeURIComponent(job)}`}
                className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-5 py-4 text-[15px] font-medium text-ink transition-all hover:border-blue/40"
              >
                {job}
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-blue"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* What the trade does */}
      <TradeAbout trade={trade} />

      {/* Reviews relevant to this trade */}
      <Testimonials tradeSlug={trade.slug} />

      {/* FAQs */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 font-display text-3xl font-bold text-navy">
            Finding the right {trade.singular}
          </h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* Related trades */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-xl font-semibold text-navy">
            Related services
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((relatedTrade) => (
              <Link
                key={relatedTrade.slug}
                href={`/trades/${relatedTrade.slug}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-blue hover:text-blue"
              >
                {relatedTrade.category}
              </Link>
            ))}
          </div>
        </section>
      )}

      <FinalCTA
        heading={`Ready to sort your ${trade.category.toLowerCase()} job?`}
        chatPrompt={`I need ${article} ${trade.singular}`}
      />
    </>
  );
}
