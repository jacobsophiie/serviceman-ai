"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Bell,
  Check,
  Clock3,
  MapPin,
  MessageSquareText,
  Phone,
  Star,
  X,
} from "lucide-react";
import { RequireLogin } from "@/components/account/RequireLogin";
import { getMockJob, type MockQuote } from "@/lib/mock-account";

export function JobDetail({ id }: { id: string }) {
  const job = getMockJob(id);
  const [revealed, setRevealed] = useState(false);
  const [toast, setToast] = useState(false);
  const [chosen, setChosen] = useState<string | undefined>(job?.chosenQuoteId);
  const [declined, setDeclined] = useState<string[]>([]);
  const quotesRef = useRef<HTMLDivElement>(null);

  // The third quote "arrives" a few seconds in, with a notification.
  useEffect(() => {
    if (!job || job.status !== "quotes") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const show = setTimeout(
      () => {
        setRevealed(true);
        if (!reduced) setToast(true);
      },
      reduced ? 0 : 3200,
    );
    const hide = setTimeout(() => setToast(false), 10000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [job]);

  if (!job) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-navy">We couldn&rsquo;t find that job</h1>
        <Link href="/account" className="mt-4 inline-block text-sm font-semibold text-blue hover:underline">
          Back to my jobs
        </Link>
      </section>
    );
  }

  const visibleQuotes = job.quotes.filter((q) => !q.arrivesLater || revealed);
  const chosenQuote = job.quotes.find((q) => q.id === chosen);
  const isCompleted = job.status === "completed";

  return (
    <RequireLogin>
      {() => (
        <>
          {/* Page header */}
          <section className="border-b border-line bg-white">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
              <Link
                href="/account"
                className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                My jobs
              </Link>
              <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-navy">
                      {job.title}
                    </h1>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isCompleted ? "bg-cloud text-muted" : "bg-blue text-white"
                      }`}
                    >
                      {isCompleted
                        ? "Completed"
                        : `${visibleQuotes.length} of ${job.sentTo} quotes in`}
                    </span>
                  </div>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {job.suburb}
                    </span>
                    <span>{job.trade}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden />
                      {job.submittedLabel}
                    </span>
                    <span className="text-muted/70">Ref {job.id}</span>
                  </p>
                </div>
                {!isCompleted && (
                  <p className="inline-flex items-center gap-2 rounded-md border border-line bg-cloud px-3 py-2 text-sm text-ink">
                    <Bell className="h-4 w-4 text-blue" aria-hidden />
                    We&rsquo;ll text you as each quote arrives
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px]">
            {/* Quotes */}
            <div ref={quotesRef}>
              {chosenQuote && (
                <div className="mb-6 flex items-start gap-3 rounded-lg border border-success/30 bg-success/5 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success text-white">
                    <Check className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-navy">
                      {isCompleted
                        ? `Completed by ${chosenQuote.business}`
                        : `You've chosen ${chosenQuote.business}`}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {isCompleted
                        ? `${chosenQuote.price} · Finished on time. Thanks for using serviceman.ai.`
                        : `They'll be in touch to confirm ${chosenQuote.availability.toLowerCase()}. We've let the other businesses know.`}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-xl font-bold text-navy">
                  {isCompleted ? "Quote accepted" : "Your quotes"}
                </h2>
                {!isCompleted && (
                  <p className="text-sm text-muted">
                    Sent to {job.sentTo} licensed {job.trade.toLowerCase()} businesses
                  </p>
                )}
              </div>

              <ul className="mt-4 space-y-4">
                {visibleQuotes.map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    quote={quote}
                    state={
                      chosen === quote.id
                        ? "chosen"
                        : chosen || declined.includes(quote.id)
                          ? "muted"
                          : "open"
                    }
                    locked={Boolean(chosen) || isCompleted}
                    onAccept={() => setChosen(quote.id)}
                    onDecline={() => setDeclined((d) => [...d, quote.id])}
                    isNew={Boolean(quote.arrivesLater)}
                  />
                ))}
              </ul>

              {!isCompleted && visibleQuotes.length < job.sentTo && !chosen && (
                <p className="mt-5 flex items-center gap-2 text-sm text-muted">
                  <span className="soft-pulse h-2 w-2 rounded-full bg-blue" aria-hidden />
                  Waiting on {job.sentTo - visibleQuotes.length} more{" "}
                  {job.sentTo - visibleQuotes.length === 1 ? "business" : "businesses"} — usually within a couple of hours.
                </p>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="rounded-lg border border-line bg-white p-5">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Your job brief
                </h2>
                <dl className="mt-3 space-y-3 text-sm">
                  {job.details.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
                      <dd className="mt-0.5 leading-snug text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
                {job.photos.length > 0 && (
                  <>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">Photos</p>
                    <div className="mt-2 flex gap-2">
                      {job.photos.map((photo) => (
                        <Image
                          key={photo.src}
                          src={photo.src}
                          alt={photo.alt}
                          width={72}
                          height={72}
                          className="h-[72px] w-[72px] rounded-md object-cover"
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="rounded-lg border border-line bg-white p-5">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">Timeline</h2>
                <ol className="mt-3 space-y-3 text-sm">
                  <TimelineItem done label="Job submitted" when={job.submittedLabel.replace("Submitted ", "")} />
                  <TimelineItem
                    done
                    label={`Brief sent to ${job.sentTo} licensed ${job.trade.toLowerCase()} businesses`}
                    when="A minute later"
                  />
                  {visibleQuotes.map((quote) => (
                    <TimelineItem key={quote.id} done label={`Quote from ${quote.business}`} when={quote.receivedAgo} />
                  ))}
                  {!isCompleted && !chosen && (
                    <TimelineItem label="You choose a quote" when="Whenever you're ready" />
                  )}
                  {chosen && !isCompleted && <TimelineItem done label={`Chosen: ${chosenQuote?.business}`} when="Just now" />}
                </ol>
              </div>

              <div className="rounded-lg border border-line bg-white p-5">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">Contact</h2>
                <p className="mt-3 text-sm font-medium text-ink">{job.contact.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  {job.contact.method === "Email" ? (
                    <MessageSquareText className="h-4 w-4" aria-hidden />
                  ) : (
                    <Phone className="h-4 w-4" aria-hidden />
                  )}
                  {job.contact.method} · {job.contact.value}
                </p>
              </div>
            </aside>
          </section>

          {/* Notification toast */}
          {toast && (
            <div
              role="status"
              className="rise-in fixed bottom-5 right-5 z-50 flex w-[22rem] max-w-[calc(100vw-2.5rem)] items-start gap-3 rounded-lg border border-line bg-white p-4 shadow-2xl shadow-navy/20"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue text-white">
                <Bell className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-navy">New quote from Dromana Plumbing Services</p>
                <p className="mt-0.5 text-sm text-muted">$175 fixed · Today, 4pm</p>
                <button
                  type="button"
                  onClick={() => {
                    setToast(false);
                    quotesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="mt-2 text-sm font-semibold text-blue hover:underline"
                >
                  View quote
                </button>
              </div>
              <button
                type="button"
                onClick={() => setToast(false)}
                aria-label="Dismiss"
                className="text-muted hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          )}
        </>
      )}
    </RequireLogin>
  );
}

function QuoteCard({
  quote,
  state,
  locked,
  isNew,
  onAccept,
  onDecline,
}: {
  quote: MockQuote;
  state: "open" | "chosen" | "muted";
  locked: boolean;
  isNew: boolean;
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <li
      className={`rounded-lg border bg-white p-5 transition-opacity sm:p-6 ${isNew ? "rise-in" : ""} ${
        state === "chosen" ? "border-blue" : "border-line"
      } ${state === "muted" ? "opacity-60" : ""}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-display text-lg font-semibold text-navy">
            {quote.business}
            <BadgeCheck className="h-4 w-4 text-blue" aria-label="Licensed and insured" />
            {isNew && state !== "muted" && (
              <span className="rounded-full bg-blue px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                New
              </span>
            )}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-sun text-sun" aria-hidden />
              {quote.rating} · {quote.reviews} reviews
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" aria-hidden />
              {quote.availability}
            </span>
            <span>Received {quote.receivedAgo}</span>
          </p>
        </div>
        <p className="font-display text-2xl font-bold text-navy">{quote.price}</p>
      </div>
      <p className="mt-4 rounded-md bg-cloud px-4 py-3 text-[15px] leading-relaxed text-ink">
        &ldquo;{quote.message}&rdquo;
      </p>
      {state === "chosen" ? (
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-success">
          <Check className="h-4 w-4" aria-hidden />
          Accepted
        </p>
      ) : state === "muted" ? (
        <p className="mt-4 text-sm text-muted">Not chosen</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onAccept}
            disabled={locked}
            className="rounded-md bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-deep disabled:opacity-50"
          >
            Accept quote
          </button>
          <button
            type="button"
            onClick={onDecline}
            disabled={locked}
            className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue disabled:opacity-50"
          >
            Decline
          </button>
        </div>
      )}
    </li>
  );
}

function TimelineItem({ label, when, done = false }: { label: string; when: string; done?: boolean }) {
  return (
    <li className="flex gap-3">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          done ? "bg-success text-white" : "border-2 border-line"
        }`}
        aria-hidden
      >
        {done && <Check className="h-3 w-3" />}
      </span>
      <span>
        <span className={done ? "text-ink" : "text-muted"}>{label}</span>
        <span className="block text-xs text-muted">{when}</span>
      </span>
    </li>
  );
}
