import { BadgeCheck, Clock3, ShieldCheck } from "lucide-react";

/**
 * Trust strip shown under heroes. Sticks to true product facts rather than
 * invented review counts — the warmth comes from the coloured tiles.
 * `tradesLabel` makes the match point page-specific: "the best electricians"
 * on the electrician page, "the best tradies" everywhere else.
 */
export function TrustBar({
  compact = false,
  tradesLabel = "tradies",
}: {
  compact?: boolean;
  tradesLabel?: string;
}) {
  const points = [
    {
      icon: BadgeCheck,
      label: "Free to post a job",
      tile: "bg-mint-tint text-success",
    },
    {
      icon: Clock3,
      label: "Takes 2 minutes",
      tile: "bg-sun-tint text-sun-deep",
    },
    {
      icon: ShieldCheck,
      label: `Matched with the best ${tradesLabel}`,
      tile: "bg-blue-tint text-blue",
    },
  ];

  return (
    <ul
      className={
        compact
          ? "flex flex-wrap gap-x-6 gap-y-2.5"
          : "grid gap-3 sm:grid-cols-3"
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
