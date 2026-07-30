"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { T, useLang } from "@/components/lang";
import { Reveal } from "@/components/motion";

/** Monospaced kicker with the short rule in front of it. */
export function Eyebrow({
  mn,
  en,
  style,
}: {
  mn: string;
  en: string;
  style?: CSSProperties;
}) {
  return (
    <div className="eyebrow" style={style}>
      <T mn={mn} en={en} />
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
  eyebrow: { mn: string; en: string };
  title: { mn: string; en: string };
  lead?: { mn: string; en: string };
  style?: CSSProperties;
  level?: 2 | 3;
}) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <Reveal className="sec-h" style={style}>
      <Eyebrow mn={eyebrow.mn} en={eyebrow.en} />
      <Heading>
        <T mn={title.mn} en={title.en} />
      </Heading>
      {lead && (
        <p>
          <T mn={lead.mn} en={lead.en} />
        </p>
      )}
    </Reveal>
  );
}

/** Bulleted list in the house style (square outline markers). */
export function List({ items }: { items: { mn: string; en: string }[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.mn}>
          <T mn={item.mn} en={item.en} />
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
      aria-label={t("Хуулах", "Copy")}
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
}

/** Previous / next pager closing each guide, FAQ answer, and policy page. */
export function PageNav({ prev, next }: { prev?: PageLink; next?: PageLink }) {
  return (
    <div className="guide-pagenav">
      <div className="side prev">
        {prev && (
          <>
            <small>
              <T mn="ӨМНӨХ" en="Previous" />
            </small>
            <a href={prev.href}>
              {/* Non-breaking space keeps the arrow from orphaning onto its
                  own line when a label wraps. */}
              ← <T mn={prev.mn} en={prev.en} />
            </a>
          </>
        )}
      </div>
      <div className="side next">
        {next && (
          <>
            <small>
              <T mn="ДАРААХ" en="Next" />
            </small>
            <a href={next.href}>
              <T mn={next.mn} en={next.en} /> →
            </a>
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
        <a href={`#${step}`} key={step}>
          <span className={step === active ? "active" : ""} />
        </a>
      ))}
    </div>
  );
}

/**
 * A link whose destination does not exist yet.
 *
 * `href="#"` is not harmless here: the fragment *is* the router, so clicking
 * one emptied the hash and threw the reader to the homepage. On a page of
 * financial disclosures, a download button that silently navigates away is
 * worse than one that plainly does nothing.
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
    <a
      href="#"
      className={className}
      aria-disabled="true"
      title={label ?? t("Удахгүй нэмэгдэнэ", "Coming soon")}
      onClick={(event) => event.preventDefault()}
    >
      {children}
    </a>
  );
}

/** "← back" link above a detail page. */
export function BackLink({
  href,
  mn,
  en,
}: {
  href: string;
  mn: string;
  en: string;
}) {
  return (
    <a href={href} className="guide-back">
      ← <T mn={mn} en={en} />
    </a>
  );
}

/** The paper-sheet shell every guide / FAQ / policy detail page sits on. */
export function DetailPage({
  back,
  children,
}: {
  back: { href: string; mn: string; en: string };
  children: ReactNode;
}) {
  return (
    <section>
      <div className="wrap" style={{ padding: "72px 0" }}>
        <div className="modal-paper inline">
          <BackLink {...back} />
          {children}
        </div>
      </div>
    </section>
  );
}
