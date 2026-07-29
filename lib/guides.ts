import type { Route } from "@/components/router";

export interface Bi {
  mn: string;
  en: string;
}

export interface GuideStep {
  title: Bi;
  body: Bi;
}

export interface Guide {
  route: Extract<Route, `zaavar-${string}`>;
  /** Position in the numbered tile list on the Customer Support page. */
  num: number;
  title: Bi;
  teaser: Bi;
  lead: Bi;
  steps?: GuideStep[];
  /** Deposits & withdrawals shows the trading account instead of steps. */
  bank?: true;
  note?: Bi;
}

export const GUIDES: Guide[] = [
  {
    route: "zaavar-dansneeh",
    num: 1,
    title: { mn: "Данс нээх", en: "Open an account" },
    teaser: {
      mn: "Бүртгүүлж, 24 цагт баталгаажуулна",
      en: "Register and verify in 24 hours",
    },
    lead: {
      mn: "Бүртгэлийн маягт бөглөж, иргэний үнэмлэхийн хуулбарыг онлайнаар эсвэл манай оффис дээр ирүүлнэ. Баталгаажуулалт 24 цагийн дотор хийгдэж, дараа нь таны арилжааны данс идэвхжинэ.",
      en: "Fill in the registration form and submit a copy of your national ID online or at our office. Verification takes place within 24 hours, after which your trading account is activated.",
    },
    steps: [
      {
        title: { mn: "Бүртгэлийн маягт бөглөх", en: "Fill in the registration form" },
        body: {
          mn: "natsec.istock.mn сайт руу орж, нэр, регистрийн дугаар, утас, и-мэйл зэрэг үндсэн мэдээллээ үнэн зөв оруулна.",
          en: "Go to natsec.istock.mn and enter your basic details — name, national ID number, phone, and email — accurately.",
        },
      },
      {
        title: { mn: "Иргэний үнэмлэхээ хавсаргах", en: "Upload your national ID" },
        body: {
          mn: "Иргэний үнэмлэхийн урд, ард талын тодорхой зургийг байршуулна. Насанд хүрээгүй бол төрсний гэрчилгээ, асран хамгаалагчийн үнэмлэхийг хамт хавсаргана.",
          en: "Upload clear photos of both sides of your national ID. Minors should attach a birth certificate plus their guardian's ID.",
        },
      },
      {
        title: { mn: "Хураамжаа төлөх", en: "Pay the registration fee" },
        body: {
          mn: "Данс нээх нэг удаагийн 5,000₮ хураамжийг заасан дансаар шилжүүлж, баримтаа хавсаргана.",
          en: "Transfer the one-time 5,000₮ account-opening fee to the account shown and attach proof of payment.",
        },
      },
      {
        title: { mn: "Баталгаажуулалт хүлээх", en: "Wait for verification" },
        body: {
          mn: "Ажилтнууд мэдээллийг шалгаж, 24 цагийн дотор дансыг идэвхжүүлнэ. Баталгаажсаны дараа мэдэгдэл ирж, шууд арилжаанд оролцох боломжтой.",
          en: "Our staff verify your details and activate the account within 24 hours. You'll be notified and can start trading immediately.",
        },
      },
    ],
  },
  {
    route: "zaavar-mhb",
    num: 2,
    title: { mn: "МХБ-ийн арилжаанд оролцох", en: "Trade on the MSE" },
    teaser: { mn: "Бодит цагт авах, зарах", en: "Buy and sell in real time" },
    lead: {
      mn: "Онлайн арилжааны систем эсвэл апп-аар нэвтэрч, сонгосон үнэт цаасныхаа авах/зарах захиалгыг байршуулаад, гүйцэтгэлийг бодит цагт хянана.",
      en: "Log in to the online trading system or app, place a buy/sell order for the security of your choice, and track execution in real time.",
    },
    steps: [
      {
        title: { mn: "Системд нэвтрэх", en: "Log in to the system" },
        body: {
          mn: "natsec.istock.mn сайт эсвэл мобайл аппликейшн руу дансаараа нэвтэрч, үлдэгдэл болон боломжит худалдан авах хүчээ шалгана.",
          en: "Log in to natsec.istock.mn or the mobile app and check your balance and available buying power.",
        },
      },
      {
        title: {
          mn: "Үнэт цаас, үнэ, тоо хэмжээгээ сонгох",
          en: "Choose the security, price, and quantity",
        },
        body: {
          mn: "Худалдан авах эсвэл зарах үнэт цаасаа хайж олоод, захиалгын төрөл, үнэ, тоо ширхгээ тодорхойлно.",
          en: "Search for the security you want to buy or sell, then set the order type, price, and quantity.",
        },
      },
      {
        title: { mn: "Захиалгаа баталгаажуулах", en: "Confirm the order" },
        body: {
          mn: "Мэдээллээ дахин шалгаад баталгаажуулах товч дарснаар захиалга шууд МХБ-ийн системд илгээгдэнэ.",
          en: "Review the details once more and confirm — your order is sent directly to the MSE trading system.",
        },
      },
      {
        title: { mn: "Гүйцэтгэлээ хянах", en: "Track execution" },
        body: {
          mn: "Захиалга биелэх байдал, багц дахь үнэт цаасны хэмжээ, үнийн хөдөлгөөнийг бодит цагт хянах боломжтой.",
          en: "Monitor order execution, your portfolio holdings, and price movements in real time.",
        },
      },
    ],
  },
  {
    route: "zaavar-ipo",
    num: 3,
    title: {
      mn: "IPO-д хэрхэн оролцох вэ",
      en: "How to participate in an IPO",
    },
    teaser: {
      mn: "Шинэ санал болголтод захиалга өгөх",
      en: "Subscribe to new offerings",
    },
    lead: {
      mn: "Идэвхтэй IPO-гийн жагсаалтыг харж, захиалгын хугацаанд багтаан захиалгаа өгөөд, хуваарилалтын үр дүнг хүлээнэ.",
      en: "Check the list of active IPOs, submit your subscription order within the offer period, then wait for the allocation result.",
    },
    steps: [
      {
        title: { mn: "IPO-ийн мэдээлэлтэй танилцах", en: "Review the IPO offer" },
        body: {
          mn: "Тухайн компанийн санхүүгийн үзүүлэлт, гаргаж буй хувьцааны тоо, үнийн хязгаар зэргийг агуулсан танилцуулгатай сайтар танилцана.",
          en: "Study the prospectus, including the company's financials, share count on offer, and the price range.",
        },
      },
      {
        title: { mn: "Захиалгын дүнгээ шийдэх", en: "Decide your subscription amount" },
        body: {
          mn: "Эрсдэлийн хүлцэл, хөрөнгө оруулалтын зорилгодоо тохируулан хэдэн ширхэг хувьцаанд захиалга өгөхөө шийднэ.",
          en: "Decide how many shares to subscribe for based on your risk tolerance and investment goals.",
        },
      },
      {
        title: {
          mn: "Мөнгө байршуулж, захиалга өгөх",
          en: "Deposit funds and submit your order",
        },
        body: {
          mn: "Захиалгын нийт дүнгийн мөнгөө урьдчилан байршуулж, санал асуулгын хугацаа дуусахаас өмнө захиалгаа баталгаажуулна.",
          en: "Deposit the full subscription amount in advance and confirm your order before the offer period ends.",
        },
      },
      {
        title: {
          mn: "Хуваарилалтын үр дүнг хүлээх",
          en: "Wait for the allocation result",
        },
        body: {
          mn: "IPO хаагдсаны дараа хуваарилалт хийгдэж, ногдоогүй үлдсэн мөнгө автоматаар арилжааны данс руу буцна.",
          en: "After the IPO closes, allocation is finalized and any unallocated funds are automatically returned to your account.",
        },
      },
    ],
  },
  {
    route: "zaavar-mungu",
    num: 4,
    title: { mn: "Мөнгө байршуулах, татах", en: "Deposits & withdrawals" },
    teaser: {
      mn: "Банкны мэдээлэл, татах алхам",
      en: "Bank details & withdrawal steps",
    },
    lead: {
      mn: "Монголын хөрөнгийн биржийн арилжаанд оролцохын тулд доорх арилжааны (номинал) дансанд мөнгөн дүнгээ байршуулна. Үнэт цаасаа зарахад арилжааны орлого мөн тухайн дансанд байршина.",
      en: "To take part in trading on the Mongolian Stock Exchange, transfer funds to the trading (nominee) account below. When you sell a security, proceeds are credited back to the same account.",
    },
    bank: true,
    note: {
      mn: "Мөнгө татахын тулд онлайн систем эсвэл апп-аар дамжуулан татах хүсэлтээ дүн, банкны дансныхаа хамт илгээнэ. Хүсэлт нэг ажлын өдрийн дотор боловсруулагдана.",
      en: "To withdraw, send a withdrawal request through the online trading system or app, specifying the amount and your bank account. Requests are processed within one business day.",
    },
  },
  {
    route: "zaavar-tsenegleh",
    num: 5,
    title: { mn: "Данс цэнэглэх", en: "Top up your account" },
    teaser: {
      mn: "5-10 минутад данс руу орно",
      en: "Credited in 5–10 minutes",
    },
    lead: {
      mn: "Данс цэнэглэх нь дээрх мөнгө байршуулахтай яг ижил үйлдэл — дээрх арилжааны данс руу гүйлгээний утгад регистрийн дугаараа бичиж шилжүүлнэ. Мөнгө ихэвчлэн 5-10 минутын дотор данс руу орно.",
      en: "Topping up your account is done the same way as depositing funds — transfer to the trading account above with your registration number as the transfer note. Funds are usually credited within 5–10 minutes.",
    },
    steps: [
      {
        title: {
          mn: "Шилжүүлгийн мэдээллээ бэлдэх",
          en: "Prepare the transfer details",
        },
        body: {
          mn: "Арилжааны (номинал) дансны дугаар, банкны нэр, өөрийн регистрийн дугаарыг бэлтгэнэ.",
          en: "Prepare the trading (nominee) account number, bank name, and your own registration number.",
        },
      },
      {
        title: { mn: "Дурын дүнгээр шилжүүлэг хийх", en: "Transfer any amount" },
        body: {
          mn: "Банкны апп эсвэл салбараас дурын хэмжээний мөнгөө дээрх дансанд, гүйлгээний утгад регистрийн дугаараа бичиж шилжүүлнэ.",
          en: "From your bank app or branch, transfer any amount to the account above with your registration number as the transfer note.",
        },
      },
      {
        title: {
          mn: "Автоматаар цэнэглэгдэхийг хүлээх",
          en: "Wait for automatic top-up",
        },
        body: {
          mn: "Ихэвчлэн 5-10 минутын дотор мөнгө таны арилжааны данс руу орж, шууд ашиглах боломжтой болно.",
          en: "Funds are usually credited to your trading account within 5–10 minutes and ready to use immediately.",
        },
      },
    ],
  },
  {
    route: "zaavar-nogdol",
    num: 6,
    title: { mn: "Ногдол ашиг авах", en: "Receiving dividends" },
    teaser: {
      mn: "Бүртгэлийн өдөр автомат орно",
      en: "Automatic on the record date",
    },
    lead: {
      mn: "Ногдол ашиг нь тухайн компанийн тогтоосон хуваарийн дагуу, бүртгэлийн өдрөөр таны данс руу автоматаар шилжинэ.",
      en: "Dividends are automatically credited to your account on the record date, according to the timeline set by the issuing company.",
    },
    steps: [
      {
        title: {
          mn: "Бүртгэлийн өдрөөр эзэмшигч байх",
          en: "Hold the security on the record date",
        },
        body: {
          mn: "Компанийн зарласан бүртгэлийн өдрөөр тухайн үнэт цаасыг дансандаа эзэмшиж байхад л хангалттай бөгөөд нэмэлт хүсэлт гаргах шаардлагагүй.",
          en: "Simply holding the security in your account on the company's announced record date is all that's required — no request needed.",
        },
      },
      {
        title: {
          mn: "Ногдол ашиг автоматаар орох",
          en: "Dividends are credited automatically",
        },
        body: {
          mn: "Компанийн зарласан хуваарийн дагуу ногдол ашгийн дүн таны арилжааны данс руу шууд, автоматаар шилжинэ.",
          en: "According to the company's announced schedule, the dividend amount is transferred directly and automatically to your trading account.",
        },
      },
      {
        title: { mn: "Дараагийн алхмаа сонгох", en: "Choose your next step" },
        body: {
          mn: "Орсон ногдол ашгаа шууд татан авах, эсвэл дахин үнэт цаас худалдан авахад зарцуулж болно.",
          en: "You can withdraw the dividend right away, or reinvest it by purchasing more securities.",
        },
      },
    ],
  },
];

export const GUIDE_ROUTES = GUIDES.map((guide) => guide.route);
