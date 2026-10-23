import { toSiteImage, type MediaSource, type SiteImage } from "@/lib/media"

// Vehicles are edited in the admin (Payload collection "vehicles"). This
// module holds the view model the components render and its mapping from a
// Payload document; queries are in lib/content.ts.

export const formulas = ["lungo-termine", "breve-termine", "vendita"] as const

export type Formula = (typeof formulas)[number]

/** Brand colour family of a formula: amber for rentals, azzurro for sales. */
export function formulaTone(formula: Formula): "rental" | "sales" {
  return formula === "vendita" ? "sales" : "rental"
}

export const formulaLabels: Record<Formula, string> = {
  "lungo-termine": "Noleggio lungo termine",
  "breve-termine": "Noleggio breve termine",
  vendita: "Vendita",
}

/** Short-term cards name the vehicle type instead of opening a detail page (Figma note on 87:4006). */
export type VehicleCategory = "auto" | "autocarro" | "furgone" | "piattaforma"

export type VehicleSpec = {
  icon: { src: string; width: number }
  label: string
}

export type VehicleImage = SiteImage

/** "Caratteristiche auto" check-list group on the scheda page. */
export type VehicleFeatureGroup = { title: string; items: string[] }

/**
 * Extra data of the scheda page (/proposte/[slug]). The big price and the
 * "Iva" note come from `price` / `priceNotes`.
 */
export type VehicleDetails = {
  /** "ANTICIPO" row value, e.g. "3000€". */
  advance: string
  /** "DURATA" box value, one entry per line as in Figma ("1" / "mese"). */
  duration: string[]
  /** "PERCORRENZA" box value, one entry per line ("20.000" / "km/anno"). */
  mileage: string[]
  features: VehicleFeatureGroup[]
}

export type Vehicle = {
  slug: string
  formula: Formula
  name: string
  description: string
  image: VehicleImage
  /**
   * Photos for the scheda page gallery (the card image is the first one).
   * Without it the scheda uses the Figma "No foto" layout (9:2).
   */
  gallery?: VehicleImage[]
  /** Scheda page data; vehicles without it have no detail page content. */
  details?: VehicleDetails
  specs: VehicleSpec[]
  /** Price line exactly as shown, e.g. "359 €/mese". */
  price: string
  /** Grey lines under the price, e.g. ["Iva esclusa", "Anticipo 0"]. */
  priceNotes: string[]
  /** Shows the "OFFERTA" flag on the card. */
  offer?: boolean
  category?: VehicleCategory
  /** Shown on the homepage "Le nostre proposte" section. */
  featured?: boolean
}

export type PriceUnit = "mese" | "giorno" | "totale"

type TextPair = { value?: string | null; unit?: string | null }

/**
 * A vehicle document as Payload returns it with its media populated (the
 * fields the site uses). The seed placeholders use the same shape.
 */
export type VehicleSource = {
  slug: string
  name: string
  description: string
  formula: Formula
  category?: VehicleCategory | null
  image: MediaSource
  gallery?: MediaSource[] | null
  specs?: { icon: "km" | "generic"; label: string }[] | null
  price: { amount: number; unit: PriceUnit; notes?: string[] | null }
  details?: {
    advance?: string | null
    duration?: TextPair
    mileage?: TextPair
    features?: { title: string; items?: string[] | null }[] | null
  }
  offer?: boolean | null
  featured?: boolean | null
}

const specIcons = {
  km: { src: "/icons/hand-controls.svg", width: 12 },
  // Figma uses the gas-station glyph for every other spec chip.
  generic: { src: "/icons/gas-station.svg", width: 10.5 },
} as const

const priceSuffix: Record<PriceUnit, string> = {
  mese: "€/mese",
  giorno: "€/giorno",
  totale: "€",
}

/** "359 €/mese", "45 €/giorno", "14.900 €" (Italian grouping from 10.000). */
export function formatPrice(amount: number, unit: PriceUnit): string {
  return `${new Intl.NumberFormat("it-IT").format(amount)} ${priceSuffix[unit]}`
}

function lines(pair: TextPair | undefined): string[] {
  return [pair?.value, pair?.unit].filter((line): line is string => !!line)
}

export function toVehicle(source: VehicleSource): Vehicle {
  const details = source.details
  return {
    slug: source.slug,
    formula: source.formula,
    name: source.name,
    description: source.description,
    image: toSiteImage(source.image),
    gallery: source.gallery?.length
      ? source.gallery.map(toSiteImage)
      : undefined,
    // The scheda exists once the admin has filled in the anticipo.
    details: details?.advance
      ? {
          advance: details.advance,
          duration: lines(details.duration),
          mileage: lines(details.mileage),
          features: (details.features ?? []).map((group) => ({
            title: group.title,
            items: group.items ?? [],
          })),
        }
      : undefined,
    specs: (source.specs ?? []).map((spec) => ({
      icon: specIcons[spec.icon],
      label: spec.label,
    })),
    price: formatPrice(source.price.amount, source.price.unit),
    priceNotes: source.price.notes ?? [],
    offer: source.offer ?? undefined,
    category: source.category ?? undefined,
    featured: source.featured ?? undefined,
  }
}

/** Short-term vehicles have no scheda page (Figma note on 87:4006). */
export function hasDetailPage(vehicle: Vehicle): boolean {
  return vehicle.formula !== "breve-termine"
}

export function vehicleHref(vehicle: Vehicle): string {
  return hasDetailPage(vehicle) ? `/proposte/${vehicle.slug}` : "#contatti"
}

/** Same-formula vehicles with a scheda, plain cards (no "OFFERTA" flag) first. */
export function relatedVehicles(vehicles: Vehicle[], vehicle: Vehicle) {
  return vehicles
    .filter(
      (other) =>
        other.slug !== vehicle.slug &&
        other.formula === vehicle.formula &&
        hasDetailPage(other)
    )
    .sort((a, b) => Number(Boolean(a.offer)) - Number(Boolean(b.offer)))
}
