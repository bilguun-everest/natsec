import Image from "next/image";
import { T } from "@/components/lang";
import { Wrap } from "@/components/ui";
import { footer } from "@/lib/content";

const SOCIALS = [
  {
    label: "Facebook",
    path: "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z",
  },
  {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2a6.6 6.6 0 100 13.2 6.6 6.6 0 000-13.2zm0 10.9a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6zm8.4-11.2a1.5 1.5 0 11-3.1 0 1.5 1.5 0 013.1 0z",
  },
  {
    label: "YouTube",
    path: "M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C17 4 12 4 12 4s-5 0-7.8.2c-.4 0-1.4 0-2.3 1-.7.7-.9 2.3-.9 2.3S.8 9.4.8 11.3v1.7c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s5 0 7.8-.2c.5 0 1.4 0 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.7c0-1.9-.2-3.8-.2-3.8zM9.7 15.1V8.9l6.4 3.1-6.4 3.1z",
  },
  {
    label: "LinkedIn",
    path: "M20.4 3H3.6C2.7 3 2 3.7 2 4.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V4.6c0-.9-.7-1.6-1.6-1.6zM8.1 19H5.3V9.7h2.8V19zM6.7 8.4a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zM19 19h-2.8v-4.5c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V19H10.2V9.7H13v1.3h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4V19z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy pt-16 text-sm text-[#B6BEDD]">
      <Wrap>
        <div className="grid grid-cols-[1.35fr_repeat(5,1fr)] gap-[30px] pb-11 max-nav:grid-cols-2 max-sm:grid-cols-1">
          <div>
            <Image
              src="/logo.png"
              alt="NatSec"
              width={165}
              height={34}
              className="mb-[18px] h-[34px] w-auto brightness-0 invert"
            />
            <p className="mb-4 text-[13.5px] leading-[1.75] text-[#99A2C6]">
              <T>{footer.address}</T>
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-white/[.17] transition-colors duration-200 hover:border-blue hover:bg-blue"
                >
                  <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-white">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title.mn}>
              <h5 className="mb-3.5 font-display text-[13px] font-bold tracking-[.04em] text-white">
                <T>{column.title}</T>
              </h5>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label.mn} className="mb-[9px] list-none">
                    <a
                      href={link.href}
                      className="text-[13.5px] text-[#99A2C6] transition-colors hover:text-white"
                    >
                      <T>{link.label}</T>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="justify border-t border-white/[.12] py-[22px] text-[12.5px] leading-[1.7] text-[#8189AE]">
          <strong className="text-[#B6BEDD]">
            <T>{footer.disclaimerLabel}</T>
          </strong>{" "}
          <T>{footer.disclaimer}</T>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-white/[.12] py-[18px] text-[12.5px] text-[#8189AE]">
          <span>
            <T>{footer.copyright}</T>
          </span>
        </div>
      </Wrap>
    </footer>
  );
}
