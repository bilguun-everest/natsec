/**
 * All site copy, in both languages.
 *
 * Every user-visible string is a `Bi` pair; the `<T>` component picks the
 * active language at render time. Two characters are treated specially by the
 * renderer: `₮` (wrapped in a fallback font — JetBrains Mono has no tögrög
 * glyph) and `\n` (rendered as a line break).
 */

export interface Bi {
  mn: string;
  en: string;
}

/** Shorthand for copy that is identical in both languages (names, tickers). */
const same = (s: string): Bi => ({ mn: s, en: s });

/* ---------------------------------------------------------------- utility */

export const LOGIN_URL = "https://natsec.istock.mn/auth/login";

export const util = {
  index: { mn: "МХБ ТОП-20: 45,182.6", en: "MSE TOP-20: 45,182.6" },
  indexChange: "+0.84%",
  rate: { mn: "Ханш: USD 3,412₮", en: "Rate: USD 3,412₮" },
  sustainability: {
    mn: "Тогтвортой хөгжил, бодлого",
    en: "Sustainability policy",
  },
  contact: { mn: "Холбоо барих", en: "Contact" },
};

/* -------------------------------------------------------------- navigation */

export interface NavLink {
  label: Bi;
  href: string;
}

/** A non-clickable label that groups the links under it. */
export interface NavGroup {
  group: Bi;
}

export type DropItem = NavLink | NavGroup;

export const isGroup = (item: DropItem): item is NavGroup => "group" in item;

export interface NavItem {
  label: Bi;
  items: DropItem[];
  /** Right-align the panel so the last menu never overflows the viewport. */
  alignRight?: boolean;
}

export const nav: NavItem[] = [
  {
    label: { mn: "Бидний тухай", en: "About Us" },
    items: [
      { label: { mn: "Танилцуулга", en: "Overview" }, href: "#tanilcuulga" },
      {
        label: { mn: "Удирдах албан тушаалтан", en: "Leadership" },
        href: "#udirdlaga",
      },
      { label: { mn: "Ололт амжилт", en: "Achievements" }, href: "#ololt" },
      { label: { mn: "Санхүүгийн тайлан", en: "Financial Reports" }, href: "#" },
    ],
  },
  {
    label: { mn: "Үйлчилгээ", en: "Services" },
    items: [
      { group: { mn: "Брокер", en: "Broker" } },
      {
        label: { mn: "Дотоод арилжаанд оролцох", en: "Domestic Trading" },
        href: LOGIN_URL,
      },
      {
        label: { mn: "Онлайн арилжааны систем", en: "Online Trading System" },
        href: "#",
      },
      { group: { mn: "Андеррайтер", en: "Underwriter" } },
      {
        label: {
          mn: "Хувьцааны санхүүжилт (IPO, FPO)",
          en: "Equity Financing (IPO, FPO)",
        },
        href: "#",
      },
      { label: { mn: "Бондын санхүүжилт", en: "Bond Financing" }, href: "#" },
      {
        group: { mn: "Хөрөнгө оруулалтын зөвлөгөө", en: "Investment Advisory" },
      },
      { label: { mn: "Зөвлөх үйлчилгээ", en: "Advisory Services" }, href: "#" },
      {
        label: { mn: "Хувийн санхүүжилт", en: "Personal Financing" },
        href: "#",
      },
    ],
  },
  {
    label: { mn: "Судалгаа", en: "Research" },
    items: [
      {
        label: { mn: "Макро орчны судалгаа", en: "Macro Research" },
        href: "#",
      },
      {
        label: { mn: "Үнэт цаасны судалгаа", en: "Securities Research" },
        href: "#",
      },
      {
        label: { mn: "Долоо хоногийн тойм", en: "Weekly Review" },
        href: "#",
      },
    ],
  },
  {
    label: { mn: "Харилцагчийн туслах", en: "Customer Support" },
    items: [
      {
        label: { mn: "Данс нээх заавар", en: "Account Opening Guide" },
        href: "#zaavar",
      },
      {
        label: { mn: "МХБ-ийн арилжаанд оролцох", en: "Trading on the MSE" },
        href: "#zaavar",
      },
      {
        label: {
          mn: "IPO-д хэрхэн оролцох вэ",
          en: "How to Participate in an IPO",
        },
        href: "#zaavar",
      },
      {
        label: { mn: "Мөнгө байршуулах, татах", en: "Deposits & Withdrawals" },
        href: "#zaavar",
      },
      { label: { mn: "Данс цэнэглэх", en: "Top Up Account" }, href: "#zaavar" },
      {
        label: { mn: "Ногдол ашиг авах", en: "Receiving Dividends" },
        href: "#zaavar",
      },
      { label: { mn: "Холбоо барих", en: "Contact" }, href: "#holboo-barih" },
    ],
  },
  {
    label: { mn: "Тогтвортой хөгжил", en: "Sustainability" },
    alignRight: true,
    items: [
      {
        label: {
          mn: "Тогтвортой хөгжлийн бодлого (ESG)",
          en: "Sustainability Policy (ESG)",
        },
        href: "#",
      },
      { label: { mn: "Нууцлалын бодлого", en: "Privacy Policy" }, href: "#" },
      { label: { mn: "Үйлчилгээний нөхцөл", en: "Terms of Service" }, href: "#" },
    ],
  },
];

