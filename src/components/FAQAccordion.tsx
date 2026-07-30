"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-ink transition-colors hover:text-blue sm:px-6"
              >
                {item.question}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
            </h3>
            {open && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
