import type { CollectionConfig } from "payload";
import { publishedOrStaff, staffOnly } from "./access";

/**
 * Research reports. The collection is upload-enabled rather than pointing at a
 * separate media library: publishing a report is one screen and one action,
 * which is the whole reason the dashboard exists.
 *
 * `category` mirrors the three levels the public page is built around — see
 * `components/pages/Research.tsx`.
 */
export const Research: CollectionConfig = {
  slug: "research",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    group: "Судалгаа",
    description: "PDF тайлан байршуулж, гарчиг, огноо, ангиллыг оруулна.",
  },
  labels: { singular: "Судалгаа", plural: "Судалгаа" },
  access: { read: publishedOrStaff, create: staffOnly, update: staffOnly, delete: staffOnly },
  versions: { drafts: true },
  upload: { mimeTypes: ["application/pdf"] },
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: "Гарчиг" },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "macro",
      label: "Ангилал",
      options: [
        { value: "macro", label: "Макро орчин" },
        { value: "securities", label: "Үнэт цаас" },
        { value: "weekly", label: "7 хоног" },
      ],
    },
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
