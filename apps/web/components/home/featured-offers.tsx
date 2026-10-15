"use client"

import * as React from "react"

import { FormulaToggle } from "@/components/formula/formula-toggle"
import { VehicleCard } from "@/components/vehicle-card"
import { featuredByFormula, type Formula } from "@/lib/vehicles"

/** Formula toggle + the featured cards of the selected formula (homepage). */
export function FeaturedOffers() {
  const [formula, setFormula] = React.useState<Formula>("breve-termine")

  return (
    <div className="flex w-full flex-col gap-6">
      <FormulaToggle value={formula} onValueChange={setFormula} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredByFormula(formula).map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} context="home" />
        ))}
      </div>
    </div>
  )
}
