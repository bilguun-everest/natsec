"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { PendingLink, SecHead } from "@/components/ui";
import type { ReportItem } from "@/lib/content";

export default function Reports({ reports }: { reports: ReportItem[] }) {
  return (
    <section id="tailan">
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Ил тод байдал", en: "Disclosure" }}
          title={{ mn: "Санхүүгийн тайлан", en: "Financial Reports" }}
          lead={{
            mn: "Зохицуулагчийн шаардлагын дагуу нийтэлдэг, аудит хийгдсэн жил болон улирлын санхүүгийн тайлангууд.",
            en: "Our audited annual and quarterly financial statements, published in accordance with regulatory requirements.",
          }}
        />
        {reports.length === 0 ? (
          /* An empty disclosure section on a licensed broker's site is the one
             place a bare "coming soon" is actively costly — it reads as a firm
             with nothing to show. It says when they appear and offers the
             person who can send them in the meantime. */
          <Reveal className="empty-panel" delay={60}>
            <h4>
              <T
                mn="Тайлангууд удахгүй нийтлэгдэнэ"
                en="Statements are being published shortly"
              />
            </h4>
            <p>
              <T
                mn="Аудит хийгдсэн жилийн болон улирлын тайланг энэ хэсэгт татаж авах боломжтой болно. Тэр хүртэл хуулбарыг хүсвэл бидэнтэй холбогдоно уу."
                en="Audited annual and quarterly statements will be available to download here. Until then, contact us if you would like a copy."
              />
            </p>
            <a className="more" href="#holboo-barih">
              <T mn="Холбоо барих" en="Contact us" /> →
            </a>
          </Reveal>
        ) : (
          <ul className="report-list" style={{ maxWidth: 640 }}>
            {reports.map((report, index) => (
              <Reveal as="li" className="report-row" key={report.id} delay={index * 70}>
                <div>
                  <span className="name">
                    <T mn={report.title.mn} en={report.title.en} />
                  </span>
                  <span className="yr">{report.year}</span>
                </div>
                {report.url ? (
                  <a className="dl" href={report.url} download>
                    <T mn="Татах ↓" en="Download ↓" />
                  </a>
                ) : (
                  <PendingLink className="dl">
                    <T mn="Татах ↓" en="Download ↓" />
                  </PendingLink>
                )}
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
