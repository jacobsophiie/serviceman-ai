import type { LocationArea, Suburb } from "@/lib/types";

interface CitySeed {
  name: string;
  slug: string;
  state: string;
  stateAbbr: string;
  postcodeRange: string;
  intro: string;
  popularServices: string[];
  suburbs: Suburb[];
  /** Regions that read as "the Gold Coast" / "on the Gold Coast". */
  usesThe?: boolean;
}

const cities: CitySeed[] = [
  {
    name: "Melbourne",
    slug: "melbourne",
    state: "Victoria",
    stateAbbr: "VIC",
    postcodeRange: "3000–3207",
    intro:
      "From Victorian terraces in the inner north to new builds in the growth corridors, Melbourne homes keep local trades busy year round.",
    popularServices: [
      "plumber",
      "electrician",
      "painter",
      "handyman",
      "gardener",
      "roofer",
    ],
    suburbs: [
      { name: "Richmond", slug: "richmond", postcode: "3121" },
      { name: "South Yarra", slug: "south-yarra", postcode: "3141" },
      { name: "Carlton", slug: "carlton", postcode: "3053" },
      { name: "Fitzroy", slug: "fitzroy", postcode: "3065" },
      { name: "St Kilda", slug: "st-kilda", postcode: "3182" },
      { name: "Brunswick", slug: "brunswick", postcode: "3056" },
      { name: "Footscray", slug: "footscray", postcode: "3011" },
      { name: "Hawthorn", slug: "hawthorn", postcode: "3122" },
      { name: "Docklands", slug: "docklands", postcode: "3008" },
      { name: "Southbank", slug: "southbank", postcode: "3006" },
    ],
  },
  {
    name: "Sydney",
    slug: "sydney",
    state: "New South Wales",
    stateAbbr: "NSW",
    postcodeRange: "2000–2234",
    intro:
      "Whether it's a harbourside apartment or a family home in the suburbs, Sydney jobs range from quick fixes to full renovations.",
    popularServices: [
      "plumber",
      "electrician",
      "painter",
      "handyman",
      "air-conditioning",
      "cleaner",
    ],
    suburbs: [
      { name: "Bondi", slug: "bondi", postcode: "2026" },
      { name: "Surry Hills", slug: "surry-hills", postcode: "2010" },
      { name: "Newtown", slug: "newtown", postcode: "2042" },
      { name: "Parramatta", slug: "parramatta", postcode: "2150" },
      { name: "Manly", slug: "manly", postcode: "2095" },
      { name: "Chatswood", slug: "chatswood", postcode: "2067" },
      { name: "Cronulla", slug: "cronulla", postcode: "2230" },
      { name: "Marrickville", slug: "marrickville", postcode: "2204" },
      { name: "Randwick", slug: "randwick", postcode: "2031" },
      { name: "Balmain", slug: "balmain", postcode: "2041" },
    ],
  },
  {
    name: "Brisbane",
    slug: "brisbane",
    state: "Queensland",
    stateAbbr: "QLD",
    postcodeRange: "4000–4179",
    intro:
      "Queenslanders, post-war homes and new apartments — Brisbane's mix of properties means every kind of trade job, from re-stumping to storm repairs.",
    popularServices: [
      "plumber",
      "electrician",
      "painter",
      "air-conditioning",
      "pest-control",
      "roofer",
    ],
    suburbs: [
      { name: "West End", slug: "west-end", postcode: "4101" },
      { name: "New Farm", slug: "new-farm", postcode: "4005" },
      { name: "Paddington", slug: "paddington", postcode: "4064" },
      { name: "Chermside", slug: "chermside", postcode: "4032" },
      { name: "Indooroopilly", slug: "indooroopilly", postcode: "4068" },
      { name: "Wynnum", slug: "wynnum", postcode: "4178" },
      { name: "Mount Gravatt", slug: "mount-gravatt", postcode: "4122" },
      { name: "Sandgate", slug: "sandgate", postcode: "4017" },
    ],
  },
  {
    name: "Gold Coast",
    slug: "gold-coast",
    usesThe: true,
    state: "Queensland",
    stateAbbr: "QLD",
    postcodeRange: "4207–4230",
    intro:
      "From high-rise apartments on the beachfront to acreage in the hinterland, Gold Coast jobs cover every trade — and the salt air keeps maintenance work steady.",
    popularServices: [
      "plumber",
      "air-conditioning",
      "handyman",
      "painter",
      "gardener",
      "cleaner",
    ],
    suburbs: [
      { name: "Surfers Paradise", slug: "surfers-paradise", postcode: "4217" },
      { name: "Broadbeach", slug: "broadbeach", postcode: "4218" },
      { name: "Burleigh Heads", slug: "burleigh-heads", postcode: "4220" },
      { name: "Southport", slug: "southport", postcode: "4215" },
      { name: "Robina", slug: "robina", postcode: "4226" },
      { name: "Palm Beach", slug: "palm-beach", postcode: "4221" },
      { name: "Coolangatta", slug: "coolangatta", postcode: "4225" },
      { name: "Nerang", slug: "nerang", postcode: "4211" },
    ],
  },
  {
    name: "Adelaide",
    slug: "adelaide",
    state: "South Australia",
    stateAbbr: "SA",
    postcodeRange: "5000–5174",
    intro:
      "Stone cottages, bungalows and new estates — Adelaide's character homes need trades who understand older construction as well as modern builds.",
    popularServices: [
      "plumber",
      "electrician",
      "gardener",
      "painter",
      "handyman",
      "builder",
    ],
    suburbs: [
      { name: "Glenelg", slug: "glenelg", postcode: "5045" },
      { name: "Norwood", slug: "norwood", postcode: "5067" },
      { name: "Prospect", slug: "prospect", postcode: "5082" },
      { name: "Unley", slug: "unley", postcode: "5061" },
      { name: "Henley Beach", slug: "henley-beach", postcode: "5022" },
      { name: "Mawson Lakes", slug: "mawson-lakes", postcode: "5095" },
    ],
  },
  {
    name: "Perth",
    slug: "perth",
    state: "Western Australia",
    stateAbbr: "WA",
    postcodeRange: "6000–6175",
    intro:
      "Double-brick homes, coastal weathering and big blocks — Perth trade jobs range from reticulation repairs to full outdoor makeovers.",
    popularServices: [
      "plumber",
      "electrician",
      "roofer",
      "landscaper",
      "air-conditioning",
      "handyman",
    ],
    suburbs: [
      { name: "Fremantle", slug: "fremantle", postcode: "6160" },
      { name: "Subiaco", slug: "subiaco", postcode: "6008" },
      { name: "Scarborough", slug: "scarborough", postcode: "6019" },
      { name: "Joondalup", slug: "joondalup", postcode: "6027" },
      { name: "Victoria Park", slug: "victoria-park", postcode: "6100" },
      { name: "Cottesloe", slug: "cottesloe", postcode: "6011" },
    ],
  },
  {
    name: "Newcastle",
    slug: "newcastle",
    state: "New South Wales",
    stateAbbr: "NSW",
    postcodeRange: "2280–2308",
    intro:
      "From beach-side semis to family homes around the lake, Newcastle jobs cover everything from quick repairs to renovations.",
    popularServices: [
      "plumber",
      "electrician",
      "painter",
      "carpenter",
      "gardener",
      "roofer",
    ],
    suburbs: [
      { name: "Merewether", slug: "merewether", postcode: "2291" },
      { name: "Hamilton", slug: "hamilton", postcode: "2303" },
      { name: "Charlestown", slug: "charlestown", postcode: "2290" },
      { name: "Mayfield", slug: "mayfield", postcode: "2304" },
      { name: "Wallsend", slug: "wallsend", postcode: "2287" },
      { name: "Adamstown", slug: "adamstown", postcode: "2289" },
    ],
  },
  {
    name: "Canberra",
    slug: "canberra",
    state: "Australian Capital Territory",
    stateAbbr: "ACT",
    postcodeRange: "2600–2617",
    intro:
      "Canberra's seasons are hard on homes — heating in winter, cooling in summer, and gardens that need attention all year.",
    popularServices: [
      "plumber",
      "electrician",
      "air-conditioning",
      "gardener",
      "painter",
      "handyman",
    ],
    suburbs: [
      { name: "Belconnen", slug: "belconnen", postcode: "2617" },
      { name: "Woden", slug: "woden", postcode: "2606" },
      { name: "Gungahlin", slug: "gungahlin", postcode: "2912" },
      { name: "Tuggeranong", slug: "tuggeranong", postcode: "2900" },
      { name: "Braddon", slug: "braddon", postcode: "2612" },
      { name: "Kingston", slug: "kingston", postcode: "2604" },
    ],
  },
  {
    name: "Hobart",
    slug: "hobart",
    state: "Tasmania",
    stateAbbr: "TAS",
    postcodeRange: "7000–7053",
    intro:
      "Weatherboard cottages and hillside homes — Hobart jobs often involve heritage character, steep access and keeping the weather out.",
    popularServices: [
      "plumber",
      "electrician",
      "painter",
      "roofer",
      "carpenter",
      "gardener",
    ],
    suburbs: [
      { name: "Sandy Bay", slug: "sandy-bay", postcode: "7005" },
      { name: "North Hobart", slug: "north-hobart", postcode: "7000" },
      { name: "Kingston Beach", slug: "kingston-beach", postcode: "7050" },
      { name: "Bellerive", slug: "bellerive", postcode: "7018" },
      { name: "Glenorchy", slug: "glenorchy", postcode: "7010" },
    ],
  },
  {
    name: "Sunshine Coast",
    slug: "sunshine-coast",
    usesThe: true,
    state: "Queensland",
    stateAbbr: "QLD",
    postcodeRange: "4550–4575",
    intro:
      "Beach houses, acreage and new estates — Sunshine Coast jobs range from holiday-home maintenance to full builds.",
    popularServices: [
      "plumber",
      "gardener",
      "handyman",
      "air-conditioning",
      "painter",
      "cleaner",
    ],
    suburbs: [
      { name: "Maroochydore", slug: "maroochydore", postcode: "4558" },
      { name: "Caloundra", slug: "caloundra", postcode: "4551" },
      { name: "Noosa Heads", slug: "noosa-heads", postcode: "4567" },
      { name: "Buderim", slug: "buderim", postcode: "4556" },
      { name: "Mooloolaba", slug: "mooloolaba", postcode: "4557" },
    ],
  },
];

