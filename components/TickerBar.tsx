"use client";

import { Fragment } from "react";
import { T, Tg } from "@/components/lang";

interface Cell {
  mn: string;
  en: string;
  value: string;
  /** Trailing ₮ on the value. */
  tugrug?: boolean;
  change?: string;
  dir?: "u" | "d";
  live?: boolean;
}

const CELLS: Cell[] = [
  {
    mn: "ТОП-20",
    en: "MSE TOP-20",
    value: "45,182.60",
    change: "▲ 0.84%",
    dir: "u",
    live: true,
  },
  { mn: "АПУ", en: "АПУ", value: "1,142", tugrug: true, change: "▲ 2.15%", dir: "u" },
  {
    mn: "Голомт банк",
    en: "Golomt Bank",
    value: "3,890",
    tugrug: true,
    change: "▼ 0.51%",
    dir: "d",
  },
  {
    mn: "Эрдэнэ ресурс",
    en: "Erdene Resource",
    value: "412",
    tugrug: true,
    change: "▲ 1.23%",
    dir: "u",
  },
  {
    mn: "USD/MNT",
    en: "USD/MNT",
    value: "3,412",
    tugrug: true,
    change: "▲ 0.12%",
    dir: "u",
  },
  {
    mn: "Өдрийн эргэлт",
    en: "Daily turnover",
    value: "2.4 тэрбум",
    tugrug: true,
  },
];

/** The strip sits directly under the header and scrolls the day's headline prices. */
export default function TickerBar() {
  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {/* Rendered twice so the -50% keyframe loops seamlessly. */}
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {CELLS.map((cell) => (
              <div className="ticker-cell" key={`${copy}-${cell.mn}`}>
                {cell.live && <span className="live-dot" />}
                <b>
                  <T mn={cell.mn} en={cell.en} />
                </b>{" "}
                {cell.value}
                {cell.tugrug && <Tg />}{" "}
                {cell.change && <span className={cell.dir}>{cell.change}</span>}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
