import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { OfferFlag, PulseDot } from "@/components/offer-flag"
import { VehicleCard } from "@/components/vehicle-card"
import { bySlug, byFormula, type Vehicle } from "@/lib/vehicles"

const vehicle = (slug: string): Vehicle => {
  const found = bySlug(slug)
  if (!found) throw new Error(`Unknown vehicle ${slug}`)
  return found
}

const meta = {
  title: "Components/VehicleCard",
  component: VehicleCard,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="bg-secondary p-5">
        <div className="w-[350px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof VehicleCard>

export default meta
type Story = StoryObj<typeof meta>

export const LungoTermine: Story = {
  args: { vehicle: vehicle("fiat-500-hybrid-2") },
}

export const LungoTermineOfferta: Story = {
  args: { vehicle: vehicle("fiat-500-hybrid") },
}

export const BreveTermine: Story = {
  args: { vehicle: vehicle("fiat-500-hybrid-breve-1") },
}

export const BreveTermineOfferta: Story = {
  args: { vehicle: vehicle("renault-master-cassone-ribaltabile") },
}

export const BreveTermineHome: Story = {
  args: { vehicle: vehicle("piattaforma-aerea-1"), context: "home" },
}

export const Vendita: Story = {
  args: { vehicle: vehicle("fiat-500-hybrid-vendita-2") },
}

export const VenditaUsato: Story = {
  args: { vehicle: vehicle("fiat-500-hybrid-usata") },
}

export const Offerta: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      <OfferFlag />
      <PulseDot />
    </div>
  ),
}

export const Grid: StoryObj = {
  decorators: [
    (Story) => (
      <div className="w-[1100px] bg-secondary p-ds-6">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[
        ...byFormula("lungo-termine").slice(0, 1),
        ...byFormula("breve-termine").slice(4, 5),
        ...byFormula("vendita").slice(0, 1),
      ].map((v) => (
        <VehicleCard key={v.slug} vehicle={v} />
      ))}
    </div>
  ),
}
