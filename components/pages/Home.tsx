"use client";

import { useEffect, useState } from "react";
import { T, useLang } from "@/components/lang";
import { Reveal, useCountUp, useInView } from "@/components/motion";
import MarketPanel from "@/components/MarketPanel";
import { useIndices } from "@/components/market";
import { Eyebrow, SecHead } from "@/components/ui";
import { FAQ } from "@/lib/faq";
import { CONTACT, TRADING_URL } from "@/lib/site";

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

/**
 * Four figures on one row, so the labels are kept to a similar length (mn
 * 24–27 characters) and short enough to sit on a single line. They used to run
 * 26–30: two of them wrapped and two did not, which left the row with a ragged
 * bottom edge and no obvious reason for it.
 */
const STATS: { value: string; mn: string; en: string }[] = [
  {
    value: "19",
    mn: "Жил тасралтгүй ажилласан",
    en: "Years in operation",
  },
  {
    value: "18,400+",
    mn: "Идэвхтэй харилцагчийн данс",
    en: "Active client accounts",
  },
  {
    value: "640",
    mn: "Жилийн арилжаа, тэрбум\u00A0₮",
    en: "Annual trading, bn\u00A0₮",
  },
  {
    value: "27",
    mn: "Зохион байгуулсан IPO, бонд",
    en: "IPOs and bonds arranged",
  },
];

/**
 * What the firm actually does, on the page that has to answer it first.
 *
 * The landing page used to go hero → figures → "how to start" without ever
 * saying what it was you would be starting, which left the three licensed
 * businesses buried two clicks deep in a dropdown.
 */
const OFFER: {
  href: string;
  icon: React.ReactNode;
  title: { mn: string; en: string };
  body: { mn: string; en: string };
  items: { mn: string; en: string }[];
}[] = [
  {
    href: "#broker",
    icon: (
      <>
        <path d="M3 20h18" />
        <path d="M7 20V9" />
        <path d="M12 20V4" />
        <path d="M17 20v-7" />
      </>
    ),
    title: { mn: "Брокер", en: "Broker" },
    body: {
      mn: "МХБ-ийн арилжааны системтэй шууд холбогдсон платформоор хоцрогдолгүй арилжаа хийнэ.",
      en: "Trade without delay through a platform connected directly to the MSE trading system.",
    },
    items: [
      { mn: "Онлайн арилжааны систем", en: "Online trading system" },
      { mn: "Хувьцаа, бонд, ЗГҮЦ", en: "Equities, bonds, government paper" },
      { mn: "Номинал дансны үйлчилгээ", en: "Nominee account services" },
    ],
  },
  {
    href: "#anderraiter",
    icon: (
      <>
        <path d="M4 21h16" />
        <path d="M6 21V8l6-4 6 4v13" />
        <path d="M10 21v-5h4v5" />
        <path d="M10 11h4" />
      </>
    ),
    title: { mn: "Андеррайтер", en: "Underwriter" },
    body: {
      mn: "Компанийн хувьцаа, бондыг зах зээлд гаргах бүх үе шатыг хариуцна.",
      en: "We manage every stage of bringing a company's shares or bonds to market.",
    },
    items: [
      { mn: "Хувьцааны санхүүжилт (IPO, FPO)", en: "Equity financing (IPO, FPO)" },
      { mn: "Бондын санхүүжилт", en: "Bond financing" },
      { mn: "Зах зээлд бүртгүүлэх бэлтгэл", en: "Listing preparation" },
    ],
  },
  {
    href: "#zuvluh",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5.5-5.5 2 2-5.5z" />
      </>
    ),
    title: { mn: "Хөрөнгө оруулалтын зөвлөх", en: "Investment Advisory" },
    body: {
      mn: "Эрсдэл даах чадвар, зорилгод тань тохирсон багц бүрдүүлж, тогтмол хянана.",
      en: "We build a portfolio suited to your risk tolerance and goals, and monitor it continuously.",
    },
    items: [
      { mn: "Багцын зөвлөх үйлчилгээ", en: "Portfolio advisory" },
      { mn: "Хувийн санхүүжилт", en: "Personal financing" },
      { mn: "Нэгдэл, өөрчлөн байгуулалт", en: "M&A and restructuring" },
    ],
  },
];

/**
 * The three things a new client actually has to do, in order, each opening the
 * guide that walks through it. The time against each step is the point: the
 * question people arrive with is "how long until I can trade?".
 */
