import { T } from "@/components/lang";
import { Band, SectionHeading, Wrap } from "@/components/ui";
import { leadership } from "@/lib/content";

export default function Leadership() {
  return (
    <Band>
      <section id="udirdlaga" className="py-16 max-sm:py-[60px]">
        <Wrap>
          <SectionHeading
            eyebrow={leadership.eyebrow}
            title={leadership.title}
            className="mb-7 max-w-[620px]"
          />

          <div className="max-w-[340px] rounded-xl border border-line bg-white p-[30px] text-center">
            <div className="mx-auto mb-[18px] flex h-[84px] w-[84px] items-center justify-center rounded-full bg-navy font-display text-[22px] font-bold text-white">
              {leadership.ceo.initials}
            </div>
            <h4 className="mb-1 font-display text-[17px] font-bold text-navy">
              <T>{leadership.ceo.name}</T>
            </h4>
            <span className="font-mono text-xs text-blue-text">
              {leadership.ceo.role}
            </span>
          </div>
        </Wrap>
      </section>
    </Band>
  );
}
