import Image from "next/image"
import Link from "next/link"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"

export type Vehicle = {
  id: string
  name: string
  description: string
  image: { src: string; alt: string }
  specs: { icon: { src: string; width: number }; label: string }[]
  price: string
  priceNote: string
}

/** Figma "Component 2" card: photo (350×264) with a white panel overlapping its last 15px. */
export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[350/264] overflow-hidden rounded-t-card">
        {/* Figma crop: image is 157.89% × 137.85% of the frame, offset −32.7% / −25.44% */}
        <div className="absolute top-[-25.44%] left-[-32.7%] h-[137.85%] w-[157.89%]">
          <Image
            src={vehicle.image.src}
            alt={vehicle.image.alt}
            fill
            sizes="(min-width: 1024px) 640px, (min-width: 768px) 560px, 560px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative -mt-[15px] flex min-h-[201px] flex-col justify-center gap-8 rounded-b-card bg-white px-[15px] py-4 shadow-[-2px_4px_5px_rgb(86_101_116/0.1)]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 text-black">
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
                    width={spec.icon.width}
                    height={12}
                    className="h-3 w-auto"
                  />
                  {spec.label}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-end justify-between gap-[7px]">
          <div className="flex flex-col gap-1">
            <p className="text-h3 text-black">{vehicle.price}</p>
            <p className="text-sm leading-4 tracking-[0.05em] text-muted-foreground">
              {vehicle.priceNote}
            </p>
          </div>
          <Button
            variant="black"
            size="pill-sm"
            render={<Link href="#contatti" />}
            nativeButton={false}
          >
            Richiedi Info →
          </Button>
        </div>
      </div>
    </article>
  )
}
