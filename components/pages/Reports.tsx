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
          eyebrow={{ mn: "Бидний тухай", en: "About Us" }}
          title={{ mn: "Санхүүгийн тайлан", en: "Financial Reports" }}
          lead={{
            mn: "Зохицуулагчийн шаардлагын дагуу нийтэлдэг, аудит хийгдсэн жил болон улирлын санхүүгийн тайлангууд.",
            en: "Our audited annual and quarterly financial statements, published in accordance with regulatory requirements.",
          }}
        />
        {reports.length === 0 ? (
          <p className="empty-note">
            <T
              mn="Тайлан удахгүй нэмэгдэнэ."
              en="Reports will be published here shortly."
            />
          </p>
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
