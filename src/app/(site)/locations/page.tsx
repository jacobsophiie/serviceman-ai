import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { inPlace, majorLocations } from "@/lib/data/locations";
import { LandingHero } from "@/components/LandingHero";
import { FinalCTA } from "@/components/FinalCTA";
import { heroImage } from "@/lib/images";
import { cityImageFor } from "@/lib/data/city-images";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "serviceman.ai helps you organise local trade services across Australia. Tell our AI agent what needs doing and we'll prepare your job request.",
};

export default function LocationsIndexPage() {
  return (
    <>
      <LandingHero
        image={heroImage}
        eyebrow="Australia wide"
        title="Local tradies, wherever you are"
        copy="Tell us what needs doing and where. We'll match you with licensed businesses servicing your suburb, who come back to you with quotes."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ul className="grid gap-6 md:grid-cols-2">
          {majorLocations.map((location) => {
            const image = cityImageFor(location);
            return (
              <li key={location.slug}>
                <Link
                  href={`/locations/${location.slug}`}
                  className="group block overflow-hidden rounded-lg border border-line bg-white"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/10 to-transparent"
                      aria-hidden
                    />
                    <h2 className="absolute bottom-4 left-5 font-display text-2xl font-bold text-white sm:text-3xl">
                      {location.name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                    <span className="text-sm text-muted">
                      {location.state} · {location.postcodeRange}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue">
                      Find tradies {inPlace(location)}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          Don&rsquo;t see your area? serviceman.ai works anywhere in Australia
          —{" "}
          <Link href="/chat" className="font-medium text-blue underline-offset-2 hover:underline">
            just describe your job
          </Link>{" "}
          and tell the agent your suburb.
        </p>
        <p className="mt-3 text-xs text-muted">
          City photos by Wikimedia Commons contributors (
          <a href="/images/cities/CREDITS.md" className="underline underline-offset-2 hover:text-ink">
            credits
          </a>
          ).
        </p>
      </section>

      <FinalCTA />
    </>
  );
}
