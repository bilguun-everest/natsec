"use client";

import { Reveal } from "@/components/motion";
import { SecHead } from "@/components/ui";

export default function Leadership() {
  return (
    <div className="band">
      <section id="udirdlaga" style={{ padding: "64px 0" }}>
        <div className="wrap">
          <SecHead
            eyebrow={{ mn: "Удирдлага", en: "Leadership" }}
            title={{ mn: "Удирдах албан тушаалтан", en: "Executive Officer" }}
            style={{ marginBottom: 28 }}
          />
          <Reveal className="ceo-card" style={{ maxWidth: 340 }} delay={60}>
            <div className="ceo-photo">ДР</div>
            <h4>Д. Ринчиндорж</h4>
            <span>CEO</span>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
