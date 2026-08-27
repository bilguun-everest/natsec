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
      en: "What exactly is a securities company (ҮЦК)?",
    },
    answer: {
      mn: "Үнэт цаасны компани гэдэг нь Санхүүгийн зохицуулах хорооны тусгай зөвшөөрлөөр брокер, дилер, хөрөнгө оруулалтын зөвлөх, андеррайтерийн үйл ажиллагаа эрхэлдэг мэргэжлийн байгууллага юм. Хөрөнгийн зах зээл дэх зуучлагч гэсэн үг.",
      en: "A securities company is a firm licensed by the Financial Regulatory Commission to act as a broker, dealer, investment advisor and underwriter. In short, it is the intermediary between you and the capital market.",
    },
    points: [
      {
        mn: "Таны нэрийн өмнөөс МХБ дээр арилжаа хийж гүйцэтгэдэг",
        en: "Executes trades on your behalf on the exchange",
      },
      {
        mn: "Компанид санхүүжилт (IPO, FPO, бонд) зохион байгуулдаг",
        en: "Arranges financing (IPO, FPO, bonds) for companies",
      },
      {
        mn: "Хөрөнгө оруулалтын зөвлөгөө, багцын үйлчилгээ үзүүлдэг",
        en: "Provides investment advice and portfolio services",
      },
    ],
  },
  {
    route: "faq-2",
    question: {
      mn: "Үнэт цаасны данс нээхэд ямар данстай холбогдох вэ?",
      en: "What accounts do I need in order to trade?",
    },
    answer: {
      mn: "Үнэт цаасны данс нээнэ гэдэг нь Үнэт цаасны төвлөрсөн хадгаламжийн төв (ҮЦТХТ)-д данс нээлгэхийг хэлнэ. Ижил дугаартай төлбөр тооцооны данс банкинд зэрэг нээгдэнэ. Нэг хүн ганц данстай байх ба хэд хэдэн ҮЦК-аар хандаж болно.",
      en: "Opening a securities account means opening one at the Securities Central Depository. A settlement account with the same number opens alongside it at the bank. One person holds one account, reachable through several firms.",
    },
    points: [
      {
        mn: "Үнэт цаасны данс — таны хувьцаа, бондыг хадгална",
        en: "Securities account — holds your shares and bonds",
      },
      {
        mn: "Төлбөр тооцооны данс — арилжааны мөнгийг хадгална",
        en: "Settlement account — holds the cash for trading",
      },
      {
        mn: "Хоёр данс ижил дугаартай бөгөөд зэрэг нээгддэг",
        en: "Both open together under the same account number",
      },
    ],
  },
  {
    route: "faq-3",
    question: {
      mn: "Данс нээхэд ямар бичиг баримт шаардлагатай вэ?",
      en: "What documents do I need to open an account?",
    },
    answer: {
      mn: "Иргэний үнэмлэх шаардлагатай. Насанд хүрээгүй хүүхдийн хувьд төрсний гэрчилгээ, түүнчлэн хамт ирсэн эцэг эх буюу асран хамгаалагчийн иргэний үнэмлэхийг бүрдүүлнэ. Дансны 5,000₮ хураамжийг данс нээх үедээ төлнө.",
      en: "You will need your national ID. For a minor, a birth certificate plus the accompanying parent or legal guardian's ID is required. A 5,000₮ account fee is paid at the time the account is opened.",
    },
    points: [
      {
        mn: "Иргэний үнэмлэх (эх хувь эсвэл хуулбар байж болно)",
        en: "National ID, either the original or a copy",
      },
      {
        mn: "Хүүхдэд төрсний гэрчилгээ, асран хамгаалагчийн үнэмлэх",
        en: "For a minor, birth certificate and guardian's ID",
      },
      {
        mn: "Данс нээх үед 5,000₮-ийн хураамж төлөгдөнө",
        en: "A 5,000₮ fee is paid when the account opens",
      },
    ],
  },
  {
    route: "faq-4",
    question: {
      mn: "Данс нээж арилжаанд ороход хэр хугацаа орох вэ?",
      en: "How long does it take to open an account?",
    },
    answer: {
      mn: "Онлайн бүртгэл хэдхэн минут зарцуулна. Илгээсэн мэдээлэл, бичиг баримтыг шалгаж баталгаажуулаад дансыг 24 цагийн дотор идэвхжүүлнэ. Түүнээс хойш онлайн систем болон аппаараа арилжаанд орно.",
      en: "Registering online takes only a few minutes. Once the details and documents you send have been checked, the account is verified and activated within 24 hours. From then on you can trade straight away.",
    },
  },
  {
    route: "faq-5",
    question: {
      mn: "Хамгийн багадаа хэдэн төгрөгөөр эхэлж болох вэ?",
      en: "What is the minimum amount I can start with?",
    },
    answer: {
      mn: "Тогтсон доод хэмжээ байхгүй. Та өөрийн төсөвт тохирсон дүнгээр эхэлж, зах зээлийг таньж мэдэх тусам хөрөнгө оруулалтаа аажмаар нэмэгдүүлж болно. Эхлэх дүн худалдан авах хувьцааныхаа ханшаас хамаарна.",
      en: "There is no fixed minimum. You can start with an amount that suits your budget and add to it gradually as you get to know the market. What you need to begin depends on the price of the shares you buy.",
    },
  },
  {
    route: "faq-6",
    question: {
      mn: "Гадаад иргэн энд үнэт цаасны данс нээж болох уу?",
      en: "Can a foreign national open an account here?",
    },
    answer: {
      mn: "Тийм. Гадаад иргэн иргэний үнэмлэхийн оронд шаардлагатай бусад бичиг баримтаа бүрдүүлж данс нээх боломжтой. Бусад шат нь ижил бөгөөд бүрдүүлэх баримтын жагсаалтыг үйлчилгээний багаас тодруулна уу.",
      en: "Yes. A foreign national can open an account by providing the other required documents in place of a national ID. The rest of the process is the same; ask our client services team for the current list.",
    },
  },
  {
    route: "faq-7",
    question: {
      mn: "IPO-гийн биелээгүй захиалгын мөнгө хаана байх вэ?",
      en: "What happens to my unallocated IPO funds?",
    },
    answer: {
      mn: "Захиалгаас биелээгүй үлдсэн мөнгө таны арилжааны дансанд аюулгүй хадгалагдана. Та хүссэн үедээ татах хүсэлт гаргаж, банкны данс руугаа шилжүүлж болно. Энэ мөнгийг гаргагч компани хэзээ ч барьдаггүй.",
      en: "Money left over from an unfilled subscription stays safely in your own trading account. You can request a withdrawal at any time and move it to your bank. The issuing company never holds on to it.",
    },
  },
  {
    route: "faq-8",
    question: {
      mn: "Миний хувийн мэдээлэл хэрхэн хамгаалагддаг вэ?",
      en: "How is my personal information protected?",
    },
    answer: {
      mn: "Тийм. Таны хувийн болон санхүүгийн мэдээллийг зөвхөн үйлчилгээ үзүүлэх, зохицуулагчийн шаардлагыг хангах зорилгоор ашиглана. Зөвшөөрөлгүйгээр гуравдагч этгээдэд дамжуулахгүй. Дэлгэрэнгүйг Нууцлалын бодлогоос үзнэ үү.",
      en: "Yes. Your personal and financial details are used only to provide the service and to meet regulatory requirements. They are never passed to a third party without your consent. See the Privacy Policy.",
    },
  },
];
