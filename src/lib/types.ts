export interface TradeFAQ {
  question: string;
  answer: string;
}

export interface Trade {
  /** Plural display name, e.g. "Plumbers" */
  name: string;
  /** URL slug used in routes, e.g. "plumber" */
  slug: string;
  /** Singular name, e.g. "plumber" */
  singular: string;
  /** Category label used on cards, e.g. "Plumbing" */
  category: string;
  /** Short intro copy for landing pages */
  intro: string;
  /** Common job types shown on landing pages; each launches the chat with context */
  commonJobs: string[];
  /** Follow-up questions the AI agent typically asks for this trade */
  suggestedQuestions: string[];
  /** Trade-specific safety guidance */
  safety: string;
  /** Photos that help a tradie understand the job */
  helpfulPhotos: string[];
  /** Trade-specific FAQ content */
  faqs: TradeFAQ[];
  /** Slugs of related trades */
  relatedTrades: string[];
  /** Keywords the mock AI engine uses to detect this trade */
  keywords: string[];
}

export interface Suburb {
  name: string;
  slug: string;
  postcode: string;
}

export interface LocationArea {
  name: string;
  slug: string;
  state: string;
  stateAbbr: string;
  /** Representative postcode or range */
  postcodeRange: string;
  intro: string;
  /** Nearby suburbs, each of which also resolves to a landing page */
  nearbySuburbs: Suburb[];
  /** Trade slugs that are popular in this location */
  popularServices: string[];
  /** Slug of the parent city if this is a suburb entry */
  parentCity?: string;
  /**
   * True for regions that read with a definite article — "the Gold Coast",
   * "the Sunshine Coast" — which also changes the preposition to "on".
   */
  usesThe?: boolean;
}

export interface JobBrief {
  title?: string;
  tradeSlug?: string;
  tradeName?: string;
  problem?: string;
  visibleIssue?: string;
  urgency?: string;
  propertyType?: string;
  suburb?: string;
  photos: number;
  notes: string[];
  name?: string;
  contactMethod?: string;
  mobile?: string;
  email?: string;
}
