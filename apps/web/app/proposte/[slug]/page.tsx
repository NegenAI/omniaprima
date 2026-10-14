import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ContactSection } from "@/components/contact/contact-section"
import { ServicesIncluded } from "@/components/formula/services-included"
import { PriceCard } from "@/components/scheda/price-card"
import { RelatedVehicles } from "@/components/scheda/related-vehicles"
import { SchedaTitle } from "@/components/scheda/scheda-title"
import { TechnicalDetails } from "@/components/scheda/technical-details"
import { VehicleGallery } from "@/components/scheda/vehicle-gallery"
import {
  bySlug,
  formulaLabels,
  hasDetailPage,
  vehicles,
  type Vehicle,
} from "@/lib/vehicles"
import { cn } from "@workspace/ui/lib/utils"

type Params = { slug: string }

/** Vehicles with a scheda page: long-term rentals and sales (not short-term). */
function schedaVehicle(slug: string) {
  const vehicle = bySlug(slug)
  return vehicle && hasDetailPage(vehicle) && vehicle.details
    ? { ...vehicle, details: vehicle.details }
    : undefined
}

/** Same-formula vehicles, plain cards (no "OFFERTA" flag) first. */
function relatedTo(vehicle: Vehicle) {
  return vehicles
    .filter(
      (other) =>
        other.slug !== vehicle.slug &&
        other.formula === vehicle.formula &&
        hasDetailPage(other)
    )
    .sort((a, b) => Number(Boolean(a.offer)) - Number(Boolean(b.offer)))
}

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return vehicles
    .filter((vehicle) => hasDetailPage(vehicle) && vehicle.details)
    .map((vehicle) => ({ slug: vehicle.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const vehicle = schedaVehicle(slug)
  if (!vehicle) return {}

  return {
    title: `${vehicle.name} · ${formulaLabels[vehicle.formula]}`,
    description: `${vehicle.name} ${vehicle.description} in ${formulaLabels[vehicle.formula].toLowerCase()} con Omnia Prima: ${vehicle.price}, ${vehicle.priceNotes.join(", ").toLowerCase()}. Richiedi un preventivo gratuito.`,
  }
}

/**
 * Space above the title and below the feature list, measured on the Figma
 * frames (header 78px without the 30px status bar):
 * - lungo termine with photos (87:9624): 56 / 39
 * - lungo termine without photos (9:2): 54 / 54
 * - vendita (87:8863): 64 / 31
 */
const introSpacing = {
  photos: "pt-14 pb-[39px]",
  noPhotos: "pt-[54px] pb-[54px]",
  vendita: "pt-16 pb-[31px]",
}

export default async function SchedaAutoPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const vehicle = schedaVehicle(slug)
  if (!vehicle) notFound()

  const gallery = vehicle.gallery?.length ? vehicle.gallery : undefined
  const spacing =
    vehicle.formula === "vendita"
      ? introSpacing.vendita
      : gallery
        ? introSpacing.photos
        : introSpacing.noPhotos

  return (
    <main className="bg-secondary">
      <div className={cn("container md:pt-ds-7 md:pb-ds-8", spacing)}>
        <div
          className={cn(
            "flex flex-col gap-ds-6 lg:grid lg:items-start lg:gap-x-ds-7",
            gallery
              ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-y-ds-5"
              : "lg:grid-cols-2"
          )}
        >
          <div className="flex flex-col gap-ds-5 lg:contents">
            <SchedaTitle
              name={vehicle.name}
              // Figma shows a "Sottotitolo" placeholder: the card description is used.
              subtitle={vehicle.description}
              formula={vehicle.formula}
              className={cn(
                "lg:row-start-1",
                gallery ? "lg:col-start-2" : "lg:col-start-1"
              )}
            />
            {gallery && (
              <VehicleGallery
                images={gallery}
                className="lg:col-start-1 lg:row-span-2 lg:row-start-1"
              />
            )}
          </div>
          <PriceCard
            formula={vehicle.formula}
            price={vehicle.price}
            priceNote={vehicle.priceNotes[0]}
            details={vehicle.details}
            className={cn(
              "lg:col-start-2",
              gallery ? "lg:row-start-2" : "lg:row-start-1"
            )}
          />
        </div>

        <TechnicalDetails
          groups={vehicle.details.features}
          className="mt-ds-8"
        />
      </div>

      <ServicesIncluded variant="vehicle" />

      <ContactSection variant="vehicle" className="pb-0 md:pb-0" />

      <div className="bg-secondary pt-ds-8 pb-12 md:pb-ds-8">
        <RelatedVehicles vehicles={relatedTo(vehicle)} className="container" />
      </div>
    </main>
  )
}
