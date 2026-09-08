"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { A, T, useLang } from "@/components/lang";
import { Reveal } from "@/components/motion";

/** Monospaced kicker with the short rule in front of it. */
export function Eyebrow({
  mn,
  en,
  ja,
  style,
  className,
}: {
  mn: string;
  en: string;
  ja: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div className={className ? `eyebrow ${className}` : "eyebrow"} style={style}>
      <T mn={mn} en={en} ja={ja} />
    </div>
  );
}

/** Eyebrow + heading + optional standfirst, the opener of every section. */
export function SecHead({
  eyebrow,
  title,
  lead,
  style,
  level = 2,
}: {
  eyebrow: { mn: string; en: string; ja: string };
  title: { mn: string; en: string; ja: string };
  lead?: { mn: string; en: string; ja: string };
  style?: CSSProperties;
  level?: 2 | 3;
}) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <Reveal className="sec-h" style={style}>
      <Eyebrow mn={eyebrow.mn} en={eyebrow.en} ja={eyebrow.ja} />
      <Heading>
        <T mn={title.mn} en={title.en} ja={title.ja} />
      </Heading>
      {lead && (
        <p>
          <T mn={lead.mn} en={lead.en} ja={lead.ja} />
        </p>
      )}
    </Reveal>
  );
}

/** Bulleted list in the house style (square outline markers). */
export function List({ items }: { items: { mn: string; en: string; ja: string }[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.mn}>
          <T mn={item.mn} en={item.en} ja={item.ja} />
        </li>
      ))}
    </ul>
  );
}

/** Copies `text`, then flashes a confirmation via the `.copied` class. */
export function CopyButton({
  text,
  className = "copy-btn",
  children = "⧉",
  style,
}: {
  text: string;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      fallbackCopy(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      className={copied ? `${className} copied` : className}
      style={style}
      onClick={copy}
      aria-label={t("Хуулах", "Copy", "コピー")}
    >
      {children}
    </button>
  );
}

function fallbackCopy(text: string) {
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.focus();
  area.select();
  try {
    document.execCommand("copy");
  } catch {
    /* nothing more to try */
  }
  document.body.removeChild(area);
}

export interface PageLink {
  href: string;
  mn: string;
  en: string;
  ja: string;
}

/** Previous / next pager closing each guide, FAQ answer, and policy page. */
export function PageNav({ prev, next }: { prev?: PageLink; next?: PageLink }) {
  return (
    <div className="guide-pagenav">
      <div className="side prev">
        {prev && (
          <>
            <small>
              <T mn="ӨМНӨХ" en="Previous" ja="前へ" />
            </small>
            <A href={prev.href}>
              {/* Non-breaking space keeps the arrow from orphaning onto its
                  own line when a label wraps. */}
              ← <T mn={prev.mn} en={prev.en} ja={prev.ja} />
            </A>
          </>
        )}
      </div>
      <div className="side next">
        {next && (
          <>
            <small>
              <T mn="ДАРААХ" en="Next" ja="次へ" />
            </small>
            <A href={next.href}>
              <T mn={next.mn} en={next.en} ja={next.ja} /> →
            </A>
          </>
        )}
      </div>
    </div>
  );
}

/** Progress pips across the six customer-support guides. */
export function StepDots({
  steps,
  active,
}: {
  steps: string[];
  active: string;
}) {
  return (
    <div className="step-dots">
      {steps.map((step) => (
        <A href={`/${step}/`} key={step}>
          <span className={step === active ? "active" : ""} />
        </A>
      ))}
    </div>
  );
}

/**
 * A link whose destination does not exist yet.
 *
 * It renders no `href` at all. An <A> without one is not a link: it cannot be
 * clicked into a dead end, and a crawler or a link checker does not count it
 * among the site's broken links — which is what `href="#"` had it doing. The
 * element stays an <A> so it keeps its styling, and `aria-disabled` tells a
 * screen reader what the title tells everyone else.
 */
export function PendingLink({
  className,
  children,
  label,
}: {
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  const { t } = useLang();
  return (
    <A
      className={className}
      role="link"
      aria-disabled="true"
      title={label ?? t("Удахгүй нэмэгдэнэ", "Coming soon", "近日公開")}
    >
      {children}
    </A>
  );
}

/** "← back" link above a detail page. */
export function BackLink({
  href,
  mn,
  en,
  ja,
}: {
  href: string;
  mn: string;
  en: string;
  ja: string;
}) {
  return (
    <A href={href} className="guide-back">
      ← <T mn={mn} en={en} ja={ja} />
    </A>
  );
}

/** The paper-sheet shell every guide / FAQ / policy detail page sits on. */
export function DetailPage({
  back,
  children,
}: {
  back: { href: string; mn: string; en: string; ja: string };
  children: ReactNode;
}) {
  return (
    <section>
      {/* No extra padding here: `section` already sets the page's vertical
          rhythm, and stacking a second 72px on top of it pushed the first
          line of every guide a screen-and-a-bit down the page. */}
      <div className="wrap">
        <div className="modal-paper inline">
          <BackLink {...back} />
          {children}
        </div>
      </div>
    </section>
  );
}