function cityToLocation(city: CitySeed): LocationArea {
  return {
    name: city.name,
    slug: city.slug,
    state: city.state,
    stateAbbr: city.stateAbbr,
    postcodeRange: city.postcodeRange,
    intro: city.intro,
    nearbySuburbs: city.suburbs,
    popularServices: city.popularServices,
    usesThe: city.usesThe,
  };
}

function suburbToLocation(suburb: Suburb, city: CitySeed): LocationArea {
  return {
    name: suburb.name,
    slug: suburb.slug,
    state: city.state,
    stateAbbr: city.stateAbbr,
    postcodeRange: suburb.postcode,
    intro: `${suburb.name} sits within the greater ${city.name} area. Tell our AI agent what needs doing and we'll prepare your job request for suitable trades businesses servicing ${suburb.name} and surrounds.`,
    nearbySuburbs: [
      { name: city.name, slug: city.slug, postcode: city.postcodeRange },
      ...city.suburbs.filter((s) => s.slug !== suburb.slug).slice(0, 6),
    ],
    popularServices: city.popularServices,
    parentCity: city.slug,
  };
}

/** Every location we generate a landing page for: cities plus their suburbs. */
export const locations: LocationArea[] = [
  ...cities.map(cityToLocation),
  ...cities.flatMap((city) =>
    city.suburbs.map((suburb) => suburbToLocation(suburb, city)),
  ),
];

/** Major cities only, for the /locations index page. */
export const majorLocations: LocationArea[] = cities.map(cityToLocation);

export function getLocation(slug: string): LocationArea | undefined {
  return locations.find((l) => l.slug === slug);
}

/** "Melbourne" / "the Gold Coast" — for "near X", "around X", "servicing X". */
export function placeName(location: LocationArea): string {
  return location.usesThe ? `the ${location.name}` : location.name;
}

/** "in Melbourne" / "on the Gold Coast". */
export function inPlace(location: LocationArea): string {
  return location.usesThe ? `on the ${location.name}` : `in ${location.name}`;
}

/** Detect a known location mentioned in free text. */
export function detectLocation(text: string): LocationArea | undefined {
  const lower = text.toLowerCase();
  // Prefer the longest match so "Surfers Paradise" beats "Paradise"
  let best: LocationArea | undefined;
  for (const location of locations) {
    if (lower.includes(location.name.toLowerCase())) {
      if (!best || location.name.length > best.name.length) {
        best = location;
      }
    }
  }
  return best;
}
