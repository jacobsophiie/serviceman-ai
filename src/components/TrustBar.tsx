import { BadgeCheck, Clock3, MapPin, ShieldCheck } from "lucide-react";

/**
 * Trust strip shown under heroes. Sticks to true product facts rather than
 * invented review counts — the warmth comes from the coloured tiles.
 */
const points = [
  {
    icon: BadgeCheck,
    label: "Free to post a job",
    tile: "bg-mint-tint text-success",
  },
  {
    icon: Clock3,
    label: "Takes about 2 minutes",
    tile: "bg-sun-tint text-sun-deep",
  },
  {
    icon: ShieldCheck,
    label: "Licensed, local businesses",
    tile: "bg-blue-tint text-blue",
  },
  {
    icon: MapPin,
    label: "Matched to your suburb",
    tile: "bg-coral-tint text-danger",
  },
];

export function TrustBar({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={
        compact
          ? "flex flex-wrap gap-x-6 gap-y-2.5"
          : "grid grid-cols-2 gap-3 sm:grid-cols-4"
      }
    >
      {points.map((point) => (
        <li
          key={point.label}
          className="flex items-center gap-2.5 text-sm font-medium text-ink"
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${point.tile}`}
          >
            <point.icon className="h-4 w-4" aria-hidden />
          </span>
          {point.label}
        </li>
      ))}
    </ul>
  );
}
