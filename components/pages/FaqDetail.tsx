"use client";

import { T } from "@/components/lang";
import { DetailPage, List, PageNav } from "@/components/ui";
import { FAQ, type FaqEntry } from "@/lib/faq";

export default function FaqDetail({ entry }: { entry: FaqEntry }) {
  const index = FAQ.indexOf(entry);
  const prev = FAQ[index - 1];
  const next = FAQ[index + 1];

  return (
    <DetailPage
      back={{
        href: "/faq/",
        mn: "Бүх асуулт руу буцах",
        en: "All questions", ja: "質問一覧",
      }}
    >
      <div className="modal-num">
        <T mn="ТҮГЭЭМЭЛ АСУУЛТ" en="FAQ" ja="よくあるご質問" />
      </div>
      <h3>
        <T mn={entry.question.mn} en={entry.question.en} ja={entry.question.ja} />
      </h3>
      <p className="mp-lead">
        <T mn={entry.answer.mn} en={entry.answer.en} ja={entry.answer.ja} />
      </p>
      {entry.points && <List items={entry.points} />}

      <PageNav
        prev={prev && { href: `#${prev.route}`, ...prev.question }}
        next={next && { href: `#${next.route}`, ...next.question }}
      />
    </DetailPage>
  );
}
