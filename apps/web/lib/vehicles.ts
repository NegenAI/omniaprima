import type { ImageCrop } from "@/components/cropped-image"

// Placeholder inventory reproducing the Figma cards (listing pages 85:831, 9:5,
// 85:1223, 87:3489, homepage 113:2654 and the card board 87:3981/4006/4038).
// TODO: replace with the real inventory (CMS/API) once Omnia Prima provides it.

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

export type VehicleImage = {
  src: string
  alt: string
  /**
   * Figma crop of the fill inside the 350×264 card frame, in % of the frame
   * (width, height, left, top). Omit for a plain centred cover.
   */
  crop?: ImageCrop
  /**
   * Figma crop of the fill inside the 351×260 scheda gallery frame (26:2668),
   * same units as `crop`. Omit for a plain centred cover.
   */
  galleryCrop?: ImageCrop
}

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

const icons = {
  km: { src: "/icons/hand-controls.svg", width: 12 },
  // Figma uses the gas-station glyph for every other spec chip.
  generic: { src: "/icons/gas-station.svg", width: 10.5 },
} as const

const spec = (icon: keyof typeof icons, label: string): VehicleSpec => ({
  icon: icons[icon],
  label,
})

const fiatCrop = { width: 114.54, height: 100, left: -11.34, top: -0.03 }

const fiatImage: VehicleImage = {
  src: "/images/vehicles/fiat-500-hybrid-front.jpg",
  alt: "Fiat 500 Hybrid verde acqua, vista frontale",
  crop: fiatCrop,
}

// Gallery of the Figma "Scheda auto" (component 26:2668), in Figma order.
const fiatGallery: VehicleImage[] = [
  {
    ...fiatImage,
    galleryCrop: { width: 111.14, height: 100, left: -11.07, top: 0 },
  },
  {
    src: "/images/vehicles/fiat-500-hybrid-street.jpg",
    alt: "Fiat 500 elettrica azzurra in città, vista tre quarti",
    galleryCrop: { width: 130.55, height: 117.4, left: -3.74, top: -10.1 },
  },
  {
    src: "/images/vehicles/fiat-500-hybrid-rear.jpg",
    alt: "Fiat 500 cabrio grigia, vista posteriore",
  },
  {
    src: "/images/vehicles/fiat-500-hybrid-garden.jpg",
    alt: "Fiat 500 azzurra parcheggiata in un giardino",
  },
]

// Scheda content as shown in Figma (87:9624, 9:2, 87:8863): identical
// placeholder values for every vehicle.
// TODO: real per-vehicle data (anticipo, durata, percorrenza, optional) from
// Omnia Prima; Figma's "Durata 1 mese" / "Anticipo 3000€" contradict the
// listing cards ("48 mesi", "Anticipo 0").
const fiatDetails: VehicleDetails = {
  advance: "3000€",
  duration: ["1", "mese"],
  mileage: ["20.000", "km/anno"],
  features: [
    {
      title: "Confort e Tecnologia",
      items: [
        "Navigatore",
        "Avviso cambio di corsia",
        "Cruise control",
        "Frenata automatica",
        // Figma typo "Applea CarPlay" corrected.
        "Apple CarPlay e Android Auto",
      ],
    },
    {
      title: "Estetica e Interni",
      items: [
        "Interni in pelle",
        "Vernice metallizzata",
        "Cerchi in lega 18”",
        "Tetto panoramico",
      ],
    },
    {
      title: "Motore",
      items: [
        "Alimentazione: ibrido",
        "Cilindrata: 1.6",
        "Cambio manuale",
        "Fari Full LED",
      ],
    },
  ],
}

const fiatLungo = (n: number, extra?: Partial<Vehicle>): Vehicle => ({
  slug: n === 1 ? "fiat-500-hybrid" : `fiat-500-hybrid-${n}`,
  formula: "lungo-termine",
  name: "Fiat 500 Hybrid",
  description: "1000 - 69 CV | Neopatentati",
  image: fiatImage,
  gallery: fiatGallery,
  details: fiatDetails,
  specs: [
    spec("km", "6000 KM"),
    spec("generic", "48 mesi"),
    spec("generic", "Benzina"),
  ],
  price: "359 €/mese",
  priceNotes: ["Iva esclusa", "Anticipo 0"],
  category: "auto",
  ...extra,
})

const fiatBreve = (n: number, extra?: Partial<Vehicle>): Vehicle => ({
  slug: `fiat-500-hybrid-breve-${n}`,
  formula: "breve-termine",
  name: "Fiat 500 Hybrid",
  description: "1000 - 69 CV | Neopatentati",
  image: fiatImage,
  specs: [
    spec("km", "3000 KM"),
    spec("generic", "30 GG"),
    spec("generic", "Benzina"),
  ],
  price: "45 €/giorno",
  priceNotes: ["Iva inclusa"],
  category: "auto",
  ...extra,
})

