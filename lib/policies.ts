import type { Route } from "@/components/router";
import type { Bi } from "@/lib/guides";

export interface Policy {
  route: Extract<Route, `tog-hugjil-${string}`>;
  title: Bi;
  /** Shortened body used on the Sustainability index card. */
  card: Bi;
  /** Link label on the index card. */
  cta: Bi;
  lead: Bi;
  points: Bi[];
}

export const POLICIES: Policy[] = [
  {
    route: "tog-hugjil-esg",
    title: {
      mn: "Тогтвортой хөгжлийн бодлого (ESG)",
      en: "Sustainability Policy (ESG)",
    },
    card: {
      mn: "Байгаль орчин, нийгэм, засаглалын зарчмуудыг үйл ажиллагаандаа тусган ажилладаг — хариуцлагатай хөрөнгө оруулалтын дадлагаас эхлээд харилцагчдад шударгаар хандах, компанийн засаглалыг ил тод байлгах хүртэл.",
      en: "We integrate environmental, social, and governance principles into our operations — from responsible investment practices to fair treatment of clients and transparent corporate governance.",
    },
    cta: { mn: "Бодлоготой танилцах →", en: "Read the policy →" },
    lead: {
      mn: "Бид байгаль орчин, нийгэм, засаглалын (ESG) зарчмуудыг үйл ажиллагааныхаа бүх түвшинд тусган ажилладаг бөгөөд хариуцлагатай бизнесийн дадал нь харилцагч, хувьцаа эзэмшигч, нийгэмд урт хугацааны үнэ цэнийг бий болгодог гэдэгт итгэдэг.",
      en: "We integrate environmental, social, and governance (ESG) principles into every level of our operations, believing that responsible business practices create lasting value for our clients, shareholders, and society.",
    },
    points: [
      {
        mn: "Байгаль орчин — боломжтой тохиолдолд хариуцлагатай, тогтвортой хөрөнгө оруулалтын бүтээгдэхүүнийг илүүд үзэх",
        en: "Environmental — favoring responsible, sustainable investment products where possible",
      },
      {
        mn: "Нийгэм — харилцагч бүрт шударгаар хандаж, эрх ашгийг нь хамгаалах",
        en: "Social — treating every client fairly and protecting their interests",
      },
      {
        mn: "Засаглал — ил тод, хариуцлагатай компанийн удирдлага",
        en: "Governance — transparent, accountable corporate management",
      },
    ],
  },
  {
    route: "tog-hugjil-privacy",
    title: { mn: "Нууцлалын бодлого", en: "Privacy Policy" },
    card: {
      mn: "Таны хувийн болон санхүүгийн мэдээллийг зөвхөн үйлчилгээгээ үзүүлэх, хууль тогтоомжийн шаардлагыг хангах зорилгоор цуглуулж, хадгалдаг бөгөөд хууль тогтоомжийн дагуу хамгаалж, таны зөвшөөрөлгүйгээр гуравдагч этгээдэд дамжуулдаггүй.",
      en: "Your personal and financial information is collected and used only to provide our services and meet regulatory requirements, and is protected in accordance with applicable law and never shared with third parties without your consent.",
    },
    cta: { mn: "Бодлоготой танилцах →", en: "Read the policy →" },
    lead: {
      mn: "Таны хувийн болон санхүүгийн мэдээллийг зөвхөн үйлчилгээгээ үзүүлэх, зохицуулагчийн шаардлагыг хангах зорилгоор цуглуулж ашигладаг. Бид үүнийг хууль тогтоомжийн дагуу хамгаалж, таны зөвшөөрөлгүйгээр гуравдагч этгээдэд хэзээ ч дамжуулдаггүй.",
      en: "Your personal and financial information is collected and used only to provide our services and meet regulatory requirements. We protect it in accordance with applicable law and never share it with third parties without your consent.",
    },
    points: [
      {
        mn: "Юу цуглуулдаг: үнэмлэхийн мэдээлэл, холбоо барих мэдээлэл, арилжааны түүх",
        en: "What we collect: ID details, contact info, and trading activity",
      },
      {
        mn: "Юунд: таны данс нээх, арилжаа гүйцэтгэх, зохицуулалтын шаардлага хангах",
        en: "Why: to open your account, execute trades, and comply with regulation",
      },
      {
        mn: "Таны эрх: мэдээллээ хүссэн үедээ харах, засварлуулах хүсэлт гаргах боломжтой",
        en: "Your rights: you can request to view or correct your data at any time",
      },
    ],
  },
  {
    route: "tog-hugjil-terms",
    title: { mn: "Үйлчилгээний нөхцөл", en: "Terms of Service" },
    card: {
      mn: "Үйлчилгээний нөхцөл нь брокер, андеррайтер, зөвлөх үйлчилгээг ашиглахад компани болон харилцагчийн аль алиных нь эрх, үүргийг тодорхойлно.",
      en: "Our terms of service set out the rights and obligations of both the company and the client when using our brokerage, underwriting, and advisory services.",
    },
    cta: { mn: "Нөхцөлтэй танилцах →", en: "Read the terms →" },
    lead: {
      mn: "Үйлчилгээний нөхцөл нь брокер, андеррайтер, зөвлөх үйлчилгээг ашиглахад компани болон харилцагчийн аль алиных нь эрх, үүргийг тодорхойлж, харилцагч бүртэй ажиллах харилцааны үндэс болдог.",
      en: "Our terms of service set out the rights and obligations of both the company and the client when using our brokerage, underwriting, and advisory services, and form the basis of our working relationship with every client.",
    },
    points: [
      {
        mn: "Харилцагч өгсөн мэдээллийнхээ үнэн зөвийг хариуцна",
        en: "The client is responsible for the accuracy of information provided",
      },
      {
        mn: "Компани захиалгыг шударгаар, зах зээлийн журмын дагуу гүйцэтгэнэ",
        en: "The company executes orders in good faith and in line with market rules",
      },
      {
        mn: "Шимтгэл, хураамжийг арилжаанаас өмнө мэдэгдэнэ",
        en: "Fees and charges are disclosed before you trade",
      },
    ],
  },
];
