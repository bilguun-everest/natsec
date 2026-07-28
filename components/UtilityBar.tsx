"use client";

import { T, useLang } from "@/components/lang";
import { LiveDot, Wrap } from "@/components/ui";
import { util } from "@/lib/content";
import { direction, formatIndex, type IndexTable } from "@/lib/mse";

/**
 * Thin bar above the header: live index level, FX rate, and the MN/EN switch.
 * Falls back to the reference figures if the exchange feed is unavailable.
 */
export default function UtilityBar({ index }: { index: IndexTable | null }) {
  const { lang, toggle } = useLang();

  const live = index
    ? {
        label: {
          mn: `МХБ ТОП-20: ${formatIndex(index.top20Unit)}`,
          en: `MSE TOP-20: ${formatIndex(index.top20Unit)}`,
        },
        percent: `${index.top20Percent > 0 ? "+" : ""}${index.top20Percent.toFixed(2)}%`,
        dir: direction(index.top20Percent),
      }
    : null;

  return (
    <div className="bg-navy-900 text-[12.5px] text-[#A9B2D6]">
      <Wrap className="flex h-[38px] items-center justify-between gap-5">
        <div className="flex items-center gap-[22px]">
          <a
            href="https://www.mse.mn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C3CAE6] transition-colors hover:text-white"
          >
            <LiveDot />
            <T>{live ? live.label : util.index}</T>{" "}
            <span
              className={
                live?.dir === "down" ? "text-[#FF7B7B]" : "text-[#4FD497]"
              }
            >
              {live ? live.percent : util.indexChange}
            </span>
          </a>
          <a
            href="#"
            className="text-[#C3CAE6] transition-colors hover:text-white max-sm:hidden"
          >
            <T>{util.rate}</T>
          </a>
        </div>

        <div className="flex items-center gap-[18px]">
          <a
            href="#"
            className="text-[#C3CAE6] transition-colors hover:text-white max-sm:hidden"
          >
            <T>{util.sustainability}</T>
          </a>
          <a
            href="#holboo-barih"
            className="text-[#C3CAE6] transition-colors hover:text-white"
          >
            <T>{util.contact}</T>
          </a>
          <button
            type="button"
            onClick={toggle}
            className="font-mono text-[#C3CAE6] transition-colors hover:text-white"
          >
            {lang === "mn" ? "EN" : "MGL"}
          </button>
        </div>
      </Wrap>
    </div>
  );
}
