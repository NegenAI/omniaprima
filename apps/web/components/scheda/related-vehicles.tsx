import Link from "next/link"

import { VehicleCard } from "@/components/vehicle-card"
import type { Vehicle } from "@/lib/vehicles"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

/**
 * "LE NOSTRE PROPOSTE / Potrebbe piacerti anche" (Figma "Frame 472",
 * 87:9911): small heading (eyebrow + H3-sized title), the related card 16px
 * below and the centred "Scopri tutte le proposte" button 24px under it.
 * Mobile shows one card as in Figma; md shows two and lg three.
 *
 * Decision: reuses the shared VehicleCard (overlapping panel + description,
 * as in the vendita frame 87:9432). The lungo-termine frame 87:9918 shows an
 * older card (no description, 2 chips, flush panel, "Richiedi info →"),
 * treated as a stale copy.
 * TODO(business): confirm the related-card CTA wording on the scheda
 * ("Richiedi info →" in 87:9918 vs "Maggiori info →" in the shared card).
 */
export function RelatedVehicles({
  vehicles,
  className,
}: {
  vehicles: Vehicle[]
  className?: string
}) {
  if (vehicles.length === 0) return null

  return (
    <section
      aria-labelledby="potrebbe-piacerti"
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex flex-col gap-2">
        <p className="text-eyebrow text-muted-foreground uppercase">
          Le nostre proposte
        </p>
        <h2 id="potrebbe-piacerti" className="text-h3 text-navy">
          Potrebbe piacerti anche
        </h2>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.slice(0, 3).map((vehicle, index) => (
            <VehicleCard
              key={vehicle.slug}
              vehicle={vehicle}
              className={cn(
                index === 1 && "hidden md:flex",
                index === 2 && "hidden lg:flex"
              )}
            />
          ))}
        </div>
        <Button
          size="lg"
          render={<Link href="/proposte" />}
          nativeButton={false}
        >
          Scopri tutte le proposte
        </Button>
      </div>
    </section>
  )
}
