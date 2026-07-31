import { detectTrade, getTrade, trades } from "@/lib/data/trades";
import { detectLocation, getLocation } from "@/lib/data/locations";
import type { JobBrief, Trade } from "@/lib/types";
import type { LocationArea } from "@/lib/types";

/*
 * Frontend prototype only.
 *
 * This is a simple rule-based conversation engine that simulates the
 * serviceman.ai job assistant. It is not a real AI model — it matches
 * keywords, walks a fixed set of stages and stores answers in a JobBrief.
 */

export type Stage =
  | "clarify-trade"
  | "problem"
  | "details"
  | "photo"
  | "urgency"
  | "property"
  | "suburb"
  | "suburb-confirm"
  | "full-name"
  | "contact-method"
  | "mobile"
  | "email"
  | "review";

export interface SafetyNotice {
  level: "danger" | "warning";
  title: string;
  body: string;
}

export interface EngineMessage {
  text: string;
  safety?: SafetyNotice;
}

export interface EngineAction {
  label: string;
  action: "open-camera" | "upload-photo" | "skip-photo";
}

export interface ConversationState {
  stage: Stage;
  detailQuestions: DetailQuestion[];
  detailIndex: number;
  brief: JobBrief;
  location?: LocationArea;
  pendingSuburbText?: string;
}

export interface EngineResult {
  messages: EngineMessage[];
  quickReplies?: string[];
  actions?: EngineAction[];
  inputHint?: string;
  state: ConversationState;
}

interface DetailQuestion {
  question: string;
  quickReplies?: string[];
  store: "problem" | "visibleIssue" | "note";
  followUpTip?: string;
  /** After this answer, re-pick the question branch from the answer text. */
  rebranch?: boolean;
}

export const progressStages = [
  "Understanding the problem",
  "Confirming location",
  "Gathering job details",
  "Reviewing your request",
] as const;

export function progressStepFor(stage: Stage): number {
  if (stage === "clarify-trade" || stage === "problem") {
    return 0;
  }
  if (stage === "suburb" || stage === "suburb-confirm") {
    return 1;
  }
  if (
    stage === "details" ||
    stage === "photo" ||
    stage === "urgency" ||
    stage === "property"
  ) {
    return 2;
  }
  return 3;
}

/* ---------------------------------------------------------------- safety */

const safetyRules: Array<{ pattern: RegExp; notice: SafetyNotice }> = [
  {
    pattern: /\bgas\b|smell.{0,12}gas|gas.{0,12}smell/i,
    notice: {
      level: "danger",
      title: "Possible gas hazard",
      body: "If you smell gas, avoid flames and electrical switches. Move outside, contact your gas emergency provider and call 000 if there is immediate danger.",
    },
  },
  {
    pattern: /spark|smoke|burning smell|on fire|caught fire|scorch/i,
    notice: {
      level: "danger",
      title: "Possible fire or electrical hazard",
      body: "This may be unsafe. Please move away from the area and avoid touching any electrical, gas or structural components. If there is fire or smoke, call 000 now.",
    },
  },
  {
    pattern: /exposed wir|bare wire|live wire|shock(ed)? me|electrocut/i,
    notice: {
      level: "danger",
      title: "Electrical hazard",
      body: "Do not touch exposed wiring, damaged switches or electrical components. Move away from the area and wait for a licensed electrician. If there is an immediate danger, call 000.",
    },
  },
  {
    pattern: /flood(ing|ed)?|water everywhere|water.{0,20}(power|switchboard|outlet)/i,
    notice: {
      level: "warning",
      title: "Major water hazard",
      body: "Keep clear of water near power points or appliances. If you can safely reach it, turn off the water at the mains. For flood assistance, the SES is on 132 500.",
    },
  },
  {
    pattern: /ceiling.{0,20}(bulg|sag)|roof.{0,15}collaps|wall.{0,15}collaps/i,
    notice: {
      level: "danger",
      title: "Possible structural hazard",
      body: "Keep people away from the affected area — a sagging ceiling or moving structure can fail without warning. Do not climb onto the roof. If it looks severe, contact the SES on 132 500.",
    },
  },
  {
    pattern: /asbestos/i,
    notice: {
      level: "warning",
      title: "Possible hazardous material",
      body: "Do not cut, drill, sand or disturb material that may contain asbestos. Leave the area undisturbed and mention it in your job request so a licensed professional can assess it.",
    },
  },
];

