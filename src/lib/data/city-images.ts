import type { LocationArea } from "@/lib/types";
import { heroImage } from "@/lib/images";

/** Landmark photo per major city (Wikimedia Commons, see public/images/cities/CREDITS.md). */
export const cityImages: Record<string, { src: string; alt: string; credit: string }> = {
  "melbourne": { src: "/images/cities/melbourne.jpg", alt: "Melbourne (AU), Melbourne City Centre", credit: "Dietmar Rabich, CC BY-SA 4.0, via Wikimedia Commons" },
  "sydney": { src: "/images/cities/sydney.jpg", alt: "Sydney Opera House and Harbour Bridge Dusk (2)", credit: "Benh LIEU SONG (Flickr), CC BY-SA 4.0, via Wikimedia Commons" },
  "brisbane": { src: "/images/cities/brisbane.jpg", alt: "Story Bridge, Brisbane City views, 2021, 02", credit: "Kgbo, CC BY-SA 4.0, via Wikimedia Commons" },
  "gold-coast": { src: "/images/cities/gold-coast.jpg", alt: "Looking along Surfers Paradise Beach", credit: "Jack Bain, CC BY 4.0, via Wikimedia Commons" },
  "adelaide": { src: "/images/cities/adelaide.jpg", alt: "Adelaide CBD skyline across the River Torrens, July 2026 (028A", credit: "Yu Chu Chin, CC BY-SA 4.0, via Wikimedia Commons" },
  "perth": { src: "/images/cities/perth.jpg", alt: "Perth (AU), Elizabeth Quay Bridge", credit: "Dietmar Rabich, CC BY-SA 4.0, via Wikimedia Commons" },
  "newcastle": { src: "/images/cities/newcastle.jpg", alt: "Newcastle Ocean Baths, December", credit: "DaHuzyBru, CC BY-SA 4.0, via Wikimedia Commons" },
  "canberra": { src: "/images/cities/canberra.jpg", alt: "Exterior of Parliament House, Canberra, 2022, 04", credit: "Kgbo, CC BY-SA 4.0, via Wikimedia Commons" },
  "hobart": { src: "/images/cities/hobart.jpg", alt: "Hobart Tasmania Australia16", credit: "Diego Delso, CC BY-SA 3.0, via Wikimedia Commons" },
  "sunshine-coast": { src: "/images/cities/sunshine-coast.jpg", alt: "Noosa Heads main beach,", credit: "Chris Olszewski, CC BY-SA 4.0, via Wikimedia Commons" },
};

/** The city photo for a location (suburbs use their parent city), falling back to the generic hero. */
export function cityImageFor(location: LocationArea): { src: string; alt: string } {
  return (
    cityImages[location.slug] ??
    (location.parentCity ? cityImages[location.parentCity] : undefined) ??
    heroImage
  );
}
