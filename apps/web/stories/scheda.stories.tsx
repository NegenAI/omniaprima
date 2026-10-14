import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { PriceCard } from "@/components/scheda/price-card"
import { RelatedVehicles } from "@/components/scheda/related-vehicles"
import { SchedaTitle } from "@/components/scheda/scheda-title"
import { TechnicalDetails } from "@/components/scheda/technical-details"
import { VehicleGallery } from "@/components/scheda/vehicle-gallery"
import { byFormula, bySlug, type Vehicle } from "@/lib/vehicles"

const vehicle = (slug: string): Vehicle => {
  const found = bySlug(slug)
  if (!found) throw new Error(`Unknown vehicle ${slug}`)
  return found
}

const lungo = vehicle("fiat-500-hybrid-2")
const vendita = vehicle("fiat-500-hybrid-vendita-2")
const details = lungo.details!

/** Sections of the "Scheda auto" page (Figma 87:9624, 9:2, 87:8863). */
const meta = {
  title: "Scheda auto",
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="bg-secondary py-ds-7">
        <div className="container">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TitleLungoTermine: Story = {
  render: () => (
    <SchedaTitle
      name={lungo.name}
      subtitle={lungo.description}
      formula="lungo-termine"
    />
  ),
}

export const TitleVendita: Story = {
  render: () => (
    <SchedaTitle
      name={vendita.name}
      subtitle={vendita.description}
      formula="vendita"
    />
  ),
}

/** Component "Frame 426" (26:2668): click a thumbnail to switch photo. */
export const Gallery: Story = {
  render: () => (
    <VehicleGallery images={lungo.gallery ?? []} className="max-w-[720px]" />
  ),
}

export const PriceCardLungoTermine: Story = {
  render: () => (
    <PriceCard
      formula="lungo-termine"
      price={lungo.price}
      priceNote={lungo.priceNotes[0]}
      details={details}
      className="max-w-[480px]"
    />
  ),
}

export const PriceCardVendita: Story = {
  render: () => (
    <PriceCard
      formula="vendita"
      price={vendita.price}
      priceNote={vendita.priceNotes[0]}
      details={details}
      className="max-w-[480px]"
    />
  ),
}

export const CaratteristicheAuto: Story = {
  render: () => <TechnicalDetails groups={details.features} />,
}

export const PotrebbePiacertiAnche: Story = {
  render: () => (
    <RelatedVehicles
      vehicles={byFormula("vendita").filter((v) => v.slug !== vendita.slug)}
    />
  ),
}
