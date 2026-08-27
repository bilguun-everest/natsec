"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { Eyebrow, PendingLink, SecHead } from "@/components/ui";
import type { ResearchItem, WeeklyItem } from "@/lib/content";

const CATEGORY_LABEL: Record<ResearchItem["category"], { mn: string; en: string }> = {
  macro: { mn: "Макро орчин", en: "Macro" },
  securities: { mn: "Үнэт цаас", en: "Securities" },
  weekly: { mn: "7 хоног", en: "Weekly" },
};

/** An entry with no file yet stays inert rather than linking nowhere. */
function ItemLink({ href, children }: { href: string | null; children: React.ReactNode }) {
  if (!href) return <PendingLink>{children}</PendingLink>;
  return <a href={href}>{children}</a>;
}

export default function Research({
  research,
  weekly,
}: {
  research: ResearchItem[];
  weekly: WeeklyItem | null;
}) {
  // The heading promises three levels of analysis, so the list shows the most
  // recent of each rather than the three newest overall — which could all be
  // macro. The weekly slot points at the review page, not a PDF.
  const latestMacro = research.find((item) => item.category === "macro");
  const latestSecurities = research.find((item) => item.category === "securities");

  const highlights = [
    latestMacro && {
      key: `macro-${latestMacro.id}`,
      date: latestMacro.date,
      href: latestMacro.url,
      title: latestMacro.title,
      tag: CATEGORY_LABEL.macro,
    },
    latestSecurities && {
      key: `securities-${latestSecurities.id}`,
      date: latestSecurities.date,
      href: latestSecurities.url,
      title: latestSecurities.title,
      tag: CATEGORY_LABEL.securities,
    },
    weekly && {
      key: `weekly-${weekly.id}`,
      date: weekly.date,
      href: "#sudalgaa-toim",
      title: weekly.title,
      tag: CATEGORY_LABEL.weekly,
    },
  ].filter(Boolean) as {
    key: string;
    date: string;
    href: string | null;
    title: { mn: string; en: string };
    tag: { mn: string; en: string };
  }[];

  return (
    <section id="sudalgaa">
      <div className="wrap split">
        <div>
          <SecHead
            eyebrow={{ mn: "Судалгаа, шинжилгээ", en: "Research & Analysis" }}
            title={{ mn: "Гурван түвшний шинжилгээ", en: "Three levels of analysis" }}
            tight
          />
          {highlights.length === 0 ? (
            <p className="empty-note">
              <T
                mn="Судалгаа удахгүй нэмэгдэнэ."
                en="Research will be published here shortly."
              />
            </p>
          ) : (
            <ul className="nlist">
              {highlights.map((item, index) => (
                <Reveal as="li" key={item.key} delay={index * 80}>
                  <ItemLink href={item.href}>
                    <time>{item.date}</time>
                    <div>
                      <h4>
                        <T mn={item.title.mn} en={item.title.en} />
                      </h4>
                      <span className="tag">
                        <T mn={item.tag.mn} en={item.tag.en} />
                      </span>
                    </div>
                  </ItemLink>
                </Reveal>
              ))}
            </ul>
          )}
          {/* Still inert: there is no archive route yet, so this would have
              nowhere to land once the collection outgrows three highlights. */}
          <PendingLink className="more">
            <T mn="Бүх судалгаа" en="All research" /> →
          </PendingLink>
        </div>

        <Reveal className="rbox" delay={120}>
          <Eyebrow mn="Судалгаа" en="Research" />
          <h3>
            <T mn="Шинжээчийн тайлан" en="Analyst Reports" />
          </h3>
          <p>
            <T
              mn="Манай судалгааны баг сар бүр макро орчин, үнэт цаас, долоо хоногийн зах зээлийн тойм гаргадаг."
              en="Our research team publishes macro, securities, and weekly market reviews every month."
            />
          </p>
          {research.length === 0 ? (
            <p className="rlist-empty">
              <T mn="Тайлан удахгүй нэмэгдэнэ." en="Reports coming soon." />
            </p>
          ) : (
            <ul className="rlist">
              {research.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <ItemLink href={item.url}>
                    <span>
                      <T mn={item.title.mn} en={item.title.en} />
                    </span>
                    {item.size ? <span className="pdf">{item.size}</span> : null}
                  </ItemLink>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
