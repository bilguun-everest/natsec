"use client";

import { T, Tg, useLang } from "@/components/lang";
import { useIndices, useMarket, useMovers } from "@/components/market";
import { localDateTime, localTime, sameLocalDay } from "@/lib/market-hours";

/**
 * The hero's market board: the headline indices, then the session's biggest
 * movers at their last traded price. Live from mse.mn, refreshed by
 * `MarketProvider`.
 */
export default function MarketPanel() {
  const indices = useIndices();
  const movers = useMovers(4);
  const { snapshot, session, live } = useMarket();
  const { t } = useLang();

  const stamp = snapshot.index.fetchedAt ?? snapshot.boards.fetchedAt;
  const at = stamp ? new Date(stamp) : null;
  const when = at
    ? sameLocalDay(at, new Date())
      ? localTime(at)
      : localDateTime(at)
    : null;

  return (
    <div className="panel">
      <div className="panel-h">
        <span>
          <T mn="Зах зээл — өнөөдөр" en="Market — Today" />
        </span>
        <span style={{ color: statusColour(live, session.open) }}>
          {live && session.open && <span className="live-dot" />}
          {!live ? (
            <T mn="Холбогдож байна" en="Reconnecting" />
          ) : session.open ? (
            <T mn="Арилжаа нээлттэй" en="Trading Open" />
          ) : (
            <T mn="Арилжаа хаалттай" en="Market Closed" />
          )}
        </span>
      </div>

      {indices && (
        <>
          <Row
            name={t("ТОП-20 индекс", "TOP-20 Index")}
            sub="MSE TOP-20"
            value={indices.top20.unit}
            note={indices.top20.percent}
            dir={indices.top20.dir}
          />
          <Row
            name={t("MSE A индекс", "MSE A Index")}
            sub="MSE A"
            value={indices.mseA.unit}
            note={indices.mseA.percent}
            dir={indices.mseA.dir}
          />
        </>
      )}

      {movers.map((quote) => (
        <Row
          key={quote.symbol}
          name={quote.name}
          sub={`${quote.symbol} · ${t("сүүлийн ханш", "last price")}`}
          value={quote.price}
          tugrug
          note={`${quote.percent > 0 ? "▲" : quote.percent < 0 ? "▼" : "—"} ${Math.abs(
            quote.percent,
          ).toFixed(2)}%`}
          dir={quote.dir}
        />
      ))}

      {when && (
        <div className="tick">
          <div>
            <div className="tick-s">
              <T mn="Эх сурвалж: mse.mn" en="Source: mse.mn" />
            </div>
          </div>
          <div className="tick-v">
            <i style={{ color: "#8E98C4" }}>
              <T mn="Шинэчлэгдсэн " en="Updated " />
              {when}
            </i>
          </div>
        </div>
      )}
    </div>
  );
}

function statusColour(live: boolean, open: boolean): string {
  if (!live) return "#F0B45F";
  return open ? "#4FD497" : "#8E98C4";
}

function Row({
  name,
  sub,
  value,
  note,
  dir,
  tugrug,
}: {
  name: string;
  sub: string;
  value: string;
  note: string;
  dir: "up" | "down" | "flat";
  tugrug?: boolean;
}) {
  return (
    <div className="tick">
      <div>
        <div className="tick-n">{name}</div>
        <div className="tick-s">{sub}</div>
      </div>
      <div className="tick-v">
        <b>
          {value}
          {tugrug && <Tg />}
        </b>
        <i
          className={dir === "up" ? "u" : dir === "down" ? "d" : undefined}
          style={dir === "flat" ? { color: "#8E98C4" } : undefined}
        >
          {note}
        </i>
      </div>
    </div>
  );
}
