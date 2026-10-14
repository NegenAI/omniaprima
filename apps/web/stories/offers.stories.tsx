import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { VehicleCard } from "@/components/vehicle-card"
import { Badge } from "@workspace/ui/components/badge"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

const meta = {
  title: "Components/Offers",
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const FormulaToggle: Story = {
  render: () => (
    <div className="w-[350px] rounded-card bg-white px-2 py-5 shadow-card">
      <ToggleGroup
        defaultValue={["breve"]}
        size="pill"
        spacing={2}
        className="w-full flex-col"
      >
        <ToggleGroupItem value="lungo" variant="rental" className="w-full">
          Noleggio lungo termine
        </ToggleGroupItem>
        <ToggleGroupItem value="breve" variant="rental" className="w-full">
          Noleggio breve termine
        </ToggleGroupItem>
        <ToggleGroupItem value="vendita" variant="sales" className="w-full">
          Vendita
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}

export const SpecBadge: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="spec">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/hand-controls.svg" alt="" width={12} height={12} />
        3000 KM
      </Badge>
      <Badge variant="spec">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/gas-station.svg" alt="" width={10.5} height={12} />
        Diesel
      </Badge>
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div className="w-[350px] bg-secondary p-ds-4">
      <VehicleCard
        vehicle={{
          id: "sample",
          name: "Piattaforma aerea",
          description: "Fino a 24m. di altezza",
          image: {
            src: "/images/home/vehicle-piattaforma-aerea.png",
            alt: "Autocarro con piattaforma aerea",
          },
          specs: [
            {
              icon: { src: "/icons/hand-controls.svg", width: 12 },
              label: "3000 KM",
            },
            {
              icon: { src: "/icons/gas-station.svg", width: 10.5 },
              label: "30 GG",
            },
            {
              icon: { src: "/icons/gas-station.svg", width: 10.5 },
              label: "Diesel",
            },
          ],
          price: "45 €/giorno",
          priceNote: "Iva inclusa",
        }}
      />
    </div>
  ),
}
