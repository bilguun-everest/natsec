import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { Media } from "./collections/Media";
import { Reports } from "./collections/Reports";
import { Research } from "./collections/Research";
import { Users } from "./collections/Users";
import { Weekly } from "./collections/Weekly";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: "— Нэйшнл сэкюритис",
    },
  },

  collections: [Research, Reports, Weekly, Media, Users],

  /**
   * Content locales, not admin UI language. Every `localized: true` field gets
   * an mn/en pair behind a switcher in the editor, replacing the paired-string
   * shape the static pages use (`{ mn, en }` in `lib/guides.ts`).
   *
   * `fallback` means an entry with no English title renders its Mongolian one
   * rather than a blank — a half-translated report is still worth publishing.
   */
  localization: {
    locales: [
      { code: "mn", label: "Монгол" },
      { code: "en", label: "English" },
    ],
    defaultLocale: "mn",
    fallback: true,
  },

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    // Schema changes are applied by migration in production; `push` would let a
    // deploy silently alter the live database.
    push: process.env.NODE_ENV !== "production",
  }),

  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },

  // Resizes images uploaded into weekly review articles.
  sharp,

  plugins: [
    vercelBlobStorage({
      collections: { research: true, reports: true, media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Vercel caps a serverless request body at 4.5MB. Scanned annual
      // statements clear that easily, so the browser uploads straight to Blob
      // and only the resulting URL passes through the function.
      clientUploads: true,
    }),
  ],
});
