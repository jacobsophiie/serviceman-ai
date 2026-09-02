import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  MapPin,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { heroImage, tradeImage } from "@/lib/images";
import { getTrade, trades } from "@/lib/data/trades";
import { inPlace, majorLocations } from "@/lib/data/locations";
import { HomeSearch } from "@/components/HomeSearch";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: {
    absolute: "serviceman.ai — Find trusted local tradies. Get free quotes.",
  },
  description:
    "Tell us what needs doing and answer a few quick questions. We'll send your job to licensed local tradies, who come back to you with quotes.",
};

const popularServices = [
  "plumber",
  "electrician",
  "handyman",
  "painter",
  "air-conditioning",
  "gardener",
  "cleaner",
  "builder",
];

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

const faqs = [
  {
    question: "Is it free to post a job?",
    answer:
      "Yes. Describing your job and receiving quotes is free. You only deal with the tradie you choose to hire, and you pay them directly for the work.",
  },
  {
    question: "How quickly will I hear back?",
    answer:
      "During business hours we'll come back to you with a rough price and availability within a couple of hours. Urgent jobs are flagged so businesses know to respond quickly.",
  },
  {
    question: "Do I have to hire someone?",
    answer:
      "No. Compare the quotes that come back and only go ahead if one suits you. There's no obligation at any point.",
  },
  {
    question: "Which areas do you cover?",
    answer:
      "Metro areas across Australia, including Sydney, Melbourne, Brisbane, Perth, Adelaide, the Gold Coast, Newcastle, Canberra, Hobart and the Sunshine Coast, plus surrounding suburbs. If we don't cover your suburb yet, we'll tell you straight away.",
  },
  {
    question: "What does the AI actually do?",
    answer:
      "It asks the questions a tradie would ask, turns your answers and photos into a clear job brief, and sends it to suitable licensed businesses. It doesn't diagnose problems or give trade advice — that's for the tradie who quotes.",
  },
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
              Find trusted local tradies.
              <br className="hidden sm:block" /> Get free quotes.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
              Tell us what you need done. We&rsquo;ll match you with licensed
              businesses in your area who come back to you with quotes — free,
              with no obligation to hire.
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
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {popularServices.map((slug) => {
            const trade = getTrade(slug);
            if (!trade) return null;
            const image = tradeImage(slug);
            return (
              <li key={slug}>
                <Link href={`/trades/${slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cloud">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-navy group-hover:text-blue">
                    {trade.category}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted">
                    {trade.commonJobs.slice(0, 2).join(" · ")}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
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
              explain it once. Our AI asks the questions a tradie would ask,
              adds your photos, and writes a brief that licensed businesses
              can quote from straight away.
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

          {/* Example job brief — the artefact the AI produces */}
          <div className="rounded-lg border border-line bg-cloud p-2">
            <div className="rounded-md border border-line bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Example job brief
                </p>
                <span className="rounded-full bg-cloud px-2.5 py-1 text-xs font-medium text-navy">
                  Plumbing
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-navy">
                Leaking kitchen tap
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-4 w-4" aria-hidden />
                Dromana, VIC · Home
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                {[
                  ["Leak", "Constant drip from the pipe under the sink"],
                  ["Spreading", "No — contained in the cupboard"],
                  ["Urgency", "Within the next week"],
                  ["Contact", "Sarah · SMS"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                      {label}
                    </dt>
                    <dd className="mt-1 leading-snug text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Photos
                </p>
                <div className="mt-2 flex gap-2">
                  <Image
                    src="/images/under-sink.jpg"
                    alt="Pipework under a kitchen sink"
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-md object-cover"
                  />
                  <Image
                    src={tradeImage("plumber").src}
                    alt="The tap and benchtop"
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-md object-cover"
                  />
                </div>
              </div>
              <p className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-sm text-ink">
                <Check className="h-4 w-4 shrink-0 text-success" aria-hidden />
                Sent to licensed plumbers servicing Dromana
              </p>
            </div>
          </div>
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
            <FAQAccordion items={faqs} />
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
