import path from "path"
import { fileURLToPath } from "url"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { it } from "@payloadcms/translations/languages/it"
import { buildConfig } from "payload"
import sharp from "sharp"

import { migrations } from "./migrations"
import { Media } from "./payload/collections/media"
import { TeamMembers } from "./payload/collections/team-members"
import { Users } from "./payload/collections/users"
import { Vehicles } from "./payload/collections/vehicles"
import { SiteSettings } from "./payload/globals/site-settings"

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: {
      titleSuffix: " · Omnia Prima",
      icons: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }],
    },
    // Brand colours are in app/(payload)/custom.scss, tuned for light mode.
    theme: "light",
    components: {
      graphics: {
        Logo: "/payload/admin/graphics#Logo",
        Icon: "/payload/admin/graphics#Icon",
      },
    },
  },
  collections: [Vehicles, TeamMembers, Media, Users],
  globals: [SiteSettings],
  i18n: { supportedLanguages: { it }, fallbackLanguage: "it" },
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    // Schema changes go through committed migrations everywhere (no dev
    // push), and production applies them when Payload starts.
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      // Without a token (local development) uploads stay in ./media.
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Same media columns with or without a token, so migrations generated
      // locally match production (default in Payload v4).
      alwaysInsertFields: true,
      // Images are public: serve them straight from the Blob CDN.
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
