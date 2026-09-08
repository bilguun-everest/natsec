import type { Route } from "@/components/router";
import type { Bi } from "@/lib/guides";

export interface FaqEntry {
  route: Extract<Route, `faq-${string}`>;
  question: Bi;
  answer: Bi;
  points?: Bi[];
}

export const FAQ: FaqEntry[] = [
  {
    route: "faq-1",
    question: {
      mn: "Үнэт цаасны компани (ҮЦК) гэж ямар байгууллага вэ?",
      en: "What exactly is a securities company (ҮЦК)?", ja: "証券会社（ҮЦК）とは何ですか？",
    },
    answer: {
      mn: "Үнэт цаасны компани гэдэг нь Санхүүгийн зохицуулах хорооны тусгай зөвшөөрлөөр брокер, дилер, хөрөнгө оруулалтын зөвлөх, андеррайтерийн үйл ажиллагаа эрхэлдэг мэргэжлийн байгууллага юм. Хөрөнгийн зах зээл дэх зуучлагч гэсэн үг.",
      en: "A securities company is a firm licensed by the Financial Regulatory Commission to act as a broker, dealer, investment advisor and underwriter. In short, it is the intermediary between you and the capital market.", ja: "証券会社とは、ブローカー、ディーラー、投資助言、引受の各業務を行うために金融規制委員会から免許を受けた会社です。ひとことで言えば、お客様と資本市場をつなぐ仲介者です。",
    },
    points: [
      {
        mn: "Таны нэрийн өмнөөс МХБ дээр арилжаа хийж гүйцэтгэдэг",
        en: "Executes trades on your behalf on the exchange", ja: "お客様に代わって取引所で売買を執行します",
      },
      {
        mn: "Компанид санхүүжилт (IPO, FPO, бонд) зохион байгуулдаг",
        en: "Arranges financing (IPO, FPO, bonds) for companies", ja: "企業の資金調達（IPO・FPO・社債）を組成します",
      },
      {
        mn: "Хөрөнгө оруулалтын зөвлөгөө, багцын үйлчилгээ үзүүлдэг",
        en: "Provides investment advice and portfolio services", ja: "投資助言とポートフォリオサービスを提供します",
      },
    ],
  },
  {
    route: "faq-2",
    question: {
      mn: "Үнэт цаасны данс нээхэд ямар данстай холбогдох вэ?",
      en: "What accounts do I need in order to trade?", ja: "取引にはどの口座が必要ですか？",
    },
    answer: {
      mn: "Үнэт цаасны данс нээнэ гэдэг нь Үнэт цаасны төвлөрсөн хадгаламжийн төв (ҮЦТХТ)-д данс нээлгэхийг хэлнэ. Ижил дугаартай төлбөр тооцооны данс банкинд зэрэг нээгдэнэ. Нэг хүн ганц данстай байх ба хэд хэдэн ҮЦК-аар хандаж болно.",
      en: "Opening a securities account means opening one at the Securities Central Depository. A settlement account with the same number opens alongside it at the bank. One person holds one account, reachable through several firms.", ja: "証券口座の開設とは、証券中央預託機関に口座を開くことです。同じ番号の決済口座が銀行に同時に開設されます。口座はお一人につき1つで、複数の証券会社から利用できます。",
    },
    points: [
      {
        mn: "Үнэт цаасны данс — таны хувьцаа, бондыг хадгална",
        en: "Securities account — holds your shares and bonds", ja: "証券口座 — 株式・社債を保管します",
      },
      {
        mn: "Төлбөр тооцооны данс — арилжааны мөнгийг хадгална",
        en: "Settlement account — holds the cash for trading", ja: "決済口座 — 取引に使う資金を保管します",
      },
      {
        mn: "Хоёр данс ижил дугаартай бөгөөд зэрэг нээгддэг",
        en: "Both open together under the same account number", ja: "両方が同じ口座番号で同時に開設されます",
      },
    ],
  },
  {
    route: "faq-3",
    question: {
      mn: "Данс нээхэд ямар бичиг баримт шаардлагатай вэ?",
      en: "What documents do I need to open an account?", ja: "口座開設にはどの書類が必要ですか？",
    },
    answer: {
      mn: "Иргэний үнэмлэх шаардлагатай. Насанд хүрээгүй хүүхдийн хувьд төрсний гэрчилгээ, түүнчлэн хамт ирсэн эцэг эх буюу асран хамгаалагчийн иргэний үнэмлэхийг бүрдүүлнэ. Дансны 5,000₮ хураамжийг данс нээх үедээ төлнө.",
      en: "You will need your national ID. For a minor, a birth certificate plus the accompanying parent or legal guardian's ID is required. A 5,000₮ account fee is paid at the time the account is opened.", ja: "国民IDカードが必要です。未成年の場合は出生証明書と、同伴する親権者または法定後見人の身分証が必要です。口座手数料5,000₮を開設時にお支払いいただきます。",
    },
    points: [
      {
        mn: "Иргэний үнэмлэх (эх хувь эсвэл хуулбар байж болно)",
        en: "National ID, either the original or a copy", ja: "国民IDカード（原本または写し）",
      },
      {
        mn: "Хүүхдэд төрсний гэрчилгээ, асран хамгаалагчийн үнэмлэх",
        en: "For a minor, birth certificate and guardian's ID", ja: "未成年の場合は出生証明書と保護者の身分証",
      },
      {
        mn: "Данс нээх үед 5,000₮-ийн хураамж төлөгдөнө",
        en: "A 5,000₮ fee is paid when the account opens", ja: "開設時に5,000₮の手数料をお支払いいただきます",
      },
    ],
  },
  {
    route: "faq-4",
    question: {
      mn: "Данс нээж арилжаанд ороход хэр хугацаа орох вэ?",
      en: "How long does it take to open an account?", ja: "口座開設にはどのくらいかかりますか？",
    },
    answer: {
      mn: "Онлайн бүртгэл хэдхэн минут зарцуулна. Илгээсэн мэдээлэл, бичиг баримтыг шалгаж баталгаажуулаад дансыг 24 цагийн дотор идэвхжүүлнэ. Түүнээс хойш онлайн систем болон аппаараа арилжаанд орно.",
      en: "Registering online takes only a few minutes. Once the details and documents you send have been checked, the account is verified and activated within 24 hours. From then on you can trade straight away.", ja: "オンラインでの登録は数分で完了します。お送りいただいた情報と書類の確認後、24時間以内に口座が承認され有効になります。その後はすぐに取引を開始できます。",
    },
  },
  {
    route: "faq-5",
    question: {
      mn: "Хамгийн багадаа хэдэн төгрөгөөр эхэлж болох вэ?",
      en: "What is the minimum amount I can start with?", ja: "いくらから始められますか？",
    },
    answer: {
      mn: "Тогтсон доод хэмжээ байхгүй. Та өөрийн төсөвт тохирсон дүнгээр эхэлж, зах зээлийг таньж мэдэх тусам хөрөнгө оруулалтаа аажмаар нэмэгдүүлж болно. Эхлэх дүн худалдан авах хувьцааныхаа ханшаас хамаарна.",
      en: "There is no fixed minimum. You can start with an amount that suits your budget and add to it gradually as you get to know the market. What you need to begin depends on the price of the shares you buy.", ja: "最低金額の定めはありません。ご予算に合った金額から始め、市場に慣れながら少しずつ増やすことができます。必要な金額は購入する株式の価格によって変わります。",
    },
  },
  {
    route: "faq-6",
    question: {
      mn: "Гадаад иргэн энд үнэт цаасны данс нээж болох уу?",
      en: "Can a foreign national open an account here?", ja: "外国籍でも口座を開設できますか？",
    },
    answer: {
      mn: "Тийм. Гадаад иргэн иргэний үнэмлэхийн оронд шаардлагатай бусад бичиг баримтаа бүрдүүлж данс нээх боломжтой. Бусад шат нь ижил бөгөөд бүрдүүлэх баримтын жагсаалтыг үйлчилгээний багаас тодруулна уу.",
      en: "Yes. A foreign national can open an account by providing the other required documents in place of a national ID. The rest of the process is the same; ask our client services team for the current list.", ja: "はい。外国籍の方は、国民IDカードに代わる所定の書類をご提出いただくことで口座を開設できます。それ以外の手続きは同じです。最新の必要書類はカスタマーサービスにお問い合わせください。",
    },
  },
  {
    route: "faq-7",
    question: {
      mn: "IPO-гийн биелээгүй захиалгын мөнгө хаана байх вэ?",
      en: "What happens to my unallocated IPO funds?", ja: "IPOで割り当てられなかった資金はどうなりますか？",
    },
    answer: {
      mn: "Захиалгаас биелээгүй үлдсэн мөнгө таны арилжааны дансанд аюулгүй хадгалагдана. Та хүссэн үедээ татах хүсэлт гаргаж, банкны данс руугаа шилжүүлж болно. Энэ мөнгийг гаргагч компани хэзээ ч барьдаггүй.",
      en: "Money left over from an unfilled subscription stays safely in your own trading account. You can request a withdrawal at any time and move it to your bank. The issuing company never holds on to it.", ja: "申込みが満たされずに残った資金は、お客様ご自身の取引口座に安全に保管されます。いつでも出金を申請して銀行口座へ移すことができます。発行会社が預かり続けることはありません。",
    },
  },
  {
    route: "faq-8",
    question: {
      mn: "Миний хувийн мэдээлэл хэрхэн хамгаалагддаг вэ?",
      en: "How is my personal information protected?", ja: "個人情報はどのように守られますか？",
    },
    answer: {
      mn: "Тийм. Таны хувийн болон санхүүгийн мэдээллийг зөвхөн үйлчилгээ үзүүлэх, зохицуулагчийн шаардлагыг хангах зорилгоор ашиглана. Зөвшөөрөлгүйгээр гуравдагч этгээдэд дамжуулахгүй. Дэлгэрэнгүйг Нууцлалын бодлогоос үзнэ үү.",
      en: "Yes. Your personal and financial details are used only to provide the service and to meet regulatory requirements. They are never passed to a third party without your consent. See the Privacy Policy.", ja: "お客様の個人情報および金融情報は、サービスの提供と法令上の要件を満たす目的にのみ使用します。ご同意なく第三者に提供することはありません。詳しくはプライバシーポリシーをご覧ください。",
    },
  },
];
