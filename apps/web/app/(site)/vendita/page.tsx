import type { Metadata } from "next"

import { ContactSection } from "@/components/contact/contact-section"
import { FormulaBenefits } from "@/components/formula/formula-benefits"
import { FormulaHero } from "@/components/formula/formula-hero"
import {
  VehicleListing,
  parseListingParams,
} from "@/components/formula/vehicle-listing"

const BASE_PATH = "/vendita"

export const metadata: Metadata = {
  title: "Vendita",
  description:
    "Vendita di veicoli nuovi e usati con Omnia Prima: prezzi trasparenti, finanziamenti su misura e consegna rapida. Nessuna sorpresa, solo garanzie.",
}

/**
 * "Vendita" page (Figma 87:3489, 390px frame):
 * hero (87:9613) → "Perché conviene con Omnia Prima?" + listing on one
 * ghiaccio band (87:3516) → contact (101:10657).
 */
export default async function VenditaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { page } = parseListingParams(await searchParams, "vendita")

  return (
    <main>
      <FormulaHero formula="vendita" />
      {/* The ghiaccio band (Frame 471, y 929) starts 13px inside the hero
          frame (ends at 942), so the eyebrow sits 35px below the hero, not 48. */}
      <FormulaBenefits formula="vendita" className="pt-[35px]" />
      <VehicleListing formula="vendita" basePath={BASE_PATH} page={page} />

      {/* Contact (101:10658): two nested 48px-padded ghiaccio frames (96px
          above and below) and a 1027px form card (27px bottom inset). */}
      <ContactSection className="py-24 md:py-ds-8" cardClassName="pb-[27px]" />
    </main>
  )
}
