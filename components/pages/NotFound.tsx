"use client";

import { A, T } from "@/components/lang";
import { SecHead } from "@/components/ui";

/**
 * Shown when the fragment names a page that does not exist — a stale link, a
 * typo, or a page that has since been renamed. Previously these landed on the
 * homepage without explanation, which reads as the site losing your click.
 */
export default function NotFound() {
  return (
    <section>
      <div className="wrap" style={{ padding: "72px 0" }}>
        <SecHead
          eyebrow={{ mn: "404", en: "404", ja: "404" }}
          title={{ mn: "Хуудас олдсонгүй", en: "Page not found", ja: "ページが見つかりません" }}
          lead={{
            mn: "Уучлаарай, таны хайсан хуудас олдсонгүй. Хаяг өөрчлөгдсөн эсвэл устсан байж болзошгүй.",
            en: "Sorry — we couldn't find that page. The address may have changed, or the page may no longer exist.", ja: "お探しのページは見つかりませんでした。アドレスが変更されたか、ページが削除された可能性があります。",
          }}
        />
        <div className="nf-links">
          <A href="/" className="btn btn-p">
            <T mn="Нүүр хуудас" en="Home" ja="ホーム" />
          </A>
          <A href="/zaavar/" className="btn btn-o">
            <T mn="Заавар" en="Guides" ja="ガイド" />
          </A>
          <A href="/holboo-barih/" className="btn btn-o">
            <T mn="Холбоо барих" en="Contact" ja="お問い合わせ" />
          </A>
        </div>
      </div>
    </section>
  );
}
