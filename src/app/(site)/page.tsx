import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { heroImage } from "@/lib/images";
import { Camera, MessageCircle } from "lucide-react";
import { JobStart } from "@/components/JobStart";
import { TrustBar } from "@/components/TrustBar";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { ServiceGrid } from "@/components/ServiceGrid";
import { PhoneMock } from "@/components/PhoneMock";
import { ChatPreview } from "@/components/ChatPreview";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "serviceman.ai — Tell us what you need. We'll get it sorted.",
  },
  description:
    "Tell us what needs doing and answer a few quick questions. We'll prepare your job and send it to suitable local tradies, who come back to you with quotes.",
};

const cameraObservations = [
  "It looks like water may be leaking near this connection.",
  "Can you show me the full wall so I can understand the affected area?",
  "This may require an electrician. Please do not touch the exposed section.",
  "Can you move closer to the damaged section of the fence?",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-gradient-to-b from-white via-white to-blue-tint/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20">
          <div>
            <h1 className="max-w-xl font-display text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
              Tell us what you need. We&rsquo;ll help you get it{" "}
              <span className="word-highlight">sorted.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Let us know what needs doing and answer a few quick questions.
              We&rsquo;ll prepare your job and send it to suitable local
              tradies, who come back to you with quotes.
            </p>

            <div className="mt-8">
              <JobStart />
            </div>

            <div className="mt-10">
              <TrustBar />
            </div>
          </div>

          <div className="relative">
            {/* Decorative warmth behind the photo */}
            <div
              className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-sun/25 blur-2xl"
              aria-hidden
            />
            <div
              className="dot-grid absolute -bottom-8 -left-10 h-36 w-44 opacity-70"
              aria-hidden
            />
            <div className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-3xl shadow-lift sm:aspect-[16/10] lg:aspect-[4/4.6]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Floating AI observation card */}
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur sm:left-6 sm:right-auto sm:max-w-sm">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue text-white">
                  <Camera className="h-3 w-3" aria-hidden />
                </span>
                AI agent
                <span className="soft-pulse h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
              </p>
              <p className="mt-1.5 text-sm leading-snug text-ink">
                &ldquo;I can see the back deck and the gutter line. Can you
                move a little closer to the downpipe?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-blue-tint/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <HowItWorks />
        </div>
      </section>

      {/* Camera feature */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue">
              Camera assistant
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
              Prefer to show it? Use your camera.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              You don&rsquo;t need to know what the issue is called or which
              trade you need. Open your camera, point it at the problem and
              have a conversation with our AI agent.
            </p>
            <ul className="mt-6 space-y-3">
              {cameraObservations.map((observation) => (
                <li
                  key={observation}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-cloud px-4 py-3 text-sm leading-relaxed text-ink"
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue"
                    aria-hidden
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </span>
                  &ldquo;{observation}&rdquo;
                </li>
              ))}
            </ul>
            <Link
              href="/camera"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
            >
              <Camera className="h-5 w-5" aria-hidden />
              Try the camera assistant
            </Link>
          </div>
          <PhoneMock />
        </div>
      </section>

      {/* Chat feature */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <ChatPreview />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue">
            Chat assistant
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
            Prefer to type? Just describe the job.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Start with whatever you know. Our AI agent will ask follow-up
            questions and create a clear job request for you.
          </p>
          <Link
            href="/chat"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Chat with the AI agent
          </Link>
        </div>
      </section>

      {/* Social proof */}
      <Testimonials />

      {/* Popular services */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue">
              Popular services
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
              Jobs we can help you organise
            </h2>
          </div>
          <ServiceGrid />
          <p className="mt-8 text-sm text-muted">
            Looking for something else?{" "}
            <Link
              href="/trades"
              className="font-medium text-blue underline-offset-2 hover:underline"
            >
              See all services
            </Link>{" "}
            or just{" "}
            <Link
              href="/chat"
              className="font-medium text-blue underline-offset-2 hover:underline"
            >
              describe the job
            </Link>{" "}
            — you don&rsquo;t need to pick a category.
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
