"use client";

import { A, T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { PendingLink, SecHead } from "@/components/ui";
import type { ReportItem } from "@/lib/content";

export default function Reports({ reports }: { reports: ReportItem[] }) {
  return (
    <section id="tailan">
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Ил тод байдал", en: "Disclosure", ja: "情報開示" }}
          title={{ mn: "Санхүүгийн тайлан", en: "Financial Reports", ja: "財務報告" }}
          lead={{
            mn: "Зохицуулагчийн шаардлагын дагуу нийтэлдэг, аудит хийгдсэн жил болон улирлын санхүүгийн тайлангууд.",
            en: "Our audited annual and quarterly financial statements, published in accordance with regulatory requirements.", ja: "規制上の要件に従って公表している、監査済みの年次・四半期財務諸表です。",
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
                ja="財務諸表は近日公開します"
              />
            </h4>
            <p>
              <T
                mn="Аудит хийгдсэн жилийн болон улирлын тайланг энэ хэсэгт татаж авах боломжтой болно. Тэр хүртэл хуулбарыг хүсвэл бидэнтэй холбогдоно уу."
                en="Audited annual and quarterly statements will be available to download here. Until then, contact us if you would like a copy."
                ja="監査済みの年次・四半期財務諸表をこちらからダウンロードいただけるようになります。それまでの間、写しをご希望の方はお問い合わせください。"
              />
            </p>
            <A className="more" href="/holboo-barih/">
              <T mn="Холбоо барих" en="Contact us" ja="お問い合わせ" /> →
            </A>
          </Reveal>
        ) : (
          <ul className="report-list" style={{ maxWidth: 640 }}>
            {reports.map((report, index) => (
              <Reveal as="li" className="report-row" key={report.id} delay={index * 70}>
                <div>
                  <span className="name">
                    <T mn={report.title.mn} en={report.title.en} ja={report.title.ja} />
                  </span>
                  <span className="yr">{report.year}</span>
                </div>
                {report.url ? (
                  <A className="dl" href={report.url} download>
                    <T mn="Татах ↓" en="Download ↓" ja="ダウンロード ↓" />
                  </A>
                ) : (
                  <PendingLink className="dl">
                    <T mn="Татах ↓" en="Download ↓" ja="ダウンロード ↓" />
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
