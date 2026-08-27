"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { List, SecHead } from "@/components/ui";

/**
 * Each service carries its own drawn icon. They all used to show the same
 * company mark, which made four different businesses look like one repeated
 * one and gave the reader nothing to scan by.
 */
const SERVICES: {
  icon: React.ReactNode;
  title: { mn: string; en: string };
  lead: { mn: string; en: string };
  items: { mn: string; en: string }[];
  href: string;
}[] = [
  {
    icon: (
      <>
        <path d="M3 20h18" />
        <path d="M7 20V9" />
        <path d="M12 20V4" />
        <path d="M17 20v-7" />
      </>
    ),
    title: { mn: "Брокер", en: "Broker" },
    lead: {
      mn: "МХБ-ийн арилжааны системтэй шууд холбогдсон платформоор хоцрогдолгүй арилжаа хийнэ.",
      en: "Trade without delay through a platform directly connected to the MSE trading system.",
    },
    items: [
      { mn: "Дотоод арилжаанд оролцох", en: "Domestic trading" },
      { mn: "Онлайн арилжааны систем", en: "Online trading system" },
      {
        mn: "Хувьцаа, бонд, засгийн газрын үнэт цаас",
        en: "Equities, bonds & government securities",
      },
    ],
    href: "#zaavar",
  },
  {
    icon: (
      <>
        <path d="M4 21h16" />
        <path d="M6 21V8l6-4 6 4v13" />
        <path d="M10 21v-5h4v5" />
        <path d="M10 11h4" />
      </>
    ),
    title: { mn: "Андеррайтер", en: "Underwriter" },
    lead: {
      mn: "Компанийн хувьцаа, бондыг зах зээлд гаргах бүх үе шатыг хариуцна.",
      en: "We manage every stage of bringing a company's shares or bonds to market.",
    },
    items: [
      {
        mn: "Хувьцааны санхүүжилт (IPO, FPO)",
        en: "Equity financing (IPO, FPO)",
      },
      { mn: "Бондын санхүүжилт", en: "Bond financing" },
    ],
    href: "#anderraiter",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5.5-5.5 2 2-5.5z" />
      </>
    ),
    title: {
      mn: "Хөрөнгө оруулалтын зөвлөгөө",
      en: "Investment Advisory",
    },
    lead: {
      mn: "Эрсдэл даах чадвар, зорилгод тань тохирсон багц бүрдүүлж, тогтмол хянана.",
      en: "We build a portfolio suited to your risk tolerance and goals, and monitor it continuously.",
    },
    items: [
      { mn: "Зөвлөх үйлчилгээ", en: "Advisory services" },
      { mn: "Хувийн санхүүжилт", en: "Personal financing" },
      {
        mn: "Компанийн нэгдэл, өөрчлөн байгуулалтын зөвлөгөө",
        en: "Corporate restructuring & M&A advisory",
      },
      {
        mn: "Хөрөнгө оруулагчидтай холбож өгөх",
        en: "Connecting companies with potential investors",
      },
    ],
    href: "#zuvluh",
  },
  {
    icon: (
      <>
        <path d="M12 3a7 7 0 00-7 7v4" />
        <path d="M19 14v-4a7 7 0 00-3.5-6" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M19 19v1a2 2 0 01-2 2h-3" />
      </>
    ),
    title: { mn: "Харилцагчийн туслах", en: "Customer Support" },
    lead: {
      mn: "Данс нээхээс ногдол ашиг авах хүртэл алхам бүрийн заавар.",
      en: "Guidance for every step, from opening an account to receiving dividends.",
    },
    items: [
      {
        mn: "Данс нээх, IPO-д оролцох заавар",
        en: "Account opening & IPO participation guide",
      },
      {
        mn: "Мөнгө байршуулах, татах, данс цэнэглэх",
        en: "Deposits, withdrawals & top-ups",
      },
      { mn: "Ногдол ашиг авах", en: "Receiving dividends" },
    ],
    href: "#zaavar",
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Үйлчилгээ", en: "Services" }}
          title={{
            mn: "Хөрөнгө оруулалтын бүх шатанд",
            en: "At every stage of investing",
          }}
          lead={{
            mn: "Хувь хүн, байгууллагын харилцагчдад зориулсан лицензтэй үйлчилгээ.",
            en: "Licensed services for individual and institutional clients.",
          }}
        />
        <div className="svc">
          {SERVICES.map((service, index) => (
            <Reveal
              className="svc-c"
              variant="fade"
              key={service.title.mn}
              delay={index * 110}
            >
              <span className="mark">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {service.icon}
                </svg>
              </span>
              <h3>
                <T mn={service.title.mn} en={service.title.en} />
              </h3>
              <p>
                <T mn={service.lead.mn} en={service.lead.en} />
              </p>
              <List items={service.items} />
              <a href={service.href} className="more">
                <T mn="Дэлгэрэнгүй →" en="Learn more →" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