export function checkSafety(text: string): SafetyNotice | undefined {
  for (const rule of safetyRules) {
    if (rule.pattern.test(text)) {
      return rule.notice;
    }
  }
  return undefined;
}

/* ------------------------------------------------------- detail question */

/** The "which of these" menu shown when free text doesn't match a branch. */
function branchMenu(options: string[]): DetailQuestion[] {
  return [
    {
      question: "Which of these best matches the job?",
      quickReplies: [...options, "Something else"],
      store: "problem",
      rebranch: true,
    },
  ];
}

/** Open-ended fallback once the menu has also come back "Something else". */
function openBranch(trade: Trade): DetailQuestion[] {
  return [
    {
      question: `No worries — describe what's happening in your own words and I'll pass it straight to the ${trade.singular}.`,
      store: "problem",
    },
    {
      question: "Roughly how big is the job?",
      quickReplies: ["A quick fix", "A standard job", "Something bigger"],
      store: "note",
    },
  ];
}

function detailQuestionsFor(
  trade: Trade,
  problemText: string,
  allowMenu = true,
): DetailQuestion[] {
  const lower = problemText.toLowerCase();

  if (trade.slug === "plumber") {
    if (/leak|tap|pipe|drip|sink/.test(lower)) {
      return [
        {
          question:
            "Is the water leaking continuously, or only when the tap is running?",
          quickReplies: [
            "Continuously",
            "Only when the tap is running",
            "It comes and goes",
            "I'm not sure",
          ],
          store: "note",
        },
        {
          question: "Can you see where the water is coming from?",
          quickReplies: [
            "From the pipe",
            "From the tap connection",
            "From underneath the sink",
            "I'm not sure",
          ],
          store: "visibleIssue",
        },
        {
          question:
            "Is the leak causing water to spread into a cupboard or onto the floor?",
          quickReplies: [
            "Yes, into the cupboard",
            "Yes, onto the floor",
            "No, it's contained",
            "I'm not sure",
          ],
          store: "note",
          followUpTip:
            "If it is safe to do so, you may be able to reduce the leak by turning the small isolation tap under the sink clockwise. Do not force it if it is stuck.",
        },
      ];
    }
    if (/drain|blocked|block/.test(lower)) {
      return [
        {
          question: "Which drain is affected?",
          quickReplies: [
            "Kitchen sink",
            "Bathroom sink",
            "Shower or bath",
            "Toilet",
            "Outdoor drain",
          ],
          store: "visibleIssue",
        },
        {
          question:
            "Is the water draining slowly, or not draining at all?",
          quickReplies: ["Draining slowly", "Not draining at all", "Overflowing"],
          store: "note",
        },
      ];
    }
    if (/hot water/.test(lower)) {
      return [
        {
          question:
            "Is there no hot water at all, or does it run out quickly?",
          quickReplies: [
            "No hot water at all",
            "Runs out quickly",
            "Water isn't hot enough",
            "System is leaking",
          ],
          store: "visibleIssue",
        },
        {
          question:
            "Do you know if the system is electric, gas or solar?",
          quickReplies: ["Electric", "Gas", "Solar", "I'm not sure"],
          store: "note",
        },
      ];
    }
    if (/toilet|cistern|flush/.test(lower)) {
      return [
        {
          question: "What is the toilet doing?",
          quickReplies: [
            "Won't flush",
            "Keeps running",
            "Leaking at the base",
            "Blocked",
          ],
          store: "visibleIssue",
        },
        {
          question: "Is it the only toilet in the property?",
          quickReplies: ["Yes, the only one", "No, there's another"],
          store: "note",
        },
      ];
    }
    if (/renovat|new plumb|new install|bathroom reno|kitchen reno/.test(lower)) {
      return [
        {
          question: "What's being renovated or newly plumbed?",
          quickReplies: ["Bathroom", "Kitchen", "Laundry", "Whole house", "Outdoors"],
          store: "visibleIssue",
        },
        {
          question: "Has the design or layout been decided?",
          quickReplies: ["Yes, ready to go", "Still planning"],
          store: "note",
        },
      ];
    }
    if (allowMenu) {
      return branchMenu([
        "A leaking tap or pipe",
        "A blocked drain or toilet",
        "Hot water system",
        "A toilet problem",
        "Renovation or new plumbing",
      ]);
    }
    return openBranch(trade);
  }

  if (trade.slug === "electrician") {
    if (/switchboard|safety switch|fuse|trip/.test(lower)) {
      return [
        {
          question: "What's happening with the switchboard?",
          quickReplies: [
            "Power keeps tripping",
            "Upgrading an old board",
            "Installing a safety switch",
            "I'm not sure",
          ],
          store: "visibleIssue",
        },
        {
          question: "Have you noticed any burning smells, buzzing or sparks?",
          quickReplies: ["Yes", "No", "I'm not sure"],
          store: "note",
          followUpTip:
            "Please don't touch the switchboard or wiring. A licensed electrician will need to inspect it.",
        },
      ];
    }
    if (/light|downlight|pendant|ceiling fan|lamp/.test(lower)) {
      return [
        {
          question: "What type of lighting is it?",
          quickReplies: [
            "Downlights or pendants",
            "Outdoor or garden lights",
            "Ceiling fans",
            "Security or sensor lights",
          ],
          store: "visibleIssue",
        },
        {
          question: "How many lights or fittings are involved?",
          quickReplies: ["Just one", "2 to 5", "6 or more"],
          store: "note",
        },
        {
          question: "Are these new installations, or replacing existing ones?",
          quickReplies: ["New locations", "Replacing existing", "A mix of both"],
          store: "note",
        },
      ];
    }
    if (/power point|powerpoint|socket|switches|new switch/.test(lower)) {
      return [
        {
          question: "How many power points or switches need work?",
          quickReplies: ["Just one", "2 to 5", "6 or more"],
          store: "visibleIssue",
        },
        {
          question: "New locations, or replacing existing ones?",
          quickReplies: ["New locations", "Replacing existing", "A mix of both"],
          store: "note",
        },
      ];
    }
    if (/appliance|oven|cooktop|charger|hook.?up|connect/.test(lower)) {
      return [
        {
          question: "What are we connecting?",
          quickReplies: [
            "Oven or cooktop",
            "Hot water system",
            "EV charger",
            "Something else",
          ],
          store: "visibleIssue",
        },
        {
          question: "Is the wiring already in place for it?",
          quickReplies: ["Yes", "No", "I'm not sure"],
          store: "note",
        },
      ];
    }
    if (/rewir/.test(lower)) {
      return [
        {
          question: "How much of the property needs rewiring?",
          quickReplies: ["One room", "Several rooms", "The whole property"],
          store: "visibleIssue",
        },
        {
          question: "Roughly how old is the property?",
          quickReplies: ["Under 20 years", "20 to 50 years", "Over 50 years", "Not sure"],
          store: "note",
        },
      ];
    }
    if (/not work|isn.?t work|no power|stopped|outage|flicker|fault/.test(lower)) {
      return [
        {
          question: "Is the problem affecting one area, or the whole property?",
          quickReplies: [
            "One switch or power point",
            "One room",
            "The whole property",
            "I'm not sure",
          ],
          store: "visibleIssue",
        },
        {
          question: "Have you noticed any burning smells, buzzing or sparks?",
          quickReplies: ["Yes", "No", "I'm not sure"],
          store: "note",
          followUpTip:
            "Please don't touch the affected switch, power point or wiring. A licensed electrician will need to inspect it.",
        },
      ];
    }
    if (allowMenu) {
      return branchMenu([
        "Lights or light fittings",
        "Power points or switches",
        "Switchboard or safety switch",
        "Something isn't working",
        "A new appliance hook-up",
        "Rewiring",
      ]);
    }
    return openBranch(trade);
  }

  if (trade.slug === "air-conditioning") {
    if (/install|new system|new air|new unit|replace/.test(lower)) {
      return [
        {
          question: "What type of system are you after?",
          quickReplies: ["Split system", "Ducted", "Multi-head", "Not sure yet"],
          store: "visibleIssue",
        },
        {
          question: "How many rooms need cooling or heating?",
          quickReplies: ["One room", "2 to 3 rooms", "The whole home"],
          store: "note",
        },
      ];
    }
    if (/service|maintenance|clean/.test(lower)) {
      return [
        {
          question: "How many units need servicing?",
          quickReplies: ["One", "Two", "Three or more"],
          store: "visibleIssue",
        },
        {
          question: "When were they last serviced?",
          quickReplies: ["Within the last year", "A few years ago", "Never", "Not sure"],
          store: "note",
        },
      ];
    }
    if (/leak|drip|noise|rattle|smell/.test(lower)) {
      return [
        {
          question: "What have you noticed?",
          quickReplies: [
            "Water dripping",
            "A strange noise",
            "A burning or musty smell",
          ],
          store: "visibleIssue",
        },
        {
          question: "What type of system is it?",
          quickReplies: ["Split system", "Ducted", "Not sure"],
          store: "note",
        },
      ];
    }
    if (/not cool|not heat|isn.?t cool|isn.?t heat|warm air|blow|won.?t turn|not work/.test(lower)) {
      return [
        {
          question: "What is the system doing?",
          quickReplies: [
            "Not cold enough",
            "Not heating",
            "Weak airflow",
            "Won't turn on",
          ],
          store: "visibleIssue",
        },
        {
          question: "What type of system is it?",
          quickReplies: ["Split system", "Ducted", "Not sure"],
          store: "note",
        },
      ];
    }
    if (allowMenu) {
      return branchMenu([
        "A new system installed",
        "Not cooling or heating properly",
        "Service or maintenance",
        "A leak or strange noise",
      ]);
    }
    return openBranch(trade);
  }

  if (trade.slug === "painter") {
    return [
      {
        question:
          "Is the painting for the inside or outside of the property?",
        quickReplies: ["Inside", "Outside", "Both"],
        store: "note",
      },
      {
        question: "Which rooms or areas need painting?",
        store: "visibleIssue",
      },
      {
        question:
          "Are you keeping the same colour or changing it?",
        quickReplies: ["Same colour", "New colour", "Not decided yet"],
        store: "note",
      },
    ];
  }

  if (trade.slug === "gardener") {
    return [
      {
        question:
          "Is this a one-off clean-up or regular maintenance?",
        quickReplies: ["One-off clean-up", "Regular maintenance", "Not sure yet"],
        store: "note",
      },
      {
        question:
          "Roughly how big is the area? A rough description is fine — like 'small courtyard' or 'large backyard'.",
        store: "visibleIssue",
      },
    ];
  }

  // Generic fallback: use the first two suggested questions for the trade.
  return trade.suggestedQuestions.slice(0, 2).map((question) => ({
    question,
    store: "note" as const,
  }));
}

