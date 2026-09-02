import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Help & FAQs",
  description:
    "Answers to common questions about serviceman.ai — the camera assistant, chat, safety, privacy and what happens after you submit a job.",
};

const faqs = [
  {
    question: "What is serviceman.ai?",
    answer:
      "serviceman.ai helps you explain a job you need done — using your camera or chat — and turns the conversation into a clear job request that is sent to suitable local trades businesses. It is not a directory: you don't browse or compare businesses, and you only tell your story once.",
  },
  {
    question: "How does the camera assistant work?",
    answer:
      "You open your camera, point it at the problem and talk it through. The AI agent asks you to show useful angles, captures images with your permission and adds its observations to your job brief. Everything it says is also shown as captions and a full text transcript.",
  },
  {
    question: "Do I need to know which trade I need?",
    answer:
      "No. Describe what's happening in your own words — 'water is coming from under the sink' is plenty. The AI agent works out the likely trade, and a suitable business confirms it when they see the job.",
  },
  {
    question: "Can I type instead of using my camera?",
    answer:
      "Yes. The chat assistant covers the whole process — you can complete your entire job request by typing, and add photos only if you want to.",
  },
  {
    question: "Is it free to submit a job?",
    answer:
      "Yes. Submitting a job request is free for customers.",
  },
  {
    question: "Does serviceman.ai perform the work?",
    answer:
      "No. serviceman.ai prepares and distributes your job request. The work itself is quoted and carried out by independent local trades businesses.",
  },
  {
    question: "Will my job be displayed publicly?",
    answer:
      "No. Your job request is only shared with suitable trades businesses that service your area. It never appears on a public listing, and your full address is only used to help arrange the job.",
  },
  {
    question: "Who receives my job request?",
    answer:
      "Suitable local trades businesses that service your suburb and handle your type of job. You don't need to pick them — the platform matches your request behind the scenes.",
  },
  {
    question: "Can the AI diagnose the problem?",
    answer:
      "The AI agent can help identify the likely type of issue and collect useful information, but it does not provide a professional diagnosis. A qualified tradesperson may need to inspect the problem before confirming the required work.",
  },
  {
    question: "Is the camera assistant safe to use?",
    answer:
      "Yes — safety is built in. The agent will never ask you to touch wiring, open a switchboard, handle gas fittings or climb onto a roof. If something looks dangerous, it tells you to move away and, where needed, points you to emergency services.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "Your request is checked and sent to suitable local businesses. Interested trades then contact you using your preferred method to ask any final questions and provide quotes.",
  },
  {
    question: "Can I submit an urgent job?",
    answer:
      "Yes. Tell the agent it's urgent and that's flagged in your request. For emergencies — gas leaks, fire, major flooding — always contact emergency services or your utility provider first.",
  },
  {
    question: "What information should I provide?",
    answer:
      "Just answer the agent's questions: what's happening, how urgent it is, your property type, timing, suburb and contact details. Photos help but are optional. If you don't know an answer, say so — 'I'm not sure' is a perfectly good answer.",
  },
  {
    question: "Can I edit the job before submitting?",
    answer:
      "Yes. Before anything is sent you'll see the full job summary, and every section can be edited — the problem description, timing, location and your contact details.",
  },
];

export default function HelpPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Help &amp; frequently asked questions
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Everything you need to know about creating and submitting a job
            request. Can&rsquo;t find an answer?{" "}
            <Link href="/contact" className="font-medium text-blue underline-offset-2 hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <FAQAccordion items={faqs} />
      </section>

      <FinalCTA />
    </>
  );
}
