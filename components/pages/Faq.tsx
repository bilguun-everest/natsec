"use client";

import { A, T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { SecHead } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { FAQ } from "@/lib/faq";

/**
 * The full question list on its own page. The guides page carries the same
 * links in a side rail, but Customer Support needs somewhere of its own to
 * point at — a menu item that lands mid-way down another section's page is
 * exactly the sort of guesswork this menu is meant to remove.
 */
export default function Faq() {
  return (
    <section id="faq">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <SecHead
          eyebrow={{ mn: "Харилцагчийн туслах", en: "Customer Support", ja: "サポート" }}
          title={{
            mn: "Түгээмэл асуулт хариулт",
            en: "Frequently asked questions", ja: "よくあるご質問",
          }}
          lead={{
            mn: "Хамгийн олон асуудаг асуултын товч хариултууд.",
            en: "Quick answers to the questions we hear most often.", ja: "お問い合わせの多いご質問に、手短にお答えします。",
          }}
          style={{ marginBottom: 26 }}
        />

        <Reveal className="faq-box" delay={60}>
          {FAQ.map((entry) => (
            <A className="faq-tile" href={`/${entry.route}/`} key={entry.route}>
              <span className="q">
                <T mn={entry.question.mn} en={entry.question.en} ja={entry.question.ja} />
              </span>
              <span className="arrow">→</span>
            </A>
          ))}
        </Reveal>

        <Reveal className="notice-box" style={{ marginTop: 24 }} delay={100}>
          <h5>
            <T mn="Асуултаа олсонгүй юу?" en="Still have a question?" ja="まだご不明な点がありますか？" />
          </h5>
          <p>
            <T
              mn={`Манай харилцагчийн үйлчилгээний баг ${CONTACT.phones[0].label} утсаар болон ${CONTACT.email} хаягаар таны асуултад хариулахад бэлэн байна.`}
              en={`Our client services team is on ${CONTACT.phones[0].label} and ${CONTACT.email}, ready to help.`}
              ja={`カスタマーサービスチームが ${CONTACT.phones[0].label}、${CONTACT.email} にてご質問にお答えします。`}
            />
          </p>
          <A href="/holboo-barih/" className="btn btn-o" style={{ marginTop: 14 }}>
            <T mn="Холбоо барих" en="Contact us" ja="お問い合わせ" />
          </A>
        </Reveal>
      </div>
    </section>
  );
}
