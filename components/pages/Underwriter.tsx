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
            eyebrow={{ mn: "Үйлчилгээ", en: "Services" }}
            title={{ mn: "Андеррайтер", en: "Underwriting" }}
            lead={{
              mn: "Компанийн үнэт цаасны зах зээл дэх санхүүжилтийн бүх үйл явцыг хариуцна.",
              en: "We manage the full process of raising capital for companies through the securities market.",
            }}
          />
          <div className="subsvc-grid">
            <Reveal className="subsvc-card">
              <span className="tag">IPO / FPO</span>
              <h4>
                <T
                  mn="Хувьцааны санхүүжилт (IPO, FPO)"
                  en="Equity Financing (IPO, FPO)"
                />
              </h4>
              <p>
                <T
                  mn="Анх удаа олон нийтэд хувьцаагаа санал болгох (IPO) эсвэл нэмэлт хувьцаа гаргах (FPO) замаар санхүүжилт татахыг хүсэж буй компаниудад бүтэц зохион байгуулалт, үнэлгээнээс эхлээд Монголын Хөрөнгийн Биржид бүртгүүлэх хүртэлх бүх шатанд дэмжлэг үзүүлнэ."
                  en="We support companies looking to raise capital by offering shares to the public for the first time (IPO) or issuing additional shares (FPO) — from structuring and valuation through to listing on the Mongolian Stock Exchange."
                />
              </p>
              <List
                items={[
                  {
                    mn: "Компани, хөрөнгийн бүтцийн үнэлгээ",
                    en: "Company & capital structure assessment",
                  },
                  {
                    mn: "Бүртгэлийн бичиг баримт бэлтгэх",
                    en: "Listing document preparation",
                  },
                  {
                    mn: "Хөрөнгө оруулагч татах, захиалга зохион байгуулах",
                    en: "Investor outreach & subscription management",
                  },
                ]}
              />
            </Reveal>

            <Reveal className="subsvc-card" delay={110}>
              <span className="tag">
                <T mn="БОНД" en="BONDS" />
              </span>
              <h4>
                <T mn="Бондын санхүүжилт" en="Bond Financing" />
              </h4>
              <p>
                <T
                  mn="Өрийн санхүүжилт татахыг хүсэж буй компаниудад нээлттэй болон хаалттай зах зээлд бонд гаргах ажлыг зохион байгуулна — бүтэц, хүүгийн хэмжээ, хугацааг тодорхойлж, хөрөнгө оруулагчдад байршуулна."
                  en="For companies seeking debt financing, we arrange bond issuances on the open or closed market — determining structure, coupon rate, and maturity, and placing the bond with investors."
                />
              </p>
              <List
                items={[
                  {
                    mn: "Нээлттэй, хаалттай зах зээлийн бонд гаргалт",
                    en: "Open & closed market bond issuance",
                  },
                  {
                    mn: "Хүү, хугацааны бүтэц тодорхойлох",
                    en: "Coupon & maturity structuring",
                  },
                  { mn: "Хөрөнгө оруулагчдад байршуулах", en: "Investor placement" },
                ]}
              />
              <p style={{ marginTop: 14, fontSize: "12.5px" }}>
                <T
                  mn="Тэмдэглэл: бондын төрлөөс хамааран хүүгийн орлогын албан татвар ялгаатай — ихэвчлэн нээлттэй бондод 5%, хаалттай бондод 10%, мөн хаалттай бондод голцуу мэргэжлийн хөрөнгө оруулагч оролцох шаардлагатай байдаг."
                  en="Note: interest income tax differs by bond type — generally 5% for open-market bonds versus 10% for closed-market bonds, and closed bonds are typically limited to professional investors."
                />
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
