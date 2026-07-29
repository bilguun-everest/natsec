"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { SecHead } from "@/components/ui";

const REPORTS: { mn: string; en: string; year: string }[] = [
  {
    mn: "Жилийн санхүүгийн тайлан",
    en: "Annual Financial Statement",
    year: "2025",
  },
  {
    mn: "4-р улирлын санхүүгийн тайлан",
    en: "Q4 Financial Statement",
    year: "2025",
  },
  {
    mn: "3-р улирлын санхүүгийн тайлан",
    en: "Q3 Financial Statement",
    year: "2025",
  },
  {
    mn: "Жилийн санхүүгийн тайлан",
    en: "Annual Financial Statement",
    year: "2024",
  },
];

export default function Reports() {
  return (
    <section id="tailan">
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Бидний тухай", en: "About Us" }}
          title={{ mn: "Санхүүгийн тайлан", en: "Financial Reports" }}
          lead={{
            mn: "Зохицуулагчийн шаардлагын дагуу нийтэлдэг, аудит хийгдсэн жил болон улирлын санхүүгийн тайлангууд.",
            en: "Our audited annual and quarterly financial statements, published in accordance with regulatory requirements.",
          }}
        />
        <ul className="report-list" style={{ maxWidth: 640 }}>
          {REPORTS.map((report, index) => (
            <Reveal
              as="li"
              className="report-row"
              key={`${report.mn}-${report.year}`}
              delay={index * 70}
            >
              <div>
                <span className="name">
                  <T mn={report.mn} en={report.en} />
                </span>
                <span className="yr">{report.year}</span>
              </div>
              <a href="#" className="dl">
                <T mn="Татах ↓" en="Download ↓" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
