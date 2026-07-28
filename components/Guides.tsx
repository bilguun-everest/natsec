import Faq from "@/components/Faq";
import { T } from "@/components/lang";
import { SectionHeading, Wrap } from "@/components/ui";
import { guides } from "@/lib/content";

export default function Guides() {
  return (
    <section id="zaavar" className="py-[86px] max-sm:py-[60px]">
      <Wrap className="grid grid-cols-[1.25fr_.95fr] gap-[52px] max-nav:grid-cols-1 max-nav:gap-9">
        <div>
          <SectionHeading
            eyebrow={guides.eyebrow}
            title={guides.title}
            lead={guides.lead}
            className="mb-[22px] max-w-[620px]"
          />

          <ul>
            {guides.steps.map((step, index) => (
              <li
                key={step.title.mn}
                className="flex list-none gap-4 border-b border-line py-[18px] last:border-b-0"
              >
                <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-blue-soft font-mono text-[13px] font-semibold text-navy">
                  {index + 1}
                </div>
                <div>
                  <h4 className="mb-1 font-display text-[15px] font-bold text-navy">
                    <T>{step.title}</T>
                  </h4>
                  <p className="justify text-[13.5px] text-grey">
                    <T>{step.body}</T>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Faq />
      </Wrap>
    </section>
  );
}
