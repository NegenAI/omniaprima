"use client"

import * as React from "react"
import Image from "next/image"

import type { VehicleImage } from "@/lib/vehicles"
import { cn } from "@workspace/ui/lib/utils"

/**
 * Scheda auto photo gallery (Figma component "Frame 426", 26:2668):
 * 260px main photo (20px radius) and a row of 84×64 thumbnails 4px apart,
 * 24px below. The selected thumbnail gets a 1px amber border (Default →
 * Variant2 when the second thumbnail is chosen). Thumbnails widen
 * proportionally from md.
 */
export function VehicleGallery({
  images,
  className,
}: {
  images: VehicleImage[]
  className?: string
}) {
  const [selected, setSelected] = React.useState(0)
  const current = images[selected] ?? images[0]

  if (!current) return null
  const crop = current.galleryCrop

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="relative h-[260px] overflow-hidden rounded-card bg-navy-100 md:aspect-[351/260] md:h-auto">
        <div
          key={current.src}
          className="absolute"
          style={
            crop
              ? {
                  width: `${crop.width}%`,
                  height: `${crop.height}%`,
                  left: `${crop.left}%`,
                  top: `${crop.top}%`,
                }
              : { inset: 0 }
          }
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            priority
            sizes="(min-width: 1024px) 720px, (min-width: 768px) 90vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {images.length > 1 && (
        <ul
          aria-label="Foto del veicolo"
          className="flex gap-1 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible"
        >
          {images.map((image, index) => {
            const active = index === selected
            return (
              <li key={image.src} className="shrink-0">
                <button
                  type="button"
                  aria-label={`Mostra foto ${index + 1} di ${images.length}`}
                  aria-pressed={active}
                  onClick={() => setSelected(index)}
                  className="relative block h-16 w-[84px] cursor-pointer overflow-hidden rounded-[10px] bg-navy-100 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:aspect-[84/64] md:h-auto md:w-full"
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 180px, 84px"
                    className="object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 rounded-[10px] border border-transparent transition-colors",
                      active ? "border-ambra" : "hover:border-navy-200"
                    )}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
