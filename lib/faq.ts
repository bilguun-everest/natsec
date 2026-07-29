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
      mn: "Үнэт цаасны компани (ҮЦК) гэж ямар байгууллагыг хэлэх вэ?",
      en: "What is a securities company (ҮЦК)?",
    },
    answer: {
      mn: "Үнэт цаасны компани (ҮЦК) гэдэг нь Санхүүгийн Зохицуулах Хорооны тусгай зөвшөөрлөөр брокер, дилер, хөрөнгө оруулалтын зөвлөх, андеррайтерийн үйл ажиллагааны аль нэгийг, эсхүл хавсран эрхэлдэг, үнэт цаасны зах зээл дээр ажилладаг мэргэжлийн байгууллага юм. Өөрөөр хэлбэл иргэн, аж ахуйн нэгжид хувьцаа, бонд худалдан авахад нь зуучилж, санхүүжилт хайж буй компаниудыг хөрөнгө оруулагчидтай холбодог тусгай зөвшөөрөлтэй байгууллага юм.",
      en: "A securities company is a professional organization licensed by the Financial Regulatory Commission to operate in the securities market as a broker, dealer, investment advisor, and/or underwriter. In other words, it is a licensed intermediary that helps individuals and businesses buy and sell shares and bonds, and connects companies seeking financing with investors.",
    },
    points: [
      {
        mn: "Таны нэрийн өмнөөс МХБ дээр арилжаа хийж гүйцэтгэдэг",
        en: "Executes trades on your behalf on the Mongolian Stock Exchange",
      },
      {
        mn: "Компаниудад санхүүжилт (IPO, FPO, бонд) зохион байгуулдаг",
        en: "Arranges financing (IPO, FPO, bonds) for companies",
      },
      {
        mn: "Хөрөнгө оруулалтын зөвлөх үйлчилгээ үзүүлдэг",
        en: "Provides investment advisory services",
      },
    ],
  },
  {
    route: "faq-2",
    question: {
      mn: "Үнэт цаасны данс нээхэд ямар данстай холбогдох вэ?",
      en: "What accounts do I need to trade securities?",
    },
    answer: {
      mn: "Үнэт цаасны данс нээлгэнэ гэдэг нь Үнэт Цаасны Төвлөрсөн Хадгаламжийн Төв (ҮЦТХТ)-д данс нээлгэхийг хэлнэ. ҮЦТХТ-д данс нээлгэснээр ижил дугаартай данс Арилжааны Төлбөр Тооцооны банкинд зэрэгцээ нээгддэг. Нэг хүн ганцхан үнэт цаасны дантай байх бөгөөд тухайн дансандаа хэд хэдэн үнэт цаасны компаниар дамжуулан хандах боломжтой.",
      en: "Opening a securities account is done through the Securities Central Depository (SCD), which links two accounts under the same number: a securities account at the SCD and a settlement account at the clearing bank. One person may hold only one securities account, and can grant access to it through several securities companies.",
    },
    points: [
      {
        mn: "Үнэт цаасны данс — таны хувьцаа, бондыг хадгална",
        en: "Securities account — holds your shares and bonds",
      },
      {
        mn: "Төлбөр тооцооны данс — арилжааны мөнгийг хадгална",
        en: "Settlement account — holds cash for trading",
      },
      {
        mn: "Хоёр данс ижил дугаартай байна",
        en: "Both accounts share the same account number",
      },
    ],
  },
  {
    route: "faq-3",
    question: {
      mn: "Данс нээхэд ямар бичиг баримт шаардлагатай вэ?",
      en: "What documents are required to open an account?",
    },
    answer: {
      mn: "Иргэний үнэмлэх шаардлагатай. Насанд хүрээгүй хүүхдийн хувьд төрсний гэрчилгээ болон хамт ирсэн эцэг эх, асран хамгаалагчийн иргэний үнэмлэхийг бүрдүүлнэ. Мөн дансны 5,000₮ хураамж төлөгдөнө.",
      en: "You will need your national ID. For a minor, a birth certificate plus the accompanying parent or legal guardian's ID is required. A 5,000₮ account-opening fee also applies.",
    },
    points: [
      {
        mn: "Иргэний үнэмлэх (эх хувь эсвэл хуулбар)",
        en: "National ID (original or copy)",
      },
      {
        mn: "Насанд хүрээгүй бол: төрсний гэрчилгээ + асран хамгаалагчийн үнэмлэх",
        en: "Minors: birth certificate + guardian's ID",
      },
      { mn: "Дансны нээх хураамж", en: "Account-opening fee" },
    ],
  },
  {
    route: "faq-4",
    question: {
      mn: "Данс нээхэд хэдий хугацаа шаардагдах вэ?",
      en: "How long does it take to open an account?",
    },
    answer: {
      mn: "Онлайн бүртгүүлэхэд хэдхэн минут зарцуулагдана; баталгаажуулалт, идэвхжүүлэлт 24 цагийн дотор хийгдэж, дараа нь шууд арилжаанд оролцох боломжтой болно.",
      en: "Online registration takes a few minutes; verification and activation are completed within 24 hours, after which you can start trading immediately.",
    },
  },
  {
    route: "faq-5",
    question: {
      mn: "Хамгийн бага хэдэн төгрөгөөр эхэлж болох вэ?",
      en: "What's the minimum amount to start with?",
    },
    answer: {
      mn: "Тогтсон доод хэмжээ байхгүй — өөрийн төсөвт тохирсон дүнгээр эхэлж, зах зээлд итгэлтэй болох тусам аажмаар нэмэгдүүлж болно.",
      en: "There is no fixed minimum investment amount — you can start with whatever suits your own budget and gradually increase it as you become more comfortable with the market.",
    },
  },
  {
    route: "faq-6",
    question: {
      mn: "Гадаад иргэн данс нээж болох уу?",
      en: "Can a foreign national open an account?",
    },
    answer: {
      mn: "Тийм. Гадаад иргэн иргэний үнэмлэхийн оронд шаардлагатай бусад бичиг баримтаа бүрдүүлснээр данс нээх боломжтой.",
      en: "Yes. Foreign nationals can open an account by providing the required identification documents in place of a national ID.",
    },
  },
  {
    route: "faq-7",
    question: {
      mn: "IPO захиалгын биелээгүй үлдсэн мөнгө хаана байршдаг вэ?",
      en: "What happens to unallocated IPO subscription funds?",
    },
    answer: {
      mn: "Таны захиалгаас биелээгүй үлдсэн мөнгөн дүн арилжааны данстаа аюулгүй хадгалагдах бөгөөд та хүссэн үедээ татах хүсэлт гаргах боломжтой — энэ мөнгийг үнэт цаас гаргагч компани хэзээ ч барьдаггүй.",
      en: "Any amount from your subscription that isn't allocated remains safely in your trading account, and you can request a withdrawal at any time — it is never held by the issuing company.",
    },
  },
  {
    route: "faq-8",
    question: {
      mn: "Миний хувийн мэдээлэл хамгаалагдсан уу?",
      en: "Is my personal information kept safe?",
    },
    answer: {
      mn: "Тийм. Таны хувийн болон санхүүгийн мэдээллийг зөвхөн үйлчилгээгээ үзүүлэх, зохицуулагчийн шаардлагыг хангах зорилгоор ашигладаг бөгөөд таны зөвшөөрөлгүйгээр гуравдагч этгээдэд хэзээ ч дамжуулдаггүй. Дэлгэрэнгүйг Нууцлалын бодлогоос үзнэ үү.",
      en: "Yes. Your personal and financial data is used only to provide our services and meet regulatory requirements, and is never shared with third parties without your consent. See our Privacy Policy for full details.",
    },
  },
];
