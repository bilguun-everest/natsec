"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { Eyebrow, PendingLink, SecHead } from "@/components/ui";

const ARTICLES: {
  date: string;
  href: string;
  title: { mn: string; en: string };
  tag: { mn: string; en: string };
}[] = [
  {
    date: "2026.07.20",
    href: "#",
    title: {
      mn: "Макро орчны судалгаа — инфляци, бодлогын хүү, төсвийн тэнцэл",
      en: "Macro research — inflation, policy rate, fiscal balance",
    },
    tag: { mn: "Макро орчин", en: "Macro" },
  },
  {
    date: "2026.07.14",
    href: "#",
    title: {
      mn: "Үнэт цаасны судалгаа — компани тус бүрийн үнэлгээ, зорилтот үнэ",
      en: "Securities research — company valuations, target prices",
    },
    tag: { mn: "Үнэт цаас", en: "Securities" },
  },
  {
    date: "2026.07.22",
    href: "#sudalgaa-toim",
    title: {
      mn: "Долоо хоногийн тойм — арилжааны идэвх, гол хөдөлгөөн",
      en: "Weekly review — trading activity, key movements",
    },
    tag: { mn: "7 хоног", en: "Weekly" },
  },
];

const REPORTS: { mn: string; en: string; size: string }[] = [
  {
    mn: "Монголын эдийн засгийн макро орчны тойм",
    en: "Mongolia's macroeconomic review",
    size: "PDF · 2.1MB",
  },
  {
    mn: "МХБ-д бүртгэлтэй компаниудын үнэт цаасны судалгаа",
    en: "Securities research on MSE-listed companies",
    size: "PDF · 1.6MB",
  },
  {
    mn: "Бондын зах зээлийн өгөөжийн муруй",
    en: "Bond market yield curve",
    size: "PDF · 940KB",
  },
  {
    mn: "Долоо хоногийн тойм — 07/22",
    en: "Weekly review — 07/22",
    size: "PDF · 620KB",
  },
];

/** Two of the three research items have no page yet; the weekly review does. */
function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href === "#") return <PendingLink>{children}</PendingLink>;
  return <a href={href}>{children}</a>;
}

export default function Research() {
  return (
    <section id="sudalgaa">
      <div className="wrap split">
        <div>
          <SecHead
            eyebrow={{ mn: "Судалгаа, шинжилгээ", en: "Research & Analysis" }}
            title={{ mn: "Гурван түвшний шинжилгээ", en: "Three levels of analysis" }}
            style={{ marginBottom: 22 }}
          />
          <ul className="nlist">
            {ARTICLES.map((article, index) => (
              <Reveal as="li" key={article.title.mn} delay={index * 80}>
                <ArticleLink href={article.href}>
                  <time>{article.date}</time>
                  <div>
                    <h4>
                      <T mn={article.title.mn} en={article.title.en} />
                    </h4>
                    <span className="tag">
                      <T mn={article.tag.mn} en={article.tag.en} />
                    </span>
                  </div>
                </ArticleLink>
              </Reveal>
            ))}
          </ul>
          <PendingLink
            className="more"
            label={undefined}
          >
            <T mn="Бүх судалгаа →" en="All research →" />
          </PendingLink>
        </div>

        <Reveal className="rbox" delay={120}>
          <Eyebrow mn="Судалгаа" en="Research" style={{ color: "#48BEE6" }} />
          <h3>
            <T mn="Шинжээчийн тайлан" en="Analyst Reports" />
          </h3>
          <p>
            <T
              mn="Манай судалгааны баг сар бүр макро орчин, үнэт цаас, долоо хоногийн зах зээлийн тойм гаргадаг."
              en="Our research team publishes macro, securities, and weekly market reviews every month."
            />
          </p>
          <ul className="rlist">
            {REPORTS.map((report) => (
              <li key={report.mn}>
                <PendingLink>
                  <span>
                    <T mn={report.mn} en={report.en} />
                  </span>
                  <span className="pdf">{report.size}</span>
                </PendingLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