/* ------------------------------------------------------------ stage copy */

const urgencyReplies = [
  "It's urgent — today or tomorrow",
  "Within the next week",
  "In the next few weeks",
  "Just planning — I'm flexible",
];

const propertyReplies = [
  "My home",
  "A business or commercial property",
  "A rental — I'm the tenant",
  "A rental — I'm the owner or agent",
];

/* --------------------------------------------------------------- helpers */

function emptyBrief(): JobBrief {
  return { photos: 0, notes: [] };
}

function titleFor(brief: JobBrief): string {
  const trade = brief.tradeSlug ? getTrade(brief.tradeSlug) : undefined;
  const problem = brief.problem?.trim();
  if (problem) {
    const short = problem.length > 48 ? `${problem.slice(0, 48)}…` : problem;
    return short.charAt(0).toUpperCase() + short.slice(1);
  }
  return trade ? `${trade.category} job` : "New job request";
}

const mobilePattern = /^(\+?61|0)?[\s-]?4[\s-]?(\d[\s-]?){8}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function askSuburb(state: ConversationState): EngineResult {
  if (state.location) {
    const loc = state.location;
    return {
      messages: [
        {
          text: `You mentioned ${loc.name} earlier. Is that ${loc.name}, ${loc.state} ${loc.postcodeRange.split("–")[0]}?`,
        },
      ],
      quickReplies: ["Yes, that's right", "Choose another location"],
      state: { ...state, stage: "suburb-confirm" },
    };
  }
  return {
    messages: [{ text: "Where is the job located?" }],
    inputHint: "Suburb or postcode — e.g. Surfers Paradise or 4217",
    state: { ...state, stage: "suburb" },
  };
}

