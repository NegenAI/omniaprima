import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { OfferFlag, PulseDot } from "@/components/offer-flag"
import { VehicleCard } from "@/components/vehicle-card"
import {
  vehicleFixture as vehicle,
  vehicleFixturesByFormula,
} from "@/payload/seed/data"

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
        ...vehicleFixturesByFormula("lungo-termine").slice(0, 1),
        vehicle("renault-master-cassone-ribaltabile"),
        ...vehicleFixturesByFormula("vendita").slice(0, 1),
      ].map((v) => (
        <VehicleCard key={v.slug} vehicle={v} />
      ))}
    </div>
  ),
}
