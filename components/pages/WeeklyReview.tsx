"use client";

import { RichText } from "@payloadcms/richtext-lexical/react";
import { T, useLang } from "@/components/lang";
import { BackLink, SecHead } from "@/components/ui";
import type { WeeklyItem } from "@/lib/content";

export default function WeeklyReview({ weekly }: { weekly: WeeklyItem | null }) {
  const { lang } = useLang();

  if (!weekly) {
    return (
      <section>
        <div className="wrap" style={{ padding: "72px 0" }}>
          <BackLink href="#sudalgaa" mn="Судалгаа руу буцах" en="Back to Research" />
          <SecHead
            eyebrow={{ mn: "Судалгаа, шинжилгээ", en: "Research & Analysis" }}
            title={{ mn: "Долоо хоногийн тойм", en: "Weekly Review" }}
            lead={{
              mn: "Энэ хуудсыг бэлтгэж байна. Долоо хоногийн зах зээлийн тойм удахгүй энд нийтлэгдэнэ.",
              en: "This page is being prepared. Weekly market reviews will be published here soon.",
            }}
          />
        </div>
      </section>
    );
  }

  // The editor writes each locale separately; render whichever the reader has
  // chosen, falling back to Mongolian when a translation has not been done.
  const content =
    (lang === "en" ? weekly.content.en : weekly.content.mn) ?? weekly.content.mn;

  return (
    <section>
      <div className="wrap" style={{ padding: "72px 0" }}>
        <BackLink href="#sudalgaa" mn="Судалгаа руу буцах" en="Back to Research" />
        <SecHead
          eyebrow={{ mn: "Судалгаа, шинжилгээ", en: "Research & Analysis" }}
          title={{ mn: weekly.title.mn, en: weekly.title.en }}
          lead={weekly.lead ?? undefined}
        />
        <p className="article-date">
          <time dateTime={weekly.date.replace(/\./g, "-")}>{weekly.date}</time>
        </p>
        {content ? (
          <div className="article-body">
            <RichText data={content as never} />
          </div>
        ) : (
          <p className="empty-note">
            <T mn="Агуулга бэлтгэгдэж байна." en="Content is being prepared." />
          </p>
        )}
      </div>
    </section>
  );
}
