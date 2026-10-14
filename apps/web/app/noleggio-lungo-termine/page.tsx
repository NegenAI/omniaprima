import type { Metadata } from "next"

import {
  ContactFormCard,
  ContactInfo,
} from "@/components/contact/contact-section"
import { FormulaBenefits } from "@/components/formula/formula-benefits"
import { FormulaHero } from "@/components/formula/formula-hero"
import { ServicesIncluded } from "@/components/formula/services-included"
import {
  VehicleListing,
  parseListingParams,
} from "@/components/formula/vehicle-listing"

const BASE_PATH = "/noleggio-lungo-termine"

export const metadata: Metadata = {
  title: "Noleggio a lungo termine",
  description:
    "Noleggio a lungo termine con Omnia Prima: un canone mensile fisso che include manutenzione, assicurazione, bollo e assistenza stradale h24. Zero anticipo obbligatorio, zero sorprese.",
}

/**
 * "Lungo Termine" page (Figma 9:5, 390px frame):
 * hero (87:10202) → "Perché conviene?" + listing on one ghiaccio band
 * (61:3382) → "Servizi Inclusi" (54:1618) → contact (125:4256).
 */
export default async function NoleggioLungoTerminePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { page } = parseListingParams(await searchParams, "lungo-termine")

  return (
    <main>
      <FormulaHero formula="lungo-termine" />
      <FormulaBenefits formula="lungo-termine" />
      <VehicleListing
        formula="lungo-termine"
        basePath={BASE_PATH}
        page={page}
      />
      <ServicesIncluded />

      {/* Contact (125:4257): same content as the homepage section, but the
          Figma frame nests two 48px-padded ghiaccio frames (96px above and
          below) and the form card is 1027px tall (27px bottom inset). */}
      <section id="contatti" className="bg-secondary py-24 md:py-ds-8">
        <div className="container grid gap-ds-5 lg:grid-cols-2 lg:items-start lg:gap-ds-7">
          <ContactInfo />
          <ContactFormCard className="pb-[27px]" />
        </div>
      </section>
    </main>
  )
}
