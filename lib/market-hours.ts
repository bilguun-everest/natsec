/**
 * Trading calendar for the Mongolian Stock Exchange.
 *
 * The exchange publishes no timestamp with its data, so the site has to reason
 * about freshness itself: a price is only expected to move while the session is
 * open, and outside those hours yesterday's close *is* the correct number.
 * Everything here is pure and runs on both the server and the client.
 *
 * NOTE: the session window below is the published continuous-trading window.
 * Confirm it against mse.mn before relying on it for anything binding, and note
 * that exchange holidays (Tsagaan Sar, Naadam, etc.) are not modelled — on
 * those days the site simply shows the last session's data, correctly stamped.
 */

export const MSE_TIMEZONE = "Asia/Ulaanbaatar";

/** Continuous trading, in minutes past local midnight: 10:00–13:00. */
export const SESSION_OPEN_MINUTE = 10 * 60;
export const SESSION_CLOSE_MINUTE = 13 * 60;

export interface SessionState {
  /** True while the exchange is in continuous trading. */
  open: boolean;
  /** Local exchange time as `HH:MM`. */
  localTime: string;
  /** Local exchange date as `YYYY-MM-DD`. */
  localDate: string;
  /** 1 = Monday … 7 = Sunday, in exchange local time. */
  weekday: number;
}

const PARTS = new Intl.DateTimeFormat("en-GB", {
  timeZone: MSE_TIMEZONE,
  hour12: false,
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const WEEKDAYS: Record<string, number> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

/** Breaks an instant into its Ulaanbaatar-local calendar parts. */
function localParts(at: Date) {
  const parts = PARTS.formatToParts(at);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  // `hour: "2-digit"` with hour12:false yields "24" at midnight in some
  // runtimes; normalise it back to 0 so arithmetic stays sane.
  const hour = Number(get("hour")) % 24;

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour,
    minute: Number(get("minute")),
    weekday: WEEKDAYS[get("weekday")] ?? 1,
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

export function sessionState(at: Date = new Date()): SessionState {
  const { year, month, day, hour, minute, weekday } = localParts(at);
  const minutes = hour * 60 + minute;

  return {
    open:
      weekday <= 5 &&
      minutes >= SESSION_OPEN_MINUTE &&
      minutes < SESSION_CLOSE_MINUTE,
    localTime: `${pad(hour)}:${pad(minute)}`,
    localDate: `${year}-${month}-${day}`,
    weekday,
  };
}

/** Exchange-local `HH:MM` for an instant — what "as of" should display. */
export function localTime(at: Date): string {
  const { hour, minute } = localParts(at);
  return `${pad(hour)}:${pad(minute)}`;
}

/** Exchange-local `DD.MM HH:MM`, used when the data is not from today. */
export function localDateTime(at: Date): string {
  const { month, day, hour, minute } = localParts(at);
  return `${day}.${month} ${pad(hour)}:${pad(minute)}`;
}

/** True when the two instants fall on the same exchange-local day. */
export function sameLocalDay(a: Date, b: Date): boolean {
  const left = localParts(a);
  const right = localParts(b);
  return (
    left.year === right.year &&
    left.month === right.month &&
    left.day === right.day
  );
}

/**
 * How long a client should wait before asking for data again. Inside the
 * session we poll at `POLL_OPEN_MS`; outside it there is nothing to see, so we
 * fall back to a slow heartbeat that mainly exists to notice the open.
 */
export const POLL_OPEN_MS = 60_000;
export const POLL_CLOSED_MS = 15 * 60_000;

export function pollInterval(at: Date = new Date()): number {
  return sessionState(at).open ? POLL_OPEN_MS : POLL_CLOSED_MS;
}
