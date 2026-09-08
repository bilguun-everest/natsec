"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { List, SecHead } from "@/components/ui";

export default function Underwriter() {
  return (
    <div className="band">
      <section id="anderraiter" style={{ padding: "72px 0" }}>
        <div className="wrap">
          <SecHead
            eyebrow={{ mn: "Үйлчилгээ", en: "Services", ja: "サービス" }}
            title={{ mn: "Андеррайтер", en: "Underwriting", ja: "引受業務" }}
            lead={{
              mn: "Компанийн үнэт цаасны зах зээл дэх санхүүжилтийн бүх үйл явцыг хариуцна.",
              en: "We manage the full process of raising capital for companies through the securities market.", ja: "企業が証券市場を通じて資金を調達するまでの全過程を担います。",
            }}
          />
          <div className="subsvc-grid">
            <Reveal className="subsvc-card">
              <span className="tag">IPO / FPO</span>
              <h4>
                <T
                  mn="Хувьцааны санхүүжилт (IPO, FPO)"
                  en="Equity Financing (IPO, FPO)"
                  ja="株式による資金調達（IPO・FPO）"
                />
              </h4>
              <p>
                <T
                  mn="Анх удаа олон нийтэд хувьцаагаа санал болгох (IPO) эсвэл нэмэлт хувьцаа гаргах (FPO) замаар санхүүжилт татахыг хүсэж буй компаниудад бүтэц зохион байгуулалт, үнэлгээнээс эхлээд Монголын Хөрөнгийн Биржид бүртгүүлэх хүртэлх бүх шатанд дэмжлэг үзүүлнэ."
                  en="We support companies looking to raise capital by offering shares to the public for the first time (IPO) or issuing additional shares (FPO) — from structuring and valuation through to listing on the Mongolian Stock Exchange."
                  ja="初めて株式を公開する企業（IPO）や、追加で株式を発行する企業（FPO）の資金調達を、設計・評価からモンゴル証券取引所への上場まで一貫して支援します。"
                />
              </p>
              <List
                items={[
                  {
                    mn: "Компани, хөрөнгийн бүтцийн үнэлгээ",
                    en: "Company & capital structure assessment", ja: "企業・資本構成の評価",
                  },
                  {
                    mn: "Бүртгэлийн бичиг баримт бэлтгэх",
                    en: "Listing document preparation", ja: "上場書類の作成",
                  },
                  {
                    mn: "Хөрөнгө оруулагч татах, захиалга зохион байгуулах",
                    en: "Investor outreach & subscription management", ja: "投資家への働きかけと申込管理",
                  },
                ]}
              />
            </Reveal>

            <Reveal className="subsvc-card" delay={110}>
              <span className="tag">
                <T mn="БОНД" en="BONDS" ja="社債" />
              </span>
              <h4>
                <T mn="Бондын санхүүжилт" en="Bond Financing" ja="社債による資金調達" />
              </h4>
              <p>
                <T
                  mn="Өрийн санхүүжилт татахыг хүсэж буй компаниудад нээлттэй болон хаалттай зах зээлд бонд гаргах ажлыг зохион байгуулна — бүтэц, хүүгийн хэмжээ, хугацааг тодорхойлж, хөрөнгө оруулагчдад байршуулна."
                  en="For companies seeking debt financing, we arrange bond issuances on the open or closed market — determining structure, coupon rate, and maturity, and placing the bond with investors."
                  ja="負債による資金調達をお考えの企業向けに、公募または私募での社債発行を組成します。構成、クーポン利率、償還期間を決定し、投資家に販売します。"
                />
              </p>
              <List
                items={[
                  {
                    mn: "Нээлттэй, хаалттай зах зээлийн бонд гаргалт",
                    en: "Open & closed market bond issuance", ja: "公募・私募による社債発行",
                  },
                  {
                    mn: "Хүү, хугацааны бүтэц тодорхойлох",
                    en: "Coupon & maturity structuring", ja: "クーポンと償還期間の設計",
                  },
                  { mn: "Хөрөнгө оруулагчдад байршуулах", en: "Investor placement", ja: "投資家への販売" },
                ]}
              />
              <p style={{ marginTop: 14, fontSize: "12.5px" }}>
                <T
                  mn="Тэмдэглэл: бондын төрлөөс хамааран хүүгийн орлогын албан татвар ялгаатай — ихэвчлэн нээлттэй бондод 5%, хаалттай бондод 10%, мөн хаалттай бондод голцуу мэргэжлийн хөрөнгө оруулагч оролцох шаардлагатай байдаг."
                  en="Note: interest income tax differs by bond type — generally 5% for open-market bonds versus 10% for closed-market bonds, and closed bonds are typically limited to professional investors."
                  ja="注：利息所得税は社債の種類によって異なり、公募債は概ね5%、私募債は10%です。また私募債は通常、プロ投資家に限定されます。"
                />
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