/** After the location is locked in, move on to the job questions. */
function beginJobQuestions(
  state: ConversationState,
  lead: string,
): EngineResult {
  const result = nextDetailOrPhoto({
    ...state,
    stage: "details",
    detailIndex: 0,
  });
  return { ...result, messages: [{ text: lead }, ...result.messages] };
}

function askPhoto(state: ConversationState, lead?: string): EngineResult {
  return {
    messages: [
      {
        text: `${lead ? `${lead} ` : ""}Would you like to show me using your camera, or upload a photo? Photos help tradies quote more accurately — but you can skip this step.`,
      },
    ],
    actions: [
      { label: "Open camera", action: "open-camera" },
      { label: "Upload photo", action: "upload-photo" },
      { label: "Continue without a photo", action: "skip-photo" },
    ],
    state: { ...state, stage: "photo" },
  };
}

function nextDetailOrPhoto(state: ConversationState): EngineResult {
  const q = state.detailQuestions[state.detailIndex];
  if (q) {
    return {
      messages: [{ text: q.question }],
      quickReplies: q.quickReplies,
      state,
    };
  }
  return askPhoto(state, "Thanks, that gives me a good picture.");
}

/* ----------------------------------------------------------------- start */

export interface StartOptions {
  initialMessage?: string;
  tradeSlug?: string;
  presetJob?: string;
  locationSlug?: string;
  /** Photos already captured, e.g. carried over from the camera assistant. */
  initialPhotos?: number;
}

