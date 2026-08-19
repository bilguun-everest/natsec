"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LangSwitch, T, useLang } from "@/components/lang";
import { sectionOf, useCurrentRoute } from "@/components/router";
import { PendingLink } from "@/components/ui";
import { TRADING_URL } from "@/lib/site";

interface DropItem {
  href: string;
  mn: string;
  en: string;
  /** Renders as a non-clickable group heading inside the dropdown. */
  group?: boolean;
  /** No page behind it yet — shown, but inert rather than dead-ending. */
  pending?: boolean;
}

interface NavItem {
  href: string;
  mn: string;
  en: string;
  /** Matches `sectionOf(route)` so the current section can be marked. */
  section: string;
  drop: DropItem[];
  /** The last menu opens flush right so it can't overflow the viewport. */
  alignRight?: boolean;
}

/**
 * Who we are first, then the way a first-time visitor moves through the site:
 * how to start, what we do, what we publish, where to get help.
 */
const NAV: NavItem[] = [
  {
    href: "#tanilcuulga",
    section: "about",
    mn: "Бидний тухай",
    en: "About Us",
    // No dropdown: the overview, leadership, track record and financial
    // reports are short, and all four now sit on the one page this opens.
    drop: [],
  },
  {
    href: "#zaavar",
    section: "start",
    mn: "Хэрхэн эхлэх",
    en: "Getting Started",
    drop: [
      { href: "#zaavar-dansneeh", mn: "Данс нээх", en: "Opening an account" },
      { href: "#zaavar-tsenegleh", mn: "Мөнгө байршуулах", en: "Add money" },
      { href: "#zaavar-mungu", mn: "Мөнгө татах", en: "Withdraw money" },
      // The iOS app ships (the footer links to it), but no written guide for
      // it exists yet, so the entry is shown and goes nowhere on purpose.
      {
        href: "",
        mn: "Аппликейшны заавар",
        en: "App user guide",
        pending: true,
      },
    ],
  },
  {
    href: "#broker",
    section: "services",
    mn: "Үйлчилгээ",
    en: "Services",
    drop: [
      { href: "", mn: "Брокер", en: "Broker", group: true },
      {
        href: TRADING_URL,
        mn: "Дотоод арилжаанд оролцох",
        en: "Domestic Trading",
      },
      {
        href: "#broker",
        mn: "Онлайн арилжааны систем",
        en: "Online Trading System",
      },
      { href: "", mn: "Андеррайтер", en: "Underwriter", group: true },
      {
        href: "#anderraiter",
        mn: "Хувьцааны санхүүжилт (IPO, FPO)",
        en: "Equity Financing (IPO, FPO)",
      },
      {
        href: "#anderraiter",
        mn: "Бондын санхүүжилт",
        en: "Bond Financing",
      },
      {
        href: "",
        mn: "Хөрөнгө оруулалтын зөвлөгөө",
        en: "Investment Advisory",
        group: true,
      },
      { href: "#zuvluh", mn: "Зөвлөх үйлчилгээ", en: "Advisory Services" },
      { href: "#zuvluh", mn: "Хувийн санхүүжилт", en: "Personal Financing" },
    ],
  },
  {
    href: "#sudalgaa",
    section: "research",
    mn: "Судалгаа",
    en: "Research",
    // Placeholder categories: the real list is still being decided.
    drop: [
      { href: "#sudalgaa", mn: "Макро орчны судалгаа", en: "Macro Research" },
      {
        href: "#sudalgaa",
        mn: "Үнэт цаасны судалгаа",
        en: "Securities Research",
      },
      {
        href: "#sudalgaa-toim",
        mn: "Долоо хоногийн тойм",
        en: "Weekly Review",
      },
    ],
  },
  {
    href: "#faq",
    section: "support",
    mn: "Харилцагчийн туслах",
    en: "Customer Support",
    drop: [
      { href: "#faq", mn: "Түгээмэл асуулт", en: "FAQ" },
      { href: "#holboo-barih", mn: "Холбоо барих", en: "Contact us" },
      {
        href: "#tog-hugjil-terms",
        mn: "Үйлчилгээний нөхцөл",
        en: "Terms of Service",
      },
    ],
  },
  {
    href: "#tog-hugjil",
    section: "sustainability",
    mn: "Тогтвортой хөгжил",
    en: "Sustainability",
    alignRight: true,
    drop: [
      {
        href: "#tog-hugjil-esg",
        mn: "Тогтвортой хөгжлийн бодлого (ESG)",
        en: "Sustainability Policy (ESG)",
      },
      {
        href: "#tog-hugjil-privacy",
        mn: "Нууцлалын бодлого",
        en: "Privacy Policy",
      },
    ],
  },
];

