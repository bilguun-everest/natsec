import type { CollectionConfig } from "payload";
import { anyone, staffOnly } from "./access";

/** Images placed inside weekly review articles — charts, tables, photos. */
export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Тохиргоо" },
  labels: { singular: "Зураг", plural: "Зураг" },
  access: { read: anyone, create: staffOnly, update: staffOnly, delete: staffOnly },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [{ name: "wide", width: 1200, position: "centre" }],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      label: "Тайлбар (alt)",
      admin: { description: "Зураг харахгүй хэрэглэгчид зориулсан тайлбар. Заавал бөглөнө." },
    },
  ],
};
