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
 * Ordered the way a first-time visitor moves through the site: how to start,
 * what we do, what we publish, where to get help, then the company itself.
 */
const NAV: NavItem[] = [
  {
    href: "#zaavar",
    section: "start",
    mn: "Хэрхэн эхлэх",
    en: "Getting Started",
    drop: [
      { href: "#zaavar-dansneeh", mn: "Данс нээх", en: "Opening an account" },
      { href: "#zaavar-tsenegleh", mn: "Мөнгө байршуулах", en: "Add money" },
      { href: "#zaavar-mungu", mn: "Мөнгө татах", en: "Withdraw money" },
      // No app guide exists yet — the apps themselves are still "coming soon"
      // in the footer, so the entry is shown but goes nowhere on purpose.
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
  {
    href: "#tanilcuulga",
    section: "about",
    mn: "Бидний тухай",
    en: "About Us",
    alignRight: true,
    drop: [
      { href: "#tanilcuulga", mn: "Танилцуулга", en: "Overview" },
      {
        href: "#udirdlaga",
        mn: "Удирдах албан тушаалтан",
        en: "Leadership",
      },
      { href: "#ololt", mn: "Ололт амжилт", en: "Achievements" },
      { href: "#tailan", mn: "Санхүүгийн тайлан", en: "Financial Reports" },
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

  return (
    <header data-scrolled={scrolled}>
      <div className="wrap nav">
        <a href="#home" className="logo">
          <Image
            src="/logo.png"
            alt="«Нэйшнл сэкюритис ҮЦК» ХХК"
            width={765}
            height={158}
            priority
          />
        </a>

        <ul className={open ? "menu open" : "menu"}>
          {NAV.map((item) => (
            <li key={item.mn} className={item.section === active ? "is-current" : undefined}>
              <a
                href={item.href}
                aria-current={item.section === active ? "page" : undefined}
              >
                <T mn={item.mn} en={item.en} />
              </a>
              <div
                className="drop"
                style={
                  item.alignRight
                    ? { left: "auto", right: 0, marginLeft: 0 }
                    : undefined
                }
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
            </li>
          ))}
        </ul>

        <div className="act">
          <LangSwitch id="langSwitchHeader" />
          <a href={TRADING_URL} className="btn btn-o">
            <T mn="Нэвтрэх" en="Log In" />
          </a>
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
    </header>
  );
}