export const actions = {
  login: { mn: "Нэвтрэх", en: "Log In" },
  openAccount: { mn: "Данс нээх", en: "Open Account" },
  menu: { mn: "Цэс нээх", en: "Open menu" },
};

/* -------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: {
    mn: "Санхүүгийн зохицуулах хорооны тусгай зөвшөөрөлтэй",
    en: "Licensed by the Financial Regulatory Commission",
  },
  title: { mn: "Хөрөнгийн зах зээл дээрх", en: "Your place in the" },
  titleAccent: { mn: "таны байр суурь", en: "capital market" },
  lead: {
    mn: "Брокер, андеррайтер, хөрөнгө оруулалтын зөвлөхийн үйлчилгээг нэг дороос. Монголын хөрөнгийн биржийн арилжаанд шууд холбогдож, найдвартай, хурдан үйлчилгээ авна.",
    en: "Broker, underwriter, and investment advisory services all in one place. Connect directly to trading on the Mongolian Stock Exchange for reliable, fast service.",
  },
  ctaPrimary: { mn: "Данс нээх — 10 минут", en: "Open Account — 10 min" },
  ctaSecondary: { mn: "Данс шалгах", en: "Check Account" },
  licences: [
    {
      code: same("МХБ"),
      note: { mn: "Гишүүн байгууллага", en: "Member Organization" },
    },
    {
      code: same("ҮЦТХТ"),
      note: { mn: "Гишүүн байгууллага", en: "Member Organization" },
    },
  ],
};

export interface Tick {
  name: Bi;
  sub: Bi;
  value: string;
  change: Bi;
  dir: "up" | "down" | "flat";
}

export const marketPanel = {
  title: { mn: "Зах зээл — өнөөдөр", en: "Market — Today" },
  status: { mn: "Арилжаа нээлттэй", en: "Trading Open" },
  ticks: [
    {
      name: { mn: "ТОП-20 индекс", en: "TOP-20 Index" },
      sub: same("MSE TOP-20"),
      value: "45,182.60",
      change: same("▲ 0.84%"),
      dir: "up",
    },
    {
      name: same("АПУ"),
      sub: { mn: "APU · Хүнс, ундаа", en: "APU · Food & Beverage" },
      value: "1,142₮",
      change: same("▲ 2.15%"),
      dir: "up",
    },
    {
      name: { mn: "Голомт банк", en: "Golomt Bank" },
      sub: { mn: "GLMT · Санхүү", en: "GLMT · Finance" },
      value: "3,890₮",
      change: same("▼ 0.51%"),
      dir: "down",
    },
    {
      name: { mn: "Эрдэнэ ресурс", en: "Erdene Resource" },
      sub: { mn: "ERDN · Уул уурхай", en: "ERDN · Mining" },
      value: "412₮",
      change: same("▲ 1.23%"),
      dir: "up",
    },
    {
      name: { mn: "Хөрөнгө оруулалт", en: "Trading Volume" },
      sub: { mn: "Өдрийн нийт арилжаа", en: "Total daily turnover" },
      value: "2.4 тэрбум₮",
      change: { mn: "1,284 гүйлгээ", en: "1,284 transactions" },
      dir: "flat",
    },
  ] satisfies Tick[],
};

/* ------------------------------------------------- live market board (MSE) */

