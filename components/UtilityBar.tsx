"use client";

import { T, useLang } from "@/components/lang";
import { useIndices, useMarket } from "@/components/market";
import { localDateTime, localTime, sameLocalDay } from "@/lib/market-hours";

export default function UtilityBar() {
  const indices = useIndices();

  return (
    <div className="util">
      <div className="wrap">
        <div className="util-l">
          {indices && (
            <a href="#">
              <span className="live-dot" />
              <T mn="МХБ ТОП-20: " en="MSE TOP-20: " />
              {indices.top20.unit}{" "}
              <span
                style={{
                  color: indices.top20.dir === "down" ? "#F17171" : "#4FD497",
                }}
              >
                {indices.top20.raw > 0 ? "+" : ""}
                {indices.top20.raw.toFixed(2)}%
              </span>
            </a>
          )}
          <Freshness />
        </div>
        <div className="util-r">
          <a href="#tog-hugjil">
            <T mn="Тогтвортой хөгжил, бодлого" en="Sustainability policy" />
          </a>
          <a href="#holboo-barih">
            <T mn="Холбоо барих" en="Contact" />
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * When the numbers were last retrieved, in exchange-local time.
 *
 * This replaces the design's hardcoded USD/MNT rate — the exchange does not
 * publish FX, and a stale invented rate on a broker's site is worse than no
 * rate at all. Stating the data's age is the more useful thing to put here.
 */
function Freshness() {
  const { snapshot, session, live } = useMarket();
  const { t } = useLang();

  const stamp = snapshot.index.fetchedAt ?? snapshot.boards.fetchedAt;
  if (!stamp) return null;

  const at = new Date(stamp);
  const now = new Date();
  // Once the data is from a previous day, the date matters as much as the time.
  const when = sameLocalDay(at, now) ? localTime(at) : localDateTime(at);

  const status = !live
    ? t("холбогдож чадсангүй", "reconnecting")
    : session.open
      ? t("арилжаа нээлттэй", "market open")
      : t("арилжаа хаалттай", "market closed");

  return (
    <a
      href="#"
      title={t(
        `Мэдээлэл ${when}-ны байдлаар (mse.mn)`,
        `Data as of ${when} (mse.mn)`,
      )}
    >
      <T mn="Шинэчлэгдсэн: " en="Updated: " />
      {when} · {status}
    </a>
  );
}
