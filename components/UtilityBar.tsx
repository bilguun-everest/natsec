"use client";

import { T, useLang } from "@/components/lang";
import { useIndices, useMarket } from "@/components/market";
import { localDateTime, localTime, sameLocalDay } from "@/lib/market-hours";
import { TRADING_URL } from "@/lib/site";

export default function UtilityBar() {
  const indices = useIndices();

  return (
    <div className="util">
      <div className="wrap">
        <div className="util-l">
          {indices && (
            <span className="util-fig">
              <span className="live-dot" />
              <T mn="МХБ ТОП-20" en="MSE TOP-20" />
              <b>{indices.top20.unit}</b>
              <span className={indices.top20.dir === "down" ? "d" : "u"}>
                {indices.top20.raw > 0 ? "+" : ""}
                {indices.top20.raw.toFixed(2)}%
              </span>
            </span>
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
          <a href={TRADING_URL} className="util-login">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M15 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4" />
            </svg>
            <T mn="Нэвтрэх" en="Log In" />
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
    <span
      className="util-fig"
      title={t(
        `Мэдээлэл ${when}-ны байдлаар (mse.mn)`,
        `Data as of ${when} (mse.mn)`,
      )}
    >
      <T mn="Шинэчлэгдсэн: " en="Updated: " />
      {when} · {status}
    </span>
  );
}
