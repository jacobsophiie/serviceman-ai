import type { Metadata } from "next";
import { HomeSearch } from "@/components/HomeSearch";
import { HowItWorks } from "@/components/HowItWorks";

export const metadata: Metadata = {
  title: "Describe your job",
  description:
    "Tell our AI agent what needs doing, or show it with your camera. We'll prepare a clear job request for suitable local tradies.",
};

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = params.prompt;
  const prefill = Array.isArray(raw) ? raw[0] : raw;

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20">
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            What needs doing?
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Describe the job in your own words, or show it with your camera.
            You don&rsquo;t need to know which trade you need — that&rsquo;s
            our job.
          </p>
          <div className="mt-9 flex w-full justify-center">
            <HomeSearch tone="light" defaultJob={prefill} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <HowItWorks withCta={false} />
      </section>
    </>
  );
}
