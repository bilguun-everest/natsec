import type { CollectionConfig } from "payload";
import { publishedOrStaff, staffOnly } from "./access";

/**
 * Audited financial statements. Kept separate from `research` on purpose: these
 * follow a fixed regulatory calendar and a different sign-off path, and a
 * research publish should never be able to touch them.
 */
export const Reports: CollectionConfig = {
  slug: "reports",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "year", "period", "_status"],
    group: "Бидний тухай",
    description: "Аудит хийгдсэн жил, улирлын санхүүгийн тайлан.",
  },
  labels: { singular: "Санхүүгийн тайлан", plural: "Санхүүгийн тайлан" },
  access: { read: publishedOrStaff, create: staffOnly, update: staffOnly, delete: staffOnly },
  versions: { drafts: true },
  upload: { mimeTypes: ["application/pdf"] },
  defaultSort: "-year",
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: "Гарчиг" },
    {
      name: "year",
      type: "number",
      required: true,
      min: 2000,
      max: 2100,
      defaultValue: () => new Date().getFullYear(),
      label: "Он",
    },
    {
      name: "period",
      type: "select",
      required: true,
      defaultValue: "annual",
      label: "Хугацаа",
      options: [
        { value: "annual", label: "Жилийн" },
        { value: "q1", label: "1-р улирал" },
        { value: "q2", label: "2-р улирал" },
        { value: "q3", label: "3-р улирал" },
        { value: "q4", label: "4-р улирал" },
      ],
    },
  ],
};
