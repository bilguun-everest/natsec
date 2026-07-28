"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { T, useLang } from "@/components/lang";
import { Btn, Wrap } from "@/components/ui";
import { actions, isGroup, nav, LOGIN_URL } from "@/lib/content";

/**
 * Sticky header: hover/focus dropdowns on desktop, a full-height drawer below
 * the `nav` breakpoint.
 */
export default function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  // The drawer owns the viewport while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-[100] border-b border-line bg-white/[.94] backdrop-blur-[12px]">
      <Wrap className="flex h-[76px] items-center justify-between gap-[30px] max-sm:gap-3">
        <a href="#" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt="NatSec"
            width={184}
            height={38}
            priority
            className="h-[38px] w-auto max-sm:h-[30px]"
          />
        </a>

        {/* ---------------------------------------------------- desktop nav */}
        <ul className="flex flex-1 items-center justify-between px-6 max-nav:hidden">
          {nav.map((item) => (
            <li key={item.label.mn} className="group relative list-none">
              <a
                href="#"
                className="block whitespace-nowrap rounded-md px-3 py-2.5 text-[14.5px] font-medium text-[#2C3040] transition-colors duration-150 group-hover:bg-blue-soft group-hover:text-navy"
              >
                <T>{item.label}</T>
              </a>
              <div
                className={`invisible absolute top-[calc(100%+10px)] w-[250px] -translate-y-1.5 rounded-[10px] border border-line bg-white p-2 opacity-0 shadow-drop transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                  item.alignRight ? "right-0" : "left-1/2 -ml-[125px]"
                }`}
              >
                {item.items.map((entry) =>
                  isGroup(entry) ? (
                    <div
                      key={entry.group.mn}
                      className="px-3 pb-[5px] pt-3 font-mono text-[10.5px] uppercase tracking-[.13em] text-grey"
                    >
                      <T>{entry.group}</T>
                    </div>
                  ) : (
                    <a
                      key={entry.label.mn}
                      href={entry.href}
                      className="block rounded-md px-3 py-[9px] text-sm text-[#3A3F52] transition-colors hover:bg-blue-soft hover:text-navy"
                    >
                      <T>{entry.label}</T>
                    </a>
                  ),
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* -------------------------------------------------------- actions */}
        <div className="flex shrink-0 items-center gap-2.5">
          <Btn href={LOGIN_URL} variant="o" className="max-nav:hidden">
            {actions.login}
          </Btn>
          <Btn href={LOGIN_URL} variant="p">
            {actions.openAccount}
          </Btn>
          <button
            type="button"
            aria-label={t(actions.menu)}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="p-2 nav:hidden"
          >
            <span className="my-1 block h-0.5 w-[22px] rounded-sm bg-navy" />
            <span className="my-1 block h-0.5 w-[22px] rounded-sm bg-navy" />
            <span className="my-1 block h-0.5 w-[22px] rounded-sm bg-navy" />
          </button>
        </div>
      </Wrap>

      {/* ----------------------------------------------------- mobile drawer */}
      {open && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100vh-76px)] overflow-y-auto border-t border-line bg-white shadow-drop nav:hidden">
          <Wrap className="py-6">
            {nav.map((item) => (
              <div key={item.label.mn} className="border-b border-line py-4">
                <div className="mb-2 font-display text-[15px] font-bold text-navy">
                  <T>{item.label}</T>
                </div>
                {item.items.map((entry) =>
                  isGroup(entry) ? (
                    <div
                      key={entry.group.mn}
                      className="px-1 pb-1 pt-3 font-mono text-[10.5px] uppercase tracking-[.13em] text-grey"
                    >
                      <T>{entry.group}</T>
                    </div>
                  ) : (
                    <a
                      key={entry.label.mn}
                      href={entry.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-1 py-2 text-sm text-[#3A3F52] hover:text-blue-text"
                    >
                      <T>{entry.label}</T>
                    </a>
                  ),
                )}
              </div>
            ))}
            <Btn href={LOGIN_URL} variant="o" className="mt-6 w-full">
              {actions.login}
            </Btn>
          </Wrap>
        </div>
      )}
    </header>
  );
}
