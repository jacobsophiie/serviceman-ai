import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, MapPin, MessageSquareText } from "lucide-react";
import { BusinessSignup } from "@/components/BusinessSignup";

export const metadata: Metadata = {
  title: "For trades businesses",
  description:
    "serviceman.ai sends clear, structured job requests to suitable local trades businesses — with photos, context and customer expectations already collected.",
};

const benefits = [
  {
    icon: ClipboardCheck,
    title: "Complete job briefs",
    copy: "Every request arrives with the problem description, photos, urgency, property type and access details already collected.",
  },
  {
    icon: MapPin,
    title: "Jobs in your service area",
    copy: "You only receive requests from suburbs you service, for the kind of work you do.",
  },
  {
    icon: MessageSquareText,
    title: "Customers ready to talk",
    copy: "Customers choose how they want to be contacted, so your first call already has everything it needs.",
  },
];

export default function ForTradesBusinessesPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue">
            For trades businesses
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Clear jobs, ready to quote
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            serviceman.ai turns customer conversations into structured job
            requests and sends them to suitable local businesses. No chasing
            vague enquiries — the details arrive up front.
          </p>
          <Link
            href="#register"
            className="mt-7 inline-block rounded-full bg-blue px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            Register your business
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cloud text-blue">
                <benefit.icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="font-display text-lg font-semibold text-navy">
                {benefit.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted">{benefit.copy}</p>
            </li>
          ))}
        </ul>

      </section>

      {/* Registration form */}
      <section id="register" className="border-t border-line bg-blue-tint/40 scroll-mt-8">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue">
              Register your business
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
              List your business on serviceman.ai
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Tell us who you are, the work you do and the area you cover.
              We&rsquo;ll only send you job requests that match both.
            </p>
            <ol className="mt-8 space-y-5">
              {[
                {
                  title: "Send us your details",
                  copy: "Business name, contact details, trade categories and service area.",
                },
                {
                  title: "We verify your business",
                  copy: "Licence and insurance checks before anything goes live.",
                },
                {
                  title: "Job briefs start arriving",
                  copy: "Structured requests with photos and context, ready to quote.",
                },
              ].map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-blue bg-white font-display text-base font-extrabold text-blue"
                    aria-label={`Step ${index + 1}`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">
                      {step.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <BusinessSignup />
        </div>
      </section>
    </>
  );
}
