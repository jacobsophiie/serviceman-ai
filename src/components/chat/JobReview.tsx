"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Pencil, Send } from "lucide-react";
import type { JobBrief } from "@/lib/types";

type EditableField =
  | "title"
  | "problem"
  | "visibleIssue"
  | "urgency"
  | "propertyType"
  | "access"
  | "timing"
  | "suburb"
  | "mobile"
  | "email";

interface FieldDef {
  field: EditableField;
  label: string;
  multiline?: boolean;
}

const fields: FieldDef[] = [
  { field: "problem", label: "Problem", multiline: true },
  { field: "visibleIssue", label: "Visible issue", multiline: true },
  { field: "urgency", label: "Urgency" },
  { field: "suburb", label: "Location" },
  { field: "propertyType", label: "Property" },
  { field: "timing", label: "Preferred timing" },
  { field: "access", label: "Access" },
];

function EditableRow({
  label,
  value,
  multiline,
  onSave,
}: {
  label: string;
  value?: string;
  multiline?: boolean;
  onSave: (value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");

  function save() {
    onSave(draft.trim());
    setEditing(false);
  }

  return (
    <div className="border-b border-line py-3 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            {label}
          </dt>
          {editing ? (
            <div className="mt-1.5 flex flex-col gap-2">
              {multiline ? (
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:border-blue focus:outline-none"
                  aria-label={`Edit ${label.toLowerCase()}`}
                />
              ) : (
                <input
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:border-blue focus:outline-none"
                  aria-label={`Edit ${label.toLowerCase()}`}
                />
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={save}
                  className="rounded-full bg-blue px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-deep"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraft(value ?? "");
                    setEditing(false);
                  }}
                  className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-muted hover:text-ink"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <dd
              className={`mt-0.5 text-sm leading-relaxed ${
                value ? "text-ink" : "italic text-muted/70"
              }`}
            >
              {value || "Not answered yet"}
            </dd>
          )}
        </div>
        {!editing && (
          <button
            type="button"
            onClick={() => {
              setDraft(value ?? "");
              setEditing(true);
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-cloud hover:text-blue"
            aria-label={`Edit ${label.toLowerCase()}`}
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}

export function JobReview({
  brief,
  onUpdate,
  onAddMore,
  onSubmit,
}: {
  brief: JobBrief;
  onUpdate: (field: EditableField, value: string) => void;
  onAddMore: () => void;
  onSubmit: () => void;
}) {
  const tradeName = brief.tradeName
    ? brief.tradeName.charAt(0).toUpperCase() + brief.tradeName.slice(1)
    : "To be confirmed";

  return (
    <section
      aria-label="Job summary for review"
      className="rise-in rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-6"
    >
      <h2 className="font-display text-xl font-bold text-navy">
        Here&rsquo;s the job we&rsquo;ll send to local tradies
      </h2>

      <div className="mt-4 rounded-2xl bg-cloud p-4">
        <EditableRow
          label="Job title"
          value={brief.title}
          onSave={(value) => onUpdate("title", value)}
        />
        <div className="border-b border-line py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            Likely trade
          </dt>
          <dd className="mt-0.5 text-sm text-ink">{tradeName}</dd>
        </div>
        {fields.map((def) => (
          <EditableRow
            key={def.field}
            label={def.label}
            value={brief[def.field]}
            multiline={def.multiline}
            onSave={(value) => onUpdate(def.field, value)}
          />
        ))}
        <div className="border-b border-line py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            Photos
          </dt>
          <dd className="mt-1 flex items-center gap-2 text-sm text-ink">
            {brief.photos > 0 ? (
              <>
                <Camera className="h-4 w-4 text-muted" aria-hidden />
                {brief.photos} attached
              </>
            ) : (
              <span className="italic text-muted/70">None attached</span>
            )}
          </dd>
        </div>
        {brief.notes.length > 0 && (
          <div className="py-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Additional notes
            </dt>
            <dd className="mt-0.5 text-sm leading-relaxed text-ink">
              {brief.notes.join(" · ")}
            </dd>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-2xl bg-cloud p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Your contact details
        </h3>
        <div className="mt-2">
          <div className="border-b border-line py-2.5">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Name
            </dt>
            <dd className="mt-0.5 text-sm text-ink">
              {[brief.firstName, brief.lastName].filter(Boolean).join(" ") || (
                <span className="italic text-muted/70">Not answered yet</span>
              )}
            </dd>
          </div>
          <EditableRow
            label="Mobile"
            value={brief.mobile}
            onSave={(value) => onUpdate("mobile", value)}
          />
          <EditableRow
            label="Email"
            value={brief.email}
            onSave={(value) => onUpdate("email", value)}
          />
          <div className="py-2.5">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Preferred contact
            </dt>
            <dd className="mt-0.5 text-sm text-ink">
              {brief.contactMethod ?? "Phone call"}
            </dd>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        By submitting, you agree that serviceman.ai and relevant independent
        trades businesses may contact you about this request. Read our{" "}
        <Link href="/privacy" className="text-blue underline-offset-2 hover:underline">
          privacy policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="text-blue underline-offset-2 hover:underline">
          terms
        </Link>
        .
      </p>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
        >
          <Send className="h-4 w-4" aria-hidden />
          Send my job to local tradies
        </button>
        <button
          type="button"
          onClick={onAddMore}
          className="rounded-full border border-line px-6 py-3.5 text-base font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
        >
          Add more information
        </button>
      </div>
    </section>
  );
}
