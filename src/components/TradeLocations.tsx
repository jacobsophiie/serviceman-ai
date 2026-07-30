import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { majorLocations } from "@/lib/data/locations";
import type { Trade } from "@/lib/types";

/** Icon-tile tints cycle so the grid reads colourful but not chaotic. */
const tints = [
  "bg-blue-tint text-blue",
  "bg-mint-tint text-success",
  "bg-sun-tint text-sun-deep",
  "bg-violet-tint text-[#6d5bd0]",
  "bg-teal-tint text-[#0e7490]",
  "bg-coral-tint text-[#c2410c]",
];

/**
 * "Find electricians in your local area" — every major city, one tap into
 * the quote flow with the trade and location already filled in.
 */
export function TradeLocations({ trade }: { trade: Trade }) {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue">
            Local {trade.category.toLowerCase()}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
            Find {trade.name.toLowerCase()} in your local area
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Wherever you are, tell us what you need and we&rsquo;ll match your
            job to {trade.name.toLowerCase()} servicing your suburb.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {majorLocations.map((location, index) => (
            <li key={location.slug}>
              <Link
                href={`/quote?trade=${trade.slug}&location=${location.slug}`}
                className="group flex h-full items-center gap-3.5 rounded-2xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-soft"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tints[index % tints.length]}`}
                >
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] font-semibold leading-snug text-navy">
                    {trade.name} in {location.name}
                  </span>
                  <span className="block text-xs text-muted">
                    {location.name}, {location.stateAbbr}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-blue"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
