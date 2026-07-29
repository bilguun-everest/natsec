"use client";

import { Fragment } from "react";

const ITEMS: [label: string, value: string, change: string, dir: "up" | "down"][] =
  [
    ["USD/MNT", "3,412.7", "▲ 0.12%", "up"],
    ["Bitcoin", "65,110", "▼ 0.35%", "down"],
    ["Ethereum", "1,964.3", "▲ 0.56%", "up"],
    ["S&P 500", "7,481.1", "▲ 0.98%", "up"],
    ["US 100", "28,564.5", "▲ 1.47%", "up"],
    ["MSE TOP-20", "45,182.6", "▲ 0.84%", "up"],
    ["Алт (Gold)", "2,634.2", "▼ 0.21%", "down"],
    ["Газрын тос (Brent)", "73.8", "▲ 0.44%", "up"],
  ];

/** Fixed strip pinned to the bottom of every page. */
export default function MarketTicker() {
  return (
    <div className="mkt-ticker" aria-label="Market ticker">
      <div className="track">
        {/* Duplicated for a seamless loop. */}
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {ITEMS.map(([label, value, change, dir]) => (
              <span className="item" key={`${copy}-${label}`}>
                {label} <b>{value}</b> <span className={dir}>{change}</span>
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
