"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock3, MapPin, Plus } from "lucide-react";
import { RequireLogin } from "@/components/account/RequireLogin";
import { mockJobs } from "@/lib/mock-account";

const statusLabel = {
  sent: { text: "Sent to trades", className: "bg-cloud text-navy" },
  quotes: { text: "Quotes coming in", className: "bg-blue text-white" },
  completed: { text: "Completed", className: "bg-cloud text-muted" },
} as const;

export function JobsList() {
  return (
    <RequireLogin>
      {(session) => (
        <>
          <section className="border-b border-line bg-white">
            <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-4 py-10 sm:px-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                  My jobs
                </p>
                <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy">
                  Welcome back, {session.name.split(" ")[0]}
                </h1>
              </div>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-md bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-deep"
              >
                <Plus className="h-4 w-4" aria-hidden />
                New job
              </Link>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
            <ul className="space-y-4">
              {mockJobs.map((job) => {
                const status = statusLabel[job.status];
                const received = job.quotes.filter((q) => !q.arrivesLater).length;
                return (
                  <li key={job.id}>
                    <Link
                      href={`/account/jobs/${job.id}`}
                      className="group flex flex-col gap-4 rounded-lg border border-line bg-white p-5 transition-colors hover:border-blue sm:flex-row sm:items-center sm:justify-between sm:p-6"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-display text-lg font-semibold text-navy group-hover:text-blue">
                            {job.title}
                          </h2>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}
                          >
                            {status.text}
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
                          <span className="text-muted/70">{job.id}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-4 sm:shrink-0">
                        {job.status === "completed" ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
                            <Check className="h-4 w-4" aria-hidden />
                            Done by {job.quotes.find((q) => q.id === job.chosenQuoteId)?.business}
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-ink">
                            <span className="font-display text-2xl font-bold text-navy">
                              {received}
                            </span>{" "}
                            of {job.sentTo} quotes in
                          </span>
                        )}
                        <ArrowRight
                          className="h-5 w-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-blue"
                          aria-hidden
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-muted">
              We&rsquo;ll text you the moment a new quote comes in.
            </p>
          </section>
        </>
      )}
    </RequireLogin>
  );
}
