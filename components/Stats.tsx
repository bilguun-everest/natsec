import { T } from "@/components/lang";
import { Band, Wrap } from "@/components/ui";
import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <Band>
      <section className="py-14">
        <Wrap className="grid grid-cols-4 gap-[34px] max-sm:grid-cols-2 max-sm:gap-[26px]">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <b className="block whitespace-nowrap font-display text-[clamp(26px,2.6vw,44px)] font-extrabold leading-none tracking-[-0.04em] text-navy">
                {stat.value}
              </b>
              <span className="mt-2 block text-[13.5px] text-grey">
                <T>{stat.label}</T>
              </span>
            </div>
          ))}
        </Wrap>
      </section>
    </Band>
  );
}
