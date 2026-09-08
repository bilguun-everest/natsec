import type { Route } from "@/components/router";
import type { Bi } from "@/lib/guides";

export interface Policy {
  route: Extract<Route, `tog-hugjil-${string}`>;
  title: Bi;
  /** One-line teaser on the Sustainability index card — the policy itself
   *  is `lead` + `points` on the detail page. Kept to roughly 80 characters:
   *  a card column is only ~40 characters wide, so a long blurb turns into
   *  five lines of heavy rag, and the three cards stop matching. */
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
      en: "Sustainability Policy (ESG)", ja: "サステナビリティ方針（ESG）",
    },
    card: {
      mn: "Байгаль орчин, нийгэм, засаглалын зарчмыг үйл ажиллагаандаа хэрхэн тусгадаг тухай.",
      en: "How we build environmental, social and governance principles into our work.", ja: "環境・社会・ガバナンスの原則を、業務にどう組み込んでいるか。",
    },
    cta: { mn: "Бодлоготой танилцах →", en: "Read the policy →", ja: "方針を読む →" },
    lead: {
      mn: "Бид байгаль орчин, нийгэм, засаглалын (ESG) зарчмуудыг үйл ажиллагааныхаа бүх түвшинд тусган ажилладаг бөгөөд хариуцлагатай бизнесийн дадал нь харилцагч, хувьцаа эзэмшигч, нийгэмд урт хугацааны үнэ цэнийг бий болгодог гэдэгт итгэдэг.",
      en: "We integrate environmental, social, and governance (ESG) principles into every level of our operations, believing that responsible business practices create lasting value for our clients, shareholders, and society.", ja: "当社は、環境・社会・ガバナンス（ESG）の原則を業務のあらゆる階層に組み込んでいます。責任ある事業運営こそが、お客様、株主、社会に長く続く価値を生むと考えるからです。",
    },
    points: [
      {
        mn: "Байгаль орчин — боломжтой тохиолдолд хариуцлагатай, тогтвортой хөрөнгө оруулалтын бүтээгдэхүүнийг илүүд үзэх",
        en: "Environmental — favoring responsible, sustainable investment products where possible", ja: "環境 — 可能な限り、責任ある持続可能な投資商品を優先します",
      },
      {
        mn: "Нийгэм — харилцагч бүрт шударгаар хандаж, эрх ашгийг нь хамгаалах",
        en: "Social — treating every client fairly and protecting their interests", ja: "社会 — すべてのお客様を公正に扱い、その利益を守ります",
      },
      {
        mn: "Засаглал — ил тод, хариуцлагатай компанийн удирдлага",
        en: "Governance — transparent, accountable corporate management", ja: "ガバナンス — 透明で説明責任のある企業経営",
      },
    ],
  },
  {
    route: "tog-hugjil-privacy",
    title: { mn: "Нууцлалын бодлого", en: "Privacy Policy", ja: "プライバシーポリシー" },
    card: {
      mn: "Таны хувийн мэдээллийг хэрхэн цуглуулж, хадгалж, хамгаалдгийг тодорхой заасан.",
      en: "How your personal and financial information is collected, held and protected.", ja: "お客様の個人情報および金融情報を、どのように取得し、保管し、保護しているか。",
    },
    cta: { mn: "Бодлоготой танилцах →", en: "Read the policy →", ja: "方針を読む →" },
    lead: {
      mn: "Таны хувийн болон санхүүгийн мэдээллийг зөвхөн үйлчилгээгээ үзүүлэх, зохицуулагчийн шаардлагыг хангах зорилгоор цуглуулж ашигладаг. Бид үүнийг хууль тогтоомжийн дагуу хамгаалж, таны зөвшөөрөлгүйгээр гуравдагч этгээдэд хэзээ ч дамжуулдаггүй.",
      en: "Your personal and financial information is collected and used only to provide our services and meet regulatory requirements. We protect it in accordance with applicable law and never share it with third parties without your consent.", ja: "お客様の個人情報および金融情報は、当社のサービス提供と法令上の要件を満たす目的にのみ取得・使用します。関係法令に従って保護し、ご同意なく第三者に提供することはありません。",
    },
    points: [
      {
        mn: "Юу цуглуулдаг: үнэмлэхийн мэдээлэл, холбоо барих мэдээлэл, арилжааны түүх",
        en: "What we collect: ID details, contact info, and trading activity", ja: "取得する情報：本人確認情報、連絡先、取引履歴",
      },
      {
        mn: "Юунд: таны данс нээх, арилжаа гүйцэтгэх, зохицуулалтын шаардлага хангах",
        en: "Why: to open your account, execute trades, and comply with regulation", ja: "利用目的：口座開設、取引の執行、法令の遵守",
      },
      {
        mn: "Таны эрх: мэдээллээ хүссэн үедээ харах, засварлуулах хүсэлт гаргах боломжтой",
        en: "Your rights: you can request to view or correct your data at any time", ja: "お客様の権利：いつでもご自身の情報の閲覧・訂正を請求できます",
      },
    ],
  },
  {
    route: "tog-hugjil-terms",
    title: { mn: "Үйлчилгээний нөхцөл", en: "Terms of Service", ja: "利用規約" },
    card: {
      mn: "Компани болон харилцагчийн аль алиных нь эрх, үүргийг тодорхойлсон.",
      en: "The rights and obligations of both the company and the client, set out in full.", ja: "会社とお客様双方の権利と義務を、余さず定めています。",
    },
    cta: { mn: "Нөхцөлтэй танилцах →", en: "Read the terms →", ja: "規約を読む →" },
    lead: {
      mn: "Үйлчилгээний нөхцөл нь брокер, андеррайтер, зөвлөх үйлчилгээг ашиглахад компани болон харилцагчийн аль алиных нь эрх, үүргийг тодорхойлж, харилцагч бүртэй ажиллах харилцааны үндэс болдог.",
      en: "Our terms of service set out the rights and obligations of both the company and the client when using our brokerage, underwriting, and advisory services, and form the basis of our working relationship with every client.", ja: "当社の利用規約は、ブローカー、引受、アドバイザリーの各サービスをご利用いただく際の、会社とお客様双方の権利と義務を定めるもので、すべてのお客様との取引関係の基礎となります。",
    },
    points: [
      {
        mn: "Харилцагч өгсөн мэдээллийнхээ үнэн зөвийг хариуцна",
        en: "The client is responsible for the accuracy of information provided", ja: "提供された情報の正確性についてはお客様が責任を負います",
      },
      {
        mn: "Компани захиалгыг шударгаар, зах зээлийн журмын дагуу гүйцэтгэнэ",
        en: "The company executes orders in good faith and in line with market rules", ja: "会社は誠実に、市場規則に沿って注文を執行します",
      },
      {
        mn: "Шимтгэл, хураамжийг арилжаанаас өмнө мэдэгдэнэ",
        en: "Fees and charges are disclosed before you trade", ja: "手数料および費用は取引の前に開示されます",
      },
    ],
  },
];
