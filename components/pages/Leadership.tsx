"use client";

import { Reveal } from "@/components/motion";
import { SecHead } from "@/components/ui";

export default function Leadership() {
  return (
    <div className="band">
      <section id="udirdlaga" className="stack">
        <div className="wrap">
          <SecHead
            eyebrow={{ mn: "Удирдлага", en: "Leadership" }}
            title={{ mn: "Удирдах албан тушаалтан", en: "Executive Officer" }}
            tight
          />
          <Reveal className="ceo-card" delay={60}>
            <div className="ceo-photo">ДР</div>
            <h4>Д. Ринчиндорж</h4>
            <span>CEO</span>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