export function startConversation(options: StartOptions = {}): EngineResult {
  const state: ConversationState = {
    stage: "problem",
    detailQuestions: [],
    detailIndex: 0,
    brief: emptyBrief(),
  };
  if (options.initialPhotos && options.initialPhotos > 0) {
    state.brief.photos = options.initialPhotos;
  }

  const messages: EngineMessage[] = [];

  const presetTrade = options.tradeSlug ? getTrade(options.tradeSlug) : undefined;
  const detected = options.initialMessage
    ? detectTrade(options.initialMessage)
    : undefined;
  const trade = presetTrade ?? detected;

  if (options.locationSlug) {
    state.location = getLocation(options.locationSlug);
  }
  if (options.initialMessage && !state.location) {
    state.location = detectLocation(options.initialMessage);
  }

  const safety = options.initialMessage
    ? checkSafety(options.initialMessage)
    : undefined;
  if (safety) {
    messages.push({ text: safety.body, safety });
  }

  // Location comes first, then the job questions follow from the trade.
  if (trade && options.presetJob) {
    state.brief.tradeSlug = trade.slug;
    state.brief.tradeName = trade.singular;
    state.brief.problem = options.presetJob;
    state.detailQuestions = detailQuestionsFor(trade, options.presetJob);
    messages.push({
      text: `I can help you create a job request for ${options.presetJob.toLowerCase()}.`,
    });
    const next = askSuburb(state);
    return { ...next, messages: [...messages, ...next.messages] };
  }

  if (trade) {
    state.brief.tradeSlug = trade.slug;
    state.brief.tradeName = trade.singular;
    if (options.initialMessage) {
      state.brief.problem = options.initialMessage;
    }
    state.detailQuestions = detailQuestionsFor(
      trade,
      options.initialMessage ?? "",
    );

    if (options.initialMessage && detected && !safety) {
      messages.push({
        text: `It sounds like you may need ${/^[aeiou]/i.test(trade.singular) ? "an" : "a"} ${trade.singular}. I'll ask a few quick questions so we can get you quotes.`,
      });
    } else if (!safety) {
      messages.push({ text: `I can help with that.` });
    }

    const next = askSuburb(state);
    return { ...next, messages: [...messages, ...next.messages] };
  }

  // No trade detected — clarify first. The customer never has to pick a
  // trade themselves; describing the problem is enough.
  messages.push({
    text: options.initialMessage
      ? "Thanks — I can help you get that sorted. Tell me a little more about what's happening, or pick the closest match below."
      : "Hi, I'm the serviceman.ai job assistant. Tell me what's going on — you don't need to know which trade you need or what the problem is called.",
  });

  return {
    messages,
    quickReplies: [
      "Something is leaking",
      "A power or lighting problem",
      "Painting or walls",
      "Garden or outdoors",
      "A repair around the house",
      "Something else",
    ],
    state: { ...state, stage: "clarify-trade" },
  };
}

/* --------------------------------------------------------------- advance */