const piattaforma = (n: number): Vehicle => ({
  slug: `piattaforma-aerea-${n}`,
  formula: "breve-termine",
  name: "Piattaforma aerea",
  description: "Fino a 24m. di altezza",
  image: {
    src: "/images/home/vehicle-piattaforma-aerea.png",
    alt: "Autocarro con piattaforma aerea",
    crop: { width: 157.89, height: 137.85, left: -32.7, top: -25.44 },
  },
  specs: [
    spec("km", "3000 KM"),
    spec("generic", "30 GG"),
    spec("generic", "Diesel"),
  ],
  price: "45 €/giorno",
  priceNotes: ["Iva inclusa"],
  category: "piattaforma",
  featured: true,
})

const fiatVendita = (n: number, extra?: Partial<Vehicle>): Vehicle => ({
  slug: `fiat-500-hybrid-vendita-${n}`,
  formula: "vendita",
  name: "Fiat 500 Hybrid",
  // Figma "Vendita" page repeats the name as subtitle (placeholder); the card
  // board 87:4038 uses the engine line, kept here.
  description: "1000 - 69 CV | Neopatentati",
  image: fiatImage,
  gallery: fiatGallery,
  details: fiatDetails,
  specs: [spec("km", "6000 KM"), spec("generic", "48 mesi")],
  price: "14.900 €",
  priceNotes: ["Iva esclusa"],
  category: "auto",
  ...extra,
})

export const vehicles: Vehicle[] = [
  // Lungo termine: pages 85:831 / 9:5 (first card flagged "OFFERTA")
  fiatLungo(1, { offer: true, featured: true }),
  fiatLungo(2, { featured: true }),
  fiatLungo(3, { featured: true }),
  fiatLungo(4, { offer: true }),
  // Figma card 5 (113:2468) also carries the OFFERTA flag (113:2501).
  fiatLungo(5, { offer: true }),
  // No gallery: scheda in the Figma "No foto" layout (9:2).
  fiatLungo(6, { gallery: undefined }),
  // TODO: placeholder entries so the listing matches Figma's "14 Veicoli
  // disponibili" (54:1463) and its 3-page pagination (61:3281); replace with
  // the real lungo-termine inventory.
  ...Array.from({ length: 8 }, (_, i) => fiatLungo(i + 7)),

  // Breve termine: homepage 113:2654 (three aerial platforms) + page 85:1223
  piattaforma(1),
  piattaforma(2),
  piattaforma(3),
  fiatBreve(1),
  {
    slug: "renault-master-cassone-ribaltabile",
    formula: "breve-termine",
    name: "Renault Master",
    description: "Cassone Ribaltabile",
    image: {
      src: "/images/vehicles/renault-master-cassone.png",
      alt: "Renault Master bianco con cassone ribaltabile",
      crop: { width: 114.54, height: 100, left: -7.14, top: 0.17 },
    },
    specs: [
      spec("km", "3000 KM"),
      spec("generic", "30 GG"),
      spec("generic", "Benzina"),
    ],
    price: "45 €/giorno",
    priceNotes: ["Iva inclusa"],
    offer: true,
    category: "autocarro",
  },
  fiatBreve(2),
  fiatBreve(3),
  fiatBreve(4),
  fiatBreve(5),

  // Vendita: card board 87:4038 + page 87:3489
  fiatVendita(1, {
    slug: "fiat-500-hybrid-usata",
    specs: [
      spec("km", "Usato"),
      spec("generic", "60.000 km"),
      spec("generic", "Diesel"),
    ],
    price: "17.500 €",
    priceNotes: ["Iva esclusa", "Anticipo 0"],
    featured: true,
  }),
  fiatVendita(2, { featured: true }),
  fiatVendita(3, { featured: true }),
  fiatVendita(4),
  fiatVendita(5),
  fiatVendita(6),
  // TODO: placeholder entries so the listing matches Figma's "14 Veicoli
  // disponibili" (87:3536) and its 3-page pagination (87:4431); replace with
  // the real vendita inventory.
  ...Array.from({ length: 8 }, (_, i) => fiatVendita(i + 7)),
]

export function byFormula(formula: Formula): Vehicle[] {
  return vehicles.filter((vehicle) => vehicle.formula === formula)
}

export function bySlug(slug: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.slug === slug)
}

/** Homepage selection per formula. */
export function featuredByFormula(formula: Formula): Vehicle[] {
  return byFormula(formula).filter((vehicle) => vehicle.featured)
}

/** Short-term vehicles have no scheda page (Figma note on 87:4006). */
export function hasDetailPage(vehicle: Vehicle): boolean {
  return vehicle.formula !== "breve-termine"
}

export function vehicleHref(vehicle: Vehicle): string {
  return hasDetailPage(vehicle) ? `/proposte/${vehicle.slug}` : "#contatti"
}
