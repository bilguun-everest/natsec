"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Bi } from "@/lib/content";

export type Lang = "mn" | "en";

const STORAGE_KEY = "natsec_lang";

interface LangValue {
  lang: Lang;
  toggle: () => void;
  /** Pick the active string — for attributes (alt, aria-label, title). */
  t: (text: Bi) => string;
}

const LangContext = createContext<LangValue | null>(null);

/**
 * Site-wide MN/EN switch. Mongolian renders on the server (and for users
 * without JS); a stored preference is applied on mount, mirroring the
 * `lang`/`data-lang` attributes onto <html> the way the design does.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("mn");

  useEffect(() => {
    let saved: Lang = "mn";
    try {
      saved = (localStorage.getItem(STORAGE_KEY) as Lang) || "mn";
    } catch {
      /* storage unavailable — stay on the default */
    }
    if (saved === "en") setLang("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((current) => {
      const next: Lang = current === "mn" ? "en" : "mn";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo<LangValue>(
    () => ({ lang, toggle, t: (text: Bi) => text[lang] }),
    [lang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangValue {
  const value = useContext(LangContext);
  if (!value) throw new Error("useLang must be used inside <LanguageProvider>");
  return value;
}

/**
 * Renders a bilingual string. Two characters get special treatment:
 * `₮` is wrapped in a font that actually has the glyph, and `\n` becomes a
 * line break.
 */
export function T({ children }: { children: Bi }) {
  const { lang } = useLang();
  return <>{rich(children[lang])}</>;
}

/** Same rendering rules for plain (already-resolved) strings. */
export function Rich({ children }: { children: string }) {
  return <>{rich(children)}</>;
}

/** The tögrög sign, in a font that has it. */
export function Tg() {
  return <span className="font-tg">₮</span>;
}

function rich(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  text.split("\n").forEach((line, lineIndex) => {
    if (lineIndex > 0) nodes.push(<br key={`br-${lineIndex}`} />);
    line.split("₮").forEach((part, partIndex) => {
      if (partIndex > 0) {
        nodes.push(
          <span className="font-tg" key={`tg-${lineIndex}-${partIndex}`}>
            ₮
          </span>,
        );
      }
      if (part) nodes.push(part);
    });
  });
  return nodes;
}
