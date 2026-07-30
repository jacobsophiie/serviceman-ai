import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getTrade, trades } from "@/lib/data/trades";
import { getTradeDetail } from "@/lib/data/trade-detail";
import { tradeImage } from "@/lib/images";
import { JobStart } from "@/components/JobStart";
import { TrustBar } from "@/components/TrustBar";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TradeAbout } from "@/components/TradeAbout";
import { HowItWorks } from "@/components/HowItWorks";
import { FinalCTA } from "@/components/FinalCTA";

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
    description: `Need ${a} ${trade.singular}? Show or describe the problem to the serviceman.ai job assistant and create a clear request for suitable local ${trade.name.toLowerCase()}.`,
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
      {/* Hero */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue">
              {trade.category}
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Need {article} {trade.singular}? Show us what&rsquo;s happening.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              {trade.intro}
            </p>
            <div className="mt-8">
              <JobStart
                heading={`Tell us what you need ${article} ${trade.singular} for`}
                defaultValue={`I need ${article} ${trade.singular}`}
                tradeSlug={trade.slug}
                cameraCopy={`Show the AI agent the ${trade.category.toLowerCase()} problem and talk it through.`}
              />
            </div>
            <div className="mt-7">
              <TrustBar compact />
            </div>
          </div>
          {/* Stretches to the height of the column beside it, so the hero reads
              as one block rather than a photo with dead space beneath. */}
          <div className="relative hidden min-h-[26rem] overflow-hidden rounded-3xl shadow-lift lg:block">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-blue-tint/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <HowItWorks
            tradesLabel={trade.name.toLowerCase()}
            withCta={false}
          />
        </div>
      </section>

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
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-[15px] font-medium text-ink transition-all hover:border-blue/40 hover:shadow-soft"
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
