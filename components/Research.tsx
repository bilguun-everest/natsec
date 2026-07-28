import { T } from "@/components/lang";
import { Band, Eyebrow, More, SectionHeading, Wrap } from "@/components/ui";
import { research } from "@/lib/content";

export default function Research() {
  return (
    <Band>
      <section className="py-[86px] max-sm:py-[60px]">
        <Wrap className="grid grid-cols-[1.25fr_.95fr] gap-[52px] max-nav:grid-cols-1 max-nav:gap-9">
          <div>
            <SectionHeading
              eyebrow={research.eyebrow}
              title={research.title}
              className="mb-[22px] max-w-[620px]"
            />

            <ul>
              {research.items.map((item) => (
                <li key={item.date} className="list-none border-b border-line">
                  <a
                    href="#"
                    className="group grid grid-cols-[96px_1fr] items-start gap-[18px] py-[18px] max-sm:grid-cols-1 max-sm:gap-1"
                  >
                    <time className="pt-0.5 font-mono text-[12.5px] text-grey max-sm:pt-0">
                      {item.date}
                    </time>
                    <div>
                      <h4 className="text-base font-semibold leading-[1.45] transition-colors group-hover:text-blue-text">
                        <T>{item.title}</T>
                      </h4>
                      <span className="mt-[7px] inline-block rounded-[3px] bg-blue-soft px-2 py-[3px] font-mono text-[10px] uppercase tracking-[.1em] text-blue-text">
                        <T>{item.tag}</T>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <More href="#" className="mt-5">
              {research.all}
            </More>
          </div>

          {/* -------------------------------------------- analyst reports */}
          <div className="self-start rounded-xl bg-navy px-[30px] py-8 text-white">
            <Eyebrow tone="light">{research.reports.eyebrow}</Eyebrow>
            <h3 className="mb-2 font-display text-xl font-bold">
              <T>{research.reports.title}</T>
            </h3>
            <p className="justify mb-6 text-[14.5px] text-[#AAB3D8]">
              <T>{research.reports.lead}</T>
            </p>
            <ul>
              {research.reports.files.map((file) => (
                <li
                  key={file.meta}
                  className="list-none border-t border-white/[.13] py-3.5"
                >
                  <a
                    href="#"
                    className="flex items-center justify-between gap-3.5 text-[14.5px] transition-colors hover:text-blue"
                  >
                    <span>
                      <T>{file.title}</T>
                    </span>
                    <span className="shrink-0 font-mono text-[10.5px] text-[#8E98C4]">
                      {file.meta}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Wrap>
      </section>
    </Band>
  );
}
