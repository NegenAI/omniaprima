import { toSiteImage, type MediaSource } from "@/lib/media"
import { toSiteSettings, type SiteSettingsSource } from "@/lib/site"
import { toVehicle, type Formula, type VehicleSource } from "@/lib/vehicles"

// Placeholder content reproducing the Figma pages, in the shape Payload
// returns (media URLs point to /public). Used by the dev seed and by the
// Storybook stories; the real content is entered in the admin.
// TODO(data): replace with the real inventory, team and contacts from Omnia
// Prima.

// Focal points: the centre of the Figma image crops the cards used before
// the CMS (crop box in % of the frame → centre in % of the image).
const fiatFront: MediaSource = {
  url: "/images/vehicles/fiat-500-hybrid-front.jpg",
  alt: "Fiat 500 Hybrid verde acqua, vista frontale",
  focalX: 53.6,
  focalY: 50,
}

// Gallery of the Figma "Scheda auto" (component 26:2668), in Figma order.
const fiatGallery: MediaSource[] = [
  fiatFront,
  {
    url: "/images/vehicles/fiat-500-hybrid-street.jpg",
    alt: "Fiat 500 elettrica azzurra in città, vista tre quarti",
    focalX: 41.2,
    focalY: 51.2,
  },
  {
    url: "/images/vehicles/fiat-500-hybrid-rear.jpg",
    alt: "Fiat 500 cabrio grigia, vista posteriore",
  },
  {
    url: "/images/vehicles/fiat-500-hybrid-garden.jpg",
    alt: "Fiat 500 azzurra parcheggiata in un giardino",
  },
]

