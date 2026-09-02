import { Star } from "lucide-react";

/**
 * Trust strip shown under heroes — one line, gold stars, true product facts.
 * `tradesLabel` makes the match point page-specific; `tone="dark"` is for
 * photo/navy heroes.
 */
const shortLabels: Record<string, string> = {
  "air-conditioning technicians": "air-con techs",
  "pest controllers": "pest control",
};

export function TrustBar({
  tradesLabel = "tradies",
  tone = "light",
}: {
  tradesLabel?: string;
  tone?: "light" | "dark";
}) {
  const points = [
    "Free to post a job",
    "Takes 2 minutes",
    `Matched with the best ${shortLabels[tradesLabel] ?? tradesLabel}`,
  ];

  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {points.map((point) => (
        <li
          key={point}
          className={`flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium ${
            tone === "dark" ? "text-white/85" : "text-ink"
          }`}
        >
          <Star className="h-4 w-4 shrink-0 fill-sun text-sun" aria-hidden />
          {point}
        </li>
      ))}
    </ul>
  );
}
