"use client";

import { useId, useState } from "react";
import { T } from "@/components/lang";
import { Eyebrow } from "@/components/ui";
import { faq } from "@/lib/content";

/** Hairline accordion on the navy panel — one row open at a time. */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <div className="self-start rounded-xl bg-navy px-[30px] py-8 text-white">
      <Eyebrow tone="light">{faq.eyebrow}</Eyebrow>
      <h3 className="mb-2 font-display text-xl font-bold">
        <T>{faq.title}</T>
      </h3>
      <p className="justify mb-2.5 text-[14.5px] text-[#AAB3D8]">
        <T>{faq.lead}</T>
      </p>

      {faq.items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.q.mn}
            className="border-t border-white/[.13] py-3.5 first:border-t-0"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`${id}-${index}`}
              className="flex w-full items-center justify-between gap-3 text-left text-[14.5px] font-semibold"
            >
              <span>
                <T>{item.q}</T>
              </span>
              <span
                className={`shrink-0 font-mono text-blue transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              id={`${id}-${index}`}
              hidden={!isOpen}
              className="pt-2.5 text-[13.5px] leading-relaxed text-[#AAB3D8]"
            >
              <T>{item.a}</T>
            </div>
          </div>
        );
      })}
    </div>
  );
}
