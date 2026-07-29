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

export type Lang = "mn" | "en";

const STORAGE_KEY = "natsec_lang";

interface LangValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Pick the active string — for attributes (alt, aria-label, title). */
  t: (mn: string, en: string) => string;
}

const LangContext = createContext<LangValue | null>(null);

/**
 * Site-wide MN/EN switch. Mongolian renders on the server (and for users
 * without JS); a stored preference is applied on mount, mirroring the
 * `lang`/`data-lang` attributes onto <html> the way the design does.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("mn");

  useEffect(() => {
    let saved: Lang = "mn";
    try {
      saved = (localStorage.getItem(STORAGE_KEY) as Lang) || "mn";
    } catch {
      /* storage unavailable — stay on the default */
    }
    if (saved === "en") setLangState("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "mn" ? "en" : "mn"),
    [lang, setLang],
  );

  const value = useMemo<LangValue>(
    () => ({
      lang,
      setLang,
      toggle,
      t: (mn: string, en: string) => (lang === "en" ? en : mn),
    }),
    [lang, setLang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangValue {
  const value = useContext(LangContext);
  if (!value) throw new Error("useLang must be used inside <LanguageProvider>");
  return value;
}

/**
 * Bilingual text. Two characters get special treatment: `₮` is wrapped in a
 * font that actually has the glyph, and `\n` becomes a line break.
 */
export function T({ mn, en }: { mn: string; en: string }) {
  const { lang } = useLang();
  return <>{rich(lang === "en" ? en : mn)}</>;
}

/** Same rendering rules for plain (already-resolved) strings. */
export function Rich({ children }: { children: string }) {
  return <>{rich(children)}</>;
}

/** The tögrög sign, in a font that has it. */
export function Tg() {
  return <span className="tg">₮</span>;
}

/** MN / EN segmented control, as it appears in the header. */
export function LangSwitch({ id }: { id?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-switch" id={id}>
      {(["mn", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          data-lang-opt={option}
          className={lang === option ? "active" : undefined}
          onClick={() => setLang(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
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
