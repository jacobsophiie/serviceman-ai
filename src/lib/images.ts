/**
 * Local image assets (stored in /public/images) with descriptive alt text.
 * Photos are free-licence images downloaded at build time for the prototype.
 */

export interface TradeImage {
  src: string;
  alt: string;
}

const tradeImageAlt: Record<string, string> = {
  plumber: "Chrome bath taps and plumbing fittings on a bathtub",
  electrician:
    "An electrician working on a switchboard of circuit breakers and wiring",
  painter: "A paint roller applying soft blue paint to a white wall",
  handyman: "A screwdriver set laid out ready for small repairs",
  gardener: "A garden scoop with potting soil and a potted plant",
  carpenter: "A cordless drill resting on a timber workbench",
  builder: "A builder drawing up construction plans at a desk",
  roofer: "A roofer standing on a house roof beside a ladder",
  tiler: "A modern bathroom with white wall tiles and a glass shower",
  concreter: "A large concrete slab pour on a construction site",
  landscaper: "Fresh green turf laid in a landscaped backyard",
  cleaner: "A cleaner in gloves washing a window with a sponge",
  locksmith: "A smart lock fitted to a white front door",
  "pest-control": "A bush cockroach sitting on a gum leaf",
  "air-conditioning": "A technician servicing an air-conditioning unit",
  removalist: "Removalists loading pot plants beside a moving truck",
};

/**
 * Filenames default to `<slug>.jpg`. When a photo is swapped, give the new file
 * a new name — reusing the name keeps the optimized URL identical, so browsers
 * and CDNs keep serving the old picture.
 */
const tradeImageFile: Record<string, string> = {
  electrician: "electrician-switchboard.jpg",
};

export function tradeImage(slug: string): TradeImage {
  return {
    src: `/images/trades/${tradeImageFile[slug] ?? `${slug}.jpg`}`,
    alt: tradeImageAlt[slug] ?? "A local trades job in progress",
  };
}

export const heroImage: TradeImage = {
  src: "/images/hero.jpg",
  alt: "A modern Australian home at dusk with a gum tree and back lawn",
};
