"use client";

import { Reveal } from "@/components/motion";
import { SecHead } from "@/components/ui";

export default function Leadership() {
  return (
    <div className="band">
      <section id="udirdlaga" style={{ padding: "64px 0" }}>
        <div className="wrap lead-split">
          <SecHead
            eyebrow={{ mn: "Удирдлага", en: "Leadership" }}
            title={{ mn: "Удирдах албан тушаалтан", en: "Executive Officer" }}
            style={{ marginBottom: 0 }}
          />
          {/* One officer, so the card sits beside the heading rather than
              under it: a 340px box alone under a full-width heading reads as
              a row that failed to load the rest of itself. */}
          <Reveal className="ceo-card" delay={60}>
            <div className="ceo-photo">ДР</div>
            <div>
              <h4>Д. Ринчиндорж</h4>
              <span>CEO</span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