const STEPS: {
  href: string;
  time: { mn: string; en: string };
  title: { mn: string; en: string };
  body: { mn: string; en: string };
}[] = [
  {
    href: "#zaavar-dansneeh",
    time: { mn: "10 минут", en: "10 minutes" },
    title: { mn: "Данс нээх", en: "Open an account" },
    body: {
      mn: "Онлайнаар бүртгэлээ бөглөж, иргэний үнэмлэхээ хавсаргана. Баталгаажуулалт 24 цагийн дотор.",
      en: "Fill in the form online and attach your ID. Verification takes place within 24 hours.",
    },
  },
  {
    href: "#zaavar-tsenegleh",
    time: { mn: "Тэр өдөртөө", en: "Same day" },
    title: { mn: "Мөнгө байршуулах", en: "Add money" },
    body: {
      mn: "Арилжааны дансаа банкны шилжүүлгээр цэнэглэснээр худалдан авах хүч бэлэн болно.",
      en: "Fund your trading account by bank transfer and your buying power is ready.",
    },
  },
  {
    href: "#zaavar-mhb",
    time: { mn: "Бодит цагт", en: "Real time" },
    title: { mn: "Арилжаа эхлүүлэх", en: "Start trading" },
    body: {
      mn: "Онлайн систем эсвэл аппаараа эхний захиалгаа өгч, гүйцэтгэлээ бодит цагт хянана.",
      en: "Place your first order in the online system or the app and track it in real time.",
    },
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="band">
        <section style={{ padding: "clamp(48px,5vw,68px) 0" }}>
          <div className="wrap stats">
            {STATS.map((stat, index) => (
              <Stat key={stat.value} stat={stat} delay={index * 90} />
            ))}
          </div>
        </section>
      </div>
      <Offer />
      <div className="band">
        <StartSteps />
      </div>
      <HomeFaq />
      <ClosingCta />
    </>
  );
}

/**
 * The three licensed businesses, said plainly and once — and the page's one
 * dark stop between the hero and the closing band.
 *
 * It was a white card triptych sitting directly above another one, which gave
 * the middle of the landing page no weight and no way in. See the note on
 * `.dk` in globals.css for how the treatment was chosen.
 */
