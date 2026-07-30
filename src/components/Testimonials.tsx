import { Star } from "lucide-react";

/**
 * Review wall in the style of the big trades marketplaces — star rows, a
 * conversational quote, a name and suburb, and a trade tag. Content is
 * illustrative for the prototype (the footer carries the demo notice).
 */
const reviews = [
  {
    quote:
      "I had no idea if I needed a plumber or a handyman. I just showed the camera the wet cupboard and it worked out the rest — three plumbers called the next morning.",
    name: "Olivia N.",
    where: "Surfers Paradise, QLD",
    tag: "Plumbing",
    tile: "bg-blue-tint text-blue",
  },
  {
    quote:
      "Posting the job took about two minutes on my phone. The questions it asked were the exact things the electrician said he needed to know before quoting.",
    name: "Marcus T.",
    where: "Brunswick, VIC",
    tag: "Electrical",
    tile: "bg-sun-tint text-sun-deep",
  },
  {
    quote:
      "So much easier than ringing around. I described the overgrown yard once, and the quotes that came back actually matched what I asked for.",
    name: "Priya S.",
    where: "Chermside, QLD",
    tag: "Gardening",
    tile: "bg-mint-tint text-success",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-4 w-4 fill-sun text-sun"
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-sun-tint px-3 py-1 text-sm font-semibold text-sun-deep">
            <Star className="h-3.5 w-3.5 fill-sun-deep" aria-hidden />
            Loved by homeowners
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
            Jobs sorted, without the ring-around
          </h2>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review.name}
              className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <Stars />
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${review.tile}`}
                >
                  {review.tag}
                </span>
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-ink">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white"
                  aria-hidden
                >
                  {review.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy">
                    {review.name}
                  </span>
                  <span className="block text-xs text-muted">{review.where}</span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
