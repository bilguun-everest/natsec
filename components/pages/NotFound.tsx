"use client";

import { T } from "@/components/lang";
import { SecHead } from "@/components/ui";

/**
 * Shown when the fragment names a page that does not exist — a stale link, a
 * typo, or a page that has since been renamed. Previously these landed on the
 * homepage without explanation, which reads as the site losing your click.
 */
export default function NotFound() {
  return (
    <section>
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "404", en: "404" }}
          title={{ mn: "Хуудас олдсонгүй", en: "Page not found" }}
          lead={{
            mn: "Уучлаарай, таны хайсан хуудас олдсонгүй. Хаяг өөрчлөгдсөн эсвэл устсан байж болзошгүй.",
            en: "Sorry — we couldn't find that page. The address may have changed, or the page may no longer exist.",
          }}
        />
        <div className="nf-links">
          <a href="#home" className="btn btn-p">
            <T mn="Нүүр хуудас" en="Home" />
          </a>
          <a href="#zaavar" className="btn btn-o">
            <T mn="Заавар" en="Guides" />
          </a>
          <a href="#holboo-barih" className="btn btn-o">
            <T mn="Холбоо барих" en="Contact" />
          </a>
        </div>
      </div>
    </section>
  );
}
