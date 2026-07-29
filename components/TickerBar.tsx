"use client";

import { Fragment } from "react";
import { T, Tg } from "@/components/lang";
import { useIndices, useMarket, useMovers } from "@/components/market";

/**
 * The strip under the header: the headline index followed by the session's
 * biggest movers, gainers and losers interleaved. Live from mse.mn.
 */
export default function TickerBar() {
  const indices = useIndices();
  const movers = useMovers(6);
  const { live } = useMarket();

  // Nothing has ever been retrieved — render the rail empty rather than
  // inventing numbers to fill it.
  if (!indices && movers.length === 0) return <div className="ticker-bar" />;

  const cells = (
    <>
      {indices && (
        <>
          <div className="ticker-cell">
            {live && <span className="live-dot" />}
            <b>
              <T mn="ТОП-20" en="MSE TOP-20" />
            </b>{" "}
            {indices.top20.unit}{" "}
            <span className={indices.top20.dir === "down" ? "d" : "u"}>
              {indices.top20.percent}
            </span>
          </div>
          <div className="ticker-cell">
            <b>MSE A</b> {indices.mseA.unit}{" "}
            <span className={indices.mseA.dir === "down" ? "d" : "u"}>
              {indices.mseA.percent}
            </span>
          </div>
        </>
      )}

      {movers.map((quote) => (
        <div className="ticker-cell" key={`${quote.symbol}-${quote.percent}`}>
          <b>{quote.name}</b> {quote.price}
          <Tg />{" "}
          <span className={quote.dir === "down" ? "d" : "u"}>
            {formatMove(quote.percent)}
          </span>
        </div>
      ))}
    </>
  );

  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {/* Rendered twice so the -50% keyframe loops seamlessly. */}
        {[0, 1].map((copy) => (
          <Fragment key={copy}>{cells}</Fragment>
        ))}
      </div>
    </div>
  );
}

function formatMove(percent: number): string {
  const arrow = percent > 0 ? "▲" : percent < 0 ? "▼" : "—";
  return `${arrow} ${Math.abs(percent).toFixed(2)}%`;
}