export const market = {
  eyebrow: { mn: "Зах зээл", en: "Market" },
  title: { mn: "Үнэт цаасны арилжаа", en: "Securities trading" },
  lead: {
    mn: "Монголын хөрөнгийн биржийн сүүлийн арилжааны мэдээлэл шууд татагдана.",
    en: "Latest trading data, pulled directly from the Mongolian Stock Exchange.",
  },
  tabs: {
    stock: { mn: "ХУВЬЦАА", en: "SHARES" },
    bond: { mn: "БОНД", en: "BONDS" },
    abs: { mn: "ХБҮЦ", en: "ABS" },
  },
  views: {
    up: { mn: "Өссөн", en: "Gainers" },
    down: { mn: "Буурсан", en: "Losers" },
    amount: { mn: "Арилжааны дүн", en: "Turnover" },
  },
  columns: {
    symbol: { mn: "Симбол", en: "Symbol" },
    name: { mn: "Нэр", en: "Name" },
    price: { mn: "Үнэ", en: "Price" },
    amount: { mn: "Дүн", en: "Turnover" },
    percent: { mn: "Хувь", en: "Percent" },
    change: { mn: "Өөрчлөлт", en: "Change" },
  },
  empty: {
    mn: "Сүүлийн арилжаагаар энэ ангилалд гүйлгээ бүртгэгдээгүй байна.",
    en: "No trades were recorded in this category in the latest session.",
  },
  offline: {
    mn: "МХБ-ийн мэдээлэл түр татагдахгүй байна. Дараа дахин оролдоно уу.",
    en: "MSE data is temporarily unavailable. Please try again shortly.",
  },
  source: { mn: "Эх сурвалж: mse.mn", en: "Source: mse.mn" },
  viewAll: { mn: "МХБ дээр бүгдийг харах →", en: "View all on the MSE →" },
  disclosures: {
    title: { mn: "Компанийн мэдээлэл", en: "Company disclosures" },
    lead: {
      mn: "Бүртгэлтэй компаниудын МХБ-д сүүлд ирүүлсэн мэдээлэл.",
      en: "The latest filings submitted to the exchange by listed companies.",
    },
  },
  indices: {
    top20: { mn: "ТОП-20 индекс", en: "TOP-20 Index" },
    mseA: { mn: "МХБ-А индекс", en: "MSE-A Index" },
    mseB: { mn: "МХБ-Б индекс", en: "MSE-B Index" },
  },
};

/* ------------------------------------------------------------------- about */

