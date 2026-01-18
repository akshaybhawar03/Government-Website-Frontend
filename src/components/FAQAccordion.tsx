"use client";

import { useMemo, useState } from "react";

export type FAQItem = {
  question: string;
  answer: string;
};

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const safeItems = useMemo(() => items.filter((i) => i.question.trim() && i.answer.trim()), [items]);

  return (
    <div className="grid gap-3">
      {safeItems.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-white/40 bg-white shadow-sm ring-1 ring-black/5"
          >
            <button
              type="button"
              onClick={() => setOpenIndex((cur) => (cur === idx ? null : idx))}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-slate-900 md:text-base">{item.question}</span>
              <span
                aria-hidden="true"
                className={`grid h-8 w-8 place-items-center rounded-full border transition-colors ${
                  open ? "border-orange-200 bg-orange-50 text-orange-600" : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d={open ? "M5 12H19" : "M12 5V19M5 12H19"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden px-5 pb-5 text-sm leading-6 text-slate-700">
                <div className="pt-0.5">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
