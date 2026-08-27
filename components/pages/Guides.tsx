"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { Eyebrow, SecHead } from "@/components/ui";
import { FAQ } from "@/lib/faq";
import { GUIDES } from "@/lib/guides";

export default function Guides() {
  return (
    <section id="zaavar">
      <div className="wrap split">
        <div>
          <SecHead
            eyebrow={{ mn: "Хэрхэн эхлэх", en: "Getting Started" }}
            title={{ mn: "Алхам алхмаар заавар", en: "Step-by-step guides" }}
            lead={{
              mn: "Данс нээхээс эхлээд арилжаанд оролцох, ногдол ашиг авах хүртэл танд хэрэгтэй бүх зүйл.",
              en: "Everything you need, from opening an account to trading and receiving your dividends.",
            }}
            style={{ marginBottom: 22 }}
          />

          <div className="guide-tiles">
            {GUIDES.map((guide, index) => (
              <Reveal
                as="a"
                className="guide-tile"
                href={`#${guide.route}`}
                key={guide.route}
                delay={index * 70}
              >
                <div className="num">{guide.num}</div>
                <div>
                  <h4>
                    <T mn={guide.title.mn} en={guide.title.en} />
                  </h4>
                  <span className="teaser">
                    <T mn={guide.teaser.mn} en={guide.teaser.en} />
                  </span>
                </div>
                <span className="arrow">→</span>
              </Reveal>
            ))}
          </div>

          <Reveal className="bank-box" style={{ marginTop: 24 }} delay={80}>
            <div
              style={{
                fontSize: "13.5px",
                color: "var(--ink)",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              <T
                mn="Мөн түүнчлэн таны эзэмшиж буй үнэт цаасыг шилжүүлэх, бусдад бэлэглэх, өв залгамжлуулах, дансандаа итгэмжлэгч томилох зэрэг холбогдох үйлчилгээг үзүүлнэ."
                en="In addition, we support related account services such as transferring, gifting, and inheriting securities you hold, as well as setting up power of attorney over your account."
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="faq-box" delay={120}>
          <Eyebrow mn="Түгээмэл асуулт" en="FAQ" />
          <h3>
            <T mn="Түгээмэл асуулт хариулт" en="Frequently Asked Questions" />
          </h3>
          <p>
            <T
              mn="Хамгийн олон асуудаг асуултын товч хариултууд."
              en="Quick answers to the questions we hear most often."
            />
          </p>
          {FAQ.map((entry) => (
            <a className="faq-tile" href={`#${entry.route}`} key={entry.route}>
              <span className="q">
                <T mn={entry.question.mn} en={entry.question.en} />
              </span>
              <span className="arrow">→</span>
            </a>
          ))}
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal className="notice-box">
          <h5>
            <T mn="Хариуцлагатай арилжаа хийх" en="Trade responsibly" />
          </h5>
          <p>
            <T
              mn="Үнэт цаасны зах зээл нь зохицуулалттай бөгөөд зах зээлийг урвуулан ашиглахаас сэргийлсэн хууль зүйн болон хяналтын тогтолцоотой байдаг. Онлайнаар арилжаанд оролцохдоо үнэт цаасны ханшид зохиомлоор нөлөөлөхгүй, зах зээлийг урвуулан ашиглах ямар нэгэн үйлдэл хийхгүй байхыг анхаарна уу."
              en="The securities market is regulated, with legal and oversight mechanisms in place to prevent market abuse. When trading online, please make sure not to artificially influence security prices or engage in any form of market manipulation."
            />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
