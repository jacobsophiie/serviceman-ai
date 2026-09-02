import { BadgeCheck, Clock3, Star } from "lucide-react";

/**
 * What coming back to the customer looks like: several quotes side by side,
 * one chosen. Businesses and prices are illustrative and labelled as such.
 */
const quotes = [
  {
    business: "Bayside Plumbing & Gas",
    price: "$190 – $240",
    when: "Tomorrow, 8–10am",
    rating: "4.9",
    chosen: true,
  },
  {
    business: "Peninsula Plumbing Co.",
    price: "$210",
    when: "Thursday afternoon",
    rating: "4.8",
  },
  {
    business: "Dromana Plumbing Services",
    price: "$175 fixed",
    when: "Today, 4pm",
    rating: "4.7",
  },
];

export function QuotesExample() {
  return (
    <div className="rounded-lg border border-line bg-cloud p-2">
      <div className="rounded-md border border-line bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Example quotes
          </p>
          <span className="text-xs font-medium text-muted">3 received</span>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {quotes.map((quote) => (
            <li
              key={quote.business}
              className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 font-semibold text-navy">
                  {quote.business}
                  <BadgeCheck className="h-4 w-4 text-blue" aria-label="Licensed and insured" />
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-sun text-sun" aria-hidden />
                    {quote.rating}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden />
                    {quote.when}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-bold text-navy">
                  {quote.price}
                </span>
                <span
                  className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                    quote.chosen
                      ? "bg-blue text-white"
                      : "border border-line text-navy"
                  }`}
                >
                  {quote.chosen ? "Chosen" : "Choose"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
