import type { ReactNode } from "react";
import { T } from "@/components/lang";
import type { Bi } from "@/lib/content";

/** Page gutter — every section shares the same measure. */
export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-7 max-sm:px-5 ${className}`}>
      {children}
    </div>
  );
}

/** Tinted, hairline-bounded band used to separate neighbouring sections. */
export function Band({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-y border-line bg-paper ${className}`}>
      {children}
    </div>
  );
}

/** Mono micro-label with the short rule in front of it. */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: Bi;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`mb-[14px] flex items-center gap-[10px] font-mono text-[11px] font-medium uppercase tracking-[.16em] ${
        tone === "light" ? "text-blue" : "text-blue-text"
      } ${className}`}
    >
      <span className="h-px w-[22px] shrink-0 bg-blue" />
      <T>{children}</T>
    </div>
  );
}

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[7px] border-[1.5px] border-transparent px-5 py-[11px] font-display text-sm font-semibold transition-all duration-[180ms] max-sm:px-3.5 max-sm:text-[13px]";

const BUTTON_VARIANTS = {
  /** Primary — the brand blue fill. */
  p: "bg-blue text-navy-900 hover:bg-blue-hover hover:-translate-y-px hover:shadow-cta",
  /** Outline on light backgrounds. */
  o: "border-line text-navy hover:border-blue hover:text-blue-text",
  /** White fill, for use on the navy hero. */
  w: "bg-white text-navy hover:bg-[#EDF1FF]",
  /** Ghost outline, for use on the navy hero. */
  g: "border-white/30 text-white hover:border-white hover:bg-white/[.09]",
} as const;

export function Btn({
  href,
  variant,
  children,
  className = "",
}: {
  href: string;
  variant: keyof typeof BUTTON_VARIANTS;
  children: Bi;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`}
    >
      <T>{children}</T>
    </a>
  );
}

/** Section header: eyebrow, title, optional supporting line. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className = "mb-11",
}: {
  eyebrow: Bi;
  title: Bi;
  lead?: Bi;
  className?: string;
}) {
  return (
    <div className={`max-w-[620px] ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[clamp(27px,3.3vw,38px)] font-bold text-ink">
        <T>{title}</T>
      </h2>
      {lead && (
        <p className="justify mt-3 text-base text-grey">
          <T>{lead}</T>
        </p>
      )}
    </div>
  );
}

/** The logo mark, abstracted: concentric squares. */
export function Mark({
  className = "h-[38px] w-[38px]",
  rings = 3,
}: {
  className?: string;
  rings?: 2 | 3;
}) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="38" height="38" />
      <rect x="9" y="9" width="22" height="22" />
      {rings === 3 && <rect x="16" y="16" width="8" height="8" />}
    </svg>
  );
}

/** Ambient field built from the same concentric squares as the logo. */
export function Rings({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 720"
      aria-hidden="true"
      className={`pointer-events-none absolute [&_rect]:fill-none [&_rect]:stroke-blue [&_rect]:stroke-[1.4] ${className}`}
    >
      <rect x="10" y="10" width="700" height="700" />
      <rect x="70" y="70" width="580" height="580" />
      <rect x="130" y="130" width="460" height="460" />
      <rect x="190" y="190" width="340" height="340" />
      <rect x="250" y="250" width="220" height="220" />
      <rect x="310" y="310" width="100" height="100" />
    </svg>
  );
}

/** Pulsing "live" indicator. */
export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`mr-1.5 inline-block h-1.5 w-1.5 shrink-0 animate-live-pulse rounded-full bg-[#3FD08A] ${className}`}
    />
  );
}

/** Inline "learn more" link — the arrow slides out on hover. */
export function More({
  href,
  children,
  className = "",
}: {
  href: string;
  children: Bi;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1.5 font-display text-sm font-semibold text-blue-text transition-all hover:gap-2.5 ${className}`}
    >
      <T>{children}</T>
    </a>
  );
}
