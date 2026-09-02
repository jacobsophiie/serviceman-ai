import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, Check, ShieldCheck } from "lucide-react";
import { LandingHero } from "@/components/LandingHero";
import { ChatPreview } from "@/components/ChatPreview";
import { JobBriefExample } from "@/components/JobBriefExample";
import { QuotesExample } from "@/components/QuotesExample";
import { PhoneMock } from "@/components/PhoneMock";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { productFaqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Tell us what needs doing, let our AI write the brief and find licensed local trades, then pick from the quotes that come back. Free, no obligation.",
};

const agentDoes = [
  "Asks the questions a tradesperson would ask for your kind of job",
  "Collects the details and photos into a clear brief",
  "Sends it only to licensed businesses servicing your suburb",
];

const agentDoesNot = [
  "Provide licensed trade advice",
  "Replace an onsite inspection",
  "Guarantee a diagnosis from photos or video",
];

function StepNumber({ n }: { n: number }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-blue bg-white font-display text-base font-bold text-blue"
      aria-label={`Step ${n}`}
    >
      {n}
    </span>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <LandingHero
        image={{
          src: "/images/trades-hero.jpg",
          alt: "An electrician checking his phone beside his work ute",
        }}
        imageClassName="object-[70%_center]"
        eyebrow="How it works"
        title="How Serviceman.ai works"
        copy="Tell us what needs doing, let our AI find licensed local trades, and pick from the quotes that come back. Here's exactly what happens, step by step."
      />

      {/* Step 1 — the conversation */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <StepNumber n={1} />
          <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Tell us what you need done
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Type it the way you&rsquo;d say it to a mate — &ldquo;fix a leaking
            kitchen tap&rdquo; is plenty. Our AI then asks the few questions a
            plumber would ask: where it&rsquo;s leaking, whether it&rsquo;s
            constant, if water is spreading. Add a photo if you have one.
          </p>
          <Points
            items={[
              "No need to know the trade or the technical name for the problem",
              "Tap to answer — you only type your suburb, name and number",
              "Takes about two minutes",
            ]}
          />
        </div>
        <ChatPreview />
      </section>

      {/* Step 2 — the brief */}
      <section className="border-y border-line bg-cloud">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div className="lg:order-2">
            <StepNumber n={2} />
            <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Our AI writes the brief and finds the right trades
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Your answers and photos become a clear job brief — the kind a
              trades business can quote from without ringing you back with questions.
              It goes only to licensed businesses that service your suburb and
              do that kind of work.
            </p>
            <Points
              items={[
                "Checks the details are complete",
                "Locates licensed plumbers near Dromana",
                "Checks who is available",
                "Sends the brief — you'll usually hear back within a couple of hours",
              ]}
            />
          </div>
          <div className="lg:order-1">
            <JobBriefExample />
          </div>
        </div>
      </section>

      {/* Step 3 — the quotes */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <StepNumber n={3} />
          <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Quotes come to you. Pick the best one.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Businesses come back with a price and when they can do it. Compare
            them side by side, ask anything you still want to know, and choose
            — or don&rsquo;t. There&rsquo;s no obligation to hire.
          </p>
          <Points
            items={[
              "Multiple quotes for the same brief, so they're easy to compare",
              "Licensed and insured businesses only",
              "You deal directly with the trades business you choose",
            ]}
          />
          <Link
            href="/get-started"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            Get free quotes
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <QuotesExample />
      </section>

      {/* Camera — the optional extra */}
      <section className="border-y border-line bg-cloud">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
              <Camera className="h-4 w-4" aria-hidden />
              Optional
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Prefer to show it? Use your camera.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              If it&rsquo;s easier to point than explain, open the camera
              assistant. It guides you to the angles a tradesperson wants to see,
              captures the photos, and adds them to your brief.
            </p>
            <Link
              href="/camera"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-line bg-white px-6 py-3 text-base font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
            >
              Try the camera assistant
            </Link>
          </div>
          <PhoneMock />
        </div>
      </section>

      {/* What the agent does / doesn't */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Using AI responsibly
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            What the AI does — and doesn&rsquo;t do
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-navy">It does</h3>
            <ul className="mt-4 space-y-3">
              {agentDoes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-navy">It doesn&rsquo;t</h3>
            <ul className="mt-4 space-y-3">
              {agentDoesNot.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          A qualified tradesperson may need to inspect the problem before
          confirming the work. The AI&rsquo;s job is to make sure they arrive
          already understanding your situation.
        </p>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Your questions answered
          </h2>
          <div className="mt-8">
            <FAQAccordion items={productFaqs} />
          </div>
        </div>
      </section>

      <Testimonials />

      <FinalCTA />
    </>
  );
}
