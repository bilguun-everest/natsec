"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import {
  LANGS,
  ROUTE_EVENT,
  langFromPath,
  pathOf,
  type Lang,
} from "@/lib/routes";
import { useCurrentRoute } from "@/components/router";

export type { Lang };

interface LangValue {
  lang: Lang;
  /** Pick the active string — for attributes (alt, aria-label, title). */
  t: (mn: string, en: string, ja: string) => string;
}

const LangContext = createContext<LangValue | null>(null);

/**
 * Site-wide MN / EN / JA switch, driven by the URL.
 *
 * The language used to live in `localStorage`, which meant every language
 * shared one address: a search engine saw a single Mongolian page, and an
 * English link could not be shared. Each language has its own URL now —
 * Mongolian on the bare paths, English under `/en/`, Japanese under `/ja/` —
 * so the path is the only thing that decides, and `initial` comes from the
 * page the reader loaded.
 */
export function LanguageProvider({
  initial,
  children,
}: {
  initial: Lang;
  children: ReactNode;
}) {
  const [lang, setLang] = useState<Lang>(initial);

  useEffect(() => {
    const sync = () => setLang(langFromPath(window.location.pathname));
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const value = useMemo<LangValue>(
    () => ({
      lang,
      t: (mn: string, en: string, ja: string) =>
        lang === "en" ? en : lang === "ja" ? ja : mn,
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangValue {
  const value = useContext(LangContext);
  if (!value) throw new Error("useLang must be used inside <LanguageProvider>");
  return value;
}

/**
 * Translated text. Two characters get special treatment: `₮` is wrapped in a
 * font that actually has the glyph, and `\n` becomes a line break.
 */
export function T({ mn, en, ja }: { mn: string; en: string; ja: string }) {
  const { lang } = useLang();
  return <>{rich(lang === "en" ? en : lang === "ja" ? ja : mn)}</>;
}

/** Same rendering rules for plain (already-resolved) strings. */
export function Rich({ children }: { children: string }) {
  return <>{rich(children)}</>;
}

/** The tögrög sign, in a font that has it. */
export function Tg() {
  return <span className="tg">₮</span>;
}

/**
 * MN / EN / JA segmented control.
 *
 * One real link to the same page in each language, rather than buttons that
 * swap a variable. They can be copied, opened in a new tab and followed by a
 * crawler, and they work with no JavaScript at all.
 */
export function LangSwitch({ id }: { id?: string }) {
  const { lang } = useLang();
  const route = useCurrentRoute();
  return (
    <div className="lang-switch" id={id}>
      {LANGS.map((option) => (
        <a
          key={option}
          href={pathOf(route, option)}
          hrefLang={option}
          data-lang-opt={option}
          className={lang === option ? "active" : undefined}
          aria-current={lang === option ? "true" : undefined}
        >
          {option.toUpperCase()}
        </a>
      ))}
    </div>
  );
}

/**
 * An internal link that keeps the reader in the language they are reading.
 *
 * Every href in the components is written as its Mongolian path; this puts the
 * `/en` or `/ja` in front when the page is one of those. Doing it here rather
 * than at seventy call sites means the exported English and Japanese HTML link
 * to their own pages — which is what a crawler follows, and what a middle click
 * gives a reader. External links, `tel:`, `mailto:` and the href-less
 * placeholder pass through.
 */
export function A({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { lang } = useLang();
  const to =
    lang !== "mn" && href?.startsWith("/") && !/^\/(?:en|ja)(\/|$)/.test(href)
      ? `/${lang}${href}`
      : href;
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}

function rich(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  text.split("\n").forEach((line, lineIndex) => {
    if (lineIndex > 0) nodes.push(<br key={`br-${lineIndex}`} />);
    line.split("₮").forEach((part, partIndex) => {
      if (partIndex > 0) {
        nodes.push(
          <span className="tg" key={`tg-${lineIndex}-${partIndex}`}>
            ₮
          </span>,
        );
      }
      if (part) nodes.push(part);
    });
  });
  return nodes;
}
