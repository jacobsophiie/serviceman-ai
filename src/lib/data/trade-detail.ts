import type { TradeFAQ } from "@/lib/types";

/**
 * Longer-form editorial content for the trade landing pages: what the trade
 * actually does, plus extra questions so every page has a substantial FAQ.
 * Kept apart from `trades.ts` so the job-flow data there stays easy to scan.
 */
export interface TradeDetail {
  /** Answers "what does a plumber do?" in plain language. */
  whatTheyDo: string[];
  /** Appended to the trade's own FAQs so each page has at least four. */
  faqs: TradeFAQ[];
}

export const tradeDetail: Record<string, TradeDetail> = {
  plumber: {
    whatTheyDo: [
      "Plumbers look after everything that moves water and gas through a property — taps, toilets, showers, drains, hot water systems and the pipework hidden behind walls and under floors. They also handle rainwater goods like downpipes and stormwater drains.",
      "Most plumbing is licensed work in Australia, which is why a burst pipe, a gas fitting or a new hot water system isn't a DIY job. The everyday call-outs are leaks, blockages and hot water that has stopped working.",
    ],
    faqs: [
      {
        question: "Do plumbers need a licence in Australia?",
        answer:
          "Yes. Plumbing is licensed in every state and territory, and unlicensed work can void your home insurance. A plumber should be able to give you their licence number when they quote.",
      },
      {
        question: "How do I know if my plumbing problem is urgent?",
        answer:
          "Treat a burst pipe, a sewage overflow, no water at all, or water near power points as urgent. A dripping tap, a slow drain or a running toilet can usually wait a day or two — though they do waste a surprising amount of water.",
      },
      {
        question: "Can a plumber quote without visiting?",
        answer:
          "For straightforward jobs, often yes — clear photos and a good description are usually enough for a ballpark figure. Anything behind a wall, under a slab or involving gas normally needs an inspection before a firm price.",
      },
    ],
  },

  electrician: {
    whatTheyDo: [
      "Electricians install, test and repair the wiring, switchboards, power points, lighting and hard-wired appliances in a property. That covers everything from adding a power point to upgrading an old switchboard, fitting safety switches and installing smoke alarms or an EV charger.",
      "All electrical work in Australia must be carried out by a licensed electrician — there is no legal DIY option, even for small jobs. If something sparks, buzzes, smells like burning or keeps tripping the safety switch, that is a call-out rather than something to investigate yourself.",
    ],
    faqs: [
      {
        question: "Why does my safety switch keep tripping?",
        answer:
          "Usually a faulty appliance, moisture in a circuit, or a wiring fault. Note which appliances were running when it tripped and whether it resets — that helps the electrician narrow down the circuit before arriving.",
      },
      {
        question: "How often should smoke alarms be replaced?",
        answer:
          "Most manufacturers rate smoke alarms for ten years, and requirements differ by state and for rental properties. An electrician can check the age and type you have and tell you what your state requires.",
      },
      {
        question: "Is it worth upgrading an old switchboard?",
        answer:
          "If your board still has ceramic fuses, no safety switches, or trips whenever you run several appliances, an upgrade is usually worthwhile — both for safety and to support modern loads like air conditioning and EV charging.",
      },
    ],
  },

  painter: {
    whatTheyDo: [
      "Painters prepare and finish interior and exterior surfaces — walls, ceilings, trim, doors, fences and decks. The preparation is most of the work: filling, sanding, patching, priming and masking all happen before any topcoat goes on, and they are what makes a finish last.",
      "A good painter will also flag problems that need fixing first, like water stains pointing to a leak, flaking paint on an older home that may contain lead, or render that needs sealing.",
    ],
    faqs: [
      {
        question: "How long does painting a room take?",
        answer:
          "A standard bedroom is usually a day, including preparation and two coats. Whole-home interiors typically run several days to a couple of weeks depending on size, ceiling height and how much patching is needed.",
      },
      {
        question: "Should I supply the paint?",
        answer:
          "Either works. Painters often get trade pricing and know which product suits the surface, but if you have a specific brand or colour in mind, say so in your request so it is priced correctly.",
      },
      {
        question: "What time of year is best for exterior painting?",
        answer:
          "Mild, dry weather is ideal. Very hot days can make paint dry too quickly and cold or damp conditions slow curing, so most painters avoid extremes at either end.",
      },
    ],
  },

  handyman: {
    whatTheyDo: [
      "A handyman covers the wide range of small jobs that don't need a specialist trade — hanging pictures and mirrors, mounting TVs, assembling flat-pack furniture, adjusting sticking doors, patching small holes, fixing gates and general maintenance.",
      "They are the right call when you have a list of little things rather than one big job. What they can't do is licensed work: anything involving wiring, gas or pipework has to go to a licensed electrician or plumber.",
    ],
    faqs: [
      {
        question: "Is there a minimum call-out for small jobs?",
        answer:
          "Most handymen have a minimum charge, often an hour or two, so grouping several small jobs into one visit is usually better value than booking them separately.",
      },
      {
        question: "Will they bring their own materials?",
        answer:
          "They will bring tools and common fixings. For specific items — a particular door handle, a shelf, a replacement fence panel — mention in your request whether you have them or want them supplied.",
      },
      {
        question: "Can a handyman work on rental properties?",
        answer:
          "Yes, though if you are the tenant, check with the owner or agent first. Landlords and agents often arrange maintenance directly.",
      },
    ],
  },

  gardener: {
    whatTheyDo: [
      "Gardeners keep outdoor spaces tidy and healthy — mowing, edging, weeding, pruning, hedge trimming, mulching and clearing green waste. Many also take on one-off restoration jobs where a garden has become overgrown.",
      "Regular maintenance and a one-off clean-up are quite different jobs. A clean-up is priced on how much there is to clear and remove; ongoing maintenance is usually a fixed visit at a set frequency.",
    ],
    faqs: [
      {
        question: "How often should I book garden maintenance?",
        answer:
          "Fortnightly suits most suburban gardens through the growing season, dropping back to monthly over winter. Larger blocks or fast-growing hedges may need more.",
      },
      {
        question: "Who takes away the green waste?",
        answer:
          "That depends on the arrangement. Removal usually costs extra because of tip fees, so it is worth saying in your request whether you want waste taken away or left in your bin.",
      },
      {
        question: "Can a gardener remove a large tree?",
        answer:
          "Generally no. Large tree removal, and any work near powerlines, needs a qualified arborist, and many councils require approval before a significant tree comes down. Mention any big trees so the right professional is matched.",
      },
    ],
  },

  carpenter: {
    whatTheyDo: [
      "Carpenters work with timber and building materials — decks, pergolas, doors and door frames, skirting and architraves, stairs, built-in storage, timber fences and structural framing. They handle both repairs to existing timber and new builds.",
      "Rot, movement and soft spots are the common reasons people call. A carpenter will work out whether the timber can be patched or whether the underlying structure needs attention.",
    ],
    faqs: [
      {
        question: "Repair or replace a deck — how do I know?",
        answer:
          "You don't need to. Show the damage and the carpenter will assess whether individual boards can be swapped or whether the frame and footings need work.",
      },
      {
        question: "How long does a deck take to build?",
        answer:
          "A straightforward ground-level deck is often a few days. Raised decks, stairs or anything needing council approval take longer, and approval time sits outside the build itself.",
      },
      {
        question: "Do I need approval for a deck or pergola?",
        answer:
          "It depends on height, size and your council. Low, small structures are often exempt, while raised decks usually need approval. A carpenter can tell you what applies locally.",
      },
    ],
  },

  builder: {
    whatTheyDo: [
      "Builders manage larger construction work — bathroom and kitchen renovations, extensions, structural changes like removing a wall, garage conversions, granny flats and insurance repairs. They coordinate the other trades involved and are responsible for the work meeting code.",
      "A builder is the right call when a job crosses several trades or touches the structure of the house. They can also help at the design stage, before there are drawings.",
    ],
    faqs: [
      {
        question: "Do I need plans before contacting a builder?",
        answer:
          "No. Plenty of projects start as a rough idea. Describe what you want to achieve, your budget range and your timing, and a builder can guide the design and approval steps.",
      },
      {
        question: "What are cracks in my walls telling me?",
        answer:
          "Fine hairline cracks are common as a house settles. Cracks that are widening, wider than a few millimetres, or paired with sticking doors and sloping floors deserve prompt assessment as they can indicate movement.",
      },
      {
        question: "How long does a bathroom renovation take?",
        answer:
          "Typically three to six weeks on site once it starts, depending on size, whether the layout changes and how long fixtures take to arrive. Waterproofing needs curing time that can't be rushed.",
      },
    ],
  },

  roofer: {
    whatTheyDo: [
      "Roofers repair and replace roofs and the parts that keep water moving off them — tiles, metal sheeting, ridge capping, flashing, gutters, downpipes and whirlybirds. They also handle roof restorations and storm damage.",
      "Most leaks show up inside as a stain or a drip well away from where the water is actually getting in, so tracing the source is part of the job. Roof work is height work, which is why inspecting from the ground is the safe option for you.",
    ],
    faqs: [
      {
        question: "My ceiling is bulging after rain — what should I do?",
        answer:
          "Keep everyone clear of the area. A water-filled ceiling can collapse without warning. Submit the job as urgent, and for severe cases contact the SES on 132 500.",
      },
      {
        question: "Can a roof be repaired in the rain?",
        answer:
          "Temporary measures like tarping can often be done in poor weather, but permanent repairs usually need a dry roof. Emergency make-safe work is common after storms, with the full repair booked afterwards.",
      },
      {
        question: "How often should gutters be cleaned?",
        answer:
          "Twice a year suits most homes, and more often with overhanging trees. Blocked gutters are one of the most common causes of water getting into a roof.",
      },
    ],
  },

  tiler: {
    whatTheyDo: [
      "Tilers prepare surfaces and lay tiles in bathrooms, kitchens, laundries, living areas, balconies and around pools. That includes waterproofing wet areas, screeding floors, cutting and setting tiles, and grouting and sealing.",
      "In wet areas the waterproofing underneath matters as much as the tiles on top — it's what stops water reaching the structure behind. Regrouting and replacing cracked or drummy tiles are common smaller jobs.",
    ],
    faqs: [
      {
        question: "What does a drummy tile mean?",
        answer:
          "A tile that sounds hollow when tapped has lost its bond with the surface underneath. One or two can be replaced individually, but a whole area of drummy tiles often points to a problem with the substrate.",
      },
      {
        question: "Does a bathroom need re-waterproofing when retiling?",
        answer:
          "Usually yes. Once old tiles come off, the membrane underneath is generally disturbed, and Australian standards require compliant waterproofing in wet areas before new tiles go down.",
      },
      {
        question: "Can new tiles be laid over old ones?",
        answer:
          "Sometimes, if the existing tiles are sound and well bonded and the extra height works with doors and fixtures. A tiler will check before recommending it.",
      },
    ],
  },

  concreter: {
    whatTheyDo: [
      "Concreters form, pour and finish driveways, paths, slabs for sheds and extensions, patios and footings. They handle the preparation underneath as well — excavation, base compaction and reinforcement — which is what determines how long the concrete lasts.",
      "Finish options range from plain grey to exposed aggregate, stencilled and coloured. They also remove and replace old, cracked or lifting concrete.",
    ],
    faqs: [
      {
        question: "How long before I can drive on a new driveway?",
        answer:
          "You can usually walk on it after a day or two, but most concreters ask you to keep vehicles off for around a week while it cures. Full strength takes about a month.",
      },
      {
        question: "Why is my concrete cracking?",
        answer:
          "Fine surface cracks are normal as concrete cures. Wide cracks, or slabs sitting at different heights, suggest ground movement or a base problem and are worth having looked at.",
      },
      {
        question: "Can concrete be poured in any weather?",
        answer:
          "Extreme heat, heavy rain and frost all affect curing, so pours are usually scheduled around the forecast. A day or two of weather delay is common.",
      },
    ],
  },

  landscaper: {
    whatTheyDo: [
      "Landscapers design and build outdoor spaces — turf, garden beds and planting, retaining walls, paving, decking, irrigation, levelling and full backyard transformations. Where a gardener maintains what's already there, a landscaper changes the layout and structure.",
      "Projects usually start with what you want to use the space for. From there a landscaper works through levels, drainage, access for machinery and materials, and any approvals a retaining wall might need.",
    ],
    faqs: [
      {
        question: "How much does a backyard makeover cost?",
        answer:
          "It varies enormously with size, slope and materials. Sharing rough dimensions, photos and a budget range early lets landscapers propose something realistic rather than guessing.",
      },
      {
        question: "Do retaining walls need approval?",
        answer:
          "Walls above about a metre generally need engineering and council approval, and requirements differ by council. Mention the height you have in mind so it can be planned properly.",
      },
      {
        question: "Turf or artificial grass?",
        answer:
          "Real turf is cheaper to lay and cooler underfoot but needs mowing and water. Artificial grass costs more upfront and suits shaded or high-traffic areas where grass struggles. A landscaper can advise based on your aspect and drainage.",
      },
      {
        question: "When is the best time to lay turf?",
        answer:
          "Spring and early autumn are ideal in most of Australia — warm enough to establish, without the stress of peak summer heat. Turf can be laid year round with the right watering.",
      },
    ],
  },

  cleaner: {
    whatTheyDo: [
      "Cleaners cover regular home cleaning, one-off deep cleans, end of lease cleans, and specialist work like carpet steam cleaning, window cleaning, oven cleaning and pressure washing. Many also do after-renovation and move-in cleans.",
      "End of lease cleaning is its own category — it's usually measured against an agent's checklist, and often includes carpets, ovens, tracks and blinds that a regular clean wouldn't.",
    ],
    faqs: [
      {
        question: "What is included in an end of lease clean?",
        answer:
          "Generally the full interior — kitchen including oven and rangehood, bathrooms, floors, walls where marked, window tracks, blinds and cupboards inside and out. Carpet steam cleaning is often separate, so confirm whether you need it.",
      },
      {
        question: "Do cleaners bring their own products?",
        answer:
          "Most do. If you would prefer particular products because of allergies, pets or surfaces, mention it in your request.",
      },
      {
        question: "How long does a deep clean take?",
        answer:
          "A typical three-bedroom home takes around four to eight hours depending on condition, and end of lease cleans usually take longer than a regular visit.",
      },
    ],
  },

  locksmith: {
    whatTheyDo: [
      "Locksmiths handle lockouts, lock repairs and replacement, rekeying, key cutting, deadlocks, window locks, smart locks and security upgrades after a break-in. They work on homes, garages, mailboxes and commercial premises.",
      "Rekeying and replacing are different jobs: rekeying changes a lock's internals so old keys stop working and is usually cheaper, while replacement swaps the whole unit for a newer or stronger one.",
    ],
    faqs: [
      {
        question: "I'm locked out — how quickly can someone come?",
        answer:
          "Lockouts are treated as urgent, particularly with a child, a pet or cooking left inside. Say so clearly in your request so it is prioritised.",
      },
      {
        question: "Will a locksmith damage my door?",
        answer:
          "In most cases no. Locksmiths use non-destructive entry wherever possible and only drill a lock as a last resort, replacing it afterwards.",
      },
      {
        question: "Should I rekey after moving into a new home?",
        answer:
          "It's a sensible precaution. You rarely know how many copies of the old keys exist, and rekeying the existing locks is usually cheaper than replacing them.",
      },
    ],
  },

  "pest-control": {
    whatTheyDo: [
      "Pest control technicians identify, treat and help prevent pests in and around a property — cockroaches, ants, spiders, rodents, wasps, bed bugs, possums and termites. Treatment ranges from a general spray to targeted baiting and exclusion work.",
      "Termite inspections are a distinct service. Termites cause structural damage that isn't covered by most home insurance, so regular inspections matter, particularly for timber-framed homes.",
    ],
    faqs: [
      {
        question: "How often should I get a termite inspection?",
        answer:
          "Annually is the general recommendation in most of Australia, and more often in high-risk areas. Damage from termites is typically excluded from home insurance.",
      },
      {
        question: "Is pest treatment safe around pets and children?",
        answer:
          "Modern treatments are applied to be safe once dry, but you'll usually be asked to keep pets and children away for a few hours. Mention pets, young children or fish tanks when you book.",
      },
      {
        question: "How long before the pests are gone?",
        answer:
          "You'll often see activity increase briefly before it drops, and most general treatments settle within a week or two. Heavier infestations may need a follow-up visit.",
      },
    ],
  },

  "air-conditioning": {
    whatTheyDo: [
      "Air-conditioning technicians install, service and repair cooling and heating systems — split systems, multi-head systems, ducted and window units. Servicing covers cleaning filters and coils, checking refrigerant, and clearing drains that cause leaks.",
      "Refrigerant handling and the electrical side both require licensing, so beyond cleaning accessible filters there isn't much to do yourself. Poor cooling, water dripping inside and unusual noises are the common call-outs.",
    ],
    faqs: [
      {
        question: "Why is my air conditioner not cooling?",
        answer:
          "Common causes are a dirty filter, low refrigerant, a failing compressor or a blocked outdoor unit. Note whether airflow is weak or the air simply isn't cold — it points the technician in the right direction.",
      },
      {
        question: "How often should air conditioning be serviced?",
        answer:
          "Once a year for most homes, ideally before summer. Filters benefit from a clean every few months during heavy use.",
      },
      {
        question: "What size system do I need?",
        answer:
          "It depends on room size, ceiling height, insulation, window area and which way the room faces. An undersized unit runs constantly and an oversized one cycles inefficiently, so it's worth having it sized properly.",
      },
    ],
  },

  removalist: {
    whatTheyDo: [
      "Removalists pack, load, transport and unload household and office contents — from a single large item through to whole-home and interstate moves. Many offer packing services, materials and temporary storage.",
      "Access drives a lot of the cost: stairs, lifts, narrow driveways and parking distance all affect how long a move takes. Heavy or awkward items like pianos, safes and stone tables usually need specialist handling.",
    ],
    faqs: [
      {
        question: "How far ahead should I book?",
        answer:
          "Two to four weeks is typical, and longer for end of month, end of financial year and school holidays, which are the busiest times.",
      },
      {
        question: "Is my furniture insured during the move?",
        answer:
          "Removalists carry transit liability, but the cover varies and isn't the same as full insurance. Ask what is covered and consider separate transit insurance for high-value items.",
      },
      {
        question: "What won't removalists take?",
        answer:
          "Typically flammables, gas bottles, chemicals, paint and perishables. Plants and pets are often excluded too. Check the list early so you can make other arrangements.",
      },
    ],
  },
};

export function getTradeDetail(slug: string): TradeDetail | undefined {
  return tradeDetail[slug];
}
