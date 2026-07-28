import { T } from "@/components/lang";
import { Band, SectionHeading, Wrap } from "@/components/ui";
import { contact } from "@/lib/content";

export default function Contact() {
  return (
    <Band>
      <section id="holboo-barih" className="py-16 max-sm:py-[60px]">
        <Wrap>
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            className="mb-7 max-w-[620px]"
          />

          <div className="max-w-[520px] rounded-xl border border-line bg-white p-8">
            {contact.rows.map((row) => (
              <div
                key={row.label.mn}
                className="flex gap-4 border-t border-line py-[15px] first:border-t-0 max-sm:flex-col max-sm:gap-1"
              >
                <b className="min-w-[84px] shrink-0 pt-px font-mono text-[11px] uppercase tracking-[.1em] text-blue-text">
                  <T>{row.label}</T>
                </b>
                <span className="text-[14.5px] leading-relaxed text-ink">
                  <T>{row.value}</T>
                </span>
              </div>
            ))}
          </div>
        </Wrap>
      </section>
    </Band>
  );
}