export function advance(
  state: ConversationState,
  input: string,
): EngineResult {
  const text = input.trim();
  const safety = checkSafety(text);
  const prefix: EngineMessage[] = safety
    ? [{ text: safety.body, safety }]
    : [];

  const withPrefix = (result: EngineResult): EngineResult => ({
    ...result,
    messages: [...prefix, ...result.messages],
  });

  switch (state.stage) {
    case "clarify-trade": {
      const map: Record<string, string> = {
        "something is leaking": "plumber",
        "a power or lighting problem": "electrician",
        "painting or walls": "painter",
        "garden or outdoors": "gardener",
        "a repair around the house": "handyman",
      };
      const mapped = map[text.toLowerCase()];
      const trade = mapped ? getTrade(mapped) : detectTrade(text);
      if (trade) {
        const next = startConversation({
          initialMessage: text,
          tradeSlug: trade.slug,
        });
        return withPrefix({
          ...next,
          state: { ...next.state, location: state.location ?? next.state.location },
        });
      }
      if (!state.location) {
        const loc = detectLocation(text);
        if (loc) state = { ...state, location: loc };
      }
      return withPrefix({
        messages: [
          {
            text: "Got it. Can you describe what you can see, hear or need done? For example: 'water is dripping under the sink' or 'I need a fence panel replaced'.",
          },
        ],
        state,
      });
    }

    case "problem": {
      const trade = state.brief.tradeSlug
        ? getTrade(state.brief.tradeSlug)
        : detectTrade(text);
      const brief = {
        ...state.brief,
        problem: text,
        tradeSlug: trade?.slug ?? state.brief.tradeSlug,
        tradeName: trade?.singular ?? state.brief.tradeName,
      };
      const location = state.location ?? detectLocation(text);
      const detailQuestions = trade ? detailQuestionsFor(trade, text) : [];
      const next: ConversationState = {
        ...state,
        brief,
        location,
        detailQuestions,
        detailIndex: 0,
      };
      return withPrefix(askSuburb(next));
    }

    case "details": {
      const q = state.detailQuestions[state.detailIndex];
      const brief = { ...state.brief, notes: [...state.brief.notes] };
      if (q) {
        if (q.store === "visibleIssue") {
          brief.visibleIssue = text;
        } else if (q.store === "problem") {
          brief.problem = text;
        } else {
          brief.notes.push(text);
        }
      }
      const messages: EngineMessage[] = [];
      if (q?.followUpTip && !/no|none|not/i.test(text)) {
        messages.push({ text: q.followUpTip });
      }
      // A menu answer re-picks the question branch from the chosen option.
      if (q?.rebranch) {
        const trade = brief.tradeSlug ? getTrade(brief.tradeSlug) : undefined;
        if (trade) {
          const rebranched: ConversationState = {
            ...state,
            brief,
            detailQuestions: detailQuestionsFor(trade, text, false),
            detailIndex: 0,
          };
          const result = nextDetailOrPhoto(rebranched);
          return withPrefix({
            ...result,
            messages: [...messages, ...result.messages],
          });
        }
      }
      const next: ConversationState = {
        ...state,
        brief,
        detailIndex: state.detailIndex + 1,
      };
      const result = nextDetailOrPhoto(next);
      return withPrefix({ ...result, messages: [...messages, ...result.messages] });
    }

    case "photo": {
      // Reached via typed text rather than an action button.
      const wantsSkip = /skip|no|without/i.test(text);
      if (!wantsSkip) {
        return withPrefix(photoAdded(state, 1));
      }
      return withPrefix(askUrgency(state));
    }

    case "urgency": {
      const brief = { ...state.brief, urgency: text };
      return withPrefix(askProperty({ ...state, brief }));
    }

    case "property": {
      const brief = { ...state.brief, propertyType: text };
      return withPrefix({
        messages: [
          { text: "Thanks. Almost done — what's your full name?" },
        ],
        state: { ...state, brief, stage: "full-name" },
      });
    }

    case "suburb": {
      const loc = detectLocation(text);
      if (loc) {
        return withPrefix({
          messages: [
            {
              text: `Is that ${loc.name}, ${loc.state} ${loc.postcodeRange.split("–")[0]}?`,
            },
          ],
          quickReplies: ["Yes, that's right", "Choose another location"],
          state: {
            ...state,
            location: loc,
            pendingSuburbText: text,
            stage: "suburb-confirm",
          },
        });
      }
      const brief = { ...state.brief, suburb: text };
      return withPrefix(
        beginJobQuestions(
          { ...state, brief },
          "Thanks. Now a few quick questions about the job.",
        ),
      );
    }

    case "suburb-confirm": {
      if (/^yes/i.test(text)) {
        const loc = state.location;
        const brief = {
          ...state.brief,
          suburb: loc
            ? `${loc.name}, ${loc.stateAbbr} ${loc.postcodeRange.split("–")[0]}`
            : state.pendingSuburbText ?? state.brief.suburb,
        };
        return withPrefix(
          beginJobQuestions(
            { ...state, brief },
            "Great. Now a few quick questions about the job.",
          ),
        );
      }
      return withPrefix({
        messages: [{ text: "No problem. Where is the job located?" }],
        inputHint: "Suburb or postcode — e.g. Surfers Paradise or 4217",
        state: { ...state, location: undefined, stage: "suburb" },
      });
    }

    case "full-name": {
      const brief = { ...state.brief, name: text };
      const firstName = text.trim().split(/\s+/)[0];
      return withPrefix({
        messages: [
          {
            text: `Thanks ${firstName}. How would you like to be contacted about quotes?`,
          },
        ],
        quickReplies: ["Phone call", "SMS", "Email"],
        state: { ...state, brief, stage: "contact-method" },
      });
    }

    case "contact-method": {
      const wantsEmail = /email/i.test(text);
      const brief = {
        ...state.brief,
        contactMethod: wantsEmail
          ? "Email"
          : /sms|text/i.test(text)
            ? "SMS"
            : "Phone call",
      };
      if (wantsEmail) {
        return withPrefix({
          messages: [{ text: "What's the best email address for your quotes?" }],
          inputHint: "e.g. you@example.com",
          state: { ...state, brief, stage: "email" },
        });
      }
      return withPrefix({
        messages: [
          {
            text: `What's the best mobile number for tradies to ${brief.contactMethod === "SMS" ? "text" : "call"} you on?`,
          },
        ],
        inputHint: "e.g. 0400 000 000",
        state: { ...state, brief, stage: "mobile" },
      });
    }

    case "email": {
      if (!emailPattern.test(text)) {
        return withPrefix({
          messages: [
            {
              text: "That email doesn't look quite right — could you double-check it?",
            },
          ],
          inputHint: "e.g. you@example.com",
          state,
        });
      }
      const brief = {
        ...state.brief,
        email: text,
        title: titleFor(state.brief),
      };
      return withPrefix({
        messages: [
          {
            text: "That's everything I need. Here's the job we'll send to local tradies — take a look and edit anything that isn't right.",
          },
        ],
        state: { ...state, brief, stage: "review" },
      });
    }

    case "mobile": {
      if (!mobilePattern.test(text.replace(/\s/g, ""))) {
        return withPrefix({
          messages: [
            {
              text: "That doesn't look like an Australian mobile number. Could you check it? It should start with 04.",
            },
          ],
          inputHint: "e.g. 0400 000 000",
          state,
        });
      }
      const brief = {
        ...state.brief,
        mobile: text,
        title: titleFor(state.brief),
      };
      return withPrefix({
        messages: [
          {
            text: "That's everything I need. Here's the job we'll send to local tradies — take a look and edit anything that isn't right.",
          },
        ],
        state: { ...state, brief, stage: "review" },
      });
    }

    case "review":
      return withPrefix({
        messages: [
          {
            text: "You can edit any section of the summary, or confirm it when you're ready.",
          },
        ],
        state,
      });
  }
}

