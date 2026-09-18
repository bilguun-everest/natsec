"use client";

import { A, T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { List, SecHead } from "@/components/ui";

/**
 * Each service carries its own drawn icon. They all used to show the same
 * company mark, which made four different businesses look like one repeated
 * one and gave the reader nothing to scan by.
 */
const SERVICES: {
  icon: React.ReactNode;
  title: { mn: string; en: string; ja: string };
  lead: { mn: string; en: string; ja: string };
  items: { mn: string; en: string; ja: string }[];
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
    title: { mn: "Брокер", en: "Broker", ja: "ブローカー" },
    lead: {
      mn: "МХБ-ийн арилжааны системтэй шууд холбогдсон платформоор хоцрогдолгүй арилжаа хийнэ.",
      en: "Trade without delay through a platform directly connected to the MSE trading system.", ja: "モン証の取引システムに直結したプラットフォームで、遅延なく取引できます。",
    },
    items: [
      { mn: "Дотоод арилжаанд оролцох", en: "Domestic trading", ja: "国内取引" },
      { mn: "Онлайн арилжааны систем", en: "Online trading system", ja: "オンライン取引システム" },
      {
        mn: "Хувьцаа, бонд, засгийн газрын үнэт цаас",
        en: "Equities, bonds & government securities", ja: "株式・社債・国債",
      },
    ],
    href: "/zaavar/",
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
    title: { mn: "Андеррайтер", en: "Underwriter", ja: "引受業務" },
    lead: {
      mn: "Компанийн хувьцаа, бондыг зах зээлд гаргах бүх үе шатыг хариуцна.",
      en: "We manage every stage of bringing a company's shares or bonds to market.", ja: "企業の株式・社債を市場に出すまでの全段階を担います。",
    },
    items: [
      {
        mn: "Хувьцааны санхүүжилт (IPO, FPO)",
        en: "Equity financing (IPO, FPO)", ja: "株式による資金調達（IPO・FPO）",
      },
      { mn: "Бондын санхүүжилт", en: "Bond financing", ja: "社債による資金調達" },
    ],
    href: "/anderraiter/",
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
      en: "Investment Advisory", ja: "投資助言",
    },
    lead: {
      mn: "Эрсдэл даах чадвар, зорилгод тань тохирсон багц бүрдүүлж, тогтмол хянана.",
      en: "We build a portfolio suited to your risk tolerance and goals, and monitor it continuously.", ja: "お客様のリスク許容度と目標に合ったポートフォリオを構築し、継続的にモニタリングします。",
    },
    items: [
      { mn: "Зөвлөх үйлчилгээ", en: "Advisory services", ja: "アドバイザリー業務" },
      { mn: "Хувийн санхүүжилт", en: "Personal financing", ja: "個人向け資金計画" },
      {
        mn: "Компанийн нэгдэл, өөрчлөн байгуулалтын зөвлөгөө",
        en: "Corporate restructuring & M&A advisory", ja: "組織再編・M&Aアドバイザリー",
      },
      {
        mn: "Хөрөнгө оруулагчидтай холбож өгөх",
        en: "Connecting companies with potential investors", ja: "企業と投資家をつなぐ",
      },
    ],
    href: "/zuvluh/",
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
    title: { mn: "Харилцагчийн туслах", en: "Customer Support", ja: "サポート" },
    lead: {
      mn: "Данс нээхээс ногдол ашиг авах хүртэл алхам бүрийн заавар.",
      en: "Guidance for every step, from opening an account to receiving dividends.", ja: "口座開設から配当の受け取りまで、各ステップの手引き。",
    },
    items: [
      {
        mn: "Данс нээх, IPO-д оролцох заавар",
        en: "Account opening & IPO participation guide", ja: "口座開設とIPO参加のガイド",
      },
      {
        mn: "Мөнгө байршуулах, татах, данс цэнэглэх",
        en: "Deposits, withdrawals & top-ups", ja: "入金・出金・資金の追加",
      },
      { mn: "Ногдол ашиг авах", en: "Receiving dividends", ja: "配当の受け取り" },
    ],
    href: "/zaavar/",
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Үйлчилгээ", en: "Services", ja: "サービス" }}
          title={{
            mn: "Хөрөнгө оруулалтын бүх шатанд",
            en: "At every stage of investing", ja: "投資のあらゆる段階で",
          }}
          lead={{
            mn: "Хувь хүн, байгууллагын харилцагчдад зориулсан лицензтэй үйлчилгээ.",
            en: "Licensed services for individual and institutional clients.", ja: "個人・機関投資家のお客様向けの免許業務。",
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
                <T mn={service.title.mn} en={service.title.en} ja={service.title.ja} />
              </h3>
              <p>
                <T mn={service.lead.mn} en={service.lead.en} ja={service.lead.ja} />
              </p>
              <List items={service.items} />
              <A href={service.href} className="more">
                <T mn="Дэлгэрэнгүй →" en="Learn more →" ja="詳しく見る →" />
              </A>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
