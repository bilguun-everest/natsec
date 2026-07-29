"use client";

import Image from "next/image";
import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { List, SecHead } from "@/components/ui";

const SERVICES: {
  title: { mn: string; en: string };
  lead: { mn: string; en: string };
  items: { mn: string; en: string }[];
  href: string;
}[] = [
  {
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
              <Image
                className="mark"
                src="/mark.png"
                alt=""
                width={158}
                height={158}
              />
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
