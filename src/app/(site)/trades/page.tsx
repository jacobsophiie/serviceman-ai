import type { Metadata } from "next";
import Link from "next/link";
import { ServiceGrid } from "@/components/ServiceGrid";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Plumbing, electrical, painting, gardening and more. Describe the job to our AI agent and we'll prepare your request for suitable local tradies.",
};

export default function TradesIndexPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Jobs we can help you organise
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Whatever needs doing, start by describing it — you don&rsquo;t
            need to pick the right category. If you&rsquo;re not sure,{" "}
            <Link href="/chat" className="font-medium text-blue underline-offset-2 hover:underline">
              just tell our AI agent what&rsquo;s happening
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ServiceGrid all />
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          serviceman.ai is not a directory — these pages don&rsquo;t list
          businesses. Each one starts a conversation with our AI agent, which
          prepares your job request and sends it to suitable local trades
          businesses behind the scenes.
        </p>
      </section>

      <FinalCTA />
    </>
  );
}
