import { Camera } from "lucide-react";
import type { JobBrief } from "@/lib/types";

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-line py-2.5 last:border-b-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd
        className={`text-sm leading-snug ${
          value ? "text-ink" : "italic text-muted/70"
        }`}
      >
        {value ?? "Not answered yet"}
      </dd>
    </div>
  );
}

/**
 * The live job brief that assembles itself as the conversation progresses.
 */
export function LiveJobSummary({
  brief,
  photoUrls = [],
}: {
  brief: JobBrief;
  photoUrls?: string[];
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
        Your job so far
      </h2>
      <dl className="mt-2">
        <Row
          label="Likely trade"
          value={
            brief.tradeName
              ? brief.tradeName.charAt(0).toUpperCase() + brief.tradeName.slice(1)
              : undefined
          }
        />
        <Row label="Problem" value={brief.problem} />
        <Row label="Location" value={brief.suburb} />
        <Row label="Urgency" value={brief.urgency} />
        <Row label="Property type" value={brief.propertyType} />
        <div className="flex flex-col gap-1.5 py-2.5">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            Photos
          </dt>
          <dd>
            {brief.photos > 0 ? (
              <span className="flex gap-1.5" aria-label={`${brief.photos} photos attached`}>
                {Array.from({ length: Math.min(brief.photos, 4) }).map(
                  (_, index) =>
                    photoUrls[index] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={index}
                        src={photoUrls[index]}
                        alt={`Attached photo ${index + 1}`}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <span
                        key={index}
                        className="camera-preview flex h-10 w-10 items-center justify-center rounded-lg text-white/70"
                        aria-hidden
                      >
                        <Camera className="h-4 w-4" />
                      </span>
                    ),
                )}
                {brief.photos > 4 && (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cloud text-xs font-semibold text-muted">
                    +{brief.photos - 4}
                  </span>
                )}
              </span>
            ) : (
              <span className="text-sm italic text-muted/70">
                Not answered yet
              </span>
            )}
          </dd>
        </div>
        {brief.notes.length > 0 && (
          <div className="flex flex-col gap-0.5 border-t border-line py-2.5">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Additional notes
            </dt>
            <dd className="text-sm leading-snug text-ink">
              {brief.notes.join(" · ")}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
