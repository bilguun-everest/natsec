import type { CollectionConfig } from "payload";
import { publishedOrStaff, staffOnly } from "./access";

/**
 * Research reports. The collection is upload-enabled rather than pointing at a
 * separate media library: publishing a report is one screen and one action,
 * which is the whole reason the dashboard exists.
 *
 * There is no `category` any more: it named three levels — macro, securities
 * and weekly — of which the site only ever published securities research. A
 * required select with one real value is a question with one answer.
 */
export const Research: CollectionConfig = {
  slug: "research",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "_status"],
    group: "Судалгаа",
    description: "PDF тайлан байршуулж, гарчиг, огноог оруулна.",
  },
  labels: { singular: "Судалгаа", plural: "Судалгаа" },
  access: { read: publishedOrStaff, create: staffOnly, update: staffOnly, delete: staffOnly },
  versions: { drafts: true },
  upload: { mimeTypes: ["application/pdf"] },
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: "Гарчиг" },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      label: "Нийтэлсэн огноо",
      admin: { date: { pickerAppearance: "dayOnly", displayFormat: "yyyy.MM.dd" } },
    },
    {
      name: "summary",
      type: "textarea",
      localized: true,
      label: "Товч тайлбар",
      admin: { description: "Заавал биш. Жагсаалтад гарчгийн доор харагдана." },
    },
  ],
};