function Offer() {
  return (
    <div className="dk">
      <section>
        <div className="wrap">
          <SecHead
            eyebrow={{ mn: "Үйлчилгээ", en: "What we do" }}
            title={{
              mn: "Хөрөнгө оруулалтын бүх шатанд",
              en: "At every stage of investing",
            }}
            lead={{
              mn: "МХБ-ийн 52 гишүүнээс бүх 5 төрлийн тусгай зөвшөөрлийг бүрэн эзэмшдэг 9 компанийн нэг нь бид.",
              en: "One of nine firms among the exchange's 52 members holding all five categories of licence.",
            }}
          />
          <div className="dtrip">
            {OFFER.map((entry, index) => (
              <Reveal
                as="a"
                className="dcol"
                href={entry.href}
                key={entry.href}
                delay={index * 100}
              >
                <div className="dhead">
                  <span className="dn">{`0${index + 1}`}</span>
                  <span className="dico">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {entry.icon}
                    </svg>
                  </span>
                </div>
                <h3>
                  <T mn={entry.title.mn} en={entry.title.en} />
                </h3>
                <p>
                  <T mn={entry.body.mn} en={entry.body.en} />
                </p>
                <ul>
                  {entry.items.map((item) => (
                    <li key={item.mn}>
                      <T mn={item.mn} en={item.en} />
                    </li>
                  ))}
                </ul>
                <span className="more">
                  <T mn="Дэлгэрэнгүй" en="Learn more" /> →
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/** "Start in three steps", the landing page's answer to "where do I begin?". */
function StartSteps() {
  return (
    <section>
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Хэрхэн эхлэх", en: "Getting Started" }}
          title={{ mn: "Гурван алхмаар эхэлнэ", en: "Start in three steps" }}
          lead={{
            mn: "Данс нээхээс эхний захиалга хүртэл ихэвчлэн нэг ажлын өдөрт багтана.",
            en: "From opening an account to your first order — usually inside one working day.",
          }}
        />

        <div className="bstep">
          {STEPS.map((step, index) => (
            <Reveal
              as="a"
              className="bs"
              href={step.href}
              key={step.href}
              delay={index * 90}
            >
              <div className="bs-n">{index + 1}</div>
              <div className="bs-t">
                <T mn={step.time.mn} en={step.time.en} />
              </div>
              <h4>
                <T mn={step.title.mn} en={step.title.en} />
              </h4>
              <p>
                <T mn={step.body.mn} en={step.body.en} />
              </p>
              <span className="more">
                <T mn="Заавар үзэх" en="Read the guide" /> →
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal className="start-cta" delay={280}>
          <a href={TRADING_URL} className="btn btn-p">
            <T mn="Данс нээх — 10 минут" en="Open Account — 10 min" />
          </a>
          <a href="#zaavar" className="btn btn-o">
            <T mn="Бүх заавар" en="All guides" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The five questions we are asked most, ahead of the full list on #faq.
 *
 * Ruled and light rather than the dark card it used to be: between a dark hero
 * and a dark footer, a third navy slab in the middle of the page left nowhere
 * for the eye to rest.
 */
function HomeFaq() {
  return (
    <section>
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Харилцагчийн туслах", en: "Customer Support" }}
          title={{ mn: "Түгээмэл асуулт", en: "Frequently asked questions" }}
        />
        <Reveal className="faq-list" delay={60}>
          {FAQ.slice(0, 5).map((entry) => (
            <a className="faq-row" href={`#${entry.route}`} key={entry.route}>
              <span className="q">
                <T mn={entry.question.mn} en={entry.question.en} />
              </span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </Reveal>
        <Reveal delay={140} style={{ marginTop: 28 }}>
          <a className="more" href="#faq">
            <T mn="Бүх асуулт үзэх" en="See all questions" /> →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** Closing band: the one action, and the two ways to reach a person. */
function ClosingCta() {
  return (
    <div className="cta">
      <Rings className="rings2" />
      <section>
        <div className="wrap">
          <Eyebrow mn="Эхлэх цаг" en="Get started" />
          <h2>
            <T
              mn="Хөрөнгө оруулалтаа өнөөдөр эхлүүлээрэй"
              en="Start investing today"
            />
          </h2>
          <p>
            <T
              mn="Данс нээх хүсэлтээ онлайнаар илгээгээд 24 цагийн дотор баталгаажуулалтаа аваарай. Асуух зүйл байвал брокертой шууд ярина уу."
              en="Send your account application online and get verified within 24 hours. If anything is unclear, talk to a broker directly."
            />
          </p>
          <div className="cta-b">
            <a href={TRADING_URL} className="btn btn-w btn-lg">
              <T mn="Данс нээх" en="Open an account" />
            </a>
            <a href="#holboo-barih" className="btn btn-g btn-lg">
              <T mn="Холбоо барих" en="Contact us" />
            </a>
          </div>
          <div className="cta-meta">
            <div>
              <small>
                <T mn="Утас" en="Phone" />
              </small>
              <a href={`tel:${CONTACT.phones[0].dial}`}>
                {CONTACT.phones[0].label}
              </a>
            </div>
            <div>
              <small>
                <T mn="И-мэйл" en="Email" />
              </small>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
            <div>
              <small>
                <T mn="Хаяг" en="Office" />
              </small>
              <span>
                <T mn="Eco Tower, 9 давхарт 904" en="Eco Tower, 9F, Room 904" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
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
              <a href={TRADING_URL} className="btn btn-w btn-lg">
                <T mn="Данс нээх — 10 минут" en="Open Account — 10 min" />
              </a>
              <a href={TRADING_URL} className="btn btn-g btn-lg">
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
              <div>
                <strong>5 / 5</strong>
                <span>
                  <T mn="Тусгай зөвшөөрөл" en="Licence categories" />
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

/** The five headlines cycle in place, one every five seconds. */
function HeroNews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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

  // Five seconds, not three: three is under the time it takes to read a
  // Mongolian headline, so the line changed while you were still on it.
  // Hovering or tabbing in stops it — auto-advancing content needs a way to
  // be halted (WCAG 2.2.2).
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % headlines.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [headlines.length, paused]);

  return (
    <div
      className="hero-news"
      id="heroNews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
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

/**
 * The market line along the base of the hero.
 *
 * This used to be a drawn skyline — thirty hand-placed towers with lit windows,
 * which read as clip art at any size and had nothing to do with the business.
 * What remains is the one figure that does: a rising series, its axis, and the
 * points on it, drawn in once on load.
 */
function HeroBackdrop() {
  const points: [number, number][] = [
    [0, 244],
    [110, 208],
    [220, 220],
    [330, 168],
    [440, 186],
    [550, 132],
    [660, 148],
    [770, 100],
    [880, 124],
    [990, 74],
    [1100, 92],
    [1210, 48],
    [1320, 62],
    [1440, 26],
  ];

  const line = points.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `M${line.replace(/ /g, " L")} L1440,320 L0,320 Z`;

  return (
    <svg
      className="hero-bg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroChartFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FB2FF" stopOpacity=".22" />
          <stop offset="100%" stopColor="#6FB2FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="heroBottomFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080E30" stopOpacity="0" />
          <stop offset="62%" stopColor="#080E30" stopOpacity=".45" />
          <stop offset="100%" stopColor="#080E30" stopOpacity=".92" />
        </linearGradient>
      </defs>

      {/* Axis rules, so the series reads as a chart rather than a squiggle. */}
      {[120, 180, 240].map((y) => (
        <line className="axis" key={y} x1="0" y1={y} x2="1440" y2={y} />
      ))}

      <path className="chart-fill" d={area} />
      <polyline className="chart-glow" points={line} />
      <polyline className="chart-line" points={line} />

      {/* Squares, not circles: preserveAspectRatio="none" scales x and y by
          different factors, which turns a circle into a visibly wrong ellipse
          and a square into a rectangle that still reads as a marker. */}
      {points
        .filter((_, index) => index % 3 === 0)
        .map(([x, y]) => (
          <rect
            className="chart-dot"
            key={`${x}-${y}`}
            x={x - 3}
            y={y - 3}
            width="6"
            height="6"
          />
        ))}

      <rect className="fade" x="0" y="0" width="1440" height="320" />
    </svg>
  );
}
