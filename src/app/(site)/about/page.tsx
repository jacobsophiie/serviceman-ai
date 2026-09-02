import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  HeartHandshake,
  Lightbulb,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { heroImage } from "@/lib/images";
import { majorLocations } from "@/lib/data/locations";
import { LandingHero } from "@/components/LandingHero";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "serviceman.ai makes organising trade services simpler. Tell us what you need and we'll turn it into a clear job brief for licensed local trades.",
};

const struggles = [
  "Not knowing which trade you actually need",
  "Struggling to explain the problem clearly",
  "Not knowing which details matter to a trades business",
  "Ringing around and leaving voicemails",
  "Repeating the same story to every business",
  "Getting quotes that don't match the job",
];

const audiences = [
  {
    title: "For homeowners and renters",
    copy: "Describe the job once, in plain English. We ask the right questions, write the brief and bring licensed local trades back to you with quotes.",
    href: "/get-started",
    label: "Get free quotes",
  },
  {
    title: "For trades businesses",
    copy: "Job requests arrive with the details already collected — problem, photos, urgency, location — from customers in the suburbs you service.",
    href: "/for-trades-businesses",
    label: "List your business",
  },
  {
    title: "AI that asks, not diagnoses",
    copy: "Our AI does the admin: the questions, the brief, the matching. Diagnosis and advice stay with the licensed tradesperson who turns up.",
    href: "/how-it-works",
    label: "See how it works",
  },
];

const principles = [
  {
    icon: Sparkles,
    title: "Make it simple",
    copy: "Organising a trade should take minutes, not a weekend of phone calls.",
  },
  {
    icon: Lightbulb,
    title: "Ask better questions",
    copy: "The right follow-up question is worth more than a long form.",
  },
  {
    icon: Clock3,
    title: "Respect the customer's time",
    copy: "One conversation, one clear request — told once.",
  },
  {
    icon: MessageSquareText,
    title: "Help trades understand the job",
    copy: "Clear briefs mean accurate quotes and fewer wasted site visits.",
  },
  {
    icon: HeartHandshake,
    title: "Keep customers in control",
    copy: "You see exactly what will be sent, and you choose who to go with.",
  },
  {
    icon: ShieldCheck,
    title: "Use AI responsibly",
    copy: "Our AI gathers information — it never replaces licensed trade advice.",
  },
];

export default function AboutPage() {
  return (
    <>
      <LandingHero
        image={{
          src: "/images/trades/air-conditioning.jpg",
          alt: "An air-conditioning technician working on a rooftop unit",
        }}
        imageClassName="-scale-x-100 object-[40%_center]"
        eyebrow="About serviceman.ai"
        title="Making it easier to explain what needs fixing"
        copy="Most people only organise a trade a few times a year — and it shows. We built serviceman.ai so you can describe the problem once, in your own words, and let the AI turn it into a job brief that licensed local trades can quote from."
        showSearch={false}
        cta={{ label: "See how it works", href: "/how-it-works" }}
      />

      {/* The problem */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Sound familiar?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Getting a trade in shouldn&rsquo;t be the hardest part of getting
            something fixed. But when you only do it a few times a year, the
            same things trip everyone up.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            serviceman.ai takes that friction out. You describe the everyday
            problem; we handle the trade knowledge, the questions and the
            ring-around.
          </p>
        </div>
        <ul className="divide-y divide-line rounded-lg border border-line bg-white">
          {struggles.map((struggle) => (
            <li
              key={struggle}
              className="flex items-center gap-3 px-5 py-3.5 text-[15px] text-ink"
            >
              <X className="h-4 w-4 shrink-0 text-muted" aria-hidden />
              {struggle}
            </li>
          ))}
        </ul>
      </section>

      {/* Who it's for */}
      <section className="border-y border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Built for both sides of the job
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="flex flex-col rounded-lg border border-line bg-white p-6"
              >
                <h3 className="font-display text-lg font-semibold text-navy">
                  {audience.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                  {audience.copy}
                </p>
                <Link
                  href={audience.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue hover:underline"
                >
                  {audience.label}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          What we stand for
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <li key={principle.title} className="border-t-2 border-line pt-5">
              <principle.icon className="h-6 w-6 text-blue" aria-hidden />
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                {principle.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {principle.copy}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Australian focus */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Built for Australian homes and trades
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Licensing, safety rules and the way trades quote are different
              here, so serviceman.ai is built around them: Australian trade
              categories, licensed businesses only, and suburb-level matching
              across our metro areas.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {majorLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="inline-block rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-navy transition-colors hover:border-blue hover:text-blue"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Testimonials />

      <FinalCTA
        heading="See it for yourself"
        copy="Describe a job — real or imagined — and watch the AI turn it into a clear, structured request."
      />
    </>
  );
}
