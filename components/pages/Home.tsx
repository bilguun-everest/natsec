"use client";

import { A, T, useLang } from "@/components/lang";
import { Reveal, useCountUp, useInView } from "@/components/motion";
import MarketPanel from "@/components/MarketPanel";
import { Eyebrow, SecHead } from "@/components/ui";
import { FAQ } from "@/lib/faq";
import { CONTACT, TRADING_URL } from "@/lib/site";

/**
 * Four figures on one row, so the labels are kept to a similar length (mn
 * 24–27 characters) and short enough to sit on a single line. They used to run
 * 26–30: two of them wrapped and two did not, which left the row with a ragged
 * bottom edge and no obvious reason for it.
 */
const STATS: { value: string; mn: string; en: string; ja: string }[] = [
  {
    value: "19",
    mn: "Жил тасралтгүй ажилласан",
    en: "Years in operation", ja: "継続営業年数",
  },
  {
    value: "18,400+",
    mn: "Идэвхтэй харилцагчийн данс",
    en: "Active client accounts", ja: "稼働中のお客様口座",
  },
  {
    value: "640",
    mn: "Жилийн арилжаа, тэрбум\u00A0₮",
    en: "Annual trading, bn\u00A0₮", ja: "年間取引高（十億₮）",
  },
  {
    value: "27",
    mn: "Зохион байгуулсан IPO, бонд",
    en: "IPOs and bonds arranged", ja: "引き受けたIPO・社債",
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
  title: { mn: string; en: string; ja: string };
  body: { mn: string; en: string; ja: string };
  items: { mn: string; en: string; ja: string }[];
}[] = [
  {
    href: "/broker/",
    icon: (
      <>
        <path d="M3 20h18" />
        <path d="M7 20V9" />
        <path d="M12 20V4" />
        <path d="M17 20v-7" />
      </>
    ),
    title: { mn: "Брокер", en: "Broker", ja: "ブローカー" },
    body: {
      mn: "МХБ-ийн арилжааны системтэй шууд холбогдсон платформоор хоцрогдолгүй арилжаа хийнэ.",
      en: "Trade without delay through a platform connected directly to the MSE trading system.", ja: "MSEの取引システムに直結したプラットフォームで、遅延なく取引できます。",
    },
    items: [
      { mn: "Онлайн арилжааны систем", en: "Online trading system", ja: "オンライン取引システム" },
      { mn: "Хувьцаа, бонд, ЗГҮЦ", en: "Equities, bonds, government paper", ja: "株式・社債・国債" },
      { mn: "Номинал дансны үйлчилгээ", en: "Nominee account services", ja: "ノミニー口座サービス" },
    ],
  },
  {
    href: "/anderraiter/",
    icon: (
      <>
        <path d="M4 21h16" />
        <path d="M6 21V8l6-4 6 4v13" />
        <path d="M10 21v-5h4v5" />
        <path d="M10 11h4" />
      </>
    ),
    title: { mn: "Андеррайтер", en: "Underwriter", ja: "引受業務" },
    body: {
      mn: "Компанийн хувьцаа, бондыг зах зээлд гаргах бүх үе шатыг хариуцна.",
      en: "We manage every stage of bringing a company's shares or bonds to market.", ja: "企業の株式・社債を市場に出すまでの全段階を担います。",
    },
    items: [
      { mn: "Хувьцааны санхүүжилт (IPO, FPO)", en: "Equity financing (IPO, FPO)", ja: "株式による資金調達（IPO・FPO）" },
      { mn: "Бондын санхүүжилт", en: "Bond financing", ja: "社債による資金調達" },
      { mn: "Зах зээлд бүртгүүлэх бэлтгэл", en: "Listing preparation", ja: "上場準備" },
    ],
  },
  {
    href: "/zuvluh/",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5.5-5.5 2 2-5.5z" />
      </>
    ),
    title: { mn: "Хөрөнгө оруулалтын зөвлөх", en: "Investment Advisory", ja: "投資助言" },
    body: {
      mn: "Эрсдэл даах чадвар, зорилгод тань тохирсон багц бүрдүүлж, тогтмол хянана.",
      en: "We build a portfolio suited to your risk tolerance and goals, and monitor it continuously.", ja: "お客様のリスク許容度と目標に合ったポートフォリオを構築し、継続的にモニタリングします。",
    },
    items: [
      { mn: "Багцын зөвлөх үйлчилгээ", en: "Portfolio advisory", ja: "ポートフォリオ助言" },
      { mn: "Хувийн санхүүжилт", en: "Personal financing", ja: "個人向け資金計画" },
      { mn: "Нэгдэл, өөрчлөн байгуулалт", en: "M&A and restructuring", ja: "M&A・組織再編" },
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
  time: { mn: string; en: string; ja: string };
  title: { mn: string; en: string; ja: string };
  body: { mn: string; en: string; ja: string };
}[] = [
  {
    href: "/zaavar-dansneeh/",
    time: { mn: "10 минут", en: "10 minutes", ja: "10分" },
    title: { mn: "Данс нээх", en: "Open an account", ja: "口座を開設する" },
    body: {
      mn: "Онлайнаар бүртгэлээ бөглөж, иргэний үнэмлэхээ хавсаргана. Баталгаажуулалт 24 цагийн дотор.",
      en: "Fill in the form online and attach your ID. Verification takes place within 24 hours.", ja: "オンラインで登録フォームに記入し、身分証を添付します。確認は24時間以内に完了します。",
    },
  },
  {
    href: "/zaavar-tsenegleh/",
    time: { mn: "Тэр өдөртөө", en: "Same day", ja: "当日中" },
    title: { mn: "Мөнгө байршуулах", en: "Add money", ja: "入金" },
    body: {
      mn: "Арилжааны дансаа банкны шилжүүлгээр цэнэглэснээр худалдан авах хүч бэлэн болно.",
      en: "Fund your trading account by bank transfer and your buying power is ready.", ja: "銀行振込で取引口座に入金すると、買付余力が使えるようになります。",
    },
  },
  {
    href: "/zaavar-mhb/",
    time: { mn: "Бодит цагт", en: "Real time", ja: "リアルタイム" },
    title: { mn: "Арилжаа эхлүүлэх", en: "Start trading", ja: "取引を始める" },
    body: {
      mn: "Онлайн систем эсвэл аппаараа эхний захиалгаа өгч, гүйцэтгэлээ бодит цагт хянана.",
      en: "Place your first order in the online system or the app and track it in real time.", ja: "オンラインシステムまたはアプリから最初の注文を出し、執行状況をリアルタイムで確認できます。",
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
            eyebrow={{ mn: "Үйлчилгээ", en: "What we do", ja: "事業内容" }}
            title={{
              mn: "Хөрөнгө оруулалтын бүх шатанд",
              en: "At every stage of investing", ja: "投資のあらゆる段階で",
            }}
            lead={{
              mn: "МХБ-ийн 52 гишүүнээс бүх 5 төрлийн тусгай зөвшөөрлийг бүрэн эзэмшдэг 9 компанийн нэг нь бид.",
              en: "One of nine firms among the exchange's 52 members holding all five categories of licence.", ja: "取引所の52の会員会社のうち、5種類すべての免許を保有する9社の1社です。",
            }}
          />
          <div className="dtrip">
            {OFFER.map((entry, index) => (
              <Reveal
                as={A}
                className="dcol"
                href={entry.href}
                key={entry.href}
                delay={index * 100}
              >
                {/* No 01/02/03 here. Broker, underwriter and advisory are
                    three services, not three steps: nobody does the first
                    before the second. The numbers in "Гурван алхам" below are
                    a real sequence and stay. */}
                <div className="dhead">
                  <span className="dico">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {entry.icon}
                    </svg>
                  </span>
                </div>
                <h3>
                  <T mn={entry.title.mn} en={entry.title.en} ja={entry.title.ja} />
                </h3>
                <p>
                  <T mn={entry.body.mn} en={entry.body.en} ja={entry.body.ja} />
                </p>
                <ul>
                  {entry.items.map((item) => (
                    <li key={item.mn}>
                      <T mn={item.mn} en={item.en} ja={item.ja} />
                    </li>
                  ))}
                </ul>
                <span className="more">
                  <T mn="Дэлгэрэнгүй" en="Learn more" ja="詳しく見る" /> →
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
          eyebrow={{ mn: "Хэрхэн эхлэх", en: "Getting Started", ja: "はじめに" }}
          title={{ mn: "Гурван алхмаар эхэлнэ", en: "Start in three steps", ja: "3つのステップで始める" }}
          lead={{
            mn: "Данс нээхээс эхний захиалга хүртэл ихэвчлэн нэг ажлын өдөрт багтана.",
            en: "From opening an account to your first order — usually inside one working day.", ja: "口座開設から最初の注文まで、通常は1営業日以内に完了します。",
          }}
        />

        <div className="bstep">
          {STEPS.map((step, index) => (
            <Reveal
              as={A}
              className="bs"
              href={step.href}
              key={step.href}
              delay={index * 90}
            >
              <div className="bs-n">{index + 1}</div>
              <div className="bs-t">
                <T mn={step.time.mn} en={step.time.en} ja={step.time.ja} />
              </div>
              <h4>
                <T mn={step.title.mn} en={step.title.en} ja={step.title.ja} />
              </h4>
              <p>
                <T mn={step.body.mn} en={step.body.en} ja={step.body.ja} />
              </p>
              <span className="more">
                <T mn="Заавар үзэх" en="Read the guide" ja="ガイドを読む" /> →
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal className="start-cta" delay={280}>
          <A href={TRADING_URL} className="btn btn-p">
            <T mn="Данс нээх — 10 минут" en="Open Account — 10 min" ja="口座開設 — 10分" />
          </A>
          <A href="/zaavar/" className="btn btn-o">
            <T mn="Бүх заавар" en="All guides" ja="ガイド一覧" />
          </A>
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
          eyebrow={{ mn: "Харилцагчийн туслах", en: "Customer Support", ja: "サポート" }}
          title={{ mn: "Түгээмэл асуулт", en: "Frequently asked questions", ja: "よくあるご質問" }}
        />
        <Reveal className="faq-list" delay={60}>
          {FAQ.slice(0, 5).map((entry) => (
            <A className="faq-row" href={`/${entry.route}/`} key={entry.route}>
              <span className="q">
                <T mn={entry.question.mn} en={entry.question.en} ja={entry.question.ja} />
              </span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </A>
          ))}
        </Reveal>
        <Reveal delay={140} style={{ marginTop: 28 }}>
          <A className="more" href="/faq/">
            <T mn="Бүх асуулт үзэх" en="See all questions" ja="質問をすべて見る" /> →
          </A>
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
          <Eyebrow mn="Эхлэх цаг" en="Get started" ja="はじめる" />
          <h2>
            <T
              mn="Хөрөнгө оруулалтаа өнөөдөр эхлүүлээрэй"
              en="Start investing today"
              ja="今日から投資を始める"
            />
          </h2>
          <p>
            <T
              mn="Данс нээх хүсэлтээ онлайнаар илгээгээд 24 цагийн дотор баталгаажуулалтаа аваарай. Асуух зүйл байвал брокертой шууд ярина уу."
              en="Send your account application online and get verified within 24 hours. If anything is unclear, talk to a broker directly."
              ja="口座開設の申込みをオンラインで送信し、24時間以内に確認をお受け取りください。ご不明な点はブローカーに直接ご相談ください。"
            />
          </p>
          <div className="cta-b">
            <A href={TRADING_URL} className="btn btn-w btn-lg">
              <T mn="Данс нээх" en="Open an account" ja="口座を開設する" />
            </A>
            <A href="/holboo-barih/" className="btn btn-g btn-lg">
              <T mn="Холбоо барих" en="Contact us" ja="お問い合わせ" />
            </A>
          </div>
          <div className="cta-meta">
            <div>
              <small>
                <T mn="Утас" en="Phone" ja="電話" />
              </small>
              <A href={`tel:${CONTACT.phones[0].dial}`}>
                {CONTACT.phones[0].label}
              </A>
            </div>
            <div>
              <small>
                <T mn="И-мэйл" en="Email" ja="メール" />
              </small>
              <A href={`mailto:${CONTACT.email}`}>{CONTACT.email}</A>
            </div>
            <div>
              <small>
                <T mn="Хаяг" en="Office" ja="所在地" />
              </small>
              <span>
                <T mn="Eco Tower, 9 давхарт 904" en="Eco Tower, 9F, Room 904" ja="エコタワー 9階 904号室" />
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
        <T mn={stat.mn} en={stat.en} ja={stat.ja} />
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
            {/* The one eyebrow on the site that is not set in capitals.
                Cyrillic loses more of its letterforms in caps than Latin does
                — Ө, Ү, Ц and Ш all flatten towards rectangles — and this is
                the most important sentence on the page to be able to read. */}
            <Eyebrow
              className="eyebrow-lic"
              mn="Санхүүгийн зохицуулах хорооны тусгай зөвшөөрөлтэй"
              en="Licensed by the Financial Regulatory Commission"
              ja="金融規制委員会の特別ライセンスを取得"
            />
            {/* Not a <T>: the emphasis falls on a different half of the
                sentence in each language, and the line break with it. */}
            <h1>
              {lang === "en" ? (
                <>
                  Your place in the{" "}
                  <br />
                  <em>capital market</em>
                </>
              ) : lang === "ja" ? (
                <>
                  資本市場における
                  <br />
                  <em>あなたのポジション</em>
                </>
              ) : (
                <>
                  Хөрөнгийн зах зээл дээрх{" "}
                  <br />
                  <em>таны байр суурь</em>
                </>
              )}
            </h1>
            <p className="lead">
              <T
                mn="Брокер, андеррайтер, хөрөнгө оруулалтын зөвлөхийн үйлчилгээг нэг дороос. Монголын хөрөнгийн биржийн арилжаанд шууд холбогдож, найдвартай, хурдан үйлчилгээ авна."
                en="Broker, underwriter, and investment advisory services all in one place. Connect directly to trading on the Mongolian Stock Exchange for reliable, fast service."
                ja="ブローカー、引受、投資助言のサービスをひとつの窓口で。モンゴル証券取引所の取引に直結し、確実で迅速なサービスを提供します。"
              />
            </p>
            <div className="hero-cta">
              <A href={TRADING_URL} className="btn btn-w btn-lg">
                <T mn="Данс нээх — 10 минут" en="Open Account — 10 min" ja="口座開設 — 10分" />
              </A>
              {/* "Данс шалгах" pointed at the same login URL as the button
                  beside it — one action wearing two names, and a reader could
                  fairly read "check account" as "check whether I am eligible".
                  The site has two account actions and this is the other one. */}
              <A href={TRADING_URL} className="btn btn-g btn-lg">
                <T mn="Нэвтрэх" en="Log In" ja="ログイン" />
              </A>
            </div>
            <div className="lic">
              <div>
                <strong>МХБ</strong>
                <span>
                  <T mn="Гишүүн байгууллага" en="Member Organization" ja="会員機関" />
                </span>
              </div>
              <div>
                <strong>ҮЦТХТ</strong>
                <span>
                  <T mn="Гишүүн байгууллага" en="Member Organization" ja="会員機関" />
                </span>
              </div>
              <div>
                <strong>5 / 5</strong>
                <span>
                  <T mn="Тусгай зөвшөөрөл" en="Licence categories" ja="保有免許" />
                </span>
              </div>
            </div>
          </div>

          <MarketPanel />
        </div>
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