export const about = {
  eyebrow: { mn: "Бидний тухай", en: "About Us" },
  title: { mn: "Танилцуулга", en: "Overview" },
  paragraphs: [
    {
      mn: "«Нэйшнл Сэкюритис» ҮЦК ХХК нь 2007 оны 3-р сарын 15-нд Улаанбаатарт байгуулагдаж, Брокер, Дилер, Хөрөнгө оруулалтын зөвлөх эрхээ авснаар үнэт цаасны зах зээлд зохицуулалттай үйл ажиллагаа явуулж эхэлсэн, Монголын хөрөнгийн биржийн гишүүн байгууллага юм. 2011 онд Андеррайтерийн эрх, Өмнөговь салбарын эрхийг нэмж авч, 2020 онд Номинал дансны үйлчилгээг нэвтрүүлснээр харилцагчдынхаа хэрэгцээг илүү өргөн хүрээнд хангах боломжтой болсон. 2022 онд хувьцааныхаа 96 хувийг шинэ хөрөнгө оруулагч эзэмшиж, шинэ удирдлагын багтайгаар компанийн хөгжлийн шинэ шатанд гарсан.",
      en: "National Securities LLC was founded in Ulaanbaatar on March 15, 2007, and began regulated operations in the securities market after obtaining Broker, Dealer, and Investment Advisory licenses — making it a member organization of the Mongolian Stock Exchange. In 2011 it added an Underwriter license and an Umnugovi branch license, and in 2020 it introduced Nominee Account services, allowing it to serve customers' needs even more broadly. In 2022, 96% of its shares were acquired by new investors, and with a new management team the company entered a new stage of development.",
    },
    {
      mn: "Монголын хөрөнгийн биржийн нийт 52 гишүүн компанийн дотроос Брокер, Дилер, Хөрөнгө оруулалтын зөвлөх, Андеррайтер, Номинал данс гэсэн бүх 5 төрлийн тусгай зөвшөөрлийг бүрэн эзэмшдэг ердөө 9 компанийн нэг нь бид билээ. 2025 оны 4-р сарын байдлаар нийт идэвхтэй 12,951 харилцагчтайгаар үйл ажиллагаа явуулж, үнэт цаасны зуучлалын болон хөрөнгө оруулалтын банкны цогц үйлчилгээг харилцагчиддаа хүргэж байна.",
      en: "We are one of only 9 companies out of the Mongolian Stock Exchange's 52 member companies that fully hold all 5 types of special licenses — Broker, Dealer, Investment Advisor, Underwriter, and Nominee Account. As of April 2025 we serve 12,951 active clients, delivering comprehensive securities brokerage and investment banking services.",
    },
  ],
  motto: {
    mn: '"Тогтвортой өсөлт, найдвартай түнш"',
    en: '"Stable growth, a reliable partner"',
  },
  values: [
    {
      title: { mn: "Эрхэм зорилго", en: "Mission" },
      body: {
        mn: "Харилцагчдынхаа хөрөнгийг өсгөн нэмэгдүүлэхэд тэдэнтэй хамт зүтгэж, мэдээлэлд суурилсан, ухаалаг хөрөнгө оруулалтын соёлыг түгээх.",
        en: "To stand alongside our clients in growing their wealth, and to promote an informed, intelligent investment culture.",
      },
    },
    {
      title: { mn: "Алсын хараа", en: "Vision" },
      body: {
        mn: "Монголын үнэт цаасны зах зээлд тэргүүлэгч, олон улсын стандартад нийцсэн брокер, хөрөнгө оруулалтын байгууллага болох.",
        en: "To become a leading broker and investment institution in Mongolia's securities market that meets international standards.",
      },
    },
    {
      title: { mn: "Үнэт зүйл", en: "Values" },
      body: {
        mn: "Бид хариуцлагатайгаар үйл ажиллагаагаа явуулж, харилцагчдынхаа итгэлийг эрхэмлэн, мэдлэг чадвараа дайчилж, шударга бөгөөд хурдан шийдлээр үйлчилгээгээ хүргэдэг.",
        en: "We operate responsibly, hold our clients' trust in the highest regard, mobilize our knowledge and skills, and deliver honest, fast securities market services.",
      },
    },
    {
      title: { mn: "Хамтын ажиллагаа", en: "Collaboration" },
      body: {
        mn: "Харилцагч, түнш байгууллагуудтайгаа хамтран ажиллаж, хамтын хүчээр илүү их үнэ цэнийг бүтээдэг.",
        en: "We work together with our clients and partner organizations, creating greater value through joint effort.",
      },
    },
  ],
};

/* -------------------------------------------------------------- leadership */

export const leadership = {
  eyebrow: { mn: "Удирдлага", en: "Leadership" },
  title: { mn: "Удирдах албан тушаалтан", en: "Executive Officer" },
  ceo: {
    initials: "ДР",
    name: same("Д. Ринчиндорж"),
    role: "CEO",
  },
};

/* ------------------------------------------------------------ achievements */

