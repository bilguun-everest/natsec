import type { CollectionConfig } from "payload";

/**
 * Admin accounts. Everything else in this config is public to read and
 * restricted to logged-in staff to change, so this collection is the whole
 * access model — there are no roles yet. Add a `role` field here when
 * compliance decides research needs a second signature before publishing.
 *
 * Labels throughout the config are plain Mongolian strings: Payload ships no
 * `mn` admin translation, so the surrounding chrome stays English and only the
 * text we supply can speak to the people actually using this.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email"],
    group: "Тохиргоо",
  },
  labels: { singular: "Хэрэглэгч", plural: "Хэрэглэгчид" },
  fields: [{ name: "name", type: "text", required: true, label: "Нэр" }],
};
