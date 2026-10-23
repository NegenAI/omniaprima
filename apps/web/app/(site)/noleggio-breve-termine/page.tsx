import type { Metadata } from "next"

import { ContactSection } from "@/components/contact/contact-section"
import { FormulaBenefits } from "@/components/formula/formula-benefits"
import { FormulaHero } from "@/components/formula/formula-hero"
import {
  VehicleListing,
  parseListingParams,
} from "@/components/formula/vehicle-listing"
import { byFormula } from "@/lib/vehicles"

const BASE_PATH = "/noleggio-breve-termine"

export const metadata: Metadata = {
  title: "Noleggio a breve termine",
  description:
    "Noleggio auto a breve termine con Omnia Prima: un'auto per pochi giorni o settimane, nessun impegno a lungo periodo, assicurazione e assistenza incluse, ritiro immediato.",
}

/**
 * Figma page 85:1223 lists the cars first (Fiat 500 Hybrid, the Renault
 * Master "OFFERTA", four more Fiat): the aerial platforms featured on the
 * homepage follow them.
 * TODO(business): Figma shows "14 Veicoli disponibili" (3 pages); lib/vehicles
 * only holds 9 breve termine vehicles. Replace with the real inventory, no
 * placeholder vehicles are invented here.
 */
function breveTermineVehicles() {
  const all = byFormula("breve-termine")
  return [
    ...all.filter((vehicle) => vehicle.category !== "piattaforma"),
    ...all.filter((vehicle) => vehicle.category === "piattaforma"),
  ]
}

/**
 * Noleggio breve termine (Figma 85:1223, 390px). Unlike Lungo Termine there
 * is no "Servizi Inclusi" section: hero → "Perché conviene?" + listing (one
 * ghiaccio band) → contact section → footer (layout).
 */
export default async function NoleggioBreveTerminePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { page } = parseListingParams(await searchParams, "breve-termine")

  return (
    <main className="bg-secondary">
      <FormulaHero formula="breve-termine" />

      {/* Frame 471 starts at 1004, "BREVE TERMINE" at 1048.5: 44.5px. */}
      <FormulaBenefits formula="breve-termine" className="pt-[44.5px]" />

      <VehicleListing
        formula="breve-termine"
        basePath={BASE_PATH}
        page={page}
        vehicles={breveTermineVehicles()}
      />

      {/*
       * Measured visual offsets: the "Richiedi un preventivo gratuito" title
       * sits at 4803, 90.5px below the pagination (whose section already ends
       * 48px lower), so the eyebrow starts 18.5px into this section. Frame 471
       * overlaps the top of the contact frame in Figma and hides the
       * "CONTATTI" eyebrow; it is kept here as on every other page. The form
       * card ends 96px above the footer (frame 85:1464, 1638px tall).
       */}
      <ContactSection className="pt-[18.5px] pb-24 md:pt-ds-8 md:pb-ds-8" />
    </main>
  )
}
