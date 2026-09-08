"use client";

import { useEffect } from "react";
import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { useCurrentRoute } from "@/components/router";
import { SecHead } from "@/components/ui";
import Achievements from "@/components/pages/Achievements";
import Reports from "@/components/pages/Reports";
import type { ReportItem } from "@/lib/content";

const VALUES: {
  icon: React.ReactNode;
  title: { mn: string; en: string; ja: string };
  body: { mn: string; en: string; ja: string };
}[] = [
  {
    icon: (
      <>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    title: { mn: "Эрхэм зорилго", en: "Mission", ja: "ミッション" },
    body: {
      mn: "Харилцагчдынхаа хөрөнгийг өсгөн нэмэгдүүлэхэд тэдэнтэй хамт зүтгэж, мэдээлэлд суурилсан, ухаалаг хөрөнгө оруулалтын соёлыг түгээх.",
      en: "To stand alongside our clients in growing their wealth, and to promote an informed, intelligent investment culture.", ja: "お客様の資産形成に寄り添い、知識に基づく賢明な投資文化を広めます。",
    },
  },
  {
    icon: (
      <>
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    title: { mn: "Алсын хараа", en: "Vision", ja: "ビジョン" },
    body: {
      mn: "Монголын үнэт цаасны зах зээлд тэргүүлэгч, олон улсын стандартад нийцсэн брокер, хөрөнгө оруулалтын байгууллага болох.",
      en: "To become a leading broker and investment institution in Mongolia's securities market that meets international standards.", ja: "国際基準を満たす、モンゴル証券市場の主導的なブローカー兼投資機関となります。",
    },
  },
  {
    icon: (
      <>
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    title: { mn: "Үнэт зүйл", en: "Values", ja: "バリュー" },
    body: {
      mn: "Бид хариуцлагатайгаар үйл ажиллагаагаа явуулж, харилцагчдынхаа итгэлийг эрхэмлэн, мэдлэг чадвараа дайчилж, шударга бөгөөд хурдан шийдлээр үйлчилгээгээ хүргэдэг.",
      en: "We operate responsibly, hold our clients' trust in the highest regard, mobilize our knowledge and skills, and deliver honest, fast securities market services.", ja: "責任をもって業務にあたり、お客様の信頼を何よりも重んじ、知識と技術を結集して、誠実で迅速な証券サービスを提供します。",
    },
  },
  {
    icon: (
      <>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M10 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </>
    ),
    title: { mn: "Хамтын ажиллагаа", en: "Collaboration", ja: "協働" },
    body: {
      mn: "Харилцагч, түнш байгууллагуудтайгаа хамтран ажиллаж, хамтын хүчээр илүү их үнэ цэнийг бүтээдэг.",
      en: "We work together with our clients and partner organizations, creating greater value through joint effort.", ja: "お客様およびパートナー企業とともに歩み、協働によってより大きな価値を生み出します。",
    },
  },
];

/**
 * Everything under "Бидний тухай" on one page.
 *
 * It used to be separate pages behind a dropdown, which made the reader open a
 * menu and pick before they could learn anything about the company. The parts
 * are short enough to read in one scroll, so they are one page and the menu
 * entry goes straight to it.
 */
export default function About({ reports }: { reports: ReportItem[] }) {
  useSectionScroll();

  return (
    <>
      <section id="tanilcuulga">
        <div className="wrap">
          <SecHead
            eyebrow={{ mn: "Бидний тухай", en: "About Us", ja: "会社概要" }}
            title={{ mn: "Танилцуулга", en: "Overview", ja: "会社案内" }}
          />

          <div className="about-split">
            <Reveal className="about-copy" delay={60}>
              <p>
                <T
                  mn="«Нэйшнл Сэкюритис» ҮЦК ХХК нь 2007 оны 3-р сарын 15-нд Улаанбаатарт байгуулагдаж, Брокер, Дилер, Хөрөнгө оруулалтын зөвлөх эрхээ авснаар үнэт цаасны зах зээлд зохицуулалттай үйл ажиллагаа явуулж эхэлсэн, Монголын хөрөнгийн биржийн гишүүн байгууллага юм. 2011 онд Андеррайтерийн эрх, Өмнөговь салбарын эрхийг нэмж авч, 2020 онд Номинал дансны үйлчилгээг нэвтрүүлснээр харилцагчдынхаа хэрэгцээг илүү өргөн хүрээнд хангах боломжтой болсон. 2022 онд хувьцааныхаа 96 хувийг шинэ хөрөнгө оруулагч эзэмшиж, шинэ удирдлагын багтайгаар компанийн хөгжлийн шинэ шатанд гарсан."
                  en="National Securities LLC was founded in Ulaanbaatar on March 15, 2007, and began regulated operations in the securities market after obtaining Broker, Dealer, and Investment Advisory licenses — making it a member organization of the Mongolian Stock Exchange. In 2011 it added an Underwriter license and an Umnugovi branch license, and in 2020 it introduced Nominee Account services, allowing it to serve customers' needs even more broadly. In 2022, 96% of its shares were acquired by new investors, and with a new management team the company entered a new stage of development."
                  ja="ナショナル・セキュリティーズ証券は2007年3月15日にウランバートルで設立され、ブローカー、ディーラー、投資助言の免許を取得して証券市場での業務を開始し、モンゴル証券取引所の会員機関となりました。2011年には引受業務の免許とウムヌゴビ支店の免許を追加し、2020年にはノミニー口座サービスを導入して、お客様のニーズにいっそう幅広くお応えできるようになりました。2022年には株式の96%を新たな投資家が取得し、新しい経営陣のもとで会社は新たな発展段階に入りました。"
                />
              </p>
              <p>
                <T
                  mn="Монголын хөрөнгийн биржийн нийт 52 гишүүн компанийн дотроос Брокер, Дилер, Хөрөнгө оруулалтын зөвлөх, Андеррайтер, Номинал данс гэсэн бүх 5 төрлийн тусгай зөвшөөрлийг бүрэн эзэмшдэг ердөө 9 компанийн нэг нь бид билээ. 2025 оны 4-р сарын байдлаар нийт идэвхтэй 12,951 харилцагчтайгаар үйл ажиллагаа явуулж, үнэт цаасны зуучлалын болон хөрөнгө оруулалтын банкны цогц үйлчилгээг харилцагчиддаа хүргэж байна."
                  en="We are one of only 9 companies out of the Mongolian Stock Exchange's 52 member companies that fully hold all 5 types of special licenses — Broker, Dealer, Investment Advisor, Underwriter, and Nominee Account. As of April 2025 we serve 12,951 active clients, delivering comprehensive securities brokerage and investment banking services."
                  ja="当社は、モンゴル証券取引所の52の会員会社のうち、ブローカー、ディーラー、投資助言、引受、ノミニー口座という5種類すべての特別免許を保有する9社の1社です。2025年4月時点で12,951名のお客様にご利用いただき、証券仲介と投資銀行業務を包括的に提供しています。"
                />
              </p>
              <div className="motto">
                <T
                  mn={'"Тогтвортой өсөлт, найдвартай түнш"'}
                  en={'"Stable growth, a reliable partner"'}
                  ja={"「安定した成長、信頼できるパートナー」"}
                />
              </div>
            </Reveal>

            <div className="value-grid">
              {VALUES.map((value, index) => (
                <Reveal
                  className="value-card"
                  key={value.title.mn}
                  delay={120 + index * 90}
                >
                  <div className="icon-badge">
                    <svg viewBox="0 0 24 24">{value.icon}</svg>
                  </div>
                  <h4>
                    <T mn={value.title.mn} en={value.title.en} ja={value.title.ja} />
                  </h4>
                  <p>
                    <T mn={value.body.mn} en={value.body.en} ja={value.body.ja} />
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Achievements />
      <Reports reports={reports} />
    </>
  );
}

/**
 * The parts kept their own routes, because the footer still links to each by
 * name and old links should not break. They all render this page, so a link to
 * one part has to land on that part instead of at the top.
 *
 * `#udirdlaga` is now one of those routes with nothing to scroll to — the
 * section was removed, and the optional call below quietly leaves such a link
 * at the top of the page rather than breaking it.
 */
function useSectionScroll() {
  const route = useCurrentRoute();

  useEffect(() => {
    if (route === "tanilcuulga") return;
    // `useRoute` sends every navigation back to the top, and that effect lives
    // in <App> — a parent, so it runs after this one. Waiting a frame lets the
    // reset land first, otherwise it would undo the jump.
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(route)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);
}
