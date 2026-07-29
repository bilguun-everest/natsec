"use client";

import { BackLink, SecHead } from "@/components/ui";

export default function WeeklyReview() {
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
