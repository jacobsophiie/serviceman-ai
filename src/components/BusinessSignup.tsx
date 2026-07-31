"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";
import { trades } from "@/lib/data/trades";
import { sendLead } from "@/lib/lead";

/**
 * Business registration form. Submissions are emailed to the serviceman.ai
 * inbox for manual follow-up and verification.
 */

const states = ["QLD", "NSW", "VIC", "ACT", "SA", "WA", "TAS", "NT"];

const travelOptions = [
  "Up to 10 km",
  "Up to 25 km",
  "Up to 50 km",
  "Up to 100 km",
  "Anywhere in my state",
];

interface Fields {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  abn: string;
  licence: string;
  website: string;
  suburb: string;
  state: string;
  travel: string;
  about: string;
}

const emptyFields: Fields = {
  businessName: "",
  contactName: "",
  phone: "",
  email: "",
  abn: "",
  licence: "",
  website: "",
  suburb: "",
  state: "",
  travel: travelOptions[1],
  about: "",
};

const inputClass =
  "w-full rounded-2xl border border-line bg-cloud px-4 py-3 text-base text-ink placeholder:text-muted focus:border-blue focus:outline-none";

const errorClass = "border-danger bg-danger/5";

function Field({
  label,
  htmlFor,
  optional = false,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold text-navy"
      >
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-muted">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function BusinessSignup() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function toggleTrade(slug: string) {
    setSelectedTrades((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    );
    setErrors((e) => (e.trades ? { ...e, trades: undefined } : e));
  }

  function validate(): boolean {
    const next: Partial<Record<string, string>> = {};

    if (!fields.businessName.trim())
      next.businessName = "Please enter your business name.";
    if (!fields.contactName.trim())
      next.contactName = "Please enter a contact name.";

    const phoneDigits = fields.phone.replace(/[^\d]/g, "");
    if (!fields.phone.trim()) next.phone = "Please enter a phone number.";
    else if (phoneDigits.length < 8 || phoneDigits.length > 12)
      next.phone = "Please enter a valid Australian phone number.";

    if (!fields.email.trim()) next.email = "Please enter an email address.";
    else if (!/^\S+@\S+\.\S+$/.test(fields.email.trim()))
      next.email = "Please enter a valid email address.";

    const abnDigits = fields.abn.replace(/\s/g, "");
    if (abnDigits && !/^\d{11}$/.test(abnDigits))
      next.abn = "An ABN has 11 digits.";

    if (selectedTrades.length === 0)
      next.trades = "Please choose at least one trade category.";

    if (!fields.suburb.trim())
      next.suburb = "Please enter your base suburb or town.";
    if (!fields.state) next.state = "Please choose a state.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  /* ------------------------------------------------------- success state */

  if (submitted) {
    const tradeNames = trades
      .filter((t) => selectedTrades.includes(t.slug))
      .map((t) => t.category);

    return (
      <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint-tint text-success">
          <BadgeCheck className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-navy">
          Thanks, {fields.businessName.trim()}!
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">
          We&rsquo;ve received your registration for{" "}
          <strong className="font-semibold text-ink">
            {tradeNames.join(", ")}
          </strong>{" "}
          work around{" "}
          <strong className="font-semibold text-ink">
            {fields.suburb.trim()}, {fields.state}
          </strong>
          . Our team will be in touch to verify your licence and insurance
          before job requests start arriving.
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(emptyFields);
            setSelectedTrades([]);
            setErrors({});
            setSubmitted(false);
          }}
          className="mt-6 text-sm font-medium text-blue hover:underline"
        >
          Register another business
        </button>
      </div>
    );
  }

  /* --------------------------------------------------------------- form */

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (!validate()) return;
        sendLead(`New business registration: ${fields.businessName.trim()}`, {
          Type: "Business registration",
          Business: fields.businessName.trim(),
          Contact: fields.contactName.trim(),
          Phone: fields.phone.trim(),
          Email: fields.email.trim(),
          ABN: fields.abn.trim() || undefined,
          Licence: fields.licence.trim() || undefined,
          Trades: trades
            .filter((t) => selectedTrades.includes(t.slug))
            .map((t) => t.category)
            .join(", "),
          Suburb: `${fields.suburb.trim()}, ${fields.state}`,
          Travel: fields.travel,
          Website: fields.website.trim() || undefined,
          About: fields.about.trim() || undefined,
        });
        setSubmitted(true);
      }}
      className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Business name"
          htmlFor="biz-name"
          error={errors.businessName}
        >
          <input
            id="biz-name"
            type="text"
            autoComplete="organization"
            value={fields.businessName}
            onChange={(e) => set("businessName", e.target.value)}
            placeholder="e.g. Harbour City Plumbing"
            className={`${inputClass} ${errors.businessName ? errorClass : ""}`}
          />
        </Field>

        <Field
          label="Contact name"
          htmlFor="biz-contact"
          error={errors.contactName}
        >
          <input
            id="biz-contact"
            type="text"
            autoComplete="name"
            value={fields.contactName}
            onChange={(e) => set("contactName", e.target.value)}
            placeholder="Who should we speak to?"
            className={`${inputClass} ${errors.contactName ? errorClass : ""}`}
          />
        </Field>

        <Field label="Phone number" htmlFor="biz-phone" error={errors.phone}>
          <input
            id="biz-phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="e.g. 0412 345 678"
            className={`${inputClass} ${errors.phone ? errorClass : ""}`}
          />
        </Field>

        <Field label="Email" htmlFor="biz-email" error={errors.email}>
          <input
            id="biz-email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@yourbusiness.com.au"
            className={`${inputClass} ${errors.email ? errorClass : ""}`}
          />
        </Field>

        <Field label="ABN" htmlFor="biz-abn" optional error={errors.abn}>
          <input
            id="biz-abn"
            type="text"
            inputMode="numeric"
            value={fields.abn}
            onChange={(e) => set("abn", e.target.value)}
            placeholder="11 digits"
            className={`${inputClass} ${errors.abn ? errorClass : ""}`}
          />
        </Field>

        <Field label="Licence number" htmlFor="biz-licence" optional>
          <input
            id="biz-licence"
            type="text"
            value={fields.licence}
            onChange={(e) => set("licence", e.target.value)}
            placeholder="If your trade is licensed"
            className={inputClass}
          />
        </Field>
      </div>

      {/* Trade categories */}
      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-navy">
          What work do you do?
        </legend>
        <p className="mt-1 text-sm text-muted">
          Choose every category that applies.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {trades.map((trade) => {
            const selected = selectedTrades.includes(trade.slug);
            return (
              <button
                key={trade.slug}
                type="button"
                onClick={() => toggleTrade(trade.slug)}
                aria-pressed={selected}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  selected
                    ? "border-blue bg-blue-tint text-blue"
                    : "border-line bg-white text-ink hover:border-blue/40"
                }`}
              >
                {selected && <Check className="h-3.5 w-3.5" aria-hidden />}
                {trade.category}
              </button>
            );
          })}
        </div>
        {errors.trades && (
          <p className="mt-2 text-sm text-danger" role="alert">
            {errors.trades}
          </p>
        )}
      </fieldset>

      {/* Service area */}
      <div className="mt-6 grid gap-5 sm:grid-cols-[1.2fr_0.8fr_1fr]">
        <Field
          label="Base suburb or town"
          htmlFor="biz-suburb"
          error={errors.suburb}
        >
          <input
            id="biz-suburb"
            type="text"
            value={fields.suburb}
            onChange={(e) => set("suburb", e.target.value)}
            placeholder="e.g. Southport"
            className={`${inputClass} ${errors.suburb ? errorClass : ""}`}
          />
        </Field>

        <Field label="State" htmlFor="biz-state" error={errors.state}>
          <select
            id="biz-state"
            value={fields.state}
            onChange={(e) => set("state", e.target.value)}
            className={`${inputClass} ${errors.state ? errorClass : ""}`}
          >
            <option value="" disabled>
              Select
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </Field>

        <Field label="How far will you travel?" htmlFor="biz-travel">
          <select
            id="biz-travel"
            value={fields.travel}
            onChange={(e) => set("travel", e.target.value)}
            className={inputClass}
          >
            {travelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6 grid gap-5">
        <Field label="Website" htmlFor="biz-website" optional>
          <input
            id="biz-website"
            type="url"
            autoComplete="url"
            value={fields.website}
            onChange={(e) => set("website", e.target.value)}
            placeholder="https://"
            className={inputClass}
          />
        </Field>

        <Field label="Tell us about your business" htmlFor="biz-about" optional>
          <textarea
            id="biz-about"
            rows={4}
            value={fields.about}
            onChange={(e) => set("about", e.target.value)}
            placeholder="Years in the trade, the jobs you specialise in, your team size — anything that helps us match the right work to you."
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep sm:w-auto"
      >
        Register your business
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        We&rsquo;ll verify your licence and insurance before any job
        requests are sent to you.
      </p>
    </form>
  );
}
