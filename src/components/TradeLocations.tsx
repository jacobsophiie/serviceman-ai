import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { majorLocations } from "@/lib/data/locations";
import type { Trade } from "@/lib/types";

/**
 * "Find electricians in your local area" — every major city, one tap into
 * the chat with the trade and location already filled in.
 */
export function TradeLocations({ trade }: { trade: Trade }) {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          Find {trade.name.toLowerCase()} in your local area
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Wherever you are, tell us what you need and we&rsquo;ll match your
          job to {trade.name.toLowerCase()} servicing your suburb.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {majorLocations.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/chat?trade=${trade.slug}&location=${location.slug}`}
                className="group flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 transition-colors hover:border-blue"
              >
                <MapPin className="h-5 w-5 shrink-0 text-muted" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-navy group-hover:text-blue">
                    {trade.name} in {location.name}
                  </span>
                  <span className="block text-xs text-muted">
                    {location.stateAbbr}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-blue"
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
