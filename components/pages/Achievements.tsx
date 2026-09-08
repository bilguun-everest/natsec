"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { SecHead } from "@/components/ui";

interface Deal {
  year: string;
  name: { mn: string; en: string; ja: string };
  note: { mn: string; en: string; ja: string };
}

const BONDS: Deal[] = [
  {
    year: "2020",
    name: {
      mn: "Хатан суудал Инвест ББСБ ХХК",
      en: "Khatan Suudal Invest NBFI LLC", ja: "ハタン・スーダル・インベストNBFI",
    },
    note: { mn: "1 тэрбум төгрөгийн бонд", en: "1 billion ₮ bond", ja: "10億₮ 社債" },
  },
  {
    year: "2021",
    name: { mn: "Төгс Процесс ХХК", en: "Tugs Process LLC", ja: "トゥグス・プロセス" },
    note: { mn: "6 тэрбум төгрөгийн бонд", en: "6 billion ₮ bond", ja: "60億₮ 社債" },
  },
];

const ADVISORY: Deal[] = [
  {
    year: "2021",
    name: { mn: "Оптимал Эн Макс ХХК", en: "Optimal En Max LLC", ja: "オプティマル・エンマックス" },
    note: { mn: "Зөвлөх үйлчилгээ", en: "Advisory services", ja: "アドバイザリー業務" },
  },
  {
    year: "2021",
    name: { mn: "Тэлмэн Групп Д ХХК", en: "Telmen Group D LLC", ja: "テルメン・グループD" },
    note: { mn: "Зөвлөх үйлчилгээ", en: "Advisory services", ja: "アドバイザリー業務" },
  },
];

export default function Achievements() {
  return (
    /* The dark stop on this page, the same treatment the home page gives "at
       every stage of investing". It was a light band, which did separate
       Overview from Reports but gave the page no weight anywhere — three
       white sections in a row, the middle one merely a shade greyer. The
       track record is the part of this page worth stopping on. */
    <div className="dk">
      <section id="ololt">
        <div className="wrap">
          <SecHead
            eyebrow={{ mn: "Туршлага", en: "Track Record", ja: "実績" }}
            title={{ mn: "Ололт амжилт", en: "Achievements", ja: "実績" }}
            lead={{
              mn: "Бид амжилттай зохион байгуулсан бонд болон зөвлөх үйлчилгээний туршлагаас.",
              en: "A track record of bond issuances and advisory mandates we have successfully arranged.", ja: "これまでに引き受けた社債発行およびアドバイザリー案件の実績です。",
            }}
            style={{ marginBottom: 0 }}
          />

          <DealGroup
            heading={{ mn: "Бонд босгосон туршлага", en: "Bond Issuance Experience", ja: "社債発行の実績" }}
            deals={BONDS}
          />
          <DealGroup
            heading={{
              mn: "Зөвлөх үйлчилгээний туршлага",
              en: "Advisory Services Experience", ja: "アドバイザリー業務の実績",
            }}
            deals={ADVISORY}
          />
        </div>
      </section>
    </div>
  );
}

function DealGroup({
  heading,
  deals,
}: {
  heading: { mn: string; en: string; ja: string };
  deals: Deal[];
}) {
  return (
    <div className="deal-group">
      <Reveal as="h4">
        <T mn={heading.mn} en={heading.en} ja={heading.ja} />
      </Reveal>
      <div className="deal-grid">
        {deals.map((deal, index) => (
          <Reveal className="deal-card" key={deal.name.mn} delay={index * 90}>
            <span className="yr">{deal.year}</span>
            <h5>
              <T mn={deal.name.mn} en={deal.name.en} ja={deal.name.ja} />
            </h5>
            <span>
              <T mn={deal.note.mn} en={deal.note.en} ja={deal.note.ja} />
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
