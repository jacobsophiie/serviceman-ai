/**
 * Frontend-only preview of the customer account. Everything here is
 * illustrative data and a browser-side "session"; a real backend replaces it.
 */

export interface MockQuote {
  id: string;
  business: string;
  rating: string;
  reviews: number;
  price: string;
  availability: string;
  message: string;
  receivedAgo: string;
  /** Arrives a few seconds after the page loads, to show the notification moment. */
  arrivesLater?: boolean;
}

export interface MockJob {
  id: string;
  title: string;
  trade: string;
  tradeSlug: string;
  suburb: string;
  submittedLabel: string;
  status: "sent" | "quotes" | "completed";
  sentTo: number;
  details: [string, string][];
  photos: { src: string; alt: string }[];
  contact: { name: string; method: string; value: string };
  quotes: MockQuote[];
  chosenQuoteId?: string;
}

export const mockJobs: MockJob[] = [
  {
    id: "SM-4K7Q2M",
    title: "Leaking kitchen tap",
    trade: "Plumbing",
    tradeSlug: "plumber",
    suburb: "Dromana, VIC",
    submittedLabel: "Submitted today, 9:14am",
    status: "quotes",
    sentTo: 4,
    details: [
      ["Leak", "Constant drip from the pipe under the sink"],
      ["Spreading", "No — contained in the cupboard"],
      ["Property", "Home"],
      ["Urgency", "Within the next week"],
    ],
    photos: [
      { src: "/images/under-sink.jpg", alt: "Pipework under the kitchen sink" },
      { src: "/images/trades/plumber.jpg", alt: "The tap and benchtop" },
    ],
    contact: { name: "Sarah Mitchell", method: "SMS", value: "0412 ••• 678" },
    quotes: [
      {
        id: "q1",
        business: "Bayside Plumbing & Gas",
        rating: "4.9",
        reviews: 212,
        price: "$190 – $240",
        availability: "Tomorrow, 8–10am",
        message:
          "Sounds like a worn tap spindle or a loose compression fitting. Both are a quick fix — I'll bring parts for either so it's done in one visit.",
        receivedAgo: "42 min ago",
      },
      {
        id: "q2",
        business: "Peninsula Plumbing Co.",
        rating: "4.8",
        reviews: 96,
        price: "$210",
        availability: "Thursday afternoon",
        message:
          "Fixed price covers labour and standard parts. If the mixer itself needs replacing I'll quote that separately before doing anything.",
        receivedAgo: "18 min ago",
      },
      {
        id: "q3",
        business: "Dromana Plumbing Services",
        rating: "4.7",
        reviews: 58,
        price: "$175 fixed",
        availability: "Today, 4pm",
        message: "I'm in Dromana this afternoon and can swing by after my 2pm job.",
        receivedAgo: "Just now",
        arrivesLater: true,
      },
    ],
  },
  {
    id: "SM-9H2TXW",
    title: "Replace hot water system",
    trade: "Plumbing",
    tradeSlug: "plumber",
    suburb: "Dromana, VIC",
    submittedLabel: "Submitted 3 weeks ago",
    status: "completed",
    sentTo: 3,
    details: [
      ["System", "Electric storage, 250L"],
      ["Problem", "No hot water at all"],
      ["Property", "Home"],
      ["Urgency", "Urgent — today or tomorrow"],
    ],
    photos: [],
    contact: { name: "Sarah Mitchell", method: "SMS", value: "0412 ••• 678" },
    quotes: [
      {
        id: "q1",
        business: "Bayside Plumbing & Gas",
        rating: "4.9",
        reviews: 212,
        price: "$1,850 installed",
        availability: "Next day",
        message: "Like-for-like 250L replacement, old unit removed and disposed.",
        receivedAgo: "3 weeks ago",
      },
    ],
    chosenQuoteId: "q1",
  },
];

export function getMockJob(id: string): MockJob | undefined {
  return mockJobs.find((job) => job.id === id);
}

export const mockNotifications = [
  {
    id: "n1",
    title: "New quote from Bayside Plumbing & Gas",
    body: "$190 – $240 · Tomorrow, 8–10am",
    when: "42 min ago",
    href: "/account/jobs/SM-4K7Q2M",
  },
  {
    id: "n2",
    title: "New quote from Peninsula Plumbing Co.",
    body: "$210 · Thursday afternoon",
    when: "18 min ago",
    href: "/account/jobs/SM-4K7Q2M",
  },
  {
    id: "n3",
    title: "Your job was sent to 4 licensed plumbers",
    body: "Leaking kitchen tap · Dromana",
    when: "Today, 9:15am",
    href: "/account/jobs/SM-4K7Q2M",
  },
];

/* ---------------------------------------------------- browser "session" */

import { useSyncExternalStore } from "react";

const SESSION_KEY = "serviceman-session";
const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedValue: MockSession | null = null;

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function snapshot(): MockSession | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(SESSION_KEY);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = raw ? (JSON.parse(raw) as MockSession) : null;
  }
  return cachedValue;
}

/**
 * The browser session: `undefined` while hydrating (unknown), `null` when
 * logged out, otherwise the session. Re-renders on login/logout.
 */
export function useSession(): MockSession | null | undefined {
  return useSyncExternalStore(subscribe, snapshot, () => undefined);
}

export interface MockSession {
  phone: string;
  name: string;
}

export function getSession(): MockSession | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as MockSession) : null;
  } catch {
    return null;
  }
}

export function setSession(session: MockSession) {
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // ignore
  }
  emit();
}

export function clearSession() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
  emit();
}
