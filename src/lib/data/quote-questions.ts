/**
 * The question matrix behind the quick quote form.
 *
 * Each trade has a small tree: an entry question, with options that can pull
 * in a follow-up question. After the trade-specific questions, every job gets
 * the shared questions (home/business, timing) and an optional detail box.
 * When we can't tell the trade from the prompt, the "generic" question asks
 * the customer to pick a category and re-roots into that trade's tree.
 */

export type QuoteQuestionType = "radio" | "multi" | "text";

export interface QuoteOption {
  value: string;
  label: string;
  /** Question (in the same set) to ask next when this option is chosen. */
  followUpId?: string;
  /** Generic set only: selecting this option routes into a trade's tree. */
  tradeSlug?: string;
}

export interface QuoteQuestion {
  id: string;
  question: string;
  hint?: string;
  type: QuoteQuestionType;
  options?: QuoteOption[];
  placeholder?: string;
  optional?: boolean;
}

export interface QuestionSet {
  entryId: string;
  questions: Record<string, QuoteQuestion>;
}

function radio(
  id: string,
  question: string,
  options: (QuoteOption | [string, string] | [string, string, string])[],
  hint?: string,
): QuoteQuestion {
  return {
    id,
    question,
    hint,
    type: "radio",
    options: options.map((option) =>
      Array.isArray(option)
        ? { value: option[0], label: option[1], followUpId: option[2] }
        : option,
    ),
  };
}

function multi(
  id: string,
  question: string,
  options: (QuoteOption | [string, string] | [string, string, string])[],
  hint?: string,
): QuoteQuestion {
  return { ...radio(id, question, options, hint), type: "multi" };
}

const somethingElse: [string, string] = ["something-else", "Something else"];

/* ------------------------------------------------------- per-trade trees */

