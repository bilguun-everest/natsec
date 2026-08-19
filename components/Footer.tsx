"use client";

import Image from "next/image";
import { Fragment } from "react";
import { T, useLang } from "@/components/lang";
import { PendingLink } from "@/components/ui";
import { APP_STORE_URL, CONTACT } from "@/lib/site";

/** Same order, same contents as the header menu — one site map, not two. */
const COLUMNS: {
  mn: string;
  en: string;
  links: { href: string; mn: string; en: string }[];
}[] = [
  {
    mn: "ХЭРХЭН ЭХЛЭХ",
    en: "GETTING STARTED",
    links: [
      { href: "#zaavar-dansneeh", mn: "Данс нээх", en: "Opening an account" },
      { href: "#zaavar-tsenegleh", mn: "Мөнгө байршуулах", en: "Add money" },
      { href: "#zaavar-mungu", mn: "Мөнгө татах", en: "Withdraw money" },
      { href: "#zaavar", mn: "Бүх заавар", en: "All guides" },
    ],
  },
  {
    mn: "ҮЙЛЧИЛГЭЭ",
    en: "SERVICES",
    links: [
      { href: "#broker", mn: "Брокер", en: "Broker" },
      { href: "#anderraiter", mn: "Андеррайтер", en: "Underwriter" },
      {
        href: "#zuvluh",
        mn: "Хөрөнгө оруулалтын зөвлөгөө",
        en: "Investment Advisory",
      },
    ],
  },
  {
    mn: "СУДАЛГАА",
    en: "RESEARCH",
    links: [
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
    mn: "ХАРИЛЦАГЧИЙН ТУСЛАХ",
    en: "CUSTOMER SUPPORT",
    links: [
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
    mn: "ТОГТВОРТОЙ ХӨГЖИЛ",
    en: "SUSTAINABILITY",
    links: [
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
    mn: "БИДНИЙ ТУХАЙ",
    en: "ABOUT US",
    links: [
      { href: "#tanilcuulga", mn: "Танилцуулга", en: "Overview" },
      { href: "#udirdlaga", mn: "Удирдах албан тушаалтан", en: "Leadership" },
      { href: "#ololt", mn: "Ололт амжилт", en: "Achievements" },
      { href: "#tailan", mn: "Санхүүгийн тайлан", en: "Financial Reports" },
    ],
  },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <Image
              src="/logo.png"
              alt="«Нэйшнл сэкюритис ҮЦК» ХХК"
              width={495}
              height={109}
            />
            {/* Split out of the single run of text it used to be, so the
                phone and email are reachable from every page rather than
                only from Contact. */}
            <p>
              <T
                mn={
                  "«Нэйшнл сэкюритис ҮЦК» ХХК\nУлаанбаатар хот, Сүхбаатар дүүрэг,\nEco Tower, 9 давхарт 904"
                }
                en={
                  '"National Securities" LLC\nSukhbaatar District, Ulaanbaatar,\nEco Tower, 9th floor, Room 904'
                }
              />
            </p>
            <p className="fcontact">
              <span>
                <T mn="Утас:" en="Phone:" />{" "}
                {CONTACT.phones.map((phone, index) => (
                  <Fragment key={phone.dial}>
                    {index > 0 && ", "}
                    <a href={`tel:${phone.dial}`}>{phone.label}</a>
                  </Fragment>
                ))}
              </span>
              <span>
                <T mn="И-мэйл:" en="Email:" />{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </span>
            </p>
            <div className="soc">
              <PendingLink label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </PendingLink>
              <PendingLink label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.4 3H3.6C2.7 3 2 3.7 2 4.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V4.6c0-.9-.7-1.6-1.6-1.6zM8.1 19H5.3V9.7h2.8V19zM6.7 8.4a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zM19 19h-2.8v-4.5c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V19H10.2V9.7H13v1.3h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4V19z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </PendingLink>
            </div>
            <div className="fapps">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.9-.15 1.5-.87 3.02-.66 1.83.16 3.2.98 4.12 2.72-.02.01-2.46 1.44-2.43 4.29.03 3.35 2.94 4.47 2.98 4.48-.02.09-.47 1.62-1.75 3.13l-.02.21zM12.32 6.68c-.19-1.79 1.29-3.55 3.06-3.65.24 2.09-1.63 3.65-3.06 3.65z" />
                </svg>
                <span className="txt">
                  <small>
                    <T mn="Татах" en="Download on the" />
                  </small>
                  <b>App Store</b>
                </span>
              </a>
              <PendingLink
                label={t("Google Play — удахгүй", "Google Play — coming soon")}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3.6 2.2c-.4.4-.6.9-.6 1.6v16.4c0 .7.2 1.2.6 1.6l.1.1L13 12.6v-.2L3.7 2.1l-.1.1z" />
                  <path
                    d="M16.1 15.7l-3.1-3.1v-.2l3.1-3.1 3.5 2c1 .6 1 1.5 0 2.1l-3.5 2.3z"
                    fillOpacity=".7"
                  />
                  <path d="M16.1 15.7l-3.1-3.2L3.6 21.8c.4.4.9.4 1.6.1l10.9-6.2z" />
                  <path
                    d="M16.1 8.3L5.2 2.1c-.7-.3-1.2-.3-1.6.1l9.4 9.3 3.1-3.2z"
                    fillOpacity=".85"
                  />
                </svg>
                <span className="txt">
                  <small>
                    <T mn="Татах" en="Get it on" />
                  </small>
                  <b>Google Play</b>
                </span>
              </PendingLink>
            </div>
          </div>

          {/* The six link columns share one track, so the brand block keeps a
              readable measure instead of being squeezed to a seventh of the
              row alongside them. */}
          <div className="fcols">
            {COLUMNS.map((column) => (
              <div className="fcol" key={column.mn}>
                <h5>
                  <T mn={column.mn} en={column.en} />
                </h5>
                <ul>
                  {column.links.map((link) => (
                    <li key={`${link.href}-${link.mn}`}>
                      <a href={link.href}>
                        <T mn={link.mn} en={link.en} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="disclaim">
          <T
            mn="Үнэт цаасны арилжаанд оролцоход зах зээлийн эрсдэл дагалддаг бөгөөд хөрөнгө оруулалтын өнгөрсөн үр дүн ирээдүйн өгөөжийн баталгаа болохгүй. Энэ хуудсанд байрлуулсан зах зээлийн үзүүлэлт нь Монголын хөрөнгийн биржийн нийтэлсэн мэдээлэлд тулгуурласан лавлагаа мэдээлэл юм."
            en="Trading securities carries market risk, and past investment performance is no guarantee of future returns. The market figures shown on this page are reference data drawn from the Mongolian Stock Exchange's own published feed."
          />
        </div>

        <div className="fbot">
          <span>
            <T
              mn="© 2026 «Нэйшнл сэкюритис ҮЦК» ХХК."
              en="© 2026 National Securities LLC. All rights reserved."
            />
          </span>
          <span>
            <T
              mn="Санхүүгийн зохицуулах хорооны тусгай зөвшөөрөлтэй"
              en="Licensed by the Financial Regulatory Commission"
            />
          </span>
        </div>
      </div>
    </footer>
  );
}
