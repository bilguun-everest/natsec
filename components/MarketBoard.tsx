"use client";

import { useState } from "react";
import { T, useLang } from "@/components/lang";
import { SectionHeading, Wrap } from "@/components/ui";
import { market } from "@/lib/content";
import type { Bilingual, Board, Disclosure, TradeRow } from "@/lib/mse";

type Segment = "stock" | "bond" | "abs";
type View = "up" | "down" | "amount";

const SEGMENTS: Segment[] = ["stock", "bond", "abs"];
const VIEWS: View[] = ["up", "down", "amount"];

const MSE_URL = "https://www.mse.mn";

/**
 * The exchange board: shares, bonds and asset-backed securities, each split
 * into gainers, losers and turnover. Data is fetched on the server and
 * re-validated periodically; the tabs are the only interactive part.
 */
export default function MarketBoard({
  boards,
  disclosures,
}: {
  boards: Bilingual<Board>;
  disclosures: Bilingual<Disclosure[]>;
}) {
  const { lang } = useLang();
  const [segment, setSegment] = useState<Segment>("stock");
  const [view, setView] = useState<View>("up");

  // Company names come localised from the exchange, so the whole board is
  // fetched in both languages and swapped with the site language.
  const board: Board = boards[lang];
  const rows: TradeRow[] = board[segment][view];
  const valueColumn = view === "amount" ? market.columns.amount : market.columns.price;
  const feedDown =
    board.stock.up.length === 0 &&
    board.stock.down.length === 0 &&
    board.stock.amount.length === 0;

  return (
    <section id="arilzhaa" className="py-[86px] max-sm:py-[60px]">
      <Wrap>
        <SectionHeading
          eyebrow={market.eyebrow}
          title={market.title}
          lead={market.lead}
          className="mb-8 max-w-[620px]"
        />

        {/* ------------------------------------------------------- segments */}
        <div className="mb-4 flex flex-wrap gap-2">
          {SEGMENTS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSegment(key)}
              aria-pressed={segment === key}
              className={`rounded-[7px] border-[1.5px] px-4 py-2 font-mono text-[11.5px] uppercase tracking-[.13em] transition-colors ${
                segment === key
                  ? "border-navy bg-navy text-white"
                  : "border-line text-navy hover:border-blue hover:text-blue-text"
              }`}
            >
              <T>{market.tabs[key]}</T>
            </button>
          ))}
        </div>

        {/* ---------------------------------------------------------- views */}
        <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2">
          {VIEWS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setView(key)}
              aria-pressed={view === key}
              className={`border-b-2 pb-1 text-sm font-medium transition-colors ${
                view === key
                  ? "border-blue text-navy"
                  : "border-transparent text-grey hover:text-blue-text"
              }`}
            >
              <T>{market.views[key]}</T>
            </button>
          ))}
        </div>

        {/* ---------------------------------------------------------- table */}
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr>
                  {[
                    "№",
                    market.columns.symbol,
                    market.columns.name,
                    valueColumn,
                    market.columns.percent,
                    market.columns.change,
                  ].map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      className={`whitespace-nowrap bg-navy px-[18px] py-[13px] font-mono text-[10.5px] font-medium uppercase tracking-[.13em] text-[#C3CAE6] ${
                        columnIndex >= 3 ? "text-right" : "text-left"
                      }`}
                    >
                      {typeof column === "string" ? column : <T>{column}</T>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-[18px] py-10 text-center text-sm text-grey"
                    >
                      <T>{feedDown ? market.offline : market.empty}</T>
                    </td>
                  </tr>
                )}

                {rows.map((row, rowIndex) => (
                  <tr
                    key={`${row.symbol}-${rowIndex}`}
                    className="transition-colors hover:bg-blue-soft"
                  >
                    <td className="border-b border-line px-[18px] py-[15px] font-mono text-sm text-grey">
                      {rowIndex + 1}
                    </td>
                    <td className="border-b border-line px-[18px] py-[15px]">
                      <span className="font-mono text-[13px] font-medium text-navy">
                        {row.symbol}
                      </span>
                    </td>
                    <td className="border-b border-line px-[18px] py-[15px]">
                      <span className="block font-display text-[14.5px] font-semibold text-navy">
                        {row.name}
                      </span>
                    </td>
                    <td className="border-b border-line px-[18px] py-[15px] text-right font-mono text-sm">
                      {row.value}
                      <span className="font-tg">₮</span>
                    </td>
                    <td
                      className={`border-b border-line px-[18px] py-[15px] text-right font-mono text-sm ${
                        row.percent > 0
                          ? "text-up"
                          : row.percent < 0
                            ? "text-down"
                            : "text-grey"
                      }`}
                    >
                      {row.percent > 0 ? "▲" : row.percent < 0 ? "▼" : "—"}{" "}
                      {Math.abs(row.percent).toFixed(2)}%
                    </td>
                    <td
                      className={`border-b border-line px-[18px] py-[15px] text-right font-mono text-sm ${
                        row.change > 0
                          ? "text-up"
                          : row.change < 0
                            ? "text-down"
                            : "text-grey"
                      }`}
                    >
                      {row.change > 0 ? "+" : ""}
                      {row.change.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-line bg-paper px-[18px] py-4">
            <span className="font-mono text-[12.5px] text-grey">
              <T>{market.source}</T>
            </span>
            <a
              href={MSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-sm font-semibold text-blue-text transition-all hover:text-navy"
            >
              <T>{market.viewAll}</T>
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------- disclosures */}
        {disclosures[lang].length > 0 && (
          <div className="mt-14">
            <h3 className="font-display text-[19px] font-bold text-navy">
              <T>{market.disclosures.title}</T>
            </h3>
            <p className="mb-5 mt-1.5 text-sm text-grey">
              <T>{market.disclosures.lead}</T>
            </p>
            <ul className="grid grid-cols-3 gap-x-10 max-nav:grid-cols-2 max-sm:grid-cols-1">
              {disclosures[lang].map((item, itemIndex) => (
                <li
                  key={`${item.symbol}-${itemIndex}`}
                  className="border-b border-line py-3.5"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[11px] tracking-[.08em] text-blue-text">
                      {item.symbol}
                    </span>
                    <time className="font-mono text-[11px] text-grey">
                      {item.date}
                    </time>
                  </div>
                  <div className="mt-1 text-sm font-medium text-ink">
                    {item.company}
                  </div>
                  <div className="mt-0.5 text-[13px] text-grey">{item.type}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Wrap>
    </section>
  );
}
