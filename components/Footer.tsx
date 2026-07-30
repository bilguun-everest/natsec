"use client";

import Image from "next/image";
import { T, useLang } from "@/components/lang";

const COLUMNS: {
  mn: string;
  en: string;
  links: { href: string; mn: string; en: string }[];
}[] = [
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
      { href: "#zaavar", mn: "Заавар", en: "Guides" },
      {
        href: "#zaavar-mungu",
        mn: "Мөнгө байршуулах, татах",
        en: "Deposits & Withdrawals",
      },
      {
        href: "#zaavar-nogdol",
        mn: "Ногдол ашиг авах",
        en: "Receiving Dividends",
      },
      { href: "#holboo-barih", mn: "Холбоо барих", en: "Contact" },
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
      {
        href: "#tog-hugjil-terms",
        mn: "Үйлчилгээний нөхцөл",
        en: "Terms of Service",
      },
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
              width={765}
              height={158}
            />
            <p>
              <T
                mn={
                  "«Нэйшнл сэкюритис ҮЦК» ХХК\nУлаанбаатар хот, Сүхбаатар дүүрэг,\nEco Tower, 9 давхарт 904\n\nУтас: 7709 7070, 7706 707\nИ-мэйл: info@natsec.mn"
                }
                en={
                  '"National Securities" LLC\nSukhbaatar District, Ulaanbaatar,\nEco Tower, 9th floor, Room 904\n\nPhone: 7709 7070, 7706 707\nEmail: info@natsec.mn'
                }
              />
            </p>
            <div className="soc">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24">
                  <path d="M20.4 3H3.6C2.7 3 2 3.7 2 4.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V4.6c0-.9-.7-1.6-1.6-1.6zM8.1 19H5.3V9.7h2.8V19zM6.7 8.4a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zM19 19h-2.8v-4.5c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V19H10.2V9.7H13v1.3h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4V19z" />
                </svg>
              </a>
            </div>
            <div className="fapps">
              <a
                href="#"
                aria-label={t(
                  "App Store-оос татах",
                  "Download on the App Store",
                )}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.9-.15 1.5-.87 3.02-.66 1.83.16 3.2.98 4.12 2.72-.02.01-2.46 1.44-2.43 4.29.03 3.35 2.94 4.47 2.98 4.48-.02.09-.47 1.62-1.75 3.13l-.02.21zM12.32 6.68c-.19-1.79 1.29-3.55 3.06-3.65.24 2.09-1.63 3.65-3.06 3.65z" />
                </svg>
                <span className="txt">
                  <small>
                    <T mn="Татах" en="Download on the" />
                  </small>
                  <b>App Store</b>
                </span>
              </a>
              <a
                href="#"
                aria-label={t("Google Play-ээс татах", "Get it on Google Play")}
              >
                <svg viewBox="0 0 24 24">
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
              </a>
            </div>
          </div>

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

        <div className="fbot">
          <span>
            <T
              mn="© 2026 «Нэйшнл сэкюритис ҮЦК» ХХК. Бүх эрх хуулиар хамгаалагдсан."
              en="© 2026 National Securities LLC. All rights reserved."
            />
          </span>
        </div>
      </div>
    </footer>
  );
}
