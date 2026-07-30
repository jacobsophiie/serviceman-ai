import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms that apply when you use serviceman.ai to create and submit job requests.",
};

const sections = [
  {
    heading: "What serviceman.ai does",
    body: "serviceman.ai helps you describe a job and prepares a structured job request, which is then sent to suitable independent local trades businesses. We are not a trades business, we do not perform any work, and we are not a party to any agreement between you and a business you engage.",
  },
  {
    heading: "The AI agent is not a tradesperson",
    body: "Information provided by the AI agent — including suggestions about the likely trade or possible causes — is general guidance to help you describe the job. It is not a professional diagnosis or licensed trade advice. A qualified tradesperson may need to inspect the problem before confirming the required work.",
  },
  {
    heading: "Safety",
    body: "Never touch exposed wiring, gas fittings or unstable structures, and never climb onto a roof to show us a problem. In an emergency — fire, gas leak, major flooding — contact emergency services on 000 or your utility provider before using serviceman.ai.",
  },
  {
    heading: "Your information",
    body: "You confirm that the information in your job request is accurate and that you're authorised to request work at the property. By submitting, you agree that serviceman.ai and relevant independent trades businesses may contact you about your request.",
  },
  {
    heading: "Quotes and work",
    body: "Quotes, scheduling, workmanship and payment are matters between you and the trades business you engage. We recommend confirming licences and insurance appropriate to the work before it begins.",
  },
  {
    heading: "This prototype",
    body: "This website is a demonstration frontend. Job requests are not sent to any real business, no accounts exist and no data is stored. These terms are illustrative of the live product.",
  },
];

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy">
        Terms of use
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        The short version: we help you create and send a clear job request,
        independent businesses do the work, and the AI agent&rsquo;s guidance
        never replaces a qualified tradesperson.
      </p>
      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display text-xl font-semibold text-navy">
              {section.heading}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
