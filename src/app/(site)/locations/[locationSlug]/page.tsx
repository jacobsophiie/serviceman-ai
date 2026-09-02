import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getLocation, inPlace, locations, placeName } from "@/lib/data/locations";
import { getTrade } from "@/lib/data/trades";
import { cityImageFor } from "@/lib/data/city-images";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { FinalCTA } from "@/components/FinalCTA";
import { LandingHero } from "@/components/LandingHero";

export function generateStaticParams() {
  return locations.map((location) => ({ locationSlug: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locationSlug: string }>;
}): Promise<Metadata> {
  const { locationSlug } = await params;
  const location = getLocation(locationSlug);
  if (!location) return {};
  return {
    title: `Find local trades ${inPlace(location)}`,
    description: `Find local trades ${inPlace(location)}, ${location.stateAbbr}. Tell the serviceman.ai job assistant what needs doing and we'll prepare your request for suitable local businesses.`,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locationSlug: string }>;
}) {
  const { locationSlug } = await params;
  const location = getLocation(locationSlug);
  if (!location) notFound();

  const inLoc = inPlace(location);
  const place = placeName(location);
  const services = location.popularServices
    .map((slug) => getTrade(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <LandingHero
        image={cityImageFor(location)}
        eyebrow={`${location.name}, ${location.stateAbbr} · ${location.postcodeRange}`}
        title={`Let our AI agent find the best trades ${inLoc}`}
        copy="Tell us the job and your AI agent finds licensed trades businesses servicing your suburb — then brings their quotes back to you."
        defaultSuburb={location.name}
        locationSlug={location.slug}
      />

      {/* How it works */}
      <section className="border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <HowItWorks withCta={false} />
        </div>
      </section>

      {/* Services in this location */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-navy">
          Popular services {inLoc}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {location.intro}
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((trade) => (
            <li key={trade.slug}>
              <Link
                href={`/${trade.slug}/${location.slug}`}
                className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-5 py-4 text-[15px] font-medium text-ink transition-all hover:border-blue/40"
              >
                {trade.category} {inLoc}
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-blue"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Reviews (generic — no single trade on a location page) */}
      <Testimonials />

      {/* Nearby areas */}
      {location.nearbySuburbs.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-xl font-semibold text-navy">
            Areas near {place}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {location.nearbySuburbs.map((suburb) => (
              <Link
                key={suburb.slug}
                href={`/locations/${suburb.slug}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-blue hover:text-blue"
              >
                {suburb.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <FinalCTA
        heading={`Got a job ${inLoc}?`}
        chatPrompt={`I need a trades business ${inLoc}`}
      />
    </>
  );
}
