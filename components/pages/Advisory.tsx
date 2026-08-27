"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { List, SecHead } from "@/components/ui";

export default function Advisory() {
  return (
    <section id="zuvluh" style={{ padding: "72px 0" }}>
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Үйлчилгээ", en: "Services" }}
          title={{
            mn: "Хөрөнгө оруулалтын зөвлөгөө",
            en: "Investment Advisory",
          }}
          lead={{
            mn: "Хувь хүн болон компанийн зорилгод тохирсон багц, санхүүжилтийн зөвлөгөө.",
            en: "Portfolio and financing advice tailored to your goals, for both individuals and companies.",
          }}
        />
        <div className="subsvc-grid">
          <Reveal className="subsvc-card">
            <span className="tag">
              <T mn="ЗӨВЛӨГӨӨ" en="ADVISORY" />
            </span>
            <h4>
              <T mn="Зөвлөх үйлчилгээ" en="Advisory Services" />
            </h4>
            <p>
              <T
                mn="Таны эрсдэл даах чадвар, зорилгод тулгуурлан хөрөнгө оруулалтын багц бүрдүүлж, тогтмол хянана; мөн компаниудад хөрөнгийн бүтэц, өргөжилт, өөрчлөн байгуулалтын талаар зөвлөгөө өгнө."
                en="We assess your risk tolerance and goals to build and continuously monitor an investment portfolio, and advise companies on capital structure, expansion, and restructuring."
              />
            </p>
            <List
              items={[
                {
                  mn: "Багц бүрдүүлэлт, хяналт",
                  en: "Portfolio construction & monitoring",
                },
                { mn: "Эрсдэлийн үнэлгээ", en: "Risk assessment" },
                { mn: "Байгууллагын зөвлөгөө", en: "Corporate advisory" },
              ]}
            />
          </Reveal>

          <Reveal className="subsvc-card" delay={110}>
            <span className="tag">
              <T mn="САНХҮҮЖИЛТ" en="FINANCING" />
            </span>
            <h4>
              <T mn="Хувийн санхүүжилт" en="Personal Financing" />
            </h4>
            <p>
              <T
                mn="Хувь хүн харилцагчдад орлого, хугацаа, санхүүгийн зорилгод нь тохирсон үнэт цаасны хослолыг тодорхойлж, хувийн хөрөнгө оруулалтын санхүүжилтээ төлөвлөх, бүтэцжүүлэхэд нь туслана."
                en="We help individual clients plan and structure their personal investment financing, matching the right mix of securities to their income, timeline, and financial goals."
              />
            </p>
            <List
              items={[
                {
                  mn: "Хувийн хөрөнгө оруулалтын төлөвлөгөө",
                  en: "Personal investment planning",
                },
                {
                  mn: "Зорилгод суурилсан санхүүжилтийн бүтэц",
                  en: "Goal-based financing structure",
                },
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
