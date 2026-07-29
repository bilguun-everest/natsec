"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LangSwitch, T, useLang } from "@/components/lang";
import { TRADING_URL } from "@/lib/site";

interface DropItem {
  href: string;
  mn: string;
  en: string;
  /** Renders as a non-clickable group heading inside the dropdown. */
  group?: boolean;
}

interface NavItem {
  href: string;
  mn: string;
  en: string;
  drop: DropItem[];
  /** The last menu opens flush right so it can't overflow the viewport. */
  alignRight?: boolean;
}

const NAV: NavItem[] = [
  {
    href: "#tanilcuulga",
    mn: "Бидний тухай",
    en: "About Us",
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
  {
    href: "#broker",
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
    mn: "Судалгаа",
    en: "Research",
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
    href: "#zaavar",
    mn: "Харилцагчийн туслах",
    en: "Customer Support",
    drop: [
      {
        href: "#zaavar-dansneeh",
        mn: "Данс нээх заавар",
        en: "Account Opening Guide",
      },
      {
        href: "#zaavar-mhb",
        mn: "МХБ-ийн арилжаанд оролцох",
        en: "Trading on the MSE",
      },
      {
        href: "#zaavar-ipo",
        mn: "IPO-д хэрхэн оролцох вэ",
        en: "How to Participate in an IPO",
      },
      {
        href: "#zaavar-mungu",
        mn: "Мөнгө байршуулах, татах",
        en: "Deposits & Withdrawals",
      },
      { href: "#zaavar-tsenegleh", mn: "Данс цэнэглэх", en: "Top Up Account" },
      {
        href: "#zaavar-nogdol",
        mn: "Ногдол ашиг авах",
        en: "Receiving Dividends",
      },
      { href: "#holboo-barih", mn: "Холбоо барих", en: "Contact" },
    ],
  },
  {
    href: "#tog-hugjil",
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
      {
        href: "#tog-hugjil-terms",
        mn: "Үйлчилгээний нөхцөл",
        en: "Terms of Service",
      },
    ],
  },
];

export default function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Any route change closes the drawer.
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
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
            <li key={item.mn}>
              <a href={item.href}>
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
