import type { Route } from "@/components/router";

export interface Bi {
  mn: string;
  en: string;
  ja: string;
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
    title: { mn: "Данс нээх", en: "Open an account", ja: "口座を開設する" },
    teaser: {
      mn: "Бүртгүүлж, 24 цагт баталгаажуулна",
      en: "Register and verify in 24 hours", ja: "24時間以内に登録と確認",
    },
    lead: {
      mn: "Бүртгэлийн маягт бөглөж, иргэний үнэмлэхийн хуулбарыг онлайнаар эсвэл манай оффис дээр ирүүлнэ. Баталгаажуулалт 24 цагийн дотор хийгдэж, дараа нь таны арилжааны данс идэвхжинэ.",
      en: "Fill in the registration form and submit a copy of your national ID online or at our office. Verification takes place within 24 hours, after which your trading account is activated.", ja: "登録フォームに記入し、国民IDカードの写しをオンラインまたは窓口でご提出ください。24時間以内に確認が完了し、取引口座が有効になります。",
    },
    steps: [
      {
        title: { mn: "Бүртгэлийн маягт бөглөх", en: "Fill in the registration form", ja: "登録フォームに記入する" },
        body: {
          mn: "natsec.istock.mn сайт руу орж, нэр, регистрийн дугаар, утас, и-мэйл зэрэг үндсэн мэдээллээ үнэн зөв оруулна.",
          en: "Go to natsec.istock.mn and enter your basic details — name, national ID number, phone, and email — accurately.", ja: "natsec.istock.mn にアクセスし、氏名、国民ID番号、電話番号、メールアドレスなどの基本情報を正確に入力します。",
        },
      },
      {
        title: { mn: "Иргэний үнэмлэхээ хавсаргах", en: "Upload your national ID", ja: "国民IDカードをアップロードする" },
        body: {
          mn: "Иргэний үнэмлэхийн урд, ард талын тодорхой зургийг байршуулна. Насанд хүрээгүй бол төрсний гэрчилгээ, асран хамгаалагчийн үнэмлэхийг хамт хавсаргана.",
          en: "Upload clear photos of both sides of your national ID. Minors should attach a birth certificate plus their guardian's ID.", ja: "国民IDカードの表裏を鮮明に撮影してアップロードします。未成年の場合は出生証明書と保護者の身分証を添付してください。",
        },
      },
      {
        title: { mn: "Хураамжаа төлөх", en: "Pay the registration fee", ja: "登録手数料を支払う" },
        body: {
          mn: "Данс нээх нэг удаагийн 5,000₮ хураамжийг заасан дансаар шилжүүлж, баримтаа хавсаргана.",
          en: "Transfer the one-time 5,000₮ account-opening fee to the account shown and attach proof of payment.", ja: "一度限りの口座開設手数料5,000₮を指定の口座に振り込み、支払いの控えを添付します。",
        },
      },
      {
        title: { mn: "Баталгаажуулалт хүлээх", en: "Wait for verification", ja: "確認を待つ" },
        body: {
          mn: "Ажилтнууд мэдээллийг шалгаж, 24 цагийн дотор дансыг идэвхжүүлнэ. Баталгаажсаны дараа мэдэгдэл ирж, шууд арилжаанд оролцох боломжтой.",
          en: "Our staff verify your details and activate the account within 24 hours. You'll be notified and can start trading immediately.", ja: "担当者が内容を確認し、24時間以内に口座を有効にします。通知が届き次第、すぐに取引を開始できます。",
        },
      },
    ],
  },
  {
    route: "zaavar-mhb",
    num: 2,
    title: { mn: "МХБ-ийн арилжаанд оролцох", en: "Trade on the MSE", ja: "MSEで取引する" },
    teaser: { mn: "Бодит цагт авах, зарах", en: "Buy and sell in real time", ja: "リアルタイムで売買" },
    lead: {
      mn: "Онлайн арилжааны систем эсвэл апп-аар нэвтэрч, сонгосон үнэт цаасныхаа авах/зарах захиалгыг байршуулаад, гүйцэтгэлийг бодит цагт хянана.",
      en: "Log in to the online trading system or app, place a buy/sell order for the security of your choice, and track execution in real time.", ja: "オンライン取引システムまたはアプリにログインし、ご希望の銘柄の買い・売り注文を出して、執行状況をリアルタイムで確認します。",
    },
    steps: [
      {
        title: { mn: "Системд нэвтрэх", en: "Log in to the system", ja: "システムにログインする" },
        body: {
          mn: "natsec.istock.mn сайт эсвэл мобайл аппликейшн руу дансаараа нэвтэрч, үлдэгдэл болон боломжит худалдан авах хүчээ шалгана.",
          en: "Log in to natsec.istock.mn or the mobile app and check your balance and available buying power.", ja: "natsec.istock.mn またはモバイルアプリにログインし、残高と買付余力を確認します。",
        },
      },
      {
        title: {
          mn: "Үнэт цаас, үнэ, тоо хэмжээгээ сонгох",
          en: "Choose the security, price, and quantity", ja: "銘柄・価格・数量を選ぶ",
        },
        body: {
          mn: "Худалдан авах эсвэл зарах үнэт цаасаа хайж олоод, захиалгын төрөл, үнэ, тоо ширхгээ тодорхойлно.",
          en: "Search for the security you want to buy or sell, then set the order type, price, and quantity.", ja: "売買したい銘柄を検索し、注文の種類、価格、数量を指定します。",
        },
      },
      {
        title: { mn: "Захиалгаа баталгаажуулах", en: "Confirm the order", ja: "注文を確定する" },
        body: {
          mn: "Мэдээллээ дахин шалгаад баталгаажуулах товч дарснаар захиалга шууд МХБ-ийн системд илгээгдэнэ.",
          en: "Review the details once more and confirm — your order is sent directly to the MSE trading system.", ja: "内容をもう一度確認して確定すると、注文はMSEの取引システムへ直接送信されます。",
        },
      },
      {
        title: { mn: "Гүйцэтгэлээ хянах", en: "Track execution", ja: "執行を確認する" },
        body: {
          mn: "Захиалга биелэх байдал, багц дахь үнэт цаасны хэмжээ, үнийн хөдөлгөөнийг бодит цагт хянах боломжтой.",
          en: "Monitor order execution, your portfolio holdings, and price movements in real time.", ja: "注文の執行状況、保有銘柄、値動きをリアルタイムで確認できます。",
        },
      },
    ],
  },
  {
    route: "zaavar-ipo",
    num: 3,
    title: {
      mn: "IPO-д хэрхэн оролцох вэ",
      en: "How to participate in an IPO", ja: "IPOへの参加方法",
    },
    teaser: {
      mn: "Шинэ санал болголтод захиалга өгөх",
      en: "Subscribe to new offerings", ja: "新規公開に申し込む",
    },
    lead: {
      mn: "Идэвхтэй IPO-гийн жагсаалтыг харж, захиалгын хугацаанд багтаан захиалгаа өгөөд, хуваарилалтын үр дүнг хүлээнэ.",
      en: "Check the list of active IPOs, submit your subscription order within the offer period, then wait for the allocation result.", ja: "実施中のIPO一覧を確認し、募集期間内に申込注文を出して、割当結果をお待ちください。",
    },
    steps: [
      {
        title: { mn: "IPO-ийн мэдээлэлтэй танилцах", en: "Review the IPO offer", ja: "募集内容を確認する" },
        body: {
          mn: "Тухайн компанийн санхүүгийн үзүүлэлт, гаргаж буй хувьцааны тоо, үнийн хязгаар зэргийг агуулсан танилцуулгатай сайтар танилцана.",
          en: "Study the prospectus, including the company's financials, share count on offer, and the price range.", ja: "発行会社の財務内容、募集株式数、価格帯を含む目論見書を確認します。",
        },
      },
      {
        title: { mn: "Захиалгын дүнгээ шийдэх", en: "Decide your subscription amount", ja: "申込金額を決める" },
        body: {
          mn: "Эрсдэлийн хүлцэл, хөрөнгө оруулалтын зорилгодоо тохируулан хэдэн ширхэг хувьцаанд захиалга өгөхөө шийднэ.",
          en: "Decide how many shares to subscribe for based on your risk tolerance and investment goals.", ja: "リスク許容度と投資目標に基づいて、申し込む株数を決めます。",
        },
      },
      {
        title: {
          mn: "Мөнгө байршуулж, захиалга өгөх",
          en: "Deposit funds and submit your order", ja: "入金して注文を出す",
        },
        body: {
          mn: "Захиалгын нийт дүнгийн мөнгөө урьдчилан байршуулж, санал асуулгын хугацаа дуусахаас өмнө захиалгаа баталгаажуулна.",
          en: "Deposit the full subscription amount in advance and confirm your order before the offer period ends.", ja: "申込金額の全額を事前に入金し、募集期間の終了前に注文を確定します。",
        },
      },
      {
        title: {
          mn: "Хуваарилалтын үр дүнг хүлээх",
          en: "Wait for the allocation result", ja: "割当結果を待つ",
        },
        body: {
          mn: "IPO хаагдсаны дараа хуваарилалт хийгдэж, ногдоогүй үлдсэн мөнгө автоматаар арилжааны данс руу буцна.",
          en: "After the IPO closes, allocation is finalized and any unallocated funds are automatically returned to your account.", ja: "IPO終了後に割当が確定し、割り当てられなかった資金は自動的に口座へ返金されます。",
        },
      },
    ],
  },
  {
    route: "zaavar-mungu",
    num: 4,
    title: { mn: "Мөнгө байршуулах, татах", en: "Deposits & withdrawals", ja: "入金と出金" },
    teaser: {
      mn: "Банкны мэдээлэл, татах алхам",
      en: "Bank details & withdrawal steps", ja: "振込先と出金の手順",
    },
    lead: {
      mn: "Монголын хөрөнгийн биржийн арилжаанд оролцохын тулд доорх арилжааны (номинал) дансанд мөнгөн дүнгээ байршуулна. Үнэт цаасаа зарахад арилжааны орлого мөн тухайн дансанд байршина.",
      en: "To take part in trading on the Mongolian Stock Exchange, transfer funds to the trading (nominee) account below. When you sell a security, proceeds are credited back to the same account.", ja: "モンゴル証券取引所の取引に参加するには、下記の取引（ノミニー）口座へ資金をお振り込みください。証券を売却した代金も同じ口座へ入金されます。",
    },
    bank: true,
    note: {
      mn: "Мөнгө татахын тулд онлайн систем эсвэл апп-аар дамжуулан татах хүсэлтээ дүн, банкны дансныхаа хамт илгээнэ. Хүсэлт нэг ажлын өдрийн дотор боловсруулагдана.",
      en: "To withdraw, send a withdrawal request through the online trading system or app, specifying the amount and your bank account. Requests are processed within one business day.", ja: "出金は、オンライン取引システムまたはアプリから、金額とご自身の銀行口座を指定して申請します。申請は1営業日以内に処理されます。",
    },
  },
  {
    route: "zaavar-tsenegleh",
    num: 5,
    title: { mn: "Данс цэнэглэх", en: "Top up your account", ja: "口座に資金を追加する" },
    teaser: {
      mn: "5-10 минутад данс руу орно",
      en: "Credited in 5–10 minutes", ja: "5〜10分で反映",
    },
    lead: {
      mn: "Данс цэнэглэх нь дээрх мөнгө байршуулахтай яг ижил үйлдэл — дээрх арилжааны данс руу гүйлгээний утгад регистрийн дугаараа бичиж шилжүүлнэ. Мөнгө ихэвчлэн 5-10 минутын дотор данс руу орно.",
      en: "Topping up your account is done the same way as depositing funds — transfer to the trading account above with your registration number as the transfer note. Funds are usually credited within 5–10 minutes.", ja: "口座への資金追加は入金と同じ手順です。上記の取引口座へ、振込摘要にご自身の登録番号を記入してお振り込みください。通常5〜10分で反映されます。",
    },
    steps: [
      {
        title: {
          mn: "Шилжүүлгийн мэдээллээ бэлдэх",
          en: "Prepare the transfer details", ja: "振込情報を用意する",
        },
        body: {
          mn: "Арилжааны (номинал) дансны дугаар, банкны нэр, өөрийн регистрийн дугаарыг бэлтгэнэ.",
          en: "Prepare the trading (nominee) account number, bank name, and your own registration number.", ja: "取引（ノミニー）口座の番号、銀行名、ご自身の登録番号をご用意ください。",
        },
      },
      {
        title: { mn: "Дурын дүнгээр шилжүүлэг хийх", en: "Transfer any amount", ja: "任意の金額を振り込む" },
        body: {
          mn: "Банкны апп эсвэл салбараас дурын хэмжээний мөнгөө дээрх дансанд, гүйлгээний утгад регистрийн дугаараа бичиж шилжүүлнэ.",
          en: "From your bank app or branch, transfer any amount to the account above with your registration number as the transfer note.", ja: "銀行アプリまたは窓口から、振込摘要にご自身の登録番号を記入して、上記の口座へ任意の金額をお振り込みください。",
        },
      },
      {
        title: {
          mn: "Автоматаар цэнэглэгдэхийг хүлээх",
          en: "Wait for automatic top-up", ja: "自動反映を待つ",
        },
        body: {
          mn: "Ихэвчлэн 5-10 минутын дотор мөнгө таны арилжааны данс руу орж, шууд ашиглах боломжтой болно.",
          en: "Funds are usually credited to your trading account within 5–10 minutes and ready to use immediately.", ja: "通常5〜10分で取引口座に反映され、すぐにご利用いただけます。",
        },
      },
    ],
  },
  {
    route: "zaavar-nogdol",
    num: 6,
    title: { mn: "Ногдол ашиг авах", en: "Receiving dividends", ja: "配当の受け取り" },
    teaser: {
      mn: "Бүртгэлийн өдөр автомат орно",
      en: "Automatic on the record date", ja: "権利確定日に自動で入金",
    },
    lead: {
      mn: "Ногдол ашиг нь тухайн компанийн тогтоосон хуваарийн дагуу, бүртгэлийн өдрөөр таны данс руу автоматаар шилжинэ.",
      en: "Dividends are automatically credited to your account on the record date, according to the timeline set by the issuing company.", ja: "配当は、発行会社が定めた日程に従い、権利確定日に自動的に口座へ入金されます。",
    },
    steps: [
      {
        title: {
          mn: "Бүртгэлийн өдрөөр эзэмшигч байх",
          en: "Hold the security on the record date", ja: "権利確定日に銘柄を保有する",
        },
        body: {
          mn: "Компанийн зарласан бүртгэлийн өдрөөр тухайн үнэт цаасыг дансандаа эзэмшиж байхад л хангалттай бөгөөд нэмэлт хүсэлт гаргах шаардлагагүй.",
          en: "Simply holding the security in your account on the company's announced record date is all that's required — no request needed.", ja: "発行会社が公表した権利確定日に、その銘柄を口座に保有しているだけで十分です。申請は不要です。",
        },
      },
      {
        title: {
          mn: "Ногдол ашиг автоматаар орох",
          en: "Dividends are credited automatically", ja: "配当が自動的に入金される",
        },
        body: {
          mn: "Компанийн зарласан хуваарийн дагуу ногдол ашгийн дүн таны арилжааны данс руу шууд, автоматаар шилжинэ.",
          en: "According to the company's announced schedule, the dividend amount is transferred directly and automatically to your trading account.", ja: "発行会社が公表した日程に従い、配当金が取引口座へ直接、自動的に振り込まれます。",
        },
      },
      {
        title: { mn: "Дараагийн алхмаа сонгох", en: "Choose your next step", ja: "次の一手を選ぶ" },
        body: {
          mn: "Орсон ногдол ашгаа шууд татан авах, эсвэл дахин үнэт цаас худалдан авахад зарцуулж болно.",
          en: "You can withdraw the dividend right away, or reinvest it by purchasing more securities.", ja: "配当はすぐに出金することも、再投資して証券を買い増すこともできます。",
        },
      },
    ],
  },
];

export const GUIDE_ROUTES = GUIDES.map((guide) => guide.route);
