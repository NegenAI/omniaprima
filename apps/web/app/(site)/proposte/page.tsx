import type { Metadata } from "next"

import { ContactSection } from "@/components/contact/contact-section"
import {
  VehicleListing,
  parseListingParams,
} from "@/components/formula/vehicle-listing"
import { ProposteIntro } from "@/components/proposte/proposte-intro"
import { getSiteSettings, getVehiclesByFormula } from "@/lib/content"

export const metadata: Metadata = {
  title: "Tutte le proposte",
  description:
    "Noleggio a breve o lungo termine e vendita di veicoli selezionati: trova la formula giusta per te. Zero pensieri, servizio su misura e prezzi trasparenti.",
}

/**
 * Proposte (Figma 85:831): intro, formula toggle + vehicle cards with
 * pagination, contact section. The formula and the page live in the URL
 * (`?formula=…&page=…`) so every view is shareable.
 */
export default async function PropostePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { formula, page } = parseListingParams(await searchParams)
  const [vehicles, { contact }] = await Promise.all([
    getVehiclesByFormula(formula),
    getSiteSettings(),
  ])

  return (
    <main className="bg-secondary">
      <ProposteIntro />
      <VehicleListing
        formula={formula}
        vehicles={vehicles}
        page={page}
        basePath="/proposte"
        copy={false}
        showFormulaToggle
      />
      <ContactSection contact={contact} />
    </main>
  )
}
