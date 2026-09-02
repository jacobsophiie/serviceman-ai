"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  MapPin,
} from "lucide-react";
import { detectTrade, getTrade } from "@/lib/data/trades";
import { sendLead } from "@/lib/lead";
import { SearchingSteps } from "@/components/SearchingSteps";
import { getLocation } from "@/lib/data/locations";
import {
  genericQuestionSet,
  sharedQuestions,
  tradeQuestionSets,
  type QuoteQuestion,
} from "@/lib/data/quote-questions";

/**
 * The quick quote form: location → a few job-specific questions from the
 * question matrix → optional detail → contact details → done. One question
 * per screen, radio answers advance automatically.
 */

type Answer = string | string[];

type Step =
  | { kind: "location" }
  | { kind: "question"; question: QuoteQuestion }
  | { kind: "contact" };

const inputClass =
  "w-full rounded-lg border border-line bg-cloud px-4 py-3.5 text-base text-ink placeholder:text-muted focus:border-blue focus:outline-none";

export function QuoteWizard({
  prompt = "",
  tradeSlug,
  locationSlug,
}: {
  prompt?: string;
  tradeSlug?: string;
  locationSlug?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [location, setLocation] = useState(
    () => (locationSlug && getLocation(locationSlug)?.name) || "",
  );
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"form" | "searching" | "done">("form");
  const cardTop = useRef<HTMLDivElement>(null);

  const detectedSlug = useMemo(
    () => tradeSlug ?? detectTrade(prompt)?.slug,
    [tradeSlug, prompt],
  );

  // The trade can also be resolved mid-form by the generic category question.
  const genericAnswer = answers["generic-category"];
  const resolvedSlug =
    detectedSlug ??
    genericQuestionSet.questions["generic-category"].options?.find(
      (option) => option.value === genericAnswer,
    )?.tradeSlug;

  /* Build the step list from current answers. Radio/multi answers with a
     follow-up splice that question in right after its parent. */
  const steps = useMemo<Step[]>(() => {
    const list: Step[] = [{ kind: "location" }];

    const pushChain = (
      questions: Record<string, QuoteQuestion>,
      entryId: string,
    ) => {
      const seen = new Set<string>();
      const walk = (id: string) => {
        const question = questions[id];
        if (!question || seen.has(id)) return;
        seen.add(id);
        list.push({ kind: "question", question });
        const answer = answers[id];
        for (const option of question.options ?? []) {
          const chosen =
            question.type === "multi"
              ? Array.isArray(answer) && answer.includes(option.value)
              : answer === option.value;
          if (chosen && option.followUpId) walk(option.followUpId);
        }
      };
      walk(entryId);
    };

    if (!detectedSlug) {
      pushChain(genericQuestionSet.questions, genericQuestionSet.entryId);
    }
    const tradeSet = resolvedSlug ? tradeQuestionSets[resolvedSlug] : undefined;
    if (tradeSet) pushChain(tradeSet.questions, tradeSet.entryId);

    for (const question of sharedQuestions) {
      list.push({ kind: "question", question });
    }
    list.push({ kind: "contact" });
    return list;
  }, [answers, detectedSlug, resolvedSlug]);

  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const totalSteps = steps.length;
  const tradeName = resolvedSlug ? getTrade(resolvedSlug)?.singular : undefined;

  function goTo(index: number) {
    setStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
    cardTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function next() {
    goTo(stepIndex + 1);
  }

  function answerRadio(question: QuoteQuestion, value: string) {
    setAnswers((current) => {
      const updated = { ...current, [question.id]: value };
      // A changed answer may orphan a previous follow-up's answer; that's
      // harmless — orphaned answers never appear in the step list or summary.
      return updated;
    });
    // Radio selections advance on their own — one tap per question.
    window.setTimeout(() => goTo(stepIndex + 1), 160);
  }

  function toggleMulti(question: QuoteQuestion, value: string) {
    setAnswers((current) => {
      const existing = current[question.id];
      const values = Array.isArray(existing) ? existing : [];
      return {
        ...current,
        [question.id]: values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value],
      };
    });
  }

  function validateContact(): boolean {
    const next: Partial<Record<string, string>> = {};
    if (!contact.name.trim()) next.name = "Please enter your name.";
    const digits = contact.phone.replace(/[^\d]/g, "");
    if (!contact.phone.trim()) next.phone = "Please enter a phone number.";
    else if (digits.length < 8 || digits.length > 12)
      next.phone = "Please enter a valid Australian phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const locationDisplay = location
    .trim()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase());

  /* ------------------------------------------- searching: "doing the work" */

  if (phase === "searching") {
    return (
      <SearchingSteps
        steps={[
          "Reviewing your job details",
          `Locating ${tradeName ? `${tradeName}s` : "trades"} near ${locationDisplay}`,
          "Checking availability",
          "Sending your job request",
        ]}
        onFinished={() => setPhase("done")}
      />
    );
  }

  /* ------------------------------------------------------------ submitted */

  if (phase === "done") {
    const answeredQuestions = steps.flatMap((s) =>
      s.kind === "question" && answers[s.question.id] ? [s.question] : [],
    );
    return (
      <div className="rise-in rounded-lg border border-line bg-white p-6 sm:p-8">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cloud text-blue">
          <BadgeCheck className="h-7 w-7" aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold text-navy">
          Thanks, {contact.name.trim().split(/\s+/)[0]}!
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Your quote has been submitted with local{" "}
          <strong className="font-semibold text-ink">
            {tradeName ? `${tradeName}s` : "trades"}
          </strong>{" "}
          around{" "}
          <strong className="font-semibold text-ink">{locationDisplay}</strong>.
          We&rsquo;ll let you know a rough price and availability in the next
          couple of hours.
        </p>

        <dl className="mt-6 space-y-3 rounded-lg bg-cloud p-4 text-sm">
          {prompt && (
            <div>
              <dt className="font-semibold text-navy">Job</dt>
              <dd className="mt-0.5 text-ink">&ldquo;{prompt}&rdquo;</dd>
            </div>
          )}
          {answeredQuestions.map((question) => {
            const answer = answers[question.id];
            const labels = (question.options ?? [])
              .filter((option) =>
                Array.isArray(answer)
                  ? answer.includes(option.value)
                  : answer === option.value,
              )
              .map((option) => option.label);
            const text = question.type === "text" ? String(answer) : labels.join(", ");
            if (!text) return null;
            return (
              <div key={question.id}>
                <dt className="font-semibold text-navy">{question.question}</dt>
                <dd className="mt-0.5 text-ink">{text}</dd>
              </div>
            );
          })}
        </dl>



        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-blue hover:underline"
        >
          Back to serviceman.ai
        </Link>
      </div>
    );
  }

  /* --------------------------------------------------------------- wizard */

  const progress = Math.round(((stepIndex + 1) / totalSteps) * 100);

  return (
    <div ref={cardTop} className="scroll-mt-24">
      {prompt && (
        <p className="mb-3 text-sm text-muted">
          Getting quotes for:{" "}
          <span className="font-medium text-ink">&ldquo;{prompt}&rdquo;</span>
        </p>
      )}

      <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
        {/* Progress */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue">
            Question {stepIndex + 1} of {totalSteps}
          </p>
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={() => goTo(stepIndex - 1)}
              className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
          )}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-md bg-cloud">
          <div
            className="h-full rounded-md bg-blue transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-7">
          {step.kind === "location" && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (!location.trim()) {
                  setErrors({ location: "Please enter a suburb or postcode." });
                  return;
                }
                setErrors({});
                next();
              }}
            >
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                Where is the job located?
              </h2>
              <div className="relative mt-4">
                <MapPin
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  aria-hidden
                />
                <input
                  type="text"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                    setErrors({});
                  }}
                  placeholder="Suburb or postcode — e.g. Dromana"
                  autoFocus
                  className={`${inputClass} pl-11 ${errors.location ? "border-danger bg-danger/5" : ""}`}
                />
              </div>
              {errors.location && (
                <p className="mt-2 text-sm text-danger" role="alert">
                  {errors.location}
                </p>
              )}
              <button
                type="submit"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
              >
                Next
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </form>
          )}

          {step.kind === "question" && (
            <QuestionStep
              key={step.question.id}
              question={step.question}
              answer={answers[step.question.id]}
              onRadio={(value) => answerRadio(step.question, value)}
              onMultiToggle={(value) => toggleMulti(step.question, value)}
              onText={(value) =>
                setAnswers((current) => ({
                  ...current,
                  [step.question.id]: value,
                }))
              }
              onNext={next}
            />
          )}

          {step.kind === "contact" && (
            <form
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                if (!validateContact()) return;
                sendLead(`New job lead: ${prompt || tradeName || "Job request"}`, {
                  Type: "Job request (quick form)",
                  Trade: tradeName,
                  Job: prompt || undefined,
                  Location: location.trim(),
                  Name: contact.name,
                  Mobile: contact.phone,
                });
                setPhase("searching");
              }}
            >
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                Where should the quotes go?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Trades will use these details to send you their quotes.
              </p>
              <div className="mt-5 grid gap-4">
                <div>
                  <label htmlFor="quote-name" className="mb-1.5 block text-sm font-semibold text-navy">
                    Your full name
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    autoComplete="name"
                    value={contact.name}
                    onChange={(event) =>
                      setContact((c) => ({ ...c, name: event.target.value }))
                    }
                    className={`${inputClass} ${errors.name ? "border-danger bg-danger/5" : ""}`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-danger" role="alert">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="quote-phone" className="mb-1.5 block text-sm font-semibold text-navy">
                    Phone number
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    autoComplete="tel"
                    value={contact.phone}
                    onChange={(event) =>
                      setContact((c) => ({ ...c, phone: event.target.value }))
                    }
                    placeholder="e.g. 0412 345 678"
                    className={`${inputClass} ${errors.phone ? "border-danger bg-danger/5" : ""}`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-danger" role="alert">{errors.phone}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep sm:w-auto"
              >
                Get quotes from trades
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Your details are only used to send you quotes for this job.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------- single question screen */

function QuestionStep({
  question,
  answer,
  onRadio,
  onMultiToggle,
  onText,
  onNext,
}: {
  question: QuoteQuestion;
  answer: Answer | undefined;
  onRadio: (value: string) => void;
  onMultiToggle: (value: string) => void;
  onText: (value: string) => void;
  onNext: () => void;
}) {
  const selectedValues = Array.isArray(answer) ? answer : [];

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
        {question.question}
      </h2>
      {question.hint && (
        <p className="mt-2 text-sm text-muted">{question.hint}</p>
      )}

      {question.type === "radio" && (
        <div className="mt-5 grid gap-2.5" role="radiogroup" aria-label={question.question}>
          {question.options?.map((option) => {
            const selected = answer === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onRadio(option.value)}
                className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-left text-[15px] font-medium transition-all ${
                  selected
                    ? "border-blue bg-cloud text-blue"
                    : "border-line bg-white text-ink hover:border-blue/40"
                }`}
              >
                {option.label}
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? "border-blue bg-blue text-white" : "border-line"
                  }`}
                  aria-hidden
                >
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {question.type === "multi" && (
        <>
          <div className="mt-5 grid gap-2.5">
            {question.options?.map((option) => {
              const selected = selectedValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onMultiToggle(option.value)}
                  className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-left text-[15px] font-medium transition-all ${
                    selected
                      ? "border-blue bg-cloud text-blue"
                      : "border-line bg-white text-ink hover:border-blue/40"
                  }`}
                >
                  {option.label}
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                      selected ? "border-blue bg-blue text-white" : "border-line"
                    }`}
                    aria-hidden
                  >
                    {selected && <Check className="h-3 w-3" />}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={onNext}
            disabled={selectedValues.length === 0}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </>
      )}

      {question.type === "text" && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onNext();
          }}
        >
          <textarea
            rows={4}
            value={typeof answer === "string" ? answer : ""}
            onChange={(event) => onText(event.target.value)}
            placeholder={question.placeholder}
            autoFocus
            className={`${inputClass} mt-5 resize-y`}
          />
          <div className="mt-5 flex items-center gap-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
            >
              Next
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            {question.optional && (
              <button
                type="button"
                onClick={onNext}
                className="text-sm font-medium text-muted hover:text-ink"
              >
                Skip
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
