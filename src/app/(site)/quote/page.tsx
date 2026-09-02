import type { Metadata } from "next";
import { QuoteWizard } from "@/components/quote/QuoteWizard";

export const metadata: Metadata = {
  title: "Get quotes",
  description:
    "Answer a few quick questions about the job and we'll prepare your request for suitable local trades.",
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string; trade?: string; location?: string }>;
}) {
  const { prompt, trade, location } = await searchParams;

  return (
    <section className="mx-auto w-full max-w-2xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <QuoteWizard
        prompt={prompt?.trim() || undefined}
        tradeSlug={trade}
        locationSlug={location}
      />
    </section>
  );
}