export const tradeQuestionSets: Record<string, QuestionSet> = {
  plumber: {
    entryId: "plumb-type",
    questions: {
      "plumb-type": radio("plumb-type", "What kind of plumbing work do you need?", [
        ["leak", "Leaking tap or pipe", "plumb-leak"],
        ["blocked", "Blocked drain or toilet"],
        ["hot-water", "Hot water system", "plumb-hot-water"],
        ["toilet", "Toilet repair or replacement"],
        ["renovation", "Renovation plumbing"],
        somethingElse,
      ]),
      "plumb-leak": radio("plumb-leak", "Where is the leak?", [
        ["kitchen", "Kitchen"],
        ["bathroom", "Bathroom"],
        ["laundry", "Laundry"],
        ["outdoors", "Outdoors"],
        ["not-sure", "Not sure"],
      ]),
      "plumb-hot-water": radio("plumb-hot-water", "What's happening with the hot water?", [
        ["none", "No hot water at all"],
        ["runs-out", "Not enough — it runs out"],
        ["leaking", "The unit is leaking"],
        ["replace", "I want to replace it"],
      ]),
    },
  },

  electrician: {
    entryId: "elec-type",
    questions: {
      "elec-type": radio("elec-type", "What kind of electrical work do you need?", [
        ["lighting", "Lighting or light fixtures", "elec-lighting"],
        ["power-points", "Power points or switches", "elec-power-points"],
        ["switchboard", "Switchboard or safety switch"],
        ["fault", "Fault finding — something's not working"],
        ["appliance", "New appliance hook-up"],
        ["rewiring", "Full or partial rewiring"],
        somethingElse,
      ]),
      "elec-lighting": multi("elec-lighting", "What type of lighting?", [
        ["downlights", "Indoor downlights or pendants"],
        ["outdoor", "Outdoor or garden lighting"],
        ["fans", "Ceiling fans"],
        ["security", "Security or sensor lights"],
      ], "Choose everything that applies."),
      "elec-power-points": radio("elec-power-points", "How many power points or switches?", [
        ["one", "Just one"],
        ["few", "2 to 5"],
        ["many", "6 or more"],
      ]),
    },
  },

  "air-conditioning": {
    entryId: "ac-type",
    questions: {
      "ac-type": radio("ac-type", "What do you need for your air conditioning?", [
        ["install", "A new system installed", "ac-system"],
        ["service", "Service or maintenance"],
        ["repair", "Repair — not cooling or heating"],
        ["noise-leak", "Strange noise or a leak"],
        somethingElse,
      ]),
      "ac-system": radio("ac-system", "What type of system?", [
        ["split", "Split system"],
        ["ducted", "Ducted"],
        ["multi-head", "Multi-head"],
        ["not-sure", "Not sure yet"],
      ]),
    },
  },

  builder: {
    entryId: "build-type",
    questions: {
      "build-type": radio("build-type", "What kind of building work?", [
        ["renovation", "Renovation", "build-areas"],
        ["extension", "Extension or addition"],
        ["new-build", "New build"],
        ["deck-pergola", "Deck or pergola"],
        ["structural", "Structural repairs"],
        somethingElse,
      ]),
      "build-areas": multi("build-areas", "Which areas are you renovating?", [
        ["kitchen", "Kitchen"],
        ["bathroom", "Bathroom"],
        ["living", "Living areas"],
        ["whole-home", "Whole home"],
      ], "Choose everything that applies."),
    },
  },

  carpenter: {
    entryId: "carp-type",
    questions: {
      "carp-type": radio("carp-type", "What kind of carpentry work?", [
        ["doors-windows", "Doors or windows"],
        ["decking", "Decking", "carp-deck"],
        ["shelving", "Shelving or built-in storage"],
        ["trim", "Skirting, architraves or trim"],
        ["framing", "Framing or structural work"],
        somethingElse,
      ]),
      "carp-deck": radio("carp-deck", "Is it a new deck or repairs?", [
        ["new", "A new deck"],
        ["repairs", "Repairs to an existing deck"],
      ]),
    },
  },

  cleaner: {
    entryId: "clean-type",
    questions: {
      "clean-type": radio("clean-type", "What kind of clean do you need?", [
        ["regular", "Regular house cleaning", "clean-frequency"],
        ["bond", "End of lease / bond clean"],
        ["deep", "One-off deep clean"],
        ["carpet", "Carpet or upholstery"],
        ["post-reno", "After renovation or building work"],
        somethingElse,
      ]),
      "clean-frequency": radio("clean-frequency", "How often?", [
        ["weekly", "Weekly"],
        ["fortnightly", "Fortnightly"],
        ["monthly", "Monthly"],
      ]),
    },
  },

  concreter: {
    entryId: "conc-type",
    questions: {
      "conc-type": radio("conc-type", "What concrete work do you need?", [
        ["driveway", "Driveway", "conc-driveway"],
        ["patio-slab", "Patio or slab"],
        ["paths", "Paths"],
        ["footings", "Foundations or footings"],
        ["decorative", "Decorative or exposed aggregate"],
        somethingElse,
      ]),
      "conc-driveway": radio("conc-driveway", "New driveway or fixing an existing one?", [
        ["new", "A new driveway"],
        ["replace", "Replace the existing one"],
        ["repair", "Repairs or resurfacing"],
      ]),
    },
  },

  gardener: {
    entryId: "gard-type",
    questions: {
      "gard-type": radio("gard-type", "What garden help do you need?", [
        ["mowing", "Lawn mowing or maintenance", "gard-frequency"],
        ["hedges-trees", "Hedge or tree trimming"],
        ["tidy-up", "Garden tidy-up or clearing"],
        ["planting", "Planting or new garden beds"],
        ["irrigation", "Irrigation or watering systems"],
        somethingElse,
      ]),
      "gard-frequency": radio("gard-frequency", "One-off or regular visits?", [
        ["one-off", "A one-off tidy up"],
        ["regular", "Regular visits"],
      ]),
    },
  },

  handyman: {
    entryId: "handy-type",
    questions: {
      "handy-type": multi("handy-type", "What needs doing?", [
        ["assembly", "Furniture assembly"],
        ["mounting", "Picture hanging or wall mounting"],
        ["repairs", "Small repairs"],
        ["doors-locks", "Door or lock adjustments"],
        ["gutters", "Gutter cleaning"],
        ["odd-jobs", "A mix of odd jobs"],
      ], "Choose everything that applies."),
    },
  },

  landscaper: {
    entryId: "land-type",
    questions: {
      "land-type": radio("land-type", "What landscaping work do you need?", [
        ["redesign", "Full garden redesign"],
        ["turf", "New lawn or turf"],
        ["paving-walls", "Paving or retaining walls", "land-paving"],
        ["fencing", "Fencing or screening"],
        ["features", "Water features or garden lighting"],
        somethingElse,
      ]),
      "land-paving": multi("land-paving", "Which of these does the job include?", [
        ["paving", "Paving"],
        ["retaining-wall", "Retaining wall"],
        ["steps", "Steps"],
      ], "Choose everything that applies."),
    },
  },

  locksmith: {
    entryId: "lock-type",
    questions: {
      "lock-type": radio("lock-type", "What do you need a locksmith for?", [
        ["locked-out", "I'm locked out", "lock-where"],
        ["rekey", "Change or rekey locks"],
        ["new-locks", "New locks installed"],
        ["repair", "Broken lock repair"],
        ["security", "Safe or security upgrade"],
        somethingElse,
      ]),
      "lock-where": radio("lock-where", "Locked out of where?", [
        ["home", "My home"],
        ["car", "My car"],
        ["business", "My business"],
      ]),
    },
  },

  painter: {
    entryId: "paint-type",
    questions: {
      "paint-type": radio("paint-type", "What painting work do you need?", [
        ["interior", "Interior painting", "paint-areas"],
        ["exterior", "Exterior painting"],
        ["staining", "Fence or deck staining"],
        ["prep", "Repairs and prep before painting"],
        somethingElse,
      ]),
      "paint-areas": radio("paint-areas", "How much are you painting?", [
        ["one-room", "One room"],
        ["several-rooms", "Several rooms"],
        ["whole-interior", "The whole home interior"],
        ["ceilings", "Ceilings only"],
      ]),
    },
  },

  "pest-control": {
    entryId: "pest-type",
    questions: {
      "pest-type": multi("pest-type", "What pests are you dealing with?", [
        ["cockroaches", "Cockroaches"],
        ["ants", "Ants"],
        ["spiders", "Spiders"],
        ["rodents", "Rats or mice"],
        ["termites", "Termites", "pest-termites"],
        ["wasps", "Wasps or bees"],
        somethingElse,
      ], "Choose everything that applies."),
      "pest-termites": radio("pest-termites", "What have you seen with the termites?", [
        ["damage", "Visible damage"],
        ["spotted", "Just spotted them"],
        ["inspection", "Nothing — I want an inspection"],
      ]),
    },
  },

  removalist: {
    entryId: "move-type",
    questions: {
      "move-type": radio("move-type", "What are you moving?", [
        ["whole-home", "A whole house", "move-size"],
        ["apartment", "An apartment or unit", "move-size"],
        ["office", "An office or business"],
        ["few-items", "A few large items"],
        ["interstate", "Interstate move"],
        somethingElse,
      ]),
      "move-size": radio("move-size", "How many bedrooms?", [
        ["one", "1 bedroom"],
        ["two", "2 bedrooms"],
        ["three", "3 bedrooms"],
        ["four-plus", "4 or more"],
      ]),
    },
  },

  roofer: {
    entryId: "roof-type",
    questions: {
      "roof-type": radio("roof-type", "What roofing work do you need?", [
        ["leak", "Leak repair", "roof-leak"],
        ["tiles", "Tile or sheet replacement"],
        ["gutters", "Gutter or downpipe work"],
        ["re-roof", "Full re-roof or restoration"],
        ["inspection", "Roof inspection"],
        somethingElse,
      ]),
      "roof-leak": radio("roof-leak", "Is water getting inside?", [
        ["actively", "Yes — it's coming in now"],
        ["when-raining", "Only when it rains"],
        ["stains", "Just stains on the ceiling"],
      ]),
    },
  },

  tiler: {
    entryId: "tile-type",
    questions: {
      "tile-type": radio("tile-type", "What tiling work do you need?", [
        ["bathroom", "Bathroom", "tile-bathroom"],
        ["splashback", "Kitchen splashback"],
        ["floors", "Floors"],
        ["outdoor", "Outdoor or pool area"],
        ["repairs", "Repairs or regrouting"],
        somethingElse,
      ]),
      "tile-bathroom": radio("tile-bathroom", "Full retile or a smaller job?", [
        ["full", "Full retile"],
        ["shower", "Shower area only"],
        ["repairs", "Repairs or regrouting"],
      ]),
    },
  },
};

