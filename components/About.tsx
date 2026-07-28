import { T } from "@/components/lang";
import { Mark, SectionHeading, Wrap } from "@/components/ui";
import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="tanilcuulga" className="py-[86px] max-sm:py-[60px]">
      <Wrap>
        <SectionHeading eyebrow={about.eyebrow} title={about.title} />

        <div className="grid grid-cols-[1.15fr_.85fr] items-start gap-[52px] max-nav:grid-cols-1 max-nav:gap-9">
          <div>
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="justify mb-4 text-[15px] text-grey">
                <T>{paragraph}</T>
              </p>
            ))}

            <div className="mt-7 rounded-[10px] bg-blue-soft px-[26px] py-[22px] font-display text-lg font-bold text-navy">
              <T>{about.motto}</T>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            {about.values.map((value) => (
              <div
                key={value.title.mn}
                className="rounded-[10px] border border-line p-[22px]"
              >
                <Mark
                  rings={2}
                  className="mb-3 h-[26px] w-[26px] [&_rect]:fill-none [&_rect]:stroke-blue [&_rect]:stroke-2"
                />
                <h4 className="mb-[7px] font-display text-[14.5px] font-bold text-navy">
                  <T>{value.title}</T>
                </h4>
                <p className="justify text-[13.3px] text-grey">
                  <T>{value.body}</T>
                </p>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
