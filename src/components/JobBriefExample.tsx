import Image from "next/image";
import { Check, MapPin } from "lucide-react";
import { tradeImage } from "@/lib/images";

/** The brief the AI produces — shown as a real document, clearly labelled as an example. */
export function JobBriefExample() {
  return (
    <div className="rounded-lg border border-line bg-cloud p-2">
      <div className="rounded-md border border-line bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Example job brief
          </p>
          <span className="rounded-full bg-cloud px-2.5 py-1 text-xs font-medium text-navy">
            Plumbing
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-navy">
          Leaking kitchen tap
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4" aria-hidden />
          Dromana, VIC · Home
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          {[
            ["Leak", "Constant drip from the pipe under the sink"],
            ["Spreading", "No — contained in the cupboard"],
            ["Urgency", "Within the next week"],
            ["Contact", "Sarah · SMS"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                {label}
              </dt>
              <dd className="mt-1 leading-snug text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Photos
          </p>
          <div className="mt-2 flex gap-2">
            <Image
              src="/images/under-sink.jpg"
              alt="Pipework under a kitchen sink"
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-md object-cover"
            />
            <Image
              src={tradeImage("plumber").src}
              alt="The tap and benchtop"
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-md object-cover"
            />
          </div>
        </div>
        <p className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-sm text-ink">
          <Check className="h-4 w-4 shrink-0 text-success" aria-hidden />
          Sent to licensed plumbers servicing Dromana
        </p>
      </div>
    </div>
  );
}
