import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { heroImage } from "@/lib/images";
import { trades } from "@/lib/data/trades";
import { inPlace, majorLocations } from "@/lib/data/locations";
import { HomeSearch } from "@/components/HomeSearch";
import { ServiceTiles } from "@/components/ServiceTiles";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JobBriefExample } from "@/components/JobBriefExample";
import { productFaqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: {
    absolute: "serviceman.ai — Your AI agent finds the best local tradies",
  },
  description:
    "Tell us the job and your AI agent gets to work — asking the right questions, writing the brief and finding licensed local tradies to quote. Free, no obligation.",
};

const trustPoints = [
  {
    icon: Wallet,
    title: "Free to post a job",
    copy: "Describing your job and getting quotes costs nothing.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed local businesses",
    copy: "Your job only goes to businesses servicing your suburb.",
  },
  {
    icon: Users,
    title: "Multiple quotes",
    copy: "Compare price and availability side by side.",
  },
  {
    icon: BadgeCheck,
    title: "No obligation",
    copy: "Only go ahead if a quote suits you.",
  },
];

const briefChecks = [
  "Asks the questions a tradie would ask for your kind of job",
  "Adds your photos so businesses can quote accurately",
  "Sends the brief only to licensed businesses servicing your suburb",
  "Quotes come to you — you choose who to go with",
];

export default function HomePage() {
  return (
    <>
      {/* Hero — photo, one headline, one job */}
      <section className="relative isolate overflow-hidden bg-navy">
        <Image
          src={heroImage.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Uniform overlay on phones (text spans the width); a left-to-right fade on desktop */}
        <div className="absolute inset-0 bg-navy/75 lg:hidden" aria-hidden />
        <div
          className="absolute inset-0 hidden bg-gradient-to-r from-navy/90 via-navy/70 to-navy/30 lg:block"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Tell us the job.
              <br className="hidden sm:block" /> Our AI agent finds the best local tradies.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
              Describe what needs doing and your AI agent gets to work: it asks
              the right questions, writes the brief, and tracks down licensed
              trades businesses in your area to quote. Free, no obligation.
            </p>
          </div>
          <div className="mt-8 max-w-3xl">
            <HomeSearch />
          </div>
          <p className="mt-4 text-sm text-white/70">
            Free to post · Takes about 2 minutes · No obligation
          </p>
        </div>
      </section>

      {/* Popular services */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            What do you need help with?
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
        <Link
          href="/trades"
          className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-blue hover:underline sm:hidden"
        >
          All services
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>

      {/* Trust row */}
      <section className="border-y border-line bg-cloud">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.title} className="flex gap-3">
              <point.icon className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden />
              <div>
                <h3 className="font-semibold text-navy">{point.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {point.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <HowItWorks />
      </section>

      {/* One request, multiple quotes — with the brief the AI produces */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              One request. Multiple quotes.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Instead of ringing around and explaining the job five times,
              explain it once. Your AI agent asks the questions a tradie would
              ask, adds your photos, writes the brief — then goes and finds
              licensed businesses to quote on it.
            </p>
            <ul className="mt-6 space-y-3">
              {briefChecks.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/get-started"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
            >
              Get free quotes
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <JobBriefExample />
        </div>
      </section>

      <Testimonials />

      {/* Browse by trade and location */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              Popular services
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
              {trades.map((trade) => (
                <li key={trade.slug}>
                  <Link
                    href={`/trades/${trade.slug}`}
                    className="text-ink hover:text-blue hover:underline"
                  >
                    {trade.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              Tradies near you
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
              {majorLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-ink hover:text-blue hover:underline"
                  >
                    Tradies {inPlace(location)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
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

      {/* For tradies */}
      <section className="bg-navy">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Are you a tradie?
            </h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-white/80">
              Get job requests that arrive with the details already collected —
              ready to quote, from customers in the suburbs you service.
            </p>
          </div>
          <Link
            href="/for-trades-businesses"
            className="shrink-0 rounded-md bg-white px-6 py-3 text-base font-semibold text-navy transition-colors hover:bg-cloud"
          >
            List your business
          </Link>
        </div>
      </section>
    </>
  );
}
