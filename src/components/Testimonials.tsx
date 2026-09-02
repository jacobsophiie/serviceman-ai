import { Star } from "lucide-react";
import { reviewsFor } from "@/lib/data/reviews";

/**
 * Review cards. Content is illustrative while the review network grows.
 * Pass `tradeSlug` on trade pages so the reviews match the page.
 */
export function Testimonials({ tradeSlug }: { tradeSlug?: string }) {
  const reviews = reviewsFor(tradeSlug);

  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          What customers say
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={`${review.name}-${review.where}`}
              className="flex flex-col rounded-lg border border-line bg-white p-6"
            >
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-sun text-sun"
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                <span className="font-semibold text-navy">{review.name}</span>
                <span className="text-muted">
                  {" "}
                  · {review.where} · {review.tag}
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
