import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { inPlace, majorLocations } from "@/lib/data/locations";
import { JobStart } from "@/components/JobStart";
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
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col">
            <p className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-blue">
              <MapPin className="h-4 w-4" aria-hidden />
              Australia wide
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Local trades, organised anywhere
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Wherever the job is, the process is the same: tell us about the
              problem, and we&rsquo;ll prepare your request for suitable trades
              businesses that service your area.
            </p>
            <div className="mt-8">
              <JobStart />
            </div>
          </div>
          <div className="relative hidden min-h-[26rem] overflow-hidden rounded-3xl shadow-lift lg:block">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {majorLocations.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/locations/${location.slug}`}
                className="group flex h-full flex-col gap-2 rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-soft"
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
