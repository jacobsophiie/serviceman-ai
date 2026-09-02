import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getTrade } from "@/lib/data/trades";
import { getTradeDetail } from "@/lib/data/trade-detail";
import { getLocation, inPlace, placeName } from "@/lib/data/locations";
import { tradeImage } from "@/lib/images";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TradeAbout } from "@/components/TradeAbout";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { FinalCTA } from "@/components/FinalCTA";
import { LandingHero } from "@/components/LandingHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tradeSlug: string; locationSlug: string }>;
}): Promise<Metadata> {
  const { tradeSlug, locationSlug } = await params;
  const trade = getTrade(tradeSlug);
  const location = getLocation(locationSlug);
  if (!trade || !location) return {};
  const singular =
    trade.singular.charAt(0).toUpperCase() + trade.singular.slice(1);
  const a = /^[aeiou]/i.test(trade.singular) ? "an" : "a";
  return {
    title: `Find ${a} ${singular} ${inPlace(location)}`,
    description: `Need ${a} ${trade.singular} ${inPlace(location)}? Tell us what you need and answer a few quick questions — we'll create a clear request for suitable local ${trade.name.toLowerCase()}.`,
  };
}

export default async function TradeLocationPage({
  params,
}: {
  params: Promise<{ tradeSlug: string; locationSlug: string }>;
}) {
  const { tradeSlug, locationSlug } = await params;
  const trade = getTrade(tradeSlug);
  const location = getLocation(locationSlug);
  if (!trade || !location) notFound();

  const article = /^[aeiou]/i.test(trade.singular) ? "an" : "a";
  const image = tradeImage(trade.slug);
  const inLoc = inPlace(location);
  const place = placeName(location);
  const prompt = `I need ${article} ${trade.singular} ${inLoc}.`;
  const faqs = [
    {
      question: `Do I need to choose a specific ${trade.singular} ${inLoc}?`,
      answer:
        "No. You submit one job request and the platform sends it to suitable local businesses that service your area — no browsing, comparing or ringing around.",
    },
    {
      question: `How quickly can I organise ${trade.category.toLowerCase()} work ${inLoc}?`,
      answer:
        "Creating the job request takes only a few minutes. If the job is urgent, tell the AI agent and it will be flagged in your request so businesses know to respond quickly.",
    },
    ...trade.faqs.slice(0, 2),
    ...(getTradeDetail(trade.slug)?.faqs ?? []).slice(0, 2),
    {
      question: "Is my address shared publicly?",
      answer:
        "No. Your job is never displayed publicly. Your full address is only used to help arrange the job once you're in contact with a business.",
    },
  ];

  return (
    <>
      <LandingHero
        image={image}
        eyebrow={`${trade.category} · ${location.name}, ${location.stateAbbr}`}
        title={`Need ${article} ${trade.singular} ${inLoc}?`}
        copy={`Tell us about the ${trade.category.toLowerCase()} job. We'll ask the right questions and send a clear brief to licensed local ${trade.name.toLowerCase()} servicing ${place}.`}
        defaultJob={prompt}
        defaultSuburb={location.name}
        tradeSlug={trade.slug}
        locationSlug={location.slug}
        tradesLabel={trade.name.toLowerCase()}
      />

      {/* 2. How it works */}
      <section className="border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <HowItWorks
            tradesLabel={trade.name.toLowerCase()}
            withCta={false}
          />
        </div>
      </section>

      {/* 3. Common jobs in this location */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-navy">
          Common {trade.category.toLowerCase()} jobs {inLoc}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Pick the closest match to start with the right questions, or
          describe the job in your own words.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trade.commonJobs.slice(0, 9).map((job) => (
            <li key={job}>
              <Link
                href={`/chat?trade=${trade.slug}&location=${location.slug}&job=${encodeURIComponent(job)}`}
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

      {/* 4. What the trade does */}
      <TradeAbout trade={trade} />

      {/* 5. Reviews relevant to this trade */}
      <Testimonials tradeSlug={trade.slug} />

      {/* 6. Areas serviced */}
      {location.nearbySuburbs.length > 0 && (
        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-xl font-semibold text-navy">
              {trade.name} servicing areas around {place}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              serviceman.ai matches your job to businesses servicing your
              suburb — including these areas nearby:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {location.nearbySuburbs.map((suburb) => (
                <Link
                  key={suburb.slug}
                  href={`/${trade.slug}/${suburb.slug}`}
                  className="rounded-full border border-line bg-cloud px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-blue hover:text-blue"
                >
                  {suburb.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. FAQs */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 font-display text-3xl font-bold text-navy">
          Frequently asked questions
        </h2>
        <FAQAccordion items={faqs} />
      </section>

      {/* 7. Final CTA */}
      <FinalCTA
        heading={`Sort your ${trade.category.toLowerCase()} job ${inLoc}`}
        chatPrompt={prompt}
      />
    </>
  );
}
