import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeSearch } from "@/components/HomeSearch";
import { TrustBar } from "@/components/TrustBar";

/**
 * The hero every page shares: a photo under a navy wash, a centred headline,
 * and the job search with the page's trade/location already filled in.
 */
export function LandingHero({
  image,
  eyebrow,
  title,
  copy,
  defaultJob,
  defaultSuburb,
  tradeSlug,
  locationSlug,
  tradesLabel,
  imageClassName = "",
  showSearch = true,
  cta,
}: {
  image: { src: string; alt: string };
  eyebrow?: string;
  title: ReactNode;
  copy: string;
  defaultJob?: string;
  defaultSuburb?: string;
  tradeSlug?: string;
  locationSlug?: string;
  tradesLabel?: string;
  /** Extra classes for the photo, e.g. an object-position. */
  imageClassName?: string;
  /** Hide the job search (e.g. on the About page) and show `cta` instead. */
  showSearch?: boolean;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <Image
        src={image.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover ${imageClassName}`}
      />
      <div className="absolute inset-0 bg-navy/75" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pb-28 sm:pt-24">
        <div className="mx-auto max-w-3xl">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2 text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
            {copy}
          </p>
        </div>
        {showSearch ? (
          <>
            <div className="mx-auto mt-9 max-w-4xl text-left">
              <HomeSearch
                defaultJob={defaultJob}
                defaultSuburb={defaultSuburb}
                tradeSlug={tradeSlug}
                locationSlug={locationSlug}
              />
            </div>
            <div className="mt-5 flex justify-center">
              <TrustBar tone="dark" tradesLabel={tradesLabel} />
            </div>
          </>
        ) : cta ? (
          <Link
            href={cta.href}
            className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-base font-semibold text-navy transition-colors hover:bg-cloud"
          >
            {cta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
