import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How serviceman.ai collects, uses and protects the information you share when creating a job request.",
};

const sections = [
  {
    heading: "What we collect",
    body: "When you create a job request we collect the details you share in the conversation: a description of the job, any photos you choose to add, your suburb, and your contact details (name, mobile number and email). Your full street address is only requested near the end of the process and is optional until a job is arranged.",
  },
  {
    heading: "How we use it",
    body: "Your information is used for one purpose: preparing your job request and sharing it with suitable local trades businesses that service your area. Your job is never displayed publicly, and your full address is only used to help arrange the work — it does not appear in the request sent to businesses.",
  },
  {
    heading: "Camera and microphone",
    body: "The camera assistant only accesses your camera and microphone after you give permission, and only while the conversation is active. You can end the conversation at any time. A text transcript is always available, and you can complete the entire process without using your camera or voice.",
  },
  {
    heading: "Who we share it with",
    body: "Job requests are shared with independent local trades businesses matched to your job type and area, so they can contact you about the work. We do not sell your personal information.",
  },
  {
    heading: "Your choices",
    body: "You can review and edit every part of your job request before it is submitted, choose how tradies contact you, and ask us to delete your information at any time by contacting hello@serviceman.ai.",
  },
  {
    heading: "What happens to your job request",
    body: "When you submit a job request, registration or message, the details you provide are sent securely to the serviceman.ai team so we can arrange quotes and follow up with you. We don't sell your information or use it for anything other than organising your job.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="font-display text-4xl font-bold tracking-tight text-navy">
        Privacy policy
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        We keep this simple: we collect what&rsquo;s needed to organise your
        job, we use it only for that, and you stay in control of it.
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
