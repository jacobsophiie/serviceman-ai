import Image from "next/image";
import Link from "next/link";
import { getTrade } from "@/lib/data/trades";
import { tradeImage } from "@/lib/images";

export const popularServices = [
  "plumber",
  "electrician",
  "handyman",
  "painter",
  "air-conditioning",
  "gardener",
  "cleaner",
  "builder",
];

/** Photo tiles for the most-requested trades — shared by the home and get-started pages. */
export function ServiceTiles({ slugs = popularServices }: { slugs?: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
      {slugs.map((slug) => {
        const trade = getTrade(slug);
        if (!trade) return null;
        const image = tradeImage(slug);
        return (
          <li key={slug}>
            <Link href={`/trades/${slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cloud">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-navy group-hover:text-blue">
                {trade.category}
              </h3>
              <p className="mt-0.5 text-sm text-muted">
                {trade.commonJobs.slice(0, 2).join(" · ")}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
