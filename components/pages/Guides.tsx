"use client";

import { A, T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { SecHead } from "@/components/ui";
import { GUIDES } from "@/lib/guides";

/**
 * One column, not two. The right rail used to repeat the whole FAQ list, which
 * is a page of its own under the same menu — so the guides now have the full
 * measure and the tiles run three up instead of two.
 */
export default function Guides() {
  return (
    <section id="zaavar">
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Хэрхэн эхлэх", en: "Getting Started", ja: "はじめに" }}
          title={{ mn: "Алхам алхмаар заавар", en: "Step-by-step guides", ja: "ステップごとのガイド" }}
          lead={{
            mn: "Данс нээхээс эхлээд арилжаанд оролцох, ногдол ашиг авах хүртэл танд хэрэгтэй бүх зүйл.",
            en: "Everything you need, from opening an account to trading and receiving your dividends.", ja: "口座開設から取引、配当の受け取りまで、必要なことをすべて。",
          }}
          style={{ marginBottom: 22 }}
        />

        <div className="guide-tiles">
          {GUIDES.map((guide, index) => (
            <Reveal
              as={A}
              className="guide-tile"
              href={`/${guide.route}/`}
              key={guide.route}
              delay={index * 70}
            >
              <div className="num">{guide.num}</div>
              <div>
                <h4>
                  <T mn={guide.title.mn} en={guide.title.en} ja={guide.title.ja} />
                </h4>
                <span className="teaser">
                  <T mn={guide.teaser.mn} en={guide.teaser.en} ja={guide.teaser.ja} />
                </span>
              </div>
              <span className="arrow">→</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="bank-box" style={{ marginTop: 24 }} delay={80}>
          <div className="bank-note">
            <T
              mn="Мөн түүнчлэн таны эзэмшиж буй үнэт цаасыг шилжүүлэх, бусдад бэлэглэх, өв залгамжлуулах, дансандаа итгэмжлэгч томилох зэрэг холбогдох үйлчилгээг үзүүлнэ."
              en="In addition, we support related account services such as transferring, gifting, and inheriting securities you hold, as well as setting up power of attorney over your account."
              ja="このほか、保有証券の名義変更・贈与・相続、口座に関する委任状の設定など、関連する口座サービスにも対応しています。"
            />
          </div>
        </Reveal>

        <Reveal className="notice-box" style={{ marginTop: 24 }}>
          <h5>
            <T mn="Хариуцлагатай арилжаа хийх" en="Trade responsibly" ja="責任ある取引を" />
          </h5>
          <p>
            <T
              mn="Үнэт цаасны зах зээл нь зохицуулалттай бөгөөд зах зээлийг урвуулан ашиглахаас сэргийлсэн хууль зүйн болон хяналтын тогтолцоотой байдаг. Онлайнаар арилжаанд оролцохдоо үнэт цаасны ханшид зохиомлоор нөлөөлөхгүй, зах зээлийг урвуулан ашиглах ямар нэгэн үйлдэл хийхгүй байхыг анхаарна уу."
              en="The securities market is regulated, with legal and oversight mechanisms in place to prevent market abuse. When trading online, please make sure not to artificially influence security prices or engage in any form of market manipulation."
              ja="証券市場は法令と監督の枠組みのもとで運営されており、市場の濫用を防ぐ仕組みが整えられています。オンラインで取引される際は、証券価格を人為的に動かす行為や、いかなる形の相場操縦も行わないようご注意ください。"
            />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
