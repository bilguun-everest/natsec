"use client";

import { A, T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { Eyebrow, PendingLink, SecHead } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import type { ResearchItem } from "@/lib/content";

/** An entry with no file yet stays inert rather than linking nowhere. */
function ItemLink({ href, children }: { href: string | null; children: React.ReactNode }) {
  if (!href) return <PendingLink>{children}</PendingLink>;
  return <A href={href}>{children}</A>;
}

/**
 * Securities research — the one thing this section publishes.
 *
 * It promised three levels of analysis and listed the newest of each: macro,
 * securities, and a weekly review with a page of its own. Two of those three
 * had nothing behind them and no plan to fill them, so the heading was writing
 * cheques the list could not cash. What is left is a single dated list, empty
 * until the first report is published and honest about it while it is.
 */
export default function Research({ research }: { research: ResearchItem[] }) {
  return (
    <section id="sudalgaa">
      <div className="wrap split">
        <div>
          <SecHead
            eyebrow={{ mn: "Судалгаа, шинжилгээ", en: "Research & Analysis" }}
            title={{ mn: "Үнэт цаасны судалгаа", en: "Securities Research" }}
            lead={{
              mn: "Бирж дээр бүртгэлтэй компаниудын үнэлгээ, салбарын шинжилгээг PDF хэлбэрээр нийтэлнэ.",
              en: "Valuations of listed companies and sector analysis, published as PDFs.",
            }}
            style={{ marginBottom: 22 }}
          />
          {research.length === 0 ? (
            <p className="empty-note">
              <T
                mn="Эхний судалгаа удахгүй энд нийтлэгдэнэ."
                en="The first report will be published here shortly."
              />
            </p>
          ) : (
            <ul className="nlist">
              {research.map((item, index) => (
                <Reveal as="li" key={item.id} delay={index * 80}>
                  <ItemLink href={item.url}>
                    <time>{item.date}</time>
                    <div>
                      <h4>
                        <T mn={item.title.mn} en={item.title.en} />
                      </h4>
                      {item.size ? <span className="tag">{item.size}</span> : null}
                    </div>
                  </ItemLink>
                </Reveal>
              ))}
            </ul>
          )}
        </div>

        <Reveal className="rbox" delay={120}>
          <Eyebrow mn="Судалгаа" en="Research" />
          <h3>
            <T mn="Шинжээчийн тайлан" en="Analyst Reports" />
          </h3>
          <p>
            <T
              mn="Тодорхой компани, салбарын талаар шинжилгээ хүсэх бол брокертойгоо шууд холбогдоно уу."
              en="To request analysis of a particular company or sector, talk to your broker directly."
            />
          </p>
          <ul className="rlist">
            <li>
              <A href={`tel:${CONTACT.phones[0].dial}`}>
                <span>{CONTACT.phones[0].label}</span>
              </A>
            </li>
            <li>
              <A href={`mailto:${CONTACT.email}`}>
                <span>{CONTACT.email}</span>
              </A>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
