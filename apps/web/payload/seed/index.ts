import path from "path"
import { fileURLToPath } from "url"
import config from "@payload-config"
import { getPayload } from "payload"

import type { MediaSource } from "@/lib/media"
import {
  placeholderSiteSettings,
  placeholderTeam,
  placeholderVehicles,
} from "@/payload/seed/data"

/**
 * Development seed: loads the placeholder vehicles, team and contacts (the
 * content the site showed before the CMS) and uploads their images from
 * /public. Run with `pnpm seed`; on a database that already has content it
 * stops unless SEED_RESET=1, which deletes vehicles, team and media first.
 */
const publicDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../public"
)

const payload = await getPayload({ config })
// No Next.js runtime here: skip the page revalidation hooks. A new object
// per call: Payload uses it as `req.context`, and the cloud storage plugin
// leaves `skipCloudStorage` on it, which would skip every later upload.
const context = () => ({ disableRevalidate: true })

const existing = await payload.count({ collection: "vehicles" })
if (existing.totalDocs > 0 && process.env.SEED_RESET !== "1") {
  payload.logger.error(
    "The database already has vehicles: run with SEED_RESET=1 to replace vehicles, team and media."
  )
  process.exit(1)
}

for (const collection of ["vehicles", "team-members", "media"] as const) {
  await payload.delete({ collection, where: {}, context: context() })
}

const mediaIds = new Map<string, number>()

async function upload(media: MediaSource) {
  const url = media.url ?? ""
  const known = mediaIds.get(url)
  if (known) return known
  const doc = await payload.create({
    collection: "media",
    data: {
      alt: media.alt,
      focalX: media.focalX ?? undefined,
      focalY: media.focalY ?? undefined,
    },
    filePath: path.join(publicDir, url),
    context: context(),
  })
  mediaIds.set(url, doc.id)
  return doc.id
}

for (const vehicle of placeholderVehicles) {
  const gallery = []
  for (const image of vehicle.gallery ?? []) gallery.push(await upload(image))
  await payload.create({
    collection: "vehicles",
    data: {
      ...vehicle,
      generateSlug: false,
      image: await upload(vehicle.image),
      gallery,
      _status: "published",
    },
    context: context(),
  })
}

for (const member of placeholderTeam) {
  await payload.create({
    collection: "team-members",
    data: { ...member, photo: await upload(member.photo) },
    context: context(),
  })
}

await payload.updateGlobal({
  slug: "site-settings",
  data: placeholderSiteSettings,
  context: context(),
})

payload.logger.info(
  `Seeded ${placeholderVehicles.length} vehicles, ${placeholderTeam.length} team members, ${mediaIds.size} images and the site settings.`
)
process.exit(0)
