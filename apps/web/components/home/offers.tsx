"use client"

import * as React from "react"

import { SectionHeading } from "@/components/section-heading"
import { VehicleCard, type Vehicle } from "@/components/vehicle-card"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

const formulas = [
  {
    value: "lungo-termine",
    label: "Noleggio lungo termine",
    variant: "rental",
  },
  {
    value: "breve-termine",
    label: "Noleggio breve termine",
    variant: "rental",
  },
  { value: "vendita", label: "Vendita", variant: "sales" },
] as const

type Formula = (typeof formulas)[number]["value"]

// Placeholder inventory from Figma (three identical sample cards).
// TODO: replace with real vehicles per formula.
const sampleVehicle: Omit<Vehicle, "id"> = {
  name: "Piattaforma aerea",
  description: "Fino a 24m. di altezza",
  image: {
    src: "/images/home/vehicle-piattaforma-aerea.png",
    alt: "Autocarro con piattaforma aerea",
  },
  specs: [
    { icon: { src: "/icons/hand-controls.svg", width: 12 }, label: "3000 KM" },
    { icon: { src: "/icons/gas-station.svg", width: 10.5 }, label: "30 GG" },
    { icon: { src: "/icons/gas-station.svg", width: 10.5 }, label: "Diesel" },
  ],
  price: "45 €/giorno",
  priceNote: "Iva inclusa",
}

const vehicles: Record<Formula, Vehicle[]> = Object.fromEntries(
  formulas.map(({ value }) => [
    value,
    [1, 2, 3].map((n) => ({ ...sampleVehicle, id: `${value}-${n}` })),
  ])
) as Record<Formula, Vehicle[]>

export function Offers() {
  const [formula, setFormula] = React.useState<Formula>("breve-termine")

  return (
    <section
      id="proposte"
      className="relative bg-secondary pt-[105px] pb-[105px] md:py-ds-8"
    >
      <div className="container flex flex-col items-center gap-ds-7">
        <SectionHeading
          align="center"
          eyebrow="Le nostre proposte"
          title={
            <>
              Trova la formula <br className="md:hidden" />
              giusta per te
            </>
          }
          className="w-full"
        />

        <div className="flex w-full flex-col gap-6">
          <div className="flex justify-center rounded-card bg-white px-2 py-5 shadow-card md:mx-auto md:w-fit md:rounded-full md:p-2">
            <ToggleGroup
              aria-label="Formula"
              value={[formula]}
              onValueChange={(value) => {
                // Keep one formula selected at all times
                if (value[0]) setFormula(value[0] as Formula)
              }}
              size="pill"
              spacing={2}
              className="w-full flex-col md:w-auto md:flex-row"
            >
              {formulas.map((item) => (
                <ToggleGroupItem
                  key={item.value}
                  value={item.value}
                  variant={item.variant}
                  className="w-full md:w-auto md:px-ds-5"
                >
                  {item.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles[formula].map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