// Scheda content as shown in Figma (87:9624, 9:2, 87:8863): identical
// placeholder values for every vehicle. Figma's "Durata 1 mese" / "Anticipo
// 3000€" contradict the listing cards ("48 mesi", "Anticipo 0").
const fiatDetails: VehicleSource["details"] = {
  advance: "3000€",
  duration: { value: "1", unit: "mese" },
  mileage: { value: "20.000", unit: "km/anno" },
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

type Spec = NonNullable<VehicleSource["specs"]>[number]
const km = (label: string): Spec => ({ icon: "km", label })
const generic = (label: string): Spec => ({ icon: "generic", label })

const fiatLungo = (
  n: number,
  extra?: Partial<VehicleSource>
): VehicleSource => ({
  slug: n === 1 ? "fiat-500-hybrid" : `fiat-500-hybrid-${n}`,
  formula: "lungo-termine",
  name: "Fiat 500 Hybrid",
  description: "1000 - 69 CV | Neopatentati",
  image: fiatFront,
  gallery: fiatGallery,
  details: fiatDetails,
  specs: [km("6000 KM"), generic("48 mesi"), generic("Benzina")],
  price: { amount: 359, unit: "mese", notes: ["Iva esclusa", "Anticipo 0"] },
  category: "auto",
  ...extra,
})

const fiatBreve = (
  n: number,
  extra?: Partial<VehicleSource>
): VehicleSource => ({
  slug: `fiat-500-hybrid-breve-${n}`,
  formula: "breve-termine",
  name: "Fiat 500 Hybrid",
  description: "1000 - 69 CV | Neopatentati",
  image: fiatFront,
  specs: [km("3000 KM"), generic("30 GG"), generic("Benzina")],
  price: { amount: 45, unit: "giorno", notes: ["Iva inclusa"] },
  category: "auto",
  ...extra,
})

const piattaforma = (n: number): VehicleSource => ({
  slug: `piattaforma-aerea-${n}`,
  formula: "breve-termine",
  name: "Piattaforma aerea",
  description: "Fino a 24m. di altezza",
  image: {
    url: "/images/home/vehicle-piattaforma-aerea.png",
    alt: "Autocarro con piattaforma aerea",
    focalX: 52.4,
    focalY: 54.7,
  },
  specs: [km("3000 KM"), generic("30 GG"), generic("Diesel")],
  price: { amount: 45, unit: "giorno", notes: ["Iva inclusa"] },
  category: "piattaforma",
  featured: true,
})

const fiatVendita = (
  n: number,
  extra?: Partial<VehicleSource>
): VehicleSource => ({
  slug: `fiat-500-hybrid-vendita-${n}`,
  formula: "vendita",
  name: "Fiat 500 Hybrid",
  // Figma "Vendita" page repeats the name as subtitle (placeholder); the card
  // board 87:4038 uses the engine line, kept here.
  description: "1000 - 69 CV | Neopatentati",
  image: fiatFront,
  gallery: fiatGallery,
  details: fiatDetails,
  specs: [km("6000 KM"), generic("48 mesi")],
  price: { amount: 14900, unit: "totale", notes: ["Iva esclusa"] },
  category: "auto",
  ...extra,
})

/** In listing order (the admin keeps it as the drag-and-drop order). */
export const placeholderVehicles: VehicleSource[] = [
  // Lungo termine: pages 85:831 / 9:5 (first card flagged "OFFERTA")
  fiatLungo(1, { offer: true, featured: true }),
  fiatLungo(2, { featured: true }),
  fiatLungo(3, { featured: true }),
  fiatLungo(4, { offer: true }),
  // Figma card 5 (113:2468) also carries the OFFERTA flag (113:2501).
  fiatLungo(5, { offer: true }),
  // No gallery: scheda in the Figma "No foto" layout (9:2).
  fiatLungo(6, { gallery: undefined }),
  // Extra entries so the listing matches Figma's "14 Veicoli disponibili"
  // (54:1463) and its 3-page pagination (61:3281).
  ...Array.from({ length: 8 }, (_, i) => fiatLungo(i + 7)),

  // Breve termine: page 85:1223 lists the cars first (Fiat 500 Hybrid, the
  // Renault Master "OFFERTA", four more Fiat), then the aerial platforms
  // featured on the homepage (113:2654).
  fiatBreve(1),
  {
    slug: "renault-master-cassone-ribaltabile",
    formula: "breve-termine",
    name: "Renault Master",
    description: "Cassone Ribaltabile",
    image: {
      url: "/images/vehicles/renault-master-cassone.png",
      alt: "Renault Master bianco con cassone ribaltabile",
    },
    specs: [km("3000 KM"), generic("30 GG"), generic("Benzina")],
    price: { amount: 45, unit: "giorno", notes: ["Iva inclusa"] },
    offer: true,
    category: "autocarro",
  },
  fiatBreve(2),
  fiatBreve(3),
  fiatBreve(4),
  fiatBreve(5),
  piattaforma(1),
  piattaforma(2),
  piattaforma(3),

  // Vendita: card board 87:4038 + page 87:3489
  fiatVendita(1, {
    slug: "fiat-500-hybrid-usata",
    specs: [km("Usato"), generic("60.000 km"), generic("Diesel")],
    price: {
      amount: 17500,
      unit: "totale",
      notes: ["Iva esclusa", "Anticipo 0"],
    },
    featured: true,
  }),
  fiatVendita(2, { featured: true }),
  fiatVendita(3, { featured: true }),
  fiatVendita(4),
  fiatVendita(5),
  fiatVendita(6),
  // Extra entries matching Figma's "14 Veicoli disponibili" (87:3536) and
  // its 3-page pagination (87:4431).
  ...Array.from({ length: 8 }, (_, i) => fiatVendita(i + 7)),
]

export type TeamMemberSource = {
  name: string
  role: string
  photo: MediaSource
}

const teamPhoto = (file: string, name: string): MediaSource => ({
  url: `/images/chi-siamo/team/${file}.webp`,
  alt: `${name}, team Omnia Prima`,
})

export const placeholderTeam: TeamMemberSource[] = [
  {
    name: "Simone Pomponii",
    role: "Titolare",
    photo: {
      ...teamPhoto("simone-pomponii", "Simone Pomponii"),
      focalX: 47.1,
      focalY: 44.6,
    },
  },
  {
    name: "Rosalba Cappelli",
    role: "Front Office",
    photo: teamPhoto("rosalba-cappelli", "Rosalba Cappelli"),
  },
  {
    name: "Pasquale Nolli",
    role: "Senior Sales",
    photo: teamPhoto("pasquale-nolli", "Pasquale Nolli"),
  },
  {
    name: "Marco Varani",
    role: "Service Advisor",
    photo: teamPhoto("marco-varani", "Marco Varani"),
  },
  {
    name: "Valeria Di Antonio",
    role: "Back Office",
    photo: teamPhoto("valeria-di-antonio", "Valeria Di Antonio"),
  },
  {
    name: "Daniel Di Ottavio",
    role: "After Sales Assistant",
    photo: teamPhoto("daniel-di-ottavio", "Daniel Di Ottavio"),
  },
]

// Business details as shown in the Figma homepage. The contact section and
// the footer show different e-mail addresses in Figma.
// TODO(data): confirm the WhatsApp number (Figma only shows the landline),
// the social profiles and the Google Business profile link.
export const placeholderSiteSettings = {
  phone: "0861 415616",
  whatsapp: "390861415616",
  email: "omniaprimasrl@gmail.com",
  footerEmail: "info@omniaprima.it",
  hours: "8.30 - 12.30 |  15.00 - 19.00",
  locations: [
    { town: "San Nicolò a Tordino", street: "Via Nazionale" },
    { town: "Castelnuovo Vomano", street: "Via Nazionale 1" },
  ],
  googleRating: "4.9/5",
  googleReviewsUrl:
    "https://www.google.com/search?q=Omnia+Prima+srl+-+VENDITA+E+NOLEGGIO+Recensioni",
} satisfies SiteSettingsSource

// The placeholders as the components receive them (Storybook stories).

export const vehicleFixtures = placeholderVehicles.map(toVehicle)

export function vehicleFixture(slug: string) {
  const vehicle = vehicleFixtures.find((v) => v.slug === slug)
  if (!vehicle) throw new Error(`Unknown placeholder vehicle: ${slug}`)
  return vehicle
}

export function vehicleFixturesByFormula(formula: Formula) {
  return vehicleFixtures.filter((vehicle) => vehicle.formula === formula)
}

export const teamFixtures = placeholderTeam.map((member) => ({
  ...member,
  photo: toSiteImage(member.photo),
}))

export const siteSettingsFixture = toSiteSettings(placeholderSiteSettings)
