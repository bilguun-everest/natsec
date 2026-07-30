"use client";

import { useEffect, useState } from "react";
import { T, Tg, useLang } from "@/components/lang";
import { useCountUp, useInView } from "@/components/motion";
import MarketPanel from "@/components/MarketPanel";
import { useIndices } from "@/components/market";
import { Eyebrow } from "@/components/ui";
import { TRADING_URL } from "@/lib/site";

const HEADLINES: { mn: string; en: string }[] = [
  {
    mn: "Шинэ IPO-ийн захиалга 7 хоногийн дараа хаагдана",
    en: "New IPO subscription window closes in 7 days",
  },
  {
    mn: "2025 оны эхний хагас жилийн аудитлагдсан тайланг нийтэллээ",
    en: "H1 2025 audited financial statements now published",
  },
  {
    mn: "Долоо хоногийн зах зээлийн тойм судалгаа хэсэгт нийтлэгдлээ",
    en: "Weekly market review is now available",
  },
  {
    mn: "Бондын гаргалтын зөвлөгөө үйлчилгээний шинэ хөтөлбөр эхэллээ",
    en: "New bond issuance advisory program launched",
  },
];


const STATS: { value: string; mn: string; en: string }[] = [
  {
    value: "19",
    mn: "Жил тасралтгүй үйл ажиллагаа",
    en: "Years of continuous operation",
  },
  {
    value: "18,400+",
    mn: "Идэвхтэй харилцагчийн данс",
    en: "Active client accounts",
  },
  {
    value: "640",
    mn: "Жилийн арилжааны дүн, тэрбум ₮",
    en: "Annual trading volume, bn ₮",
  },
  {
    value: "27",
    mn: "Зохион байгуулсан IPO, бонд",
    en: "IPOs & bonds arranged",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="band">
        <section style={{ padding: "56px 0" }}>
          <div className="wrap stats">
            {STATS.map((stat, index) => (
              <Stat key={stat.value} stat={stat} delay={index * 90} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

/** Headline figures count up the first time the band scrolls into view. */
function Stat({
  stat,
  delay,
}: {
  stat: (typeof STATS)[number];
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const figure = useCountUp(stat.value, inView);

  return (
    <div
      className={inView ? "stat reveal is-visible" : "stat reveal"}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <b>{figure}</b>
      <span>
        <T mn={stat.mn} en={stat.en} />
      </span>
    </div>
  );
}

function Hero() {
  const { lang } = useLang();

  return (
    <div className="hero">
      <Rings />
      <HeroBackdrop />

      <div className="wrap">
        <div className="hero-grid">
          <div>
            <Eyebrow
              mn="Санхүүгийн зохицуулах хорооны тусгай зөвшөөрөлтэй"
              en="Licensed by the Financial Regulatory Commission"
            />
            <h1>
              {lang === "en" ? (
                <>
                  Your place in the
                  <br />
                  <em>capital market</em>
                </>
              ) : (
                <>
                  Хөрөнгийн зах зээл дээрх
                  <br />
                  <em>таны байр суурь</em>
                </>
              )}
            </h1>
            <p className="lead">
              <T
                mn="Брокер, андеррайтер, хөрөнгө оруулалтын зөвлөхийн үйлчилгээг нэг дороос. Монголын хөрөнгийн биржийн арилжаанд шууд холбогдож, найдвартай, хурдан үйлчилгээ авна."
                en="Broker, underwriter, and investment advisory services all in one place. Connect directly to trading on the Mongolian Stock Exchange for reliable, fast service."
              />
            </p>
            <div className="hero-cta">
              <a href={TRADING_URL} className="btn btn-w">
                <T mn="Данс нээх — 10 минут" en="Open Account — 10 min" />
              </a>
              <a href={TRADING_URL} className="btn btn-g">
                <T mn="Данс шалгах" en="Check Account" />
              </a>
            </div>
            <div className="lic">
              <div>
                <strong>МХБ</strong>
                <span>
                  <T mn="Гишүүн байгууллага" en="Member Organization" />
                </span>
              </div>
              <div>
                <strong>ҮЦТХТ</strong>
                <span>
                  <T mn="Гишүүн байгууллага" en="Member Organization" />
                </span>
              </div>
            </div>
            <HeroNews />
          </div>

          <MarketPanel />
        </div>
      </div>
    </div>
  );
}

/** The five headlines cycle in place, one every three seconds. */
function HeroNews() {
  const [index, setIndex] = useState(0);
  const indices = useIndices();

  // The index headline reports the actual level rather than a number frozen
  // into the copy. When the feed is down the line is simply dropped.
  const headlines = indices
    ? [
        {
          mn: `МХБ-ийн ТОП-20 индекс ${indices.top20.unit} байна`,
          en: `MSE TOP-20 index at ${indices.top20.unit}`,
        },
        ...HEADLINES,
      ]
    : HEADLINES;

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % headlines.length),
      3000,
    );
    return () => clearInterval(timer);
  }, [headlines.length]);

  return (
    <div className="hero-news" id="heroNews">
      <span className="tag">
        <T mn="Мэдээ" en="News" />
      </span>
      <div className="txt" id="heroNewsTxt">
        {headlines.map((headline, position) => (
          <span
            key={headline.mn}
            className={position === index ? "active" : undefined}
          >
            <T mn={headline.mn} en={headline.en} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Concentric squares lifted from the logo mark, used as an ambient field. */
function Rings({ className = "rings" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 720 720" aria-hidden="true">
      <rect x="10" y="10" width="700" height="700" />
      <rect x="70" y="70" width="580" height="580" />
      <rect x="130" y="130" width="460" height="460" />
      <rect x="190" y="190" width="340" height="340" />
      <rect x="250" y="250" width="220" height="220" />
      <rect x="310" y="310" width="100" height="100" />
    </svg>
  );
}

/** Skyline + rising market line behind the hero copy. */
function HeroBackdrop() {
  // [x, y, width, height] per building; `windows` marks the lit floors.
  const towers: { rect: number[]; windows?: number[][] }[] = [
    {
      rect: [0, 210, 54, 110],
      windows: [
        [10, 230],
        [30, 230],
        [10, 256],
        [30, 256],
      ],
    },
    { rect: [60, 240, 40, 80] },
    {
      rect: [106, 180, 58, 140],
      windows: [
        [118, 200],
        [140, 200],
        [118, 226],
        [140, 226],
        [118, 252],
        [140, 252],
      ],
    },
    { rect: [170, 250, 36, 70] },
    {
      rect: [212, 150, 50, 170],
      windows: [
        [222, 168],
        [240, 168],
        [222, 194],
        [240, 194],
        [222, 220],
        [240, 220],
      ],
    },
    { rect: [268, 230, 42, 90] },
    { rect: [316, 270, 34, 50] },
    {
      rect: [356, 120, 60, 200],
      windows: [
        [368, 140],
        [392, 140],
        [368, 166],
        [392, 166],
        [368, 192],
        [392, 192],
        [368, 218],
        [392, 218],
      ],
    },
    { rect: [422, 255, 38, 65] },
    {
      rect: [466, 200, 46, 120],
      windows: [
        [478, 216],
        [498, 216],
        [478, 242],
        [498, 242],
      ],
    },
    { rect: [518, 245, 34, 75] },
    {
      rect: [558, 160, 56, 160],
      windows: [
        [570, 178],
        [592, 178],
        [570, 204],
        [592, 204],
        [570, 230],
        [592, 230],
      ],
    },
    { rect: [620, 235, 40, 85] },
    { rect: [666, 270, 34, 50] },
    {
      rect: [706, 140, 58, 180],
      windows: [
        [718, 158],
        [740, 158],
        [718, 184],
        [740, 184],
        [718, 210],
        [740, 210],
      ],
    },
    { rect: [770, 250, 40, 70] },
    {
      rect: [816, 195, 46, 125],
      windows: [
        [828, 212],
        [848, 212],
        [828, 238],
        [848, 238],
      ],
    },
    { rect: [868, 260, 34, 60] },
    {
      rect: [908, 110, 62, 210],
      windows: [
        [922, 130],
        [946, 130],
        [922, 156],
        [946, 156],
        [922, 182],
        [946, 182],
        [922, 208],
        [946, 208],
      ],
    },
    { rect: [976, 245, 38, 75] },
    {
      rect: [1020, 205, 46, 115],
      windows: [
        [1032, 222],
        [1052, 222],
        [1032, 248],
        [1052, 248],
      ],
    },
    { rect: [1072, 260, 34, 60] },
    {
      rect: [1112, 165, 56, 155],
      windows: [
        [1124, 182],
        [1146, 182],
        [1124, 208],
        [1146, 208],
        [1124, 234],
        [1146, 234],
      ],
    },
    { rect: [1174, 240, 40, 80] },
    { rect: [1220, 275, 34, 45] },
    {
      rect: [1260, 185, 50, 135],
      windows: [
        [1272, 202],
        [1292, 202],
        [1272, 228],
        [1292, 228],
      ],
    },
    { rect: [1316, 250, 38, 70] },
    {
      rect: [1360, 220, 46, 100],
      windows: [
        [1372, 236],
        [1392, 236],
      ],
    },
    { rect: [1412, 260, 28, 60] },
  ];

  const line =
    "0,230 120,190 240,205 360,145 480,165 600,105 720,120 840,70 960,95 1080,45 1200,60 1320,20 1440,40";
  const area =
    "M0,230 L120,190 L240,205 L360,145 L480,165 L600,105 L720,120 L840,70 " +
    "L960,95 L1080,45 L1200,60 L1320,20 L1440,40 L1440,320 L0,320 Z";

  return (
    <svg
      className="hero-bg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroChartFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#48BEE6" stopOpacity=".35" />
          <stop offset="100%" stopColor="#48BEE6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="heroBottomFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0C1440" stopOpacity="0" />
          <stop offset="55%" stopColor="#0C1440" stopOpacity=".55" />
          <stop offset="100%" stopColor="#0C1440" stopOpacity="1" />
        </linearGradient>
      </defs>
      <g className="skyline">
        {towers.map((tower) => (
          <g key={tower.rect.join("-")}>
            <rect
              x={tower.rect[0]}
              y={tower.rect[1]}
              width={tower.rect[2]}
              height={tower.rect[3]}
            />
            {tower.windows?.map(([x, y]) => (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width="10"
                height="14"
                className="win"
              />
            ))}
          </g>
        ))}
      </g>
      <path className="chart-fill" d={area} />
      <polyline className="chart-line" points={line} />
      <rect className="fade" x="0" y="0" width="1440" height="320" />
    </svg>
  );
}
