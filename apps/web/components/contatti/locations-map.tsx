import { cn } from "@workspace/ui/lib/utils"
import { CroppedImage } from "@/components/cropped-image"

// TODO(business): confirm the Google Maps link (Google Business profile / place URL)
// and whether an interactive map provider should replace this static image.
export const locationsMapHref =
  "https://www.google.com/maps/search/?api=1&query=Omnia+Prima+srl+San+Nicol%C3%B2+a+Tordino"

/**
 * Static map of the San Nicolò a Tordino site (Figma "Rectangle 38", 350×336),
 * linked to Google Maps. No third-party iframe is embedded.
 */
export function LocationsMap({ className }: { className?: string }) {
  return (
    <a
      href={locationsMapHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Apri la sede di San Nicolò a Tordino su Google Maps (nuova scheda)"
      className={cn(
        "relative block aspect-[350/336] w-full overflow-hidden focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className
      )}
    >
      {/* Figma crop of the original 793×762 map */}
      <CroppedImage
        src="/images/contatti/mappa-sedi.png"
        alt="Mappa della sede Omnia Prima di San Nicolò a Tordino"
        crop={{ width: 192.82, height: 193, left: -40.08, top: -27.21 }}
        sizes="(min-width: 1024px) 1200px, 200vw"
      />
    </a>
  )
}
