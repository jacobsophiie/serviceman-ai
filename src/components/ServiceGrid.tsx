import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bug,
  Droplets,
  Grid3X3,
  Hammer,
  HardHat,
  Home,
  KeyRound,
  Layers,
  Leaf,
  PaintRoller,
  Ruler,
  Snowflake,
  Sparkles,
  Trees,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { trades } from "@/lib/data/trades";
import { tradeImage } from "@/lib/images";

const iconFor: Record<string, LucideIcon> = {
  plumber: Droplets,
  electrician: Zap,
  painter: PaintRoller,
  handyman: Wrench,
  gardener: Leaf,
  carpenter: Ruler,
  builder: HardHat,
  roofer: Home,
  tiler: Grid3X3,
  concreter: Layers,
  landscaper: Trees,
  cleaner: Sparkles,
  locksmith: KeyRound,
  "pest-control": Bug,
  "air-conditioning": Snowflake,
  removalist: Truck,
};

/* Each trade gets its own tile colour — one of the friendliest tricks the big
   marketplaces use, instead of a wall of identical blue icons. */
const tileFor: Record<string, string> = {
  plumber: "bg-blue-tint text-blue",
  electrician: "bg-sun-tint text-sun-deep",
  painter: "bg-coral-tint text-danger",
  handyman: "bg-violet-tint text-blue-deep",
  gardener: "bg-mint-tint text-success",
  carpenter: "bg-sun-tint text-sun-deep",
  builder: "bg-blue-tint text-navy",
  roofer: "bg-coral-tint text-danger",
  tiler: "bg-teal-tint text-blue-deep",
  concreter: "bg-violet-tint text-navy",
  landscaper: "bg-mint-tint text-success",
  cleaner: "bg-teal-tint text-blue",
  locksmith: "bg-violet-tint text-blue-deep",
  "pest-control": "bg-mint-tint text-success",
  "air-conditioning": "bg-teal-tint text-blue",
  removalist: "bg-sun-tint text-sun-deep",
};

const homePageSlugs = [
  "plumber",
  "electrician",
  "painter",
  "handyman",
  "gardener",
  "carpenter",
  "builder",
  "roofer",
  "cleaner",
  "air-conditioning",
  "pest-control",
  "landscaper",
];

export function ServiceGrid({ all = false }: { all?: boolean }) {
  const shown = all
    ? trades
    : homePageSlugs
        .map((slug) => trades.find((t) => t.slug === slug))
        .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {shown.map((trade) => {
        const Icon = iconFor[trade.slug] ?? Hammer;
        const image = tradeImage(trade.slug);
        const article = /^[aeiou]/i.test(trade.category) ? "an" : "a";
        return (
          <li key={trade.slug}>
            <Link
              href={`/trades/${trade.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-soft"
            >
              <span className="relative block aspect-[4/3] w-full overflow-hidden bg-cloud">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <span
                  className={`absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg shadow-soft backdrop-blur ${
                    tileFor[trade.slug] ?? "bg-white/90 text-blue"
                  }`}
                  aria-hidden
                >
                  <Icon className="h-4 w-4" />
                </span>
              </span>
              <span className="flex flex-1 flex-col gap-1.5 p-4">
                <span className="font-display text-base font-semibold text-navy">
                  {trade.category}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-blue">
                  Describe {article} {trade.category.toLowerCase()} job
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
