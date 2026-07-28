import { T } from "@/components/lang";
import { Mark, More, SectionHeading, Wrap } from "@/components/ui";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section className="py-[86px] max-sm:py-[60px]">
      <Wrap>
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          lead={services.lead}
        />

        {/* Hairline grid: the 1px gap over a tinted panel draws the rules. */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line max-sm:grid-cols-1">
          {services.cards.map((card) => (
            <div
              key={card.title.mn}
              className="bg-white px-8 py-[34px] transition-colors duration-200 hover:bg-paper"
            >
              <Mark className="mb-5 h-[38px] w-[38px] [&_rect]:fill-none [&_rect]:stroke-blue [&_rect]:stroke-2" />
              <h3 className="mb-2.5 font-display text-[19.5px] font-bold text-navy">
                <T>{card.title}</T>
              </h3>
              <p className="justify mb-4 text-[14.7px] text-grey">
                <T>{card.body}</T>
              </p>
              <ul className="mb-5">
                {card.bullets.map((bullet) => (
                  <li
                    key={bullet.mn}
                    className="relative mb-1.5 list-none pl-4 text-sm text-[#4A4F60] before:absolute before:left-0 before:top-[9px] before:h-[5px] before:w-[5px] before:border before:border-blue before:content-['']"
                  >
                    <T>{bullet}</T>
                  </li>
                ))}
              </ul>
              <More href="#">{services.more}</More>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
