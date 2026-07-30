import type { Metadata } from "next";
import {
  Clock3,
  HeartHandshake,
  Lightbulb,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "serviceman.ai makes organising trade services simpler. Tell an AI agent what you need and we'll prepare the request for suitable local trades businesses.",
};

const struggles = [
  "They don't know which trade they need",
  "They can't explain the problem clearly",
  "They don't know which details matter",
  "They spend time calling multiple businesses",
  "They repeat the same information several times",
  "They receive unclear or mismatched responses",
];

const principles = [
  {
    icon: Sparkles,
    title: "Make it simple",
    copy: "Organising a tradie should take minutes, not a weekend of phone calls.",
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
    title: "Help tradies understand the job",
    copy: "Clear briefs mean accurate quotes and fewer wasted site visits.",
  },
  {
    icon: HeartHandshake,
    title: "Keep customers informed",
    copy: "You always see exactly what will be sent, and you stay in control of it.",
  },
  {
    icon: ShieldCheck,
    title: "Use AI responsibly",
    copy: "Our agent gathers information — it never replaces licensed trade advice.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Making it easier to explain what needs fixing
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            serviceman.ai was created to make organising trade services
            simpler. Instead of searching through directories or trying to
            work out who to call, customers can simply describe the problem
            to an AI agent. The agent asks the right questions, gathers the
            important details and prepares the request for suitable local
            trades businesses.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-bold text-navy">
          The problem we&rsquo;re solving
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Most people only organise a tradie a few times a year, and it shows.
          Customers commonly struggle because:
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {struggles.map((struggle) => (
            <li
              key={struggle}
              className="rounded-2xl border border-line bg-white px-5 py-4 text-[15px] leading-relaxed text-ink"
            >
              {struggle}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
          serviceman.ai solves this by helping customers turn an everyday
          problem into a clear job request — no trade knowledge required.
        </p>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-3xl font-bold text-navy">
            What we stand for
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <li
                key={principle.title}
                className="flex flex-col gap-3 rounded-2xl border border-line bg-cloud p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue">
                  <principle.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold text-navy">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {principle.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA
        heading="See it for yourself"
        copy="Describe a job — real or imagined — and watch the AI agent turn it into a clear, structured request."
      />
    </>
  );
}
