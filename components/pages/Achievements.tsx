"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { SecHead } from "@/components/ui";

interface Deal {
  year: string;
  name: { mn: string; en: string };
  note: { mn: string; en: string };
}

const BONDS: Deal[] = [
  {
    year: "2020",
    name: {
      mn: "Хатан суудал Инвест ББСБ ХХК",
      en: "Khatan Suudal Invest NBFI LLC",
    },
    note: { mn: "1 тэрбум төгрөгийн бонд", en: "1 billion ₮ bond" },
  },
  {
    year: "2021",
    name: { mn: "Төгс Процесс ХХК", en: "Tugs Process LLC" },
    note: { mn: "6 тэрбум төгрөгийн бонд", en: "6 billion ₮ bond" },
  },
];

const ADVISORY: Deal[] = [
  {
    year: "2021",
    name: { mn: "Оптимал Эн Макс ХХК", en: "Optimal En Max LLC" },
    note: { mn: "Зөвлөх үйлчилгээ", en: "Advisory services" },
  },
  {
    year: "2021",
    name: { mn: "Тэлмэн Групп Д ХХК", en: "Telmen Group D LLC" },
    note: { mn: "Зөвлөх үйлчилгээ", en: "Advisory services" },
  },
];

export default function Achievements() {
  return (
    <section id="ololt">
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Туршлага", en: "Track Record" }}
          title={{ mn: "Ололт амжилт", en: "Achievements" }}
          lead={{
            mn: "Бид амжилттай зохион байгуулсан бонд болон зөвлөх үйлчилгээний туршлагаас.",
            en: "A track record of bond issuances and advisory mandates we have successfully arranged.",
          }}
          style={{ marginBottom: 0 }}
        />

        <DealGroup
          heading={{ mn: "Бонд босгосон туршлага", en: "Bond Issuance Experience" }}
          deals={BONDS}
        />
        <DealGroup
          heading={{
            mn: "Зөвлөх үйлчилгээний туршлага",
            en: "Advisory Services Experience",
          }}
          deals={ADVISORY}
        />
      </div>
    </section>
  );
}

function DealGroup({
  heading,
  deals,
}: {
  heading: { mn: string; en: string };
  deals: Deal[];
}) {
  return (
    <div className="deal-group">
      <Reveal as="h4">
        <T mn={heading.mn} en={heading.en} />
      </Reveal>
      <div className="deal-grid">
        {deals.map((deal, index) => (
          <Reveal className="deal-card" key={deal.name.mn} delay={index * 90}>
            <span className="yr">{deal.year}</span>
            <h5>
              <T mn={deal.name.mn} en={deal.name.en} />
            </h5>
            <span>
              <T mn={deal.note.mn} en={deal.note.en} />
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