/* -------------------------------------------- when we can't tell the trade */

export const genericQuestionSet: QuestionSet = {
  entryId: "generic-category",
  questions: {
    "generic-category": {
      id: "generic-category",
      question: "Which best describes the work you need?",
      type: "radio",
      options: [
        { value: "plumbing", label: "Plumbing", tradeSlug: "plumber" },
        { value: "electrical", label: "Electrical", tradeSlug: "electrician" },
        { value: "painting", label: "Painting", tradeSlug: "painter" },
        { value: "building", label: "Building or renovation", tradeSlug: "builder" },
        { value: "garden", label: "Garden or outdoors", tradeSlug: "gardener" },
        { value: "cleaning", label: "Cleaning", tradeSlug: "cleaner" },
        { value: "air-con", label: "Air conditioning or heating", tradeSlug: "air-conditioning" },
        { value: "roofing", label: "Roofing", tradeSlug: "roofer" },
        { value: "moving", label: "Moving house", tradeSlug: "removalist" },
        { value: "odd-jobs", label: "Odd jobs or repairs", tradeSlug: "handyman" },
        { value: "other", label: "Something else" },
      ],
    },
  },
};

/* ------------------------------------------------ shared closing questions */

export const sharedQuestions: QuoteQuestion[] = [
  radio("shared-property", "Is this for a home or a business?", [
    ["home", "My home"],
    ["business", "A business or commercial property"],
    ["rental-tenant", "A rental — I'm the tenant"],
    ["rental-owner", "A rental — I'm the owner or agent"],
  ]),
  radio("shared-timing", "How soon do you need it done?", [
    ["urgent", "It's urgent — today or tomorrow"],
    ["this-week", "Within the next week"],
    ["few-weeks", "In the next few weeks"],
    ["flexible", "Just planning — I'm flexible"],
  ]),
  {
    id: "shared-detail",
    question: "Anything else we should know?",
    hint: "A little extra detail helps tradies quote accurately.",
    type: "text",
    optional: true,
    placeholder:
      "e.g. brand or model, sizes, access notes, photos you could share later…",
  },
];
