"use client";

import { T } from "@/components/lang";
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
      <div className="wrap wrap-narrow">
        <SecHead
          eyebrow={{ mn: "Харилцагчийн туслах", en: "Customer Support" }}
          title={{
            mn: "Түгээмэл асуулт хариулт",
            en: "Frequently asked questions",
          }}
          lead={{
            mn: "Хамгийн олон асуудаг асуултын товч хариултууд.",
            en: "Quick answers to the questions we hear most often.",
          }}
          tight
        />

        <Reveal className="faq-box" delay={60}>
          {FAQ.map((entry) => (
            <a className="faq-tile" href={`#${entry.route}`} key={entry.route}>
              <span className="q">
                <T mn={entry.question.mn} en={entry.question.en} />
              </span>
              <span className="arrow">→</span>
            </a>
          ))}
        </Reveal>

        <Reveal className="notice-box" delay={100}>
          <h5>
            <T mn="Асуултаа олсонгүй юу?" en="Still have a question?" />
          </h5>
          <p>
            <T
              mn={`Манай харилцагчийн үйлчилгээний баг ${CONTACT.phones[0].label} утсаар болон ${CONTACT.email} хаягаар таны асуултад хариулахад бэлэн байна.`}
              en={`Our client services team is on ${CONTACT.phones[0].label} and ${CONTACT.email}, ready to help.`}
            />
          </p>
          <a href="#holboo-barih" className="btn btn-o">
            <T mn="Холбоо барих" en="Contact us" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
