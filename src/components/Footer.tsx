import Link from "next/link";
import { Logo } from "@/components/Logo";
import { trades } from "@/lib/data/trades";
import { majorLocations } from "@/lib/data/locations";

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Show us the job. We&rsquo;ll help you get it sorted — with a
              clear job request sent to suitable local tradies.
            </p>
            <p className="mt-6 inline-block rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
              Demo prototype — no jobs are sent to real businesses
            </p>
          </div>

          <nav aria-label="Popular services">
            <h2 className="text-sm font-semibold text-white/90">
              Popular services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {trades.slice(0, 6).map((trade) => (
                <li key={trade.slug}>
                  <Link
                    href={`/trades/${trade.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {trade.category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Locations">
            <h2 className="text-sm font-semibold text-white/90">Locations</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {majorLocations.slice(0, 6).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-sm font-semibold text-white/90">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/how-it-works" className="transition-colors hover:text-white">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" className="transition-colors hover:text-white">
                  Help &amp; FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/for-trades-businesses" className="transition-colors hover:text-white">
                  For trades businesses
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} serviceman.ai — a frontend prototype.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
