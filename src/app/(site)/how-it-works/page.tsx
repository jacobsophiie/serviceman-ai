import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { HowItWorks } from "@/components/HowItWorks";
import { PhoneMock } from "@/components/PhoneMock";
import { ChatPreview } from "@/components/ChatPreview";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Use your camera or chat with the serviceman.ai AI agent. We ask the right questions, prepare a clear job request and send it to suitable local tradies.",
};

const cameraSteps = [
  "Open the camera assistant.",
  "Show the problem.",
  "Speak naturally with the AI agent.",
  "Follow safe prompts to show useful angles.",
  "Review the job summary.",
  "Submit the request.",
];

const chatSteps = [
  "Describe the issue in your own words.",
  "Answer relevant follow-up questions.",
  "Add photos if available.",
  "Confirm location and timing.",
  "Review the summary.",
  "Submit the request.",
];

const agentDoes = [
  "Helps identify the likely trade",
  "Collects relevant details",
  "Organises the information into a clear request",
];

const agentDoesNot = [
  "Provide licensed trade advice",
  "Replace an onsite inspection",
  "Guarantee a diagnosis from photos or video",
];

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-6 space-y-3">
      {steps.map((step, index) => (
        <li key={step} className="flex items-start gap-3 text-[15px] text-ink">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue/10 text-xs font-bold text-blue"
            aria-hidden
          >
            {index + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20">
          <h1 className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            How Serviceman.ai works
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Tell us what needs doing, get quotes back from suitable local
            tradies, and pick the one that suits you.
          </p>
        </div>
      </section>

      {/* The three steps */}
      <section className="border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <HowItWorks heading="" withCta={false} />
        </div>
      </section>

      {/* Camera flow */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue">
            <Camera className="h-4 w-4" aria-hidden />
            Using your camera
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy">
            Show the problem, talk it through
          </h2>
          <StepList steps={cameraSteps} />
          <Link
            href="/camera"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-blue px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            Try the camera assistant
          </Link>
        </div>
        <PhoneMock />
      </section>

      {/* Chat flow */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ChatPreview />
          </div>
          <div className="order-1 lg:order-2">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Using chat
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy">
              Describe it in your own words
            </h2>
            <StepList steps={chatSteps} />
            <Link
              href="/chat"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-blue px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
            >
              Start a chat
            </Link>
          </div>
        </div>
      </section>

      {/* What the agent does / doesn't */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Using AI responsibly
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy">
            What the AI agent does — and doesn&rsquo;t do
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-navy">
              The AI agent
            </h3>
            <ul className="mt-4 space-y-3">
              {agentDoes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-navy">
              It does not
            </h3>
            <ul className="mt-4 space-y-3">
              {agentDoesNot.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          A qualified tradesperson may need to inspect the problem before
          confirming the required work. The AI agent&rsquo;s job is to make
          sure they arrive already understanding your situation.
        </p>
      </section>

      <FinalCTA />
    </>
  );
}
