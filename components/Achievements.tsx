import { T } from "@/components/lang";
import { SectionHeading, Wrap } from "@/components/ui";
import { achievements } from "@/lib/content";

export default function Achievements() {
  return (
    <section id="ololt" className="py-[86px] max-sm:py-[60px]">
      <Wrap>
        <SectionHeading
          eyebrow={achievements.eyebrow}
          title={achievements.title}
          lead={achievements.lead}
          className="mb-0 max-w-[620px]"
        />

        {achievements.groups.map((group) => (
          <div key={group.title.mn} className="mt-8">
            <h4 className="mb-4 font-display text-[15px] font-bold text-navy">
              <T>{group.title}</T>
            </h4>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
              {group.deals.map((deal) => (
                <div
                  key={`${deal.year}-${deal.client.mn}`}
                  className="rounded-[10px] border border-line p-[22px]"
                >
                  <span className="mb-3 inline-block rounded-full bg-blue-soft px-[9px] py-[3px] font-mono text-[11px] tracking-[.08em] text-blue-text">
                    {deal.year}
                  </span>
                  <h5 className="mb-1.5 font-display text-[14.5px] font-bold leading-[1.4] text-navy">
                    <T>{deal.client}</T>
                  </h5>
                  <span className="text-[13px] text-grey">
                    <T>{deal.note}</T>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Wrap>
    </section>
  );
}
