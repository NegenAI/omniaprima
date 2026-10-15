import Image from "next/image"
import Link from "next/link"

import { OfferFlag } from "@/components/offer-flag"
import {
  hasDetailPage,
  vehicleHref,
  type Formula,
  type Vehicle,
} from "@/lib/vehicles"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { CroppedImage } from "@/components/cropped-image"

export type { Vehicle } from "@/lib/vehicles"

type Layout = Formula | "home" | "breve-termine-offerta" | "vendita-usato"

/**
 * Per-formula geometry measured on the Figma listing pages (390px frames):
 * - lungo termine (85:831): panel overlaps the photo by 15px, 208px tall
 * - breve termine (85:1223): overlaps by 15px, at least 207px, content centred;
 *   the offer card (Renault Master, I125:4834;87:7400) instead starts under
 *   the photo and is 192px tall
 * - vendita (87:3489): panel starts under the photo, 193px tall
 * - vendita with two price notes (board 87:4038, panel 87:4040): 193px panel,
 *   content 11px below its top, name/description gap 8, price flush left
 * - home (113:2654, breve termine on the homepage): overlaps by 15px, 201px
 */
const panelClass: Record<Layout, string> = {
  "lungo-termine": "-mt-[15px] gap-3 py-5 pr-[17px] pl-[18px]",
  "breve-termine":
    "-mt-[15px] min-h-[207px] justify-center gap-4 py-5 pr-[15px] pl-5",
  "breve-termine-offerta":
    "min-h-[192px] justify-center gap-4 py-5 pr-[15px] pl-5",
  vendita: "gap-4 pt-[19px] pr-[17px] pb-[18px] pl-[18px]",
  "vendita-usato":
    "min-h-[193px] gap-3 pt-[11px] pr-[17px] pb-[14px] pl-[18px] md:pb-[18px]",
  home: "-mt-[15px] min-h-[201px] justify-center gap-8 px-[15px] py-4",
}

/**
 * Figma offsets inside the panel: the price block (Frame 389) sits left of
 * the title in the breve/vendita cards (x -6), and on the homepage the
 * title/chips block is inset 5px while the price is inset 1px.
 */
const textClass: Partial<Record<Layout, string>> = { home: "ml-[5px]" }
const priceClass: Partial<Record<Layout, string>> = {
  "breve-termine": "-ml-1.5",
  "breve-termine-offerta": "-ml-1.5",
  vendita: "-ml-1.5",
  home: "ml-px",
}

const cta: Record<
  Layout,
  {
    label: string
    variant: "rental" | "default" | "sales" | "black"
    className?: string
  }
> = {
  "lungo-termine": {
    label: "Maggiori info →",
    variant: "rental",
    className: "font-normal tracking-normal",
  },
  // Figma label has no space before the arrow ("Richiedi info→", 139px pill).
  "breve-termine": { label: "Richiedi info→", variant: "default" },
  // The offer card (I125:4834;87:7430) has the space: "Richiedi info →", 143px.
  "breve-termine-offerta": { label: "Richiedi info →", variant: "default" },
  vendita: {
    label: "Maggiori info →",
    variant: "sales",
    className: "font-normal tracking-normal text-ghiaccio",
  },
  "vendita-usato": {
    label: "Maggiori info →",
    variant: "sales",
    className: "font-normal tracking-normal text-ghiaccio",
  },
  home: { label: "Richiedi Info →", variant: "black" },
}

export type VehicleCardProps = {
  vehicle: Vehicle
  /**
   * "listing" (default) follows the formula of the vehicle; "home" keeps the
   * homepage look for short-term cards (black CTA, 201px panel).
   */
  context?: "listing" | "home"
  /** Load the photo eagerly (first card above the fold). */
  priority?: boolean
  className?: string
}

/**
 * Figma vehicle card: photo (350×264) + white panel with name, description,
 * spec chips, price and CTA. Variant by `vehicle.formula`; optional "OFFERTA"
 * flag. Long-term and sales cards open `/proposte/[slug]`, short-term cards
 * have no detail page and point to the contact form.
 */
export function VehicleCard({
  vehicle,
  context = "listing",
  priority,
  className,
}: VehicleCardProps) {
  const layout: Layout =
    context === "home" && vehicle.formula === "breve-termine"
      ? "home"
      : vehicle.formula === "breve-termine" && vehicle.offer
        ? "breve-termine-offerta"
        : vehicle.formula === "vendita" && vehicle.priceNotes.length > 1
          ? "vendita-usato"
          : vehicle.formula
  const href = vehicleHref(vehicle)
  const detail = hasDetailPage(vehicle)
  const action = cta[layout]
  const crop = vehicle.image.crop

  const photo = (
    <div className="relative aspect-[350/264] overflow-hidden rounded-t-card bg-navy-100">
      <CroppedImage
        src={vehicle.image.src}
        alt={vehicle.image.alt}
        crop={crop}
        priority={priority}
        sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
      />
    </div>
  )

  return (
    <article
      data-formula={vehicle.formula}
      className={cn("relative flex flex-col", className)}
    >
      {detail ? (
        // Duplicate of the CTA for pointer users: the photo opens the scheda too.
        <Link href={href} tabIndex={-1} aria-hidden="true">
          {photo}
        </Link>
      ) : (
        photo
      )}

      {vehicle.offer && (
        <OfferFlag
          className={cn(
            "absolute",
            // Frame 399 sits at 17/25 on the breve offer card, 18/27 elsewhere.
            layout === "breve-termine-offerta"
              ? "top-[25px] left-[17px]"
              : "top-[27px] left-[18px]"
          )}
        />
      )}

      <div
        className={cn(
          "relative flex flex-1 flex-col rounded-b-card bg-white shadow-panel",
          panelClass[layout]
        )}
      >
        <div className={cn("flex flex-col gap-3", textClass[layout])}>
          <div
            className={cn(
              "flex flex-col text-black",
              layout === "vendita" ? "gap-3" : "gap-2"
            )}
          >
            <h3>{vehicle.name}</h3>
            <p className="text-body">{vehicle.description}</p>
          </div>
          <ul className="flex flex-wrap items-center gap-2">
            {vehicle.specs.map((spec) => (
              <li key={spec.label}>
                <Badge variant="spec">
                  <Image
                    src={spec.icon.src}
                    alt=""
                    // 2x attrs: fractional widths trigger a false next/image
                    // aspect-ratio warning; CSS keeps the 12px height.
                    width={spec.icon.width * 2}
                    height={24}
                    className="h-3 w-auto"
                  />
                  {spec.label}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-end justify-between gap-[7px] md:mt-auto">
          <div className={cn("flex flex-col gap-1", priceClass[layout])}>
            <p className="text-h3 whitespace-nowrap text-black">
              {vehicle.price}
            </p>
            {vehicle.priceNotes.map((note) => (
              <p
                key={note}
                className="text-caption tracking-[0.05em] text-muted-foreground"
              >
                {note}
              </p>
            ))}
          </div>
          <Button
            variant={action.variant}
            size="pill-sm"
            className={action.className}
            render={
              <Link
                href={href}
                aria-label={`${detail ? "Maggiori informazioni su" : "Richiedi informazioni su"} ${vehicle.name}`}
              />
            }
            nativeButton={false}
          >
            {action.label}
          </Button>
        </div>
      </div>
    </article>
  )
}
