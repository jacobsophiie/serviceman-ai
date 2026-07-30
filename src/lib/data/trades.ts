import type { Trade } from "@/lib/types";

export const trades: Trade[] = [
  {
    name: "Plumbers",
    slug: "plumber",
    singular: "plumber",
    category: "Plumbing",
    intro:
      "Tell us about the plumbing problem and answer a few quick questions. We'll collect the details and prepare your job request for suitable local plumbers.",
    commonJobs: [
      "Leaking taps",
      "Blocked drains",
      "Burst pipes",
      "Toilet repairs",
      "Hot water systems",
      "Kitchen plumbing",
      "Bathroom plumbing",
      "New installations",
      "Plumbing inspections",
      "Emergency plumbing",
    ],
    suggestedQuestions: [
      "Is the water leaking continuously, or only when a tap is running?",
      "Can you see where the water is coming from?",
      "Has the water supply been turned off?",
      "Is water spreading into cupboards, walls or flooring?",
      "How old is the hot water system?",
    ],
    safety:
      "For a major leak or burst pipe, turn off the water at the mains if it is safe to do so. If water is near power points or electrical appliances, keep clear of the area and turn off the power at the switchboard only if it is dry and safe to reach.",
    helpfulPhotos: [
      "The leak or problem area up close",
      "The wider area, so the plumber can see access and context",
      "Any visible pipe connections or valves",
      "Water damage to cupboards, walls or floors",
    ],
    faqs: [
      {
        question: "Do I need to know what the plumbing problem is called?",
        answer:
          "No. Describe what you can see or hear in your own words, or show it with your camera. Our AI agent will ask the right questions and prepare a clear description for the plumber.",
      },
      {
        question: "What should I do about a leak before a plumber arrives?",
        answer:
          "If it is safe to do so, turn off the isolation tap near the fixture or the water mains. Place a bucket or towels under the leak and move items out of the way. Do not attempt repairs to pipework yourself.",
      },
      {
        question: "Can I submit an urgent plumbing job?",
        answer:
          "Yes. Tell the AI agent the job is urgent and it will be flagged in your request. For a burst pipe flooding your home, turn off the water at the mains first if safe.",
      },
    ],
    relatedTrades: ["handyman", "builder", "tiler"],
    keywords: [
      "leak",
      "leaking",
      "tap",
      "drain",
      "toilet",
      "water",
      "pipe",
      "sink",
      "plumber",
      "plumbing",
      "hot water",
      "shower",
      "sewer",
      "gutter blocked",
      "dripping",
      "flush",
      "cistern",
      "burst",
    ],
  },
  {
    name: "Electricians",
    slug: "electrician",
    singular: "electrician",
    category: "Electrical",
    intro:
      "Describe the electrical issue and answer a few quick questions. We'll gather the details and prepare your job request for suitable local electricians.",
    commonJobs: [
      "Power points not working",
      "Light fittings and switches",
      "Safety switch tripping",
      "Ceiling fans",
      "Smoke alarms",
      "Switchboard upgrades",
      "New power points",
      "Outdoor lighting",
      "EV charger installation",
      "Electrical safety inspections",
    ],
    suggestedQuestions: [
      "Is the problem affecting one area or the whole property?",
      "Does the safety switch trip when a particular appliance is used?",
      "Have you noticed any burning smells, buzzing or sparks?",
      "When did the problem start?",
      "Is the affected fitting indoors or outdoors?",
    ],
    safety:
      "Never touch exposed wiring, damaged switches or anything that sparks, buzzes or smells like burning. Do not open the switchboard beyond resetting a safety switch. If you see sparks or smoke, keep clear and contact emergency services if there is immediate danger.",
    helpfulPhotos: [
      "The affected switch, power point or fitting (from a safe distance)",
      "The room or area affected",
      "The switchboard, with the door open but nothing touched",
      "Any visible damage such as scorch marks",
    ],
    faqs: [
      {
        question: "Is it safe to show electrical problems with my camera?",
        answer:
          "Yes, from a safe distance. The AI agent will never ask you to touch wiring, open electrical equipment or test anything live. If something looks dangerous, it will tell you to move away and flag the job as urgent.",
      },
      {
        question: "My safety switch keeps tripping. What should I include?",
        answer:
          "Note when it trips, which appliances were running, and whether it resets. This helps the electrician narrow down the likely circuit before they arrive.",
      },
      {
        question: "Can the AI diagnose an electrical fault?",
        answer:
          "No. It helps you describe the symptoms clearly, but all electrical work in Australia must be diagnosed and carried out by a licensed electrician.",
      },
    ],
    relatedTrades: ["air-conditioning", "handyman", "builder"],
    keywords: [
      "power",
      "switch",
      "light",
      "lighting",
      "light fixture",
      "light fitting",
      "downlight",
      "pendant light",
      "socket",
      "power point",
      "powerpoint",
      "fuse",
      "spark",
      "wiring",
      "electric",
      "electrician",
      "electrical",
      "safety switch",
      "switchboard",
      "smoke alarm",
      "ceiling fan",
      "tripping",
      "outlet",
    ],
  },
  {
    name: "Painters",
    slug: "painter",
    singular: "painter",
    category: "Painting",
    intro:
      "Tell us what needs painting — walls, ceilings or the exterior. We'll prepare a clear job request for suitable local painters.",
    commonJobs: [
      "Interior painting",
      "Exterior painting",
      "Ceiling painting",
      "Feature walls",
      "Peeling or flaking paint",
      "Water stain repair and repaint",
      "Fence and gate painting",
      "Deck staining",
      "Whole home repaints",
      "Touch-ups before sale or end of lease",
    ],
    suggestedQuestions: [
      "Is the painting for the inside or outside of the property?",
      "Which rooms or areas need painting?",
      "Are you keeping the same colour or changing it?",
      "Is there any peeling, cracking or water damage to repair first?",
      "Roughly how tall are the ceilings or walls?",
    ],
    safety:
      "If paint is peeling in a home built before 1990, it may contain lead. Avoid sanding or disturbing it and mention the home's age in your request so the painter can test and manage it safely.",
    helpfulPhotos: [
      "Each room or wall that needs painting",
      "Close-ups of any peeling, cracking or stains",
      "The full height of walls so the painter can judge scale",
      "Exterior shots showing access around the building",
    ],
    faqs: [
      {
        question: "Do I need to know how many litres of paint I need?",
        answer:
          "No. Describe the rooms or areas and share photos if you can. The painter will calculate materials when quoting.",
      },
      {
        question: "Should I mention water stains?",
        answer:
          "Yes. Stains often point to a leak that should be fixed before painting. The AI agent will ask about this and can add a plumbing or roofing note to your request.",
      },
    ],
    relatedTrades: ["handyman", "plasterer", "carpenter"],
    keywords: [
      "paint",
      "painting",
      "painter",
      "wall",
      "ceiling",
      "peeling",
      "colour",
      "color",
      "interior",
      "exterior",
      "repaint",
      "flaking",
      "undercoat",
      "feature wall",
    ],
  },
  {
    name: "Handymen",
    slug: "handyman",
    singular: "handyman",
    category: "Handyman work",
    intro:
      "From small repairs to odd jobs, just tell us what needs doing. We'll prepare your job request for suitable local handymen.",
    commonJobs: [
      "Door repairs and adjustments",
      "Hanging pictures and mirrors",
      "Flat-pack assembly",
      "Shelf and TV mounting",
      "Gate and fence repairs",
      "Sealing and caulking",
      "Small plastering patches",
      "Curtain and blind installation",
      "General home maintenance",
      "Odd job lists",
    ],
    suggestedQuestions: [
      "What needs to be repaired, installed or assembled?",
      "What is the item or surface made of?",
      "Do you have the materials, or should the handyman supply them?",
      "Is this one job or a list of small jobs?",
      "Is there anything heavy that needs two people?",
    ],
    safety:
      "Handymen cannot carry out licensed plumbing, gas or electrical work in Australia. If your job involves wiring, gas or pipework, the AI agent will route it to the right licensed trade.",
    helpfulPhotos: [
      "The item or area needing work",
      "Any damage up close",
      "The wall or surface type where something will be mounted",
      "The full list written down, if you have several small jobs",
    ],
    faqs: [
      {
        question: "Can I submit a list of small jobs as one request?",
        answer:
          "Yes. Tell the AI agent everything on your list. It will organise the items into one clear request so a handyman can quote the lot in a single visit.",
      },
      {
        question: "Can a handyman do electrical or plumbing work?",
        answer:
          "No. Licensed work must be done by a licensed tradesperson. If part of your list needs a plumber or electrician, the AI agent will flag it.",
      },
    ],
    relatedTrades: ["carpenter", "painter", "gardener"],
    keywords: [
      "repair",
      "hang",
      "install",
      "door",
      "shelf",
      "gate",
      "furniture",
      "handyman",
      "assemble",
      "flat-pack",
      "flatpack",
      "mount",
      "fix",
      "broken fence",
      "odd job",
      "picture",
      "mirror",
      "tv bracket",
    ],
  },
  {
    name: "Gardeners",
    slug: "gardener",
    singular: "gardener",
    category: "Gardening",
    intro:
      "Show us the garden or describe what needs doing. We'll collect the details and prepare your job request for suitable local gardeners.",
    commonJobs: [
      "Lawn mowing",
      "Garden clean-ups",
      "Hedge trimming",
      "Weeding",
      "Tree and shrub pruning",
      "Mulching",
      "Garden bed maintenance",
      "Green waste removal",
      "Regular garden maintenance",
      "Overgrown garden restoration",
    ],
    suggestedQuestions: [
      "Is this a one-off clean-up or regular maintenance?",
      "Roughly how big is the garden or lawn area?",
      "Should green waste be removed or left on site?",
      "Are there any large trees involved?",
      "Is there side access to the backyard?",
    ],
    safety:
      "Large tree removal and work near powerlines needs a qualified arborist, not general gardening. Mention any big trees or powerlines in your request so the right professional is matched.",
    helpfulPhotos: [
      "A wide shot of the garden or lawn",
      "The most overgrown areas",
      "Access points such as gates and side paths",
      "Any trees that need attention, showing their full height",
    ],
    faqs: [
      {
        question: "How do I describe the size of my garden?",
        answer:
          "You don't need exact measurements. A wide photo or a rough description like 'small courtyard' or 'quarter-acre block' is enough for a gardener to understand the scale.",
      },
      {
        question: "Can I set up regular mowing?",
        answer:
          "Yes. Tell the AI agent you want ongoing maintenance and how often, and that preference will be included in your job request.",
      },
    ],
    relatedTrades: ["landscaper", "handyman", "pest-control"],
    keywords: [
      "lawn",
      "garden",
      "hedge",
      "weeds",
      "trees",
      "mowing",
      "clean-up",
      "cleanup",
      "overgrown",
      "gardener",
      "gardening",
      "grass",
      "pruning",
      "mulch",
      "yard",
    ],
  },
  {
    name: "Carpenters",
    slug: "carpenter",
    singular: "carpenter",
    category: "Carpentry",
    intro:
      "Describe the timber work you need. We'll prepare a clear job request for suitable local carpenters.",
    commonJobs: [
      "Deck repairs and builds",
      "Door hanging and repairs",
      "Custom shelving and storage",
      "Skirting and architraves",
      "Timber fence repairs",
      "Pergolas",
      "Stair repairs",
      "Window frame repairs",
      "Built-in wardrobes",
      "Timber rot replacement",
    ],
    suggestedQuestions: [
      "Is this a repair to existing timber or something new?",
      "What are the rough dimensions of the area?",
      "Is the timber showing rot, cracking or movement?",
      "Do you have a design in mind, or would you like suggestions?",
      "Is the work indoors or outdoors?",
    ],
    safety:
      "If a deck, stair or balustrade feels loose or unstable, keep people off it until it has been inspected. Mention any movement or soft spots in your request.",
    helpfulPhotos: [
      "The area or item needing work",
      "Close-ups of damage, rot or joints",
      "A wider shot for scale",
      "Anything similar to what you want built",
    ],
    faqs: [
      {
        question: "Deck repair or full rebuild — how do I know?",
        answer:
          "You don't need to. Show the damage and the carpenter will assess whether boards can be replaced or the structure needs more work.",
      },
    ],
    relatedTrades: ["builder", "handyman", "painter"],
    keywords: [
      "timber",
      "wood",
      "deck",
      "carpenter",
      "carpentry",
      "skirting",
      "wardrobe",
      "pergola",
      "stairs",
      "rot",
      "joinery",
      "cabinet",
    ],
  },
  {
    name: "Builders",
    slug: "builder",
    singular: "builder",
    category: "Building",
    intro:
      "From renovations to structural repairs, describe the project to our AI agent. We'll organise the details into a clear job request for suitable local builders.",
    commonJobs: [
      "Bathroom renovations",
      "Kitchen renovations",
      "Home extensions",
      "Wall removal and structural work",
      "Garage conversions",
      "Decks and outdoor structures",
      "Cracked wall assessment",
      "Insurance repair work",
      "Granny flats",
      "General renovations",
    ],
    suggestedQuestions: [
      "What would you like to build or renovate?",
      "Do you have plans or drawings, or is this early-stage?",
      "What is your rough timeframe for the project?",
      "Is the property a house, townhouse or apartment?",
      "Have you noticed any structural issues like cracks or sagging?",
    ],
    safety:
      "Widening cracks, sagging ceilings or doors that suddenly stop closing can indicate structural movement. Keep people away from any area that looks unstable and flag it as urgent in your request.",
    helpfulPhotos: [
      "The area to be renovated or repaired",
      "Any cracks or damage with something for scale",
      "Existing plans or sketches if you have them",
      "Street access for materials and skips",
    ],
    faqs: [
      {
        question: "I don't have plans yet. Can I still submit a job?",
        answer:
          "Yes. Describe what you're hoping to achieve and your rough budget and timing. Builders can help with the design stage too.",
      },
    ],
    relatedTrades: ["carpenter", "concreter", "roofer"],
    keywords: [
      "renovation",
      "renovate",
      "extension",
      "builder",
      "building",
      "structural",
      "crack",
      "wall removal",
      "granny flat",
      "kitchen reno",
      "bathroom reno",
    ],
  },
  {
    name: "Roofers",
    slug: "roofer",
    singular: "roofer",
    category: "Roofing",
    intro:
      "Describe the roof problem from the safety of the ground. We'll gather the details and prepare your job request for suitable local roofers.",
    commonJobs: [
      "Roof leaks",
      "Broken or slipped tiles",
      "Metal roof repairs",
      "Gutter repairs and replacement",
      "Ridge capping",
      "Roof restoration",
      "Storm damage",
      "Downpipe repairs",
      "Whirlybird installation",
      "Roof inspections",
    ],
    suggestedQuestions: [
      "Where is the water coming through inside the house?",
      "Is the roof tiled or metal?",
      "Did the leak start after a storm?",
      "Can you see any damage from the ground?",
      "How many storeys is the property?",
    ],
    safety:
      "Never climb onto the roof or a ladder to inspect damage. Photograph what you can see from the ground and describe where water appears inside. If a ceiling is bulging with water, keep clear of the area.",
    helpfulPhotos: [
      "The roof from the ground on each side of the house",
      "Water stains or drips inside",
      "The ceiling area affected",
      "Gutters and downpipes if relevant",
    ],
    faqs: [
      {
        question: "The ceiling is bulging after rain. What do I do?",
        answer:
          "Keep everyone away from the area — a water-filled ceiling can collapse. Submit the job as urgent and mention the bulge. If it is severe, contact the SES on 132 500.",
      },
    ],
    relatedTrades: ["builder", "plumber", "painter"],
    keywords: [
      "roof",
      "roofing",
      "tiles",
      "gutter",
      "downpipe",
      "leak from roof",
      "ridge",
      "storm damage",
      "ceiling stain",
      "water through the roof",
      "roofer",
    ],
  },
  {
    name: "Tilers",
    slug: "tiler",
    singular: "tiler",
    category: "Tiling",
    intro:
      "Show us the tiles or describe the area. We'll prepare a clear job request for suitable local tilers.",
    commonJobs: [
      "Bathroom tiling",
      "Kitchen splashbacks",
      "Cracked tile replacement",
      "Regrouting",
      "Floor tiling",
      "Outdoor and balcony tiling",
      "Waterproofing and tiling",
      "Shower leak retiling",
      "Pool surrounds",
      "Tile removal",
    ],
    suggestedQuestions: [
      "Which area needs tiling or repair?",
      "Roughly how many square metres is the space?",
      "Have you already chosen tiles, or do you need supply too?",
      "Are any tiles drummy, cracked or lifting?",
      "Is there any sign of water getting behind the tiles?",
    ],
    safety:
      "Loose or drummy tiles in wet areas can hide water damage behind the wall. Mention any musty smells or soft walls in your request so waterproofing can be checked.",
    helpfulPhotos: [
      "The area to be tiled",
      "Close-ups of cracked or lifting tiles",
      "A wide shot with something for scale",
      "The tiles you want used, if chosen",
    ],
    faqs: [
      {
        question: "Do I need to know my square metres?",
        answer:
          "A rough idea helps, but photos with something for scale work well. The tiler will measure precisely before quoting.",
      },
    ],
    relatedTrades: ["plumber", "builder", "handyman"],
    keywords: [
      "tile",
      "tiles",
      "tiling",
      "grout",
      "regrout",
      "splashback",
      "tiler",
      "cracked tile",
      "waterproofing",
    ],
  },
  {
    name: "Concreters",
    slug: "concreter",
    singular: "concreter",
    category: "Concreting",
    intro:
      "Describe the concreting work you need. We'll prepare your job request for suitable local concreters.",
    commonJobs: [
      "Driveways",
      "Paths and walkways",
      "Concrete slabs",
      "Cracked concrete repairs",
      "Exposed aggregate finishes",
      "Shed and garage slabs",
      "Retaining wall footings",
      "Concrete removal",
      "Stencilled and coloured concrete",
      "Kerbing",
    ],
    suggestedQuestions: [
      "What is the concrete for — a driveway, path, slab or repair?",
      "Roughly what size is the area?",
      "Is there old concrete to remove first?",
      "What finish would you like?",
      "Can a truck or pump access the area?",
    ],
    safety:
      "Large cracks with height difference between slabs are a trip hazard and may indicate ground movement. Mention how long the cracking has been developing.",
    helpfulPhotos: [
      "The full area from a few angles",
      "Access from the street",
      "Any cracks or damage up close",
      "A finish you like, if you have an example",
    ],
    faqs: [
      {
        question: "How accurate do my measurements need to be?",
        answer:
          "A rough length and width is plenty. The concreter will measure on site before finalising a quote.",
      },
    ],
    relatedTrades: ["landscaper", "builder", "fencer"],
    keywords: [
      "concrete",
      "driveway",
      "slab",
      "concreter",
      "concreting",
      "path",
      "aggregate",
      "footings",
      "kerb",
    ],
  },
  {
    name: "Landscapers",
    slug: "landscaper",
    singular: "landscaper",
    category: "Landscaping",
    intro:
      "Describe your outdoor project or show us the space. We'll organise the details into a clear job request for suitable local landscapers.",
    commonJobs: [
      "Garden design and makeovers",
      "Turf laying",
      "Retaining walls",
      "Paving",
      "Garden beds and planting",
      "Irrigation systems",
      "Decking and outdoor areas",
      "Levelling and earthworks",
      "Artificial grass",
      "Full backyard transformations",
    ],
    suggestedQuestions: [
      "What would you like to change about the outdoor space?",
      "Roughly how big is the area?",
      "Do you have a style or design in mind?",
      "Is the block flat or sloped?",
      "What is your rough budget range?",
    ],
    safety:
      "Retaining walls above one metre usually need engineering and council approval. Mention wall heights in your request so this can be planned properly.",
    helpfulPhotos: [
      "Wide shots of the whole space",
      "The slope of the block if any",
      "Access for machinery and materials",
      "Inspiration photos of styles you like",
    ],
    faqs: [
      {
        question: "I only have a rough idea. Is that enough?",
        answer:
          "Yes. Share what you want to use the space for and any styles you like. Landscapers can develop the design with you.",
      },
    ],
    relatedTrades: ["gardener", "concreter", "fencer"],
    keywords: [
      "landscaping",
      "landscaper",
      "turf",
      "retaining wall",
      "paving",
      "backyard makeover",
      "irrigation",
      "artificial grass",
      "garden design",
    ],
  },
  {
    name: "Cleaners",
    slug: "cleaner",
    singular: "cleaner",
    category: "Cleaning",
    intro:
      "Tell our AI agent what needs cleaning and when. We'll prepare your job request for suitable local cleaners.",
    commonJobs: [
      "End of lease cleaning",
      "Regular home cleaning",
      "Deep cleaning",
      "Carpet cleaning",
      "Window cleaning",
      "Oven and kitchen cleaning",
      "Pressure washing",
      "After-renovation cleaning",
      "Office cleaning",
      "Move-in cleaning",
    ],
    suggestedQuestions: [
      "Is this a one-off clean or regular service?",
      "How many bedrooms and bathrooms does the property have?",
      "Do you need carpets steam cleaned?",
      "Is this for an end of lease with a checklist?",
      "When do you need the clean completed by?",
    ],
    safety:
      "If the clean involves mould over a large area, biological waste or hazardous materials, mention it up front — these need specialised cleaning services.",
    helpfulPhotos: [
      "The main rooms to be cleaned",
      "Any problem areas like ovens or showers",
      "Carpet stains if relevant",
    ],
    faqs: [
      {
        question: "Do cleaners bring their own equipment?",
        answer:
          "Most do, but it varies. Mention any preferences — like your own products for allergies — in your request.",
      },
    ],
    relatedTrades: ["removalist", "handyman", "pest-control"],
    keywords: [
      "clean",
      "cleaning",
      "cleaner",
      "end of lease",
      "bond clean",
      "carpet clean",
      "pressure wash",
      "housekeeping",
      "deep clean",
    ],
  },
  {
    name: "Locksmiths",
    slug: "locksmith",
    singular: "locksmith",
    category: "Locksmith services",
    intro:
      "Locked out, moving in or upgrading security? Describe what you need and we'll prepare your job request for suitable local locksmiths.",
    commonJobs: [
      "Lockouts",
      "Lock rekeying",
      "Lock replacement",
      "Key cutting",
      "Deadlocks and deadbolts",
      "Window locks",
      "Smart lock installation",
      "Broken key extraction",
      "Security upgrades after a break-in",
      "Mailbox and garage locks",
    ],
    suggestedQuestions: [
      "Are you currently locked out?",
      "Which doors or windows need attention?",
      "Do you want locks rekeyed or fully replaced?",
      "Is this following a break-in or lost keys?",
      "What type of door is it — timber, aluminium or security screen?",
    ],
    safety:
      "If you're locked out with a child, pet or cooking left inside, tell the AI agent immediately — this is treated as urgent. After a break-in, contact the police before anything is repaired or moved.",
    helpfulPhotos: [
      "The lock and door up close",
      "The edge of the door showing the lock body",
      "Any damage from a break-in",
    ],
    faqs: [
      {
        question: "Rekeying or replacing — what's the difference?",
        answer:
          "Rekeying changes the lock's internals so old keys stop working, and is usually cheaper. Replacement swaps the whole unit. The locksmith will recommend the right option.",
      },
    ],
    relatedTrades: ["handyman", "carpenter", "builder"],
    keywords: [
      "lock",
      "locked out",
      "locksmith",
      "key",
      "keys",
      "rekey",
      "deadlock",
      "break-in",
      "break in",
      "smart lock",
    ],
  },
  {
    name: "Pest controllers",
    slug: "pest-control",
    singular: "pest control technician",
    category: "Pest control",
    intro:
      "Describe the pest problem or show us the signs. We'll prepare your job request for suitable local pest control services.",
    commonJobs: [
      "Termite inspections",
      "Cockroach treatment",
      "Ant control",
      "Spider treatment",
      "Rodent control",
      "Wasp nest removal",
      "Bed bug treatment",
      "Possum removal",
      "End of lease pest spray",
      "Annual pest treatment",
    ],
    suggestedQuestions: [
      "What pests have you seen, or what signs have you noticed?",
      "Where in the property are they appearing?",
      "How long has this been happening?",
      "Do you have pets or young children in the home?",
      "Have you had any pest treatment recently?",
    ],
    safety:
      "Do not disturb wasp nests, spider nests or possums yourself. If you suspect termites, avoid breaking open the affected timber — this can scatter the colony and make treatment harder.",
    helpfulPhotos: [
      "The pests or droppings if visible",
      "Damage such as chewed timber or wiring",
      "Mud tubes or hollow-sounding timber for suspected termites",
      "The areas where pests appear",
    ],
    faqs: [
      {
        question: "I think I have termites. Should I open the wall?",
        answer:
          "No — leave the area undisturbed. Breaking open termite workings can spread the colony. Book an inspection and let the technician assess it.",
      },
    ],
    relatedTrades: ["gardener", "cleaner", "builder"],
    keywords: [
      "pest",
      "termite",
      "termites",
      "cockroach",
      "ants",
      "spider",
      "rodent",
      "mice",
      "rats",
      "wasp",
      "possum",
      "bed bug",
    ],
  },
  {
    name: "Air-conditioning technicians",
    slug: "air-conditioning",
    singular: "air-conditioning technician",
    category: "Air conditioning",
    intro:
      "Heating, cooling or a unit that's stopped working — describe it to our AI agent and we'll prepare your job request for suitable local air-conditioning technicians.",
    commonJobs: [
      "Air conditioner not cooling",
      "Split system installation",
      "Ducted system servicing",
      "Air conditioner leaking water",
      "Strange noises or smells",
      "Remote and thermostat issues",
      "Filter cleaning and servicing",
      "Unit replacement",
      "Multi-room systems",
      "Commercial servicing",
    ],
    suggestedQuestions: [
      "Is the unit not cooling, not heating, or not turning on at all?",
      "What type of system is it — split system, ducted or window unit?",
      "Do you know the brand and approximate age?",
      "Is the unit leaking water or making unusual noises?",
      "When was it last serviced?",
    ],
    safety:
      "Refrigerant and electrical work on air conditioners must be done by licensed technicians. It's fine to clean accessible filters, but don't open the unit beyond that. Burning smells mean switch it off at the isolator and stop using it.",
    helpfulPhotos: [
      "The indoor unit",
      "The outdoor unit and its surroundings",
      "The model sticker (usually on the side of the unit)",
      "Any water leaks or ice on the pipes",
    ],
    faqs: [
      {
        question: "My air conditioner runs but doesn't cool. What helps?",
        answer:
          "Note whether the airflow is weak, the air is warm, or the unit ices up. A photo of the model sticker also helps the technician bring the right parts.",
      },
    ],
    relatedTrades: ["electrician", "handyman", "builder"],
    keywords: [
      "air conditioner",
      "air conditioning",
      "aircon",
      "air con",
      "cooling",
      "heating",
      "split system",
      "ducted",
      "not cooling",
      "hvac",
    ],
  },
  {
    name: "Removalists",
    slug: "removalist",
    singular: "removalist",
    category: "Removals",
    intro:
      "Tell our AI agent what's moving, where and when. We'll prepare your job request for suitable local removalists.",
    commonJobs: [
      "Home moves",
      "Apartment moves",
      "Office relocations",
      "Single large item moves",
      "Interstate moves",
      "Packing services",
      "Piano and pool table moves",
      "Storage moves",
      "End of lease moves",
      "Furniture rearranging",
    ],
    suggestedQuestions: [
      "How many bedrooms is the move, or is it a single item?",
      "Where are you moving from and to?",
      "What date do you need to move?",
      "Are there stairs or lifts at either end?",
      "Do you need packing help or just transport?",
    ],
    safety:
      "Mention any especially heavy or awkward items — pianos, safes, marble tables — so the right crew and equipment are sent. Don't attempt to move these yourself.",
    helpfulPhotos: [
      "The main rooms showing furniture volume",
      "Large or awkward items",
      "Access at both properties — stairs, lifts, driveways",
    ],
    faqs: [
      {
        question: "How do removalists estimate the size of my move?",
        answer:
          "By bedroom count and photos of your main rooms. A few wide shots are usually enough for an accurate quote.",
      },
    ],
    relatedTrades: ["cleaner", "handyman", "locksmith"],
    keywords: [
      "move",
      "moving",
      "removalist",
      "relocation",
      "furniture move",
      "moving house",
      "interstate move",
      "packing",
    ],
  },
];

export function getTrade(slug: string): Trade | undefined {
  return trades.find((t) => t.slug === slug);
}

/** Detect the likely trade from free text using keyword matching. */
export function detectTrade(text: string): Trade | undefined {
  const lower = ` ${text.toLowerCase()} `;
  let best: { trade: Trade; score: number } | undefined;
  for (const trade of trades) {
    let score = 0;
    for (const keyword of trade.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        // Longer keywords are more specific, weight them higher
        score += keyword.length > 6 ? 3 : keyword.includes(" ") ? 3 : 1;
      }
    }
    if (lower.includes(trade.slug) || lower.includes(trade.singular)) {
      score += 5;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { trade, score };
    }
  }
  return best?.trade;
}
