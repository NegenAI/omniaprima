"use client"

import * as React from "react"

import { SectionHeading } from "@/components/section-heading"
import { VehicleCard } from "@/components/vehicle-card"
import {
  featuredByFormula,
  formulaLabels,
  formulas,
  type Formula,
} from "@/lib/vehicles"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

const formulaToggles: {
  value: Formula
  label: string
  variant: "rental" | "sales"
}[] = formulas.map((value) => ({
  value,
  label: formulaLabels[value],
  variant: value === "vendita" ? "sales" : "rental",
}))

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
              {formulaToggles.map((item) => (
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
            {featuredByFormula(formula).map((vehicle) => (
              <VehicleCard
                key={vehicle.slug}
                vehicle={vehicle}
                context="home"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