/* ----------------------------------------------------- photos and camera */

export function photoAdded(
  state: ConversationState,
  count: number,
): EngineResult {
  const brief = { ...state.brief, photos: state.brief.photos + count };
  const plural = count === 1 ? "photo" : "photos";
  return {
    messages: [
      {
        text: `Thanks — I've added ${count === 1 ? "the" : count} ${plural} to your job request. ${
          brief.photos > 1 ? "They'll help" : "It'll help"
        } tradies understand the job before they quote.`,
      },
      { text: "How soon do you need it done?" },
    ],
    quickReplies: urgencyReplies,
    state: { ...state, brief, stage: "urgency" },
  };
}

export function skipPhoto(state: ConversationState): EngineResult {
  return {
    messages: [
      { text: "No worries — you can always add photos later if it helps." },
      { text: "How soon do you need it done?" },
    ],
    quickReplies: urgencyReplies,
    state: { ...state, stage: "urgency" },
  };
}

function askUrgency(state: ConversationState): EngineResult {
  return {
    messages: [{ text: "How soon do you need it done?" }],
    quickReplies: urgencyReplies,
    state: { ...state, stage: "urgency" },
  };
}

function askProperty(state: ConversationState): EngineResult {
  return {
    messages: [{ text: "Is this for a home or a business?" }],
    quickReplies: propertyReplies,
    state: { ...state, stage: "property" },
  };
}

/* -------------------------------------------------------------- exports */

export { trades };