export default function Header() {
  const { t } = useLang();
  const route = useCurrentRoute();
  const active = sectionOf(route);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Any route change closes the drawer; so does Escape, which is the key
  // people reach for and the only way out for keyboard users.
  useEffect(() => {
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("hashchange", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // The header only asserts its edge once the page has moved under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The drawer covers the page, so the page behind it must not scroll — on
  // iOS a scrollable body under an overlay is how readers lose their place.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header data-scrolled={scrolled}>
      <div className="wrap nav">
        <a href="#home" className="logo">
          <Image
            src="/logo.png"
            alt="«Нэйшнл сэкюритис ҮЦК» ХХК"
            width={495}
            height={109}
            priority
          />
        </a>

        {/* `display:contents` on the drawer keeps the menu a direct flex item
            of the nav row on desktop; below the breakpoint the same wrapper
            becomes the overlay panel and the two extra children appear. */}
        <div className="drawer" data-open={open || undefined}>
          <div className="drawer-top">
            <span className="drawer-title">
              <T mn="Цэс" en="Menu" />
            </span>
            <button
              type="button"
              className="drawer-close"
              aria-label={t("Цэс хаах", "Close menu")}
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <ul className="menu">
            {NAV.map((item) => (
              <li key={item.mn} className={item.section === active ? "is-current" : undefined}>
                <a
                  href={item.href}
                  aria-current={item.section === active ? "page" : undefined}
                >
                  <T mn={item.mn} en={item.en} />
                </a>
                {item.drop.length > 0 && (
                  <div
                    className="drop"
                    data-align={item.alignRight ? "right" : undefined}
                  >
                    {item.drop.map((entry, index) =>
                      entry.group ? (
                        <div className="grp" key={`${entry.mn}-${index}`}>
                          <T mn={entry.mn} en={entry.en} />
                        </div>
                      ) : entry.pending ? (
                        <PendingLink
                          key={`${entry.mn}-${index}`}
                          label={t("Удахгүй нэмэгдэнэ", "Coming soon")}
                        >
                          <T mn={entry.mn} en={entry.en} />
                        </PendingLink>
                      ) : (
                        <a href={entry.href} key={`${entry.mn}-${index}`}>
                          <T mn={entry.mn} en={entry.en} />
                        </a>
                      ),
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* The two account actions the header cannot always show: below
              420px the primary button is dropped from the bar entirely, and
              "Log In" lives in the utility strip, which is itself thinned out
              on a phone. Both belong here, where there is room for them. */}
          <div className="drawer-foot">
            <a href={TRADING_URL} className="btn btn-p">
              <T mn="Данс нээх" en="Open Account" />
            </a>
            <a href={TRADING_URL} className="btn btn-o">
              <T mn="Нэвтрэх" en="Log In" />
            </a>
          </div>
        </div>

        <div className="act">
          <LangSwitch id="langSwitchHeader" />
          {/* "Log In" lives in the utility bar now. Six Mongolian section
              labels plus two buttons did not fit the row at any width, and of
              the two actions, the one worth the header is the one for people
              who do not have an account yet. */}
          <a href={TRADING_URL} className="btn btn-p">
            <T mn="Данс нээх" en="Open Account" />
          </a>
          <button
            className="burger"
            aria-label={t("Цэс нээх", "Open menu")}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Tapping the page behind the drawer closes it — the gesture everyone
          tries first, alongside Escape and the panel's own close button. */}
      <div
        className="nav-scrim"
        data-open={open || undefined}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
