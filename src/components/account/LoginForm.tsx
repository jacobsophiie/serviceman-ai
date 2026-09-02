"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { setSession } from "@/lib/mock-account";

/** Passwordless login preview: mobile number → 6-digit code → account. */
export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/account";
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const digits = phone.replace(/\D/g, "");

  return (
    <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
      {step === "phone" ? (
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (digits.length < 8 || digits.length > 12) {
              setError("Enter the mobile number you used for your job.");
              return;
            }
            setError("");
            setStep("code");
          }}
        >
          <h1 className="font-display text-2xl font-bold tracking-tight text-navy">
            Log in to see your quotes
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Enter the mobile number you gave us and we&rsquo;ll text you a
            code. No password needed.
          </p>
          <label htmlFor="login-phone" className="mt-6 block text-sm font-semibold text-navy">
            Mobile number
          </label>
          <div className="search-field mt-1.5 flex items-center gap-3 rounded-lg border border-line px-4">
            <Phone className="h-5 w-5 shrink-0 text-muted" aria-hidden />
            <input
              id="login-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="0412 345 678"
              className={`h-12 w-full min-w-0 bg-transparent text-base text-ink placeholder:text-muted focus:outline-none ${error ? "" : ""}`}
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-danger" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-blue text-base font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            Text me a code
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
          <p className="mt-4 text-center text-sm text-muted">
            Prefer email?{" "}
            <button type="button" className="font-medium text-blue hover:underline">
              Send a login link instead
            </button>
          </p>
        </form>
      ) : (
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (code.replace(/\D/g, "").length !== 6) {
              setError("Enter the 6-digit code from the text message.");
              return;
            }
            setSession({ phone, name: "Sarah Mitchell" });
            router.push(next);
          }}
        >
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setError("");
            }}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy">
            Enter your code
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            We texted a 6-digit code to{" "}
            <span className="font-medium text-ink">{phone.trim()}</span>.
          </p>
          <label htmlFor="login-code" className="mt-6 block text-sm font-semibold text-navy">
            6-digit code
          </label>
          <input
            id="login-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="••••••"
            autoFocus
            className="search-field mt-1.5 h-14 w-full rounded-lg border border-line px-4 text-center font-display text-2xl font-bold tracking-[0.4em] text-navy placeholder:text-line focus:outline-none"
          />
          {error && (
            <p className="mt-2 text-sm text-danger" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-blue text-base font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            Log in
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
          <p className="mt-4 text-center text-sm text-muted">
            Didn&rsquo;t get it?{" "}
            <button type="button" className="font-medium text-blue hover:underline">
              Send again
            </button>
          </p>
          <p className="mt-6 border-t border-line pt-4 text-center text-xs text-muted">
            Preview: any 6-digit code logs you in.
          </p>
        </form>
      )}
    </div>
  );
}
