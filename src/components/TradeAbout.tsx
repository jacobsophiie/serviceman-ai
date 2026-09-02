import Image from "next/image";
import { ShieldAlert } from "lucide-react";
import type { Trade } from "@/lib/types";
import { getTradeDetail } from "@/lib/data/trade-detail";
import { tradeImage } from "@/lib/images";

/**
 * "What does a plumber do?" — editorial section for trade landing pages.
 * Replaces the old helper-card rows with real category content: a photo,
 * a plain-language description, common call-outs and the safety note.
 */
export function TradeAbout({ trade }: { trade: Trade }) {
  const detail = getTradeDetail(trade.slug);
  if (!detail) return null;

  const image = tradeImage(trade.slug);
  const a = /^[aeiou]/i.test(trade.singular) ? "an" : "a";

  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
            What does {a} {trade.singular} do?
          </h2>
          {detail.whatTheyDo.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-4 text-base leading-relaxed text-muted"
            >
              {paragraph}
            </p>
          ))}

          <h3 className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">
            Common call-outs
          </h3>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {trade.commonJobs.slice(0, 6).map((job) => (
              <li
                key={job}
                className="rounded-full bg-cloud px-3 py-1.5 text-sm font-medium text-navy"
              >
                {job}
              </li>
            ))}
          </ul>

          <p className="mt-6 flex gap-2.5 rounded-lg border border-warning/30 bg-warning/5 px-4 py-3 text-sm leading-relaxed text-ink">
            <ShieldAlert
              className="mt-0.5 h-4 w-4 shrink-0 text-warning"
              aria-hidden
            />
            <span>{trade.safety}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
