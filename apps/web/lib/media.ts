import type { CSSProperties } from "react"

/** An image as the site renders it: URL, alt text and optional focal point. */
export type SiteImage = {
  src: string
  alt: string
  /** Focal point in % of the image, set in the admin; centred when absent. */
  focalX?: number
  focalY?: number
}

/** A media document as Payload returns it (only the fields the site uses). */
export type MediaSource = {
  url?: string | null
  alt: string
  focalX?: number | null
  focalY?: number | null
}

export function toSiteImage(media: MediaSource): SiteImage {
  return {
    src: media.url ?? "",
    alt: media.alt,
    focalX: media.focalX ?? undefined,
    focalY: media.focalY ?? undefined,
  }
}

/** `object-position` keeping the focal point in view when the image is cropped. */
export function focalPosition(
  image: Pick<SiteImage, "focalX" | "focalY">
): CSSProperties | undefined {
  if (image.focalX === undefined && image.focalY === undefined) return undefined
  return {
    objectPosition: `${image.focalX ?? 50}% ${image.focalY ?? 50}%`,
  }
}
