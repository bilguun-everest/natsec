"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { List, SecHead } from "@/components/ui";

export default function Advisory() {
  return (
    <section id="zuvluh" style={{ padding: "72px 0" }}>
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Үйлчилгээ", en: "Services", ja: "サービス" }}
          title={{
            mn: "Хөрөнгө оруулалтын зөвлөгөө",
            en: "Investment Advisory", ja: "投資助言",
          }}
          lead={{
            mn: "Хувь хүн болон компанийн зорилгод тохирсон багц, санхүүжилтийн зөвлөгөө.",
            en: "Portfolio and financing advice tailored to your goals, for both individuals and companies.", ja: "個人・法人それぞれの目標に合わせた、ポートフォリオと資金調達の助言。",
          }}
        />
        <div className="subsvc-grid">
          <Reveal className="subsvc-card">
            <span className="tag">
              <T mn="ЗӨВЛӨГӨӨ" en="ADVISORY" ja="アドバイザリー" />
            </span>
            <h4>
              <T mn="Зөвлөх үйлчилгээ" en="Advisory Services" ja="アドバイザリー業務" />
            </h4>
            <p>
              <T
                mn="Таны эрсдэл даах чадвар, зорилгод тулгуурлан хөрөнгө оруулалтын багц бүрдүүлж, тогтмол хянана; мөн компаниудад хөрөнгийн бүтэц, өргөжилт, өөрчлөн байгуулалтын талаар зөвлөгөө өгнө."
                en="We assess your risk tolerance and goals to build and continuously monitor an investment portfolio, and advise companies on capital structure, expansion, and restructuring."
                ja="お客様のリスク許容度と目標を評価して投資ポートフォリオを構築し、継続的にモニタリングします。企業には資本構成、事業拡大、組織再編について助言します。"
              />
            </p>
            <List
              items={[
                {
                  mn: "Багц бүрдүүлэлт, хяналт",
                  en: "Portfolio construction & monitoring", ja: "ポートフォリオの構築とモニタリング",
                },
                { mn: "Эрсдэлийн үнэлгээ", en: "Risk assessment", ja: "リスク評価" },
                { mn: "Байгууллагын зөвлөгөө", en: "Corporate advisory", ja: "企業向けアドバイザリー" },
              ]}
            />
          </Reveal>

          <Reveal className="subsvc-card" delay={110}>
            <span className="tag">
              <T mn="САНХҮҮЖИЛТ" en="FINANCING" ja="ファイナンス" />
            </span>
            <h4>
              <T mn="Хувийн санхүүжилт" en="Personal Financing" ja="個人向け資金計画" />
            </h4>
            <p>
              <T
                mn="Хувь хүн харилцагчдад орлого, хугацаа, санхүүгийн зорилгод нь тохирсон үнэт цаасны хослолыг тодорхойлж, хувийн хөрөнгө оруулалтын санхүүжилтээ төлөвлөх, бүтэцжүүлэхэд нь туслана."
                en="We help individual clients plan and structure their personal investment financing, matching the right mix of securities to their income, timeline, and financial goals."
                ja="個人のお客様の投資資金の計画と設計をお手伝いし、収入・投資期間・目標に見合った証券の組み合わせをご提案します。"
              />
            </p>
            <List
              items={[
                {
                  mn: "Хувийн хөрөнгө оруулалтын төлөвлөгөө",
                  en: "Personal investment planning", ja: "個人の投資設計",
                },
                {
                  mn: "Зорилгод суурилсан санхүүжилтийн бүтэц",
                  en: "Goal-based financing structure", ja: "目標に応じた資金調達の設計",
                },
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
