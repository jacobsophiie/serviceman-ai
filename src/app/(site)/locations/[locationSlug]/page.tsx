import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { getLocation, inPlace, locations, placeName } from "@/lib/data/locations";
import { getTrade } from "@/lib/data/trades";
import { heroImage } from "@/lib/images";
import { JobStart } from "@/components/JobStart";
import { TrustBar } from "@/components/TrustBar";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { FinalCTA } from "@/components/FinalCTA";

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
    title: `Find local tradies ${inPlace(location)}`,
    description: `Find local tradies ${inPlace(location)}, ${location.stateAbbr}. Tell the serviceman.ai job assistant what needs doing and we'll prepare your request for suitable local businesses.`,
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
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col">
            <p className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-blue">
              <MapPin className="h-4 w-4" aria-hidden />
              {location.name}, {location.stateAbbr} · {location.postcodeRange}
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Find local tradies {inLoc}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Tell our AI agent what needs to be done. We&rsquo;ll help
              identify the right trade, collect the job details and prepare
              the request for suitable local businesses.
            </p>
            <div className="mt-8">
              <JobStart
                heading={`Tell us what you need done ${inLoc}`}
                locationSlug={location.slug}
              />
            </div>
            <div className="mt-7">
              <TrustBar />
            </div>
          </div>
          <div className="relative hidden min-h-[26rem] lg:block">
            <div className="relative h-full overflow-hidden rounded-3xl shadow-lift">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Coverage card — grounds the page in the actual service area. */}
            <div className="absolute -bottom-4 left-5 right-5 rounded-2xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                Servicing {place} and surrounds
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {location.nearbySuburbs.slice(0, 5).map((suburb) => (
                  <span
                    key={suburb.slug}
                    className="rounded-full bg-cloud px-2.5 py-1 text-xs font-medium text-navy"
                  >
                    {suburb.name}
                  </span>
                ))}
                {location.nearbySuburbs.length > 5 && (
                  <span className="rounded-full bg-cloud px-2.5 py-1 text-xs font-medium text-muted">
                    +{location.nearbySuburbs.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-blue-tint/50">
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
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-[15px] font-medium text-ink transition-all hover:border-blue/40 hover:shadow-soft"
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
        chatPrompt={`I need a tradie ${inLoc}`}
      />
    </>
  );
}
