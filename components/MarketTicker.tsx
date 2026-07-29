"use client";

import { Fragment } from "react";
import { T, Tg, useLang } from "@/components/lang";
import { useTurnoverLeaders } from "@/components/market";

/**
 * Fixed strip along the bottom of every page: the day's most-traded shares,
 * ordered by turnover. Where the money actually went, rather than the largest
 * percentage move on a thinly traded line.
 */
export default function MarketTicker() {
  const leaders = useTurnoverLeaders(10);
  const { t } = useLang();

  if (leaders.length === 0) return null;

  const items = leaders.map((quote) => (
    <span
      className="item"
      key={`${quote.symbol}-${quote.percent}`}
      title={t(
        `${quote.name} — өдрийн эргэлт`,
        `${quote.name} — traded today`,
      )}
    >
      {quote.symbol}{" "}
      <b>
        {quote.turnover}
        <Tg />
      </b>{" "}
      <span className={quote.dir === "down" ? "down" : "up"}>
        {quote.percent > 0 ? "▲" : quote.percent < 0 ? "▼" : "—"}{" "}
        {Math.abs(quote.percent).toFixed(2)}%
      </span>
    </span>
  ));

  return (
    <div className="mkt-ticker" aria-label="Market ticker">
      <div className="track">
        <span className="item mkt-label">
          <T mn="ӨДРИЙН ЭРГЭЛТ" en="TRADED TODAY" />
        </span>
        {/* Duplicated for a seamless loop. */}
        {[0, 1].map((copy) => (
          <Fragment key={copy}>{items}</Fragment>
        ))}
      </div>
    </div>
  );
}
