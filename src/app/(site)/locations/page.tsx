import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { inPlace, majorLocations } from "@/lib/data/locations";
import { LandingHero } from "@/components/LandingHero";
import { FinalCTA } from "@/components/FinalCTA";
import { heroImage } from "@/lib/images";

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
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {majorLocations.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/locations/${location.slug}`}
                className="group flex h-full flex-col gap-2 rounded-lg border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue/40"
              >
                <span className="flex items-center gap-2 font-display text-lg font-semibold text-navy">
                  <MapPin className="h-4 w-4 text-blue" aria-hidden />
                  {location.name}
                </span>
                <span className="text-sm text-muted">
                  {location.state} · {location.postcodeRange}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-blue">
                  Post a job {inPlace(location)}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          Don&rsquo;t see your area? serviceman.ai works anywhere in Australia
          —{" "}
          <Link href="/chat" className="font-medium text-blue underline-offset-2 hover:underline">
            just describe your job
          </Link>{" "}
          and tell the agent your suburb.
        </p>
      </section>

      <FinalCTA />
    </>
  );
}
