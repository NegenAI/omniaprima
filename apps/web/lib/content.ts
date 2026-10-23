import config from "@payload-config"
import { getPayload } from "payload"
import { cache } from "react"

import type { TeamMember } from "@/components/team-member-card"
import { toSiteImage, type MediaSource } from "@/lib/media"
import { toSiteSettings, type SiteSettings } from "@/lib/site"
import {
  formulas,
  toVehicle,
  type Formula,
  type Vehicle,
  type VehicleSource,
} from "@/lib/vehicles"
import type { Media, VehicleDoc } from "@/payload-types"

// Server-only reads of the admin content through Payload's Local API. Each
// getter runs once per request (React `cache`); pages are refreshed by the
// collection hooks in payload/revalidate.ts when content changes.

/** A populated upload (depth 1); `undefined` when the media was deleted. */
function media(value: number | Media | null | undefined) {
  return typeof value === "object" && value?.url
    ? (value as MediaSource)
    : undefined
}

function vehicleSource(doc: VehicleDoc): VehicleSource | undefined {
  const image = media(doc.image)
  if (!image) return undefined
  return {
    ...doc,
    image,
    gallery: (doc.gallery ?? []).flatMap((item) => media(item) ?? []),
  }
}

/** Published vehicles in the admin's drag-and-drop order. */
export const getVehicles = cache(async (): Promise<Vehicle[]> => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "vehicles",
    where: { _status: { equals: "published" } },
    sort: "_order",
    depth: 1,
    pagination: false,
  })
  return docs.flatMap((doc) => {
    const source = vehicleSource(doc)
    return source ? [toVehicle(source)] : []
  })
})

export async function getVehiclesByFormula(formula: Formula) {
  return (await getVehicles()).filter((vehicle) => vehicle.formula === formula)
}

export async function getVehicle(slug: string) {
  return (await getVehicles()).find((vehicle) => vehicle.slug === slug)
}

/** Homepage selection, per formula. */
export async function getFeaturedVehicles(): Promise<
  Record<Formula, Vehicle[]>
> {
  const vehicles = await getVehicles()
  return Object.fromEntries(
    formulas.map((formula) => [
      formula,
      vehicles.filter(
        (vehicle) => vehicle.formula === formula && vehicle.featured
      ),
    ])
  ) as Record<Formula, Vehicle[]>
}

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "team-members",
    sort: "_order",
    depth: 1,
    pagination: false,
  })
  return docs.flatMap((doc) => {
    const photo = media(doc.photo)
    return photo
      ? [{ name: doc.name, role: doc.role, photo: toSiteImage(photo) }]
      : []
  })
})

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const payload = await getPayload({ config })
  return toSiteSettings(await payload.findGlobal({ slug: "site-settings" }))
})
