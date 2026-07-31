"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { sendLead } from "@/lib/lead";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Contact us
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Questions about serviceman.ai? Send us a message. If you have a
            job to organise, the fastest path is the{" "}
            <Link href="/chat" className="font-medium text-blue underline-offset-2 hover:underline">
              AI job assistant
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_260px]">
        {sent ? (
          <div className="rounded-3xl border border-line bg-white p-8 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-success" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-bold text-navy">
              Message received
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Thanks for getting in touch. We&rsquo;ll reply to your email
              within one business day.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-navy hover:border-blue hover:text-blue"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              sendLead("New contact message", {
                Type: "Contact message",
                Name: String(form.get("name") ?? ""),
                Email: String(form.get("email") ?? ""),
                Topic: String(form.get("topic") ?? ""),
                Message: String(form.get("message") ?? ""),
              });
              setSent(true);
            }}
            className="rounded-3xl border border-line bg-white p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium text-ink">
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="rounded-xl border border-line bg-cloud px-4 py-3 text-[15px] text-ink focus:border-blue focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium text-ink">
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="rounded-xl border border-line bg-cloud px-4 py-3 text-[15px] text-ink focus:border-blue focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-1.5">
              <label htmlFor="contact-topic" className="text-sm font-medium text-ink">
                What is this about?
              </label>
              <select
                id="contact-topic"
                name="topic"
                className="rounded-xl border border-line bg-cloud px-4 py-3 text-[15px] text-ink focus:border-blue focus:outline-none"
              >
                <option>A question about how it works</option>
                <option>A problem with a job request</option>
                <option>Privacy or data</option>
                <option>Media or partnerships</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="mt-5 flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium text-ink">
                Your message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                className="rounded-xl border border-line bg-cloud px-4 py-3 text-[15px] text-ink focus:border-blue focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-6 rounded-full bg-blue px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
            >
              Send message
            </button>
          </form>
        )}

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-white p-5">
            <Mail className="h-5 w-5 text-blue" aria-hidden />
            <h2 className="mt-3 text-sm font-semibold text-navy">Email</h2>
            <p className="mt-1 text-sm text-muted">hello@serviceman.ai</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <MessageCircle className="h-5 w-5 text-blue" aria-hidden />
            <h2 className="mt-3 text-sm font-semibold text-navy">
              Need a job done?
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Skip the contact form — describe the job to our AI agent and
              we&rsquo;ll take it from there.
            </p>
            <Link
              href="/chat"
              className="mt-3 inline-block text-sm font-semibold text-blue underline-offset-2 hover:underline"
            >
              Start a conversation
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