export const achievements = {
  eyebrow: { mn: "Бидний тухай", en: "About Us" },
  title: { mn: "Ололт амжилт", en: "Achievements" },
  lead: {
    mn: "Бид амжилттай зохион байгуулсан бонд болон зөвлөх үйлчилгээний туршлагаас.",
    en: "A track record of bond issuances and advisory mandates we have successfully arranged.",
  },
  groups: [
    {
      title: { mn: "Бонд босгосон туршлага", en: "Bond Issuance Experience" },
      deals: [
        {
          year: "2020",
          client: {
            mn: "Хатан суудал Инвест ББСБ ХХК",
            en: "Khatan Suudal Invest NBFI LLC",
          },
          note: { mn: "1 тэрбум төгрөгийн бонд", en: "1 billion ₮ bond" },
        },
        {
          year: "2021",
          client: { mn: "Төгс Процесс ХХК", en: "Tugs Process LLC" },
          note: { mn: "6 тэрбум төгрөгийн бонд", en: "6 billion ₮ bond" },
        },
      ],
    },
    {
      title: {
        mn: "Зөвлөх үйлчилгээний туршлага",
        en: "Advisory Services Experience",
      },
      deals: [
        {
          year: "2021",
          client: { mn: "Оптимал Эн Макс ХХК", en: "Optimal En Max LLC" },
          note: { mn: "Зөвлөх үйлчилгээ", en: "Advisory services" },
        },
        {
          year: "2021",
          client: { mn: "Тэлмэн Групп Д ХХК", en: "Telmen Group D LLC" },
          note: { mn: "Зөвлөх үйлчилгээ", en: "Advisory services" },
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- services */

export const services = {
  eyebrow: { mn: "Үйлчилгээ", en: "Services" },
  title: {
    mn: "Хөрөнгө оруулалтын бүх шатанд",
    en: "At every stage of investing",
  },
  lead: {
    mn: "Хувь хүн, байгууллагын харилцагчдад зориулсан лицензтэй үйлчилгээ.",
    en: "Licensed services for individual and institutional clients.",
  },
  more: { mn: "Дэлгэрэнгүй →", en: "Learn more →" },
  cards: [
    {
      title: { mn: "Брокер", en: "Broker" },
      body: {
        mn: "МХБ-ийн арилжааны системтэй шууд холбогдсон платформоор хоцрогдолгүй арилжаа хийнэ.",
        en: "Trade without delay through a platform directly connected to the MSE trading system.",
      },
      bullets: [
        { mn: "Дотоод арилжаанд оролцох", en: "Domestic trading" },
        { mn: "Онлайн арилжааны систем", en: "Online trading system" },
      ],
    },
    {
      title: { mn: "Андеррайтер", en: "Underwriter" },
      body: {
        mn: "Компанийн хувьцаа, бондыг зах зээлд гаргах бүх үе шатыг хариуцна.",
        en: "We manage every stage of bringing a company's shares or bonds to market.",
      },
      bullets: [
        {
          mn: "Хувьцааны санхүүжилт (IPO, FPO)",
          en: "Equity financing (IPO, FPO)",
        },
        { mn: "Бондын санхүүжилт", en: "Bond financing" },
      ],
    },
    {
      title: { mn: "Хөрөнгө оруулалтын зөвлөгөө", en: "Investment Advisory" },
      body: {
        mn: "Эрсдэл даах чадвар, зорилгод тань тохирсон багц бүрдүүлж, тогтмол хянана.",
        en: "We build a portfolio suited to your risk tolerance and goals, and monitor it continuously.",
      },
      bullets: [
        { mn: "Зөвлөх үйлчилгээ", en: "Advisory services" },
        { mn: "Хувийн санхүүжилт", en: "Personal financing" },
      ],
    },
    {
      title: { mn: "Харилцагчийн туслах", en: "Customer Support" },
      body: {
        mn: "Данс нээхээс ногдол ашиг авах хүртэл алхам бүрийн заавар.",
        en: "Guidance for every step, from opening an account to receiving dividends.",
      },
      bullets: [
        {
          mn: "Данс нээх, IPO-д оролцох заавар",
          en: "Account opening & IPO participation guide",
        },
        {
          mn: "Мөнгө байршуулах, татах, данс цэнэглэх",
          en: "Deposits, withdrawals & top-ups",
        },
        { mn: "Ногдол ашиг авах", en: "Receiving dividends" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------- stats */

export const stats = [
  {
    value: "12",
    label: {
      mn: "Жил тасралтгүй үйл ажиллагаа",
      en: "Years of continuous operation",
    },
  },
  {
    value: "18,400+",
    label: { mn: "Идэвхтэй харилцагчийн данс", en: "Active client accounts" },
  },
  {
    value: "640",
    label: {
      mn: "Жилийн арилжааны дүн (тэрбум₮)",
      en: "Annual trading volume (billion ₮)",
    },
  },
  {
    value: "27",
    label: { mn: "Зохион байгуулсан IPO, бонд", en: "IPOs & bonds arranged" },
  },
];

/* ---------------------------------------------------------------- research */

export const research = {
  eyebrow: { mn: "Судалгаа, шинжилгээ", en: "Research & Analysis" },
  title: { mn: "Гурван түвшний шинжилгээ", en: "Three levels of analysis" },
  all: { mn: "Бүх судалгаа →", en: "All research →" },
  items: [
    {
      date: "2026.07.20",
      title: {
        mn: "Макро орчны судалгаа — инфляци, бодлогын хүү, төсвийн тэнцэл",
        en: "Macro research — inflation, policy rate, fiscal balance",
      },
      tag: { mn: "Макро орчин", en: "Macro" },
    },
    {
      date: "2026.07.14",
      title: {
        mn: "Үнэт цаасны судалгаа — компани тус бүрийн үнэлгээ, зорилтот үнэ",
        en: "Securities research — company valuations, target prices",
      },
      tag: { mn: "Үнэт цаас", en: "Securities" },
    },
    {
      date: "2026.07.22",
      title: {
        mn: "Долоо хоногийн тойм — арилжааны идэвх, гол хөдөлгөөн",
        en: "Weekly review — trading activity, key movements",
      },
      tag: { mn: "7 хоног", en: "Weekly" },
    },
  ],
  reports: {
    eyebrow: { mn: "Судалгаа", en: "Research" },
    title: { mn: "Шинжээчийн тайлан", en: "Analyst Reports" },
    lead: {
      mn: "Манай судалгааны баг сар бүр макро орчин, үнэт цаас, долоо хоногийн зах зээлийн тойм гаргадаг.",
      en: "Our research team publishes macro, securities, and weekly market reviews every month.",
    },
    files: [
      {
        title: {
          mn: "Монголын эдийн засгийн макро орчны тойм",
          en: "Mongolia's macroeconomic review",
        },
        meta: "PDF · 2.1MB",
      },
      {
        title: {
          mn: "МХБ-д бүртгэлтэй компаниудын үнэт цаасны судалгаа",
          en: "Securities research on MSE-listed companies",
        },
        meta: "PDF · 1.6MB",
      },
      {
        title: {
          mn: "Бондын зах зээлийн өгөөжийн муруй",
          en: "Bond market yield curve",
        },
        meta: "PDF · 940KB",
      },
      {
        title: {
          mn: "Долоо хоногийн тойм — 07/22",
          en: "Weekly review — 07/22",
        },
        meta: "PDF · 620KB",
      },
    ],
  },
};

/* ------------------------------------------------------------ guides & faq */

export const guides = {
  eyebrow: { mn: "Харилцагчийн туслах", en: "Customer Support" },
  title: { mn: "Алхам алхмаар заавар", en: "Step-by-step guides" },
  lead: {
    mn: "Данс нээхээс эхлээд арилжаанд оролцох, ногдол ашиг авах хүртэл танд хэрэгтэй бүх зүйл.",
    en: "Everything you need, from opening an account to trading and receiving your dividends.",
  },
  steps: [
    {
      title: { mn: "Данс нээх", en: "Open an account" },
      body: {
        mn: "Бүртгэлийн маягт бөглөж, иргэний үнэмлэхийн хуулбарыг онлайнаар эсвэл манай оффис дээр ирүүлнэ. Баталгаажуулалт 24 цагийн дотор хийгдэж, дараа нь таны арилжааны данс идэвхжинэ.",
        en: "Fill in the registration form and submit a copy of your national ID online or at our office. Verification takes place within 24 hours, after which your trading account is activated.",
      },
    },
    {
      title: { mn: "МХБ-ийн арилжаанд оролцох", en: "Trade on the MSE" },
      body: {
        mn: "Онлайн арилжааны систем эсвэл апп-аар нэвтэрч, сонгосон үнэт цаасныхаа авах/зарах захиалгыг байршуулаад, гүйцэтгэлийг бодит цагт хянана.",
        en: "Log in to the online trading system or app, place a buy/sell order for the security of your choice, and track execution in real time.",
      },
    },
    {
      title: {
        mn: "IPO-д хэрхэн оролцох вэ",
        en: "How to participate in an IPO",
      },
      body: {
        mn: "Идэвхтэй IPO-гийн жагсаалтыг харж, захиалгын хугацаанд багтаан захиалгаа өгөөд, хуваарилалтын үр дүнг хүлээнэ.",
        en: "Check the list of active IPOs, submit your subscription order within the offer period, then wait for the allocation result.",
      },
    },
    {
      title: { mn: "Мөнгө байршуулах, татах", en: "Deposits & withdrawals" },
      body: {
        mn: "Хувийн дансны дугаараа ашиглан банкны шилжүүлгээр мөнгөө байршуулах, эсвэл татах хүсэлт гаргах боломжтой бөгөөд аль аль нь нэг ажлын өдрийн дотор шийдэгдэнэ.",
        en: "Transfer funds to your account via bank transfer using your personal account number, or request a withdrawal — both are processed within one business day.",
      },
    },
    {
      title: { mn: "Данс цэнэглэх", en: "Top up your account" },
      body: {
        mn: "Арилжааны системээр онлайнаар, эсвэл манай оффис дээр бэлнээр гэсэн хоёр сонголтоор дансаа цэнэглэх боломжтой.",
        en: "Top up online through the trading platform, or in cash at our office — whichever is more convenient for you.",
      },
    },
    {
      title: { mn: "Ногдол ашиг авах", en: "Receiving dividends" },
      body: {
        mn: "Ногдол ашиг нь тухайн компанийн тогтоосон хуваарийн дагуу, бүртгэлийн өдрөөр таны данс руу автоматаар шилжинэ.",
        en: "Dividends are automatically credited to your account on the record date, according to the timeline set by the issuing company.",
      },
    },
  ],
};

export const faq = {
  eyebrow: { mn: "Түгээмэл асуулт", en: "FAQ" },
  title: { mn: "Түгээмэл асуулт хариулт", en: "Frequently Asked Questions" },
  lead: {
    mn: "Хамгийн олон асуудаг асуултын товч хариултууд.",
    en: "Quick answers to the questions we hear most often.",
  },
  items: [
    {
      q: {
        mn: "Данс нээхэд хэдий хугацаа шаардагдах вэ?",
        en: "How long does it take to open an account?",
      },
      a: {
        mn: "Онлайн бүртгүүлэхэд хэдхэн минут зарцуулагдана; баталгаажуулалт, идэвхжүүлэлт 24 цагийн дотор хийгдэнэ.",
        en: "Online registration takes a few minutes; verification and activation are completed within 24 hours.",
      },
    },
    {
      q: {
        mn: "Хамгийн бага хэдэн төгрөгөөр эхэлж болох вэ?",
        en: "What's the minimum amount to start with?",
      },
      a: {
        mn: "Тогтсон доод хэмжээ байхгүй — өөрийн төсөвт тохирсон дүнгээр эхэлж болно.",
        en: "There is no fixed minimum — you can start with an amount that suits your own budget.",
      },
    },
    {
      q: {
        mn: "Гадаад иргэн данс нээж болох уу?",
        en: "Can a foreign national open an account?",
      },
      a: {
        mn: "Тийм. Гадаад иргэн шаардлагатай бичиг баримтаа бүрдүүлснээр данс нээх боломжтой.",
        en: "Yes. Foreign nationals can open an account by providing the required identification documents.",
      },
    },
    {
      q: {
        mn: "Арилжааны шимтгэл хэд вэ?",
        en: "What are the trading commission fees?",
      },
      a: {
        mn: "Шимтгэл нь арилжааны төрөл, гүйлгээний хэмжээнээс хамаарна — одоогийн хувь хэмжээг мэдэхийг бидэнтэй холбогдоно уу.",
        en: "Fees depend on the type of trade and transaction volume — please contact us for the current rate.",
      },
    },
  ],
};

/* ----------------------------------------------------------------- contact */

export const contact = {
  eyebrow: { mn: "Харилцагчийн туслах", en: "Customer Support" },
  title: { mn: "Холбоо барих", en: "Contact" },
  rows: [
    {
      label: { mn: "Хаяг", en: "Address" },
      value: {
        mn: "Монгол Улаанбаатар хот, Сүхбаатар дүүрэг, Eco Tower, 9 давхарт 904",
        en: "Eco Tower, 9th floor, Room 904, Sukhbaatar District, Ulaanbaatar, Mongolia",
      },
    },
    {
      label: { mn: "Утас", en: "Phone" },
      value: same("7709 7070, 7706 707"),
    },
    {
      label: { mn: "И-мэйл", en: "Email" },
      value: same("info@natsec.mn"),
    },
  ],
};

/* ------------------------------------------------------------------ footer */

export const footer = {
  address: {
    mn: "«Нэйшнл сэкюритис ҮЦК» ХХК\nУлаанбаатар хот, Сүхбаатар дүүрэг,\nEco Tower, 9 давхарт 904\n\nУтас: 7709 7070, 7706 707\nИ-мэйл: info@natsec.mn",
    en: '"National Securities" LLC\nSukhbaatar District, Ulaanbaatar,\nEco Tower, 9th floor, Room 904\n\nPhone: 7709 7070, 7706 707\nEmail: info@natsec.mn',
  },
  columns: [
    {
      title: { mn: "БИДНИЙ ТУХАЙ", en: "ABOUT US" },
      links: [
        { label: { mn: "Танилцуулга", en: "Overview" }, href: "#tanilcuulga" },
        {
          label: { mn: "Удирдах албан тушаалтан", en: "Leadership" },
          href: "#udirdlaga",
        },
        { label: { mn: "Ололт амжилт", en: "Achievements" }, href: "#ololt" },
        {
          label: { mn: "Санхүүгийн тайлан", en: "Financial Reports" },
          href: "#",
        },
      ],
    },
    {
      title: { mn: "ҮЙЛЧИЛГЭЭ", en: "SERVICES" },
      links: [
        { label: { mn: "Брокер", en: "Broker" }, href: "#" },
        { label: { mn: "Андеррайтер", en: "Underwriter" }, href: "#" },
        {
          label: { mn: "Хөрөнгө оруулалтын зөвлөгөө", en: "Investment Advisory" },
          href: "#",
        },
      ],
    },
    {
      title: { mn: "СУДАЛГАА", en: "RESEARCH" },
      links: [
        { label: { mn: "Макро орчны судалгаа", en: "Macro Research" }, href: "#" },
        {
          label: { mn: "Үнэт цаасны судалгаа", en: "Securities Research" },
          href: "#",
        },
        { label: { mn: "Долоо хоногийн тойм", en: "Weekly Review" }, href: "#" },
      ],
    },
    {
      title: { mn: "ХАРИЛЦАГЧИЙН ТУСЛАХ", en: "CUSTOMER SUPPORT" },
      links: [
        { label: { mn: "Заавар", en: "Guides" }, href: "#zaavar" },
        {
          label: { mn: "Мөнгө байршуулах, татах", en: "Deposits & Withdrawals" },
          href: "#zaavar",
        },
        {
          label: { mn: "Ногдол ашиг авах", en: "Receiving Dividends" },
          href: "#zaavar",
        },
        { label: { mn: "Холбоо барих", en: "Contact" }, href: "#holboo-barih" },
      ],
    },
    {
      title: { mn: "ТОГТВОРТОЙ ХӨГЖИЛ", en: "SUSTAINABILITY" },
      links: [
        {
          label: {
            mn: "Тогтвортой хөгжлийн бодлого (ESG)",
            en: "Sustainability Policy (ESG)",
          },
          href: "#",
        },
        { label: { mn: "Нууцлалын бодлого", en: "Privacy Policy" }, href: "#" },
        {
          label: { mn: "Үйлчилгээний нөхцөл", en: "Terms of Service" },
          href: "#",
        },
      ],
    },
  ],
  disclaimerLabel: { mn: "Анхааруулга.", en: "Warning." },
  disclaimer: {
    mn: "Хөрөнгө оруулалт нь эрсдэлтэй. Үнэт цаасны үнэ өсөх, буурах боломжтой бөгөөд өнгөрсөн үеийн өгөөж ирээдүйн үр дүнг баталгаажуулахгүй. Энэ сайт дахь мэдээлэл нь хөрөнгө оруулалтын зөвлөгөө биш бөгөөд шийдвэрээ гаргахын өмнө мэргэжлийн зөвлөхтэй зөвлөнө үү. Компани нь Санхүүгийн зохицуулах хорооны тусгай зөвшөөрлийн дагуу үйл ажиллагаа явуулдаг.",
    en: "Investing carries risk. Securities prices can rise or fall, and past performance does not guarantee future results. Information on this site is not investment advice; please consult a professional advisor before making decisions. The company operates under a license from the Financial Regulatory Commission.",
  },
  copyright: {
    mn: "© 2026 «Нэйшнл сэкюритис ҮЦК» ХХК. Бүх эрх хуулиар хамгаалагдсан.",
    en: "© 2026 National Securities LLC. All rights reserved.",
  },
};
