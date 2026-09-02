"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Check,
  Clock3,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Sparkles,
} from "lucide-react";
import { RequireLogin } from "@/components/account/RequireLogin";
import { tradeImage } from "@/lib/images";
import { mockJobs, type MockJob, type MockQuote } from "@/lib/mock-account";

const quickJobs = [
  { slug: "plumber", job: "Leaking taps" },
  { slug: "electrician", job: "Power points not working" },
  { slug: "air-conditioning", job: "Air conditioner not cooling" },
  { slug: "handyman", job: "Flat-pack assembly" },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function receivedQuotes(job: MockJob): MockQuote[] {
  return job.quotes.filter((q) => !q.arrivesLater);
}

export function JobsList() {
  const active = mockJobs.filter((j) => j.status !== "completed");
  const past = mockJobs.filter((j) => j.status === "completed");
  const quotesToReview = active.reduce((n, j) => n + receivedQuotes(j).length, 0);
  const featured = active[0];

  return (
    <RequireLogin>
      {(session) => (
        <>
          {/* Header: greeting, at-a-glance strip, start another job */}
          <section className="border-b border-line bg-white">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">My jobs</p>
              <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
                <h1 className="font-display text-3xl font-bold tracking-tight text-navy">
                  Welcome back, {session.name.split(" ")[0]}
                </h1>
                <div className="flex flex-wrap items-center gap-6">
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
                  <li>
                    <span className="font-display text-lg font-bold text-navy">{active.length}</span>{" "}
                    active {active.length === 1 ? "job" : "jobs"}
                  </li>
                  <li>
                    <span className="font-display text-lg font-bold text-blue">{quotesToReview}</span>{" "}
                    quotes to review
                  </li>
                  <li>
                    <span className="font-display text-lg font-bold text-navy">{past.length}</span>{" "}
                    completed
                  </li>
                </ul>
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 rounded-md bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-deep"
                >
                  <Plus className="h-4 w-4" aria-hidden />
                  Post a new job
                </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
            {/* Jobs */}
            <div>
              {featured && (
                <>
                  <h2 className="font-display text-xl font-bold text-navy">Active job</h2>
                  <FeaturedJob job={featured} />
                </>
              )}

              {past.length > 0 && (
                <>
                  <h2 className="mt-10 font-display text-xl font-bold text-navy">Past jobs</h2>
                  <ul className="mt-4 space-y-3">
                    {past.map((job) => {
                      const chosen = job.quotes.find((q) => q.id === job.chosenQuoteId);
                      return (
                        <li key={job.id}>
                          <Link
                            href={`/account/jobs/${job.id}`}
                            className="group flex items-center gap-4 rounded-lg border border-l-4 border-line border-l-line bg-white px-5 py-4 transition-colors hover:border-blue hover:border-l-blue"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="font-display text-base font-semibold text-navy group-hover:text-blue">
                                {job.title}
                              </p>
                              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-muted">
                                <span>{job.trade}</span>
                                <span>{job.suburb}</span>
                                <span>{job.submittedLabel.replace("Submitted ", "")}</span>
                              </p>
                            </div>
                            {chosen && (
                              <span className="hidden items-center gap-1.5 text-sm font-medium text-success sm:inline-flex">
                                <Check className="h-4 w-4" aria-hidden />
                                Done by {chosen.business}
                              </span>
                            )}
                            <ArrowRight
                              className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-blue"
                              aria-hidden
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 lg:pt-11">
              {featured && <AgentActivity job={featured} />}

              <div className="rounded-lg border border-line bg-white p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">Your details</h2>
                  <button type="button" className="inline-flex items-center gap-1 text-xs font-medium text-blue hover:underline">
                    <Pencil className="h-3 w-3" aria-hidden />
                    Edit
                  </button>
                </div>
                <p className="mt-3 font-medium text-ink">{session.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Phone className="h-4 w-4" aria-hidden />
                  {session.phone}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Bell className="h-4 w-4" aria-hidden />
                  Quotes by SMS
                </p>
              </div>

              <div className="rounded-lg border border-line bg-white p-5">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">Need something else?</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {quickJobs.map((item) => (
                    <li key={item.job}>
                      <Link
                        href={`/chat?trade=${item.slug}&job=${encodeURIComponent(item.job)}`}
                        className="inline-block rounded-md border border-line px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:border-blue hover:text-blue"
                      >
                        {item.job}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </section>
        </>
      )}
    </RequireLogin>
  );
}

/* ------------------------------------------------------------ hero card */

function FeaturedJob({ job }: { job: MockJob }) {
  const received = receivedQuotes(job);
  const photo = job.photos[0] ?? tradeImage(job.tradeSlug);
  const steps = [
    { label: "Submitted", done: true },
    { label: `Sent to ${job.sentTo} ${job.trade.toLowerCase()} businesses`, done: true },
    { label: `${received.length} quotes in`, done: received.length > 0, current: true },
    { label: "Choose a quote", done: false },
  ];

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-l-4 border-line border-l-blue bg-white">
      <div className="grid sm:grid-cols-[220px_1fr]">
        <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-full">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 640px) 220px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-xl font-bold text-navy">{job.title}</h3>
                <span className="rounded-full bg-blue px-2.5 py-0.5 text-xs font-semibold text-white">
                  Quotes coming in
                </span>
              </div>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {job.suburb}
                </span>
                <span>{job.trade}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" aria-hidden />
                  {job.submittedLabel}
                </span>
              </p>
            </div>
            {received.length > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-2.5 py-1 text-xs font-semibold text-blue">
                <span className="soft-pulse h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
                {received.length} new
              </span>
            )}
          </div>

          {/* Inline timeline */}
          <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
            {steps.map((step, index) => (
              <li key={step.label} className="flex items-center gap-2">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    step.done
                      ? "bg-success text-white"
                      : step.current
                        ? "border-2 border-blue"
                        : "border-2 border-line"
                  }`}
                  aria-hidden
                >
                  {step.done && <Check className="h-3 w-3" />}
                </span>
                <span className={step.done || step.current ? "font-medium text-ink" : "text-muted"}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <span className="hidden h-px w-6 bg-line sm:block" aria-hidden />
                )}
              </li>
            ))}
          </ol>

          {/* Quote slots */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Quotes · {received.length} of {job.sentTo}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {received.map((quote) => (
                <li
                  key={quote.id}
                  className="flex items-center gap-2 rounded-md border border-line bg-white py-1.5 pl-1.5 pr-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                    {initials(quote.business)}
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold leading-tight text-navy">{quote.price}</span>
                    <span className="block text-xs leading-tight text-muted">{quote.availability}</span>
                  </span>
                </li>
              ))}
              {Array.from({ length: Math.max(0, job.sentTo - received.length) }).map((_, i) => (
                <li
                  key={`waiting-${i}`}
                  className="flex items-center gap-2 rounded-md border border-dashed border-line py-1.5 pl-1.5 pr-3 text-sm text-muted"
                >
                  <span className="soft-pulse flex h-8 w-8 items-center justify-center rounded-full bg-cloud" aria-hidden>
                    <Clock3 className="h-3.5 w-3.5" />
                  </span>
                  Waiting
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/account/jobs/${job.id}`}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            View quotes
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- agent activity */

function AgentActivity({ job }: { job: MockJob }) {
  const received = receivedQuotes(job);
  const waiting = job.sentTo - received.length;
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
        <Sparkles className="h-4 w-4 text-blue" aria-hidden />
        Your AI agent
      </h2>
      <ol className="mt-4 space-y-3 text-sm text-ink">
        <li className="flex gap-3">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
          <span>
            Sent your brief to {job.sentTo} licensed {job.trade.toLowerCase()} businesses
            <span className="block text-xs text-muted">Today, 9:15am</span>
          </span>
        </li>
        {received.map((quote) => (
          <li key={quote.id} className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
            <span>
              Quote from {quote.business} · {quote.price}
              <span className="block text-xs text-muted">{quote.receivedAgo}</span>
            </span>
          </li>
        ))}
        {waiting > 0 && (
          <li className="flex gap-3">
            <span className="soft-pulse mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-blue" aria-hidden />
            <span>
              Waiting on {waiting} more {waiting === 1 ? "business" : "businesses"} — I&rsquo;ll follow them up at 11am
              <span className="block text-xs text-muted">In progress</span>
            </span>
          </li>
        )}
      </ol>
    </div>
  );
}
