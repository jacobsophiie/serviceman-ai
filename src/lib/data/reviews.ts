/**
 * Illustrative reviews. Each trade gets its own set so landing pages feel
 * relevant; pages without a trade context use the generic set.
 */

export interface Review {
  quote: string;
  name: string;
  where: string;
  tag: string;
}

export const genericReviews: Review[] = [
  {
    quote:
      "I had no idea if I needed a plumber or a handyman. I just described the wet cupboard and it worked out the rest — three plumbers called the next morning.",
    name: "Olivia N.",
    where: "Surfers Paradise, QLD",
    tag: "Plumbing",
  },
  {
    quote:
      "Posting the job took about two minutes on my phone. The questions it asked were the exact things the electrician said he needed to know before quoting.",
    name: "Marcus T.",
    where: "Brunswick, VIC",
    tag: "Electrical",
  },
  {
    quote:
      "So much easier than ringing around. I described the overgrown yard once, and the quotes that came back actually matched what I asked for.",
    name: "Priya S.",
    where: "Chermside, QLD",
    tag: "Gardening",
  },
];

export const tradeReviews: Record<string, Review[]> = {
  plumber: [
    {
      quote:
        "Our hot water died on a Sunday night. I answered a few questions before bed and had two plumbers with prices by morning tea.",
      name: "Karen W.",
      where: "Penrith, NSW",
      tag: "Plumbing",
    },
    {
      quote:
        "It asked where the leak was and whether it ran constantly — the plumber said the brief told him everything before he even arrived.",
      name: "Olivia N.",
      where: "Surfers Paradise, QLD",
      tag: "Plumbing",
    },
    {
      quote:
        "Blocked drain sorted in a day. No ringing around, no explaining the same thing five times.",
      name: "Sam D.",
      where: "Footscray, VIC",
      tag: "Plumbing",
    },
  ],
  electrician: [
    {
      quote:
        "Posting the job took about two minutes on my phone. The questions it asked were the exact things the electrician said he needed to know before quoting.",
      name: "Marcus T.",
      where: "Brunswick, VIC",
      tag: "Electrical",
    },
    {
      quote:
        "Needed six downlights swapped. Told it the job once, got three quotes back, picked the middle one. Done that week.",
      name: "Jess H.",
      where: "Mawson Lakes, SA",
      tag: "Electrical",
    },
    {
      quote:
        "Our safety switch kept tripping and I didn't know who to call. The questions made me feel like it actually understood the problem.",
      name: "Tony R.",
      where: "Cairns North, QLD",
      tag: "Electrical",
    },
  ],
  "air-conditioning": [
    {
      quote:
        "Aircon stopped cooling in the middle of January. Answered four quick questions and had techs offering times the same afternoon.",
      name: "Renee P.",
      where: "Palmerston, NT",
      tag: "Air conditioning",
    },
    {
      quote:
        "It asked split or ducted and how many rooms — exactly what every installer wants to know. Quotes came back ready to compare.",
      name: "Dave M.",
      where: "Baldivis, WA",
      tag: "Air conditioning",
    },
    {
      quote:
        "Got three prices on a new split system without a single phone call. Picked the best and it was in by the weekend.",
      name: "Amy C.",
      where: "Ipswich, QLD",
      tag: "Air conditioning",
    },
  ],
  builder: [
    {
      quote:
        "We're renovating the kitchen and bathroom. One clear brief went out, and the builders who replied had actually read it.",
      name: "Nadia F.",
      where: "Willoughby, NSW",
      tag: "Building",
    },
    {
      quote:
        "Getting builder quotes used to mean weeks of phone tag. This time the quotes came to me.",
      name: "Paul B.",
      where: "Geelong West, VIC",
      tag: "Building",
    },
    {
      quote:
        "Described the deck we wanted once. Three builders, three prices, zero chasing.",
      name: "Erin K.",
      where: "Buderim, QLD",
      tag: "Building",
    },
  ],
  carpenter: [
    {
      quote:
        "Needed new doors hung and skirting replaced. The brief it built was clearer than anything I'd have written myself.",
      name: "Hugh L.",
      where: "Norwood, SA",
      tag: "Carpentry",
    },
    {
      quote:
        "The deck repair quotes actually matched the job because it asked the right questions up front.",
      name: "Mia T.",
      where: "Fremantle, WA",
      tag: "Carpentry",
    },
    {
      quote:
        "Built-in shelves for the study — described it once, compared three quotes, booked the same week.",
      name: "Callum J.",
      where: "New Farm, QLD",
      tag: "Carpentry",
    },
  ],
  cleaner: [
    {
      quote:
        "End of lease clean booked in minutes. The questions covered exactly what the agent's checklist wanted.",
      name: "Sophie R.",
      where: "Parramatta, NSW",
      tag: "Cleaning",
    },
    {
      quote:
        "Found a fortnightly cleaner without posting in five Facebook groups. The quotes came to me instead.",
      name: "Leah G.",
      where: "Hawthorn, VIC",
      tag: "Cleaning",
    },
    {
      quote:
        "Post-renovation clean sorted the day after the builders left. Painless.",
      name: "Adrian V.",
      where: "Belconnen, ACT",
      tag: "Cleaning",
    },
  ],
  concreter: [
    {
      quote:
        "New driveway quotes without a single site-unseen guess — the questions covered size, access and finish up front.",
      name: "Rob S.",
      where: "Craigieburn, VIC",
      tag: "Concreting",
    },
    {
      quote:
        "Compared three prices on an exposed aggregate patio and saved a fortune on the first quote I would've taken.",
      name: "Tanya M.",
      where: "Thornlie, WA",
      tag: "Concreting",
    },
    {
      quote:
        "Cracked path replaced. Quick questions, quick quotes, job done.",
      name: "Geoff H.",
      where: "Redcliffe, QLD",
      tag: "Concreting",
    },
  ],
  gardener: [
    {
      quote:
        "So much easier than ringing around. I described the overgrown yard once, and the quotes that came back actually matched what I asked for.",
      name: "Priya S.",
      where: "Chermside, QLD",
      tag: "Gardening",
    },
    {
      quote:
        "Set up regular fortnightly mowing in one go. The gardener knew the size of the yard before he quoted.",
      name: "Ben A.",
      where: "Glenelg, SA",
      tag: "Gardening",
    },
    {
      quote:
        "Hedges, palms and a jungle of a backyard — tidied up within the week for a fair price.",
      name: "Fiona D.",
      where: "Robina, QLD",
      tag: "Gardening",
    },
  ],
  handyman: [
    {
      quote:
        "A mix of odd jobs — flat-pack, picture rails, a sticky door. One request covered the lot and one visit fixed it all.",
      name: "Grace E.",
      where: "Coburg, VIC",
      tag: "Handyman",
    },
    {
      quote:
        "TV mounted and gutters cleaned by the weekend. The two-minute job post is not an exaggeration.",
      name: "Nathan O.",
      where: "Joondalup, WA",
      tag: "Handyman",
    },
    {
      quote:
        "Didn't know what trade I needed for a wobbly gate — turns out a handyman, and the site figured that out for me.",
      name: "Helen C.",
      where: "Miranda, NSW",
      tag: "Handyman",
    },
  ],
  landscaper: [
    {
      quote:
        "Full backyard redesign — the brief captured paving, turf and retaining wall so the quotes were properly comparable.",
      name: "Marco D.",
      where: "Kellyville, NSW",
      tag: "Landscaping",
    },
    {
      quote:
        "New turf and garden beds quoted by three landscapers in two days. No chasing anyone.",
      name: "Ella S.",
      where: "Mount Barker, SA",
      tag: "Landscaping",
    },
    {
      quote:
        "The retaining wall quotes came back with the exact scope I described. Refreshing.",
      name: "Chris Y.",
      where: "Ferntree Gully, VIC",
      tag: "Landscaping",
    },
  ],
  locksmith: [
    {
      quote:
        "Locked out at 9pm. Flagged it urgent and had a locksmith on the phone within the hour.",
      name: "Dana K.",
      where: "Fortitude Valley, QLD",
      tag: "Locksmith",
    },
    {
      quote:
        "Rekeyed the whole house after moving in. Simple questions, fair quotes, sorted in a day.",
      name: "Imran B.",
      where: "Auburn, NSW",
      tag: "Locksmith",
    },
    {
      quote:
        "Broken deadlock replaced same week. The locksmith already knew the job from the brief.",
      name: "Judy F.",
      where: "Frankston, VIC",
      tag: "Locksmith",
    },
  ],
  painter: [
    {
      quote:
        "Whole interior repaint before selling. The quotes actually covered prep and ceilings because the questions asked about them.",
      name: "Steph W.",
      where: "Paddington, QLD",
      tag: "Painting",
    },
    {
      quote:
        "Three painters quoted the exterior without me repeating myself once. Picked the best and the job was spot on.",
      name: "Gary N.",
      where: "Bayswater, WA",
      tag: "Painting",
    },
    {
      quote:
        "Peeling ceiling in the bathroom — described it, photographed it, fixed and repainted within the fortnight.",
      name: "Lucy M.",
      where: "Marrickville, NSW",
      tag: "Painting",
    },
  ],
  "pest-control": [
    {
      quote:
        "Spotted termites in the fence line. Flagged it, and an inspector was out within two days with a full report.",
      name: "Alan P.",
      where: "Ormeau, QLD",
      tag: "Pest control",
    },
    {
      quote:
        "Cockroaches in a rental — quick questions, quick quotes, and the agent got the invoice directly.",
      name: "Nicole H.",
      where: "Liverpool, NSW",
      tag: "Pest control",
    },
    {
      quote:
        "Annual pest treatment booked in two minutes. Cheaper than last year, too.",
      name: "Brett C.",
      where: "Salisbury, SA",
      tag: "Pest control",
    },
  ],
  removalist: [
    {
      quote:
        "Three-bedroom move quoted by three removalists in a day. The bedroom count question meant no surprise truck sizes.",
      name: "Hannah J.",
      where: "Point Cook, VIC",
      tag: "Removals",
    },
    {
      quote:
        "Just a couch and a fridge across town — found someone happy to do a small job without the big-move price.",
      name: "Omar E.",
      where: "Wollongong, NSW",
      tag: "Removals",
    },
    {
      quote:
        "Interstate move felt a lot less scary with quotes lined up side by side.",
      name: "Kate B.",
      where: "Launceston, TAS",
      tag: "Removals",
    },
  ],
  roofer: [
    {
      quote:
        "Water stain on the ceiling after a storm. It asked whether water was still coming in — the roofer came prepared for exactly that.",
      name: "Peter G.",
      where: "Aspley, QLD",
      tag: "Roofing",
    },
    {
      quote:
        "Gutter replacement quotes in 48 hours. None of them needed a second site visit because the brief was that clear.",
      name: "Michelle T.",
      where: "Croydon, VIC",
      tag: "Roofing",
    },
    {
      quote:
        "Full roof restoration — compared three quotes and saved thousands against the door-knocker price.",
      name: "Ray L.",
      where: "Modbury, SA",
      tag: "Roofing",
    },
  ],
  tiler: [
    {
      quote:
        "Shower regrout quoted and done inside a week. The questions knew the difference between a repair and a full retile.",
      name: "Anita R.",
      where: "Carindale, QLD",
      tag: "Tiling",
    },
    {
      quote:
        "Kitchen splashback — three tilers, three prices, one afternoon of work. Easy.",
      name: "Sean F.",
      where: "Balmain, NSW",
      tag: "Tiling",
    },
    {
      quote:
        "Bathroom floor retiled without me making a single phone call. The quotes came with realistic timeframes.",
      name: "Wendy A.",
      where: "Success, WA",
      tag: "Tiling",
    },
  ],
};

export function reviewsFor(tradeSlug?: string): Review[] {
  return (tradeSlug && tradeReviews[tradeSlug]) || genericReviews;
}
