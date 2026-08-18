import type { CollectionConfig } from "payload";
import {
  HeadingFeature,
  lexicalEditor,
  UploadFeature,
} from "@payloadcms/richtext-lexical";
import { publishedOrStaff, staffOnly } from "./access";

/**
 * The weekly market review. Not a PDF — it is a page, so it gets a rich text
 * editor rather than an upload. `components/pages/WeeklyReview.tsx` renders the
 * most recent published entry.
 */
export const Weekly: CollectionConfig = {
  slug: "weekly",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "_status"],
    group: "Судалгаа",
    description: "Долоо хоногийн зах зээлийн тойм. Хамгийн сүүлийнх нь сайтад харагдана.",
  },
  labels: { singular: "Долоо хоногийн тойм", plural: "Долоо хоногийн тойм" },
  access: { read: publishedOrStaff, create: staffOnly, update: staffOnly, delete: staffOnly },
  versions: { drafts: true },
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
    { name: "lead", type: "textarea", localized: true, label: "Оршил" },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
      label: "Агуулга",
      // Headings start at h2: the page already renders the title as its h1, and
      // letting an editor emit another one would break the document outline.
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter(
            (feature) => !["heading", "upload"].includes(feature.key),
          ),
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          UploadFeature({ collections: { media: { fields: [] } } }),
        ],
      }),
    },
  ],
};
