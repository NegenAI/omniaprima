import Image from "next/image"

import { SectionHeading } from "@/components/section-heading"
import type { VehicleFeatureGroup } from "@/lib/vehicles"
import { cn } from "@workspace/ui/lib/utils"

/**
 * "DETTAGLI TECNICI / Caratteristiche auto" (Figma "Frame 454", 87:9674):
 * heading, then the feature groups 24px below and 24px apart. Each group is
 * a bold grey title and a column of 34px white check chips (green check,
 * navy-200 inside stroke: paddings are 1px under Figma to absorb the
 * border), 8px apart. Groups sit in columns from md.
 */
export function TechnicalDetails({
  groups,
  className,
}: {
  groups: VehicleFeatureGroup[]
  className?: string
}) {
  return (
    <section
      aria-labelledby="caratteristiche-auto"
      className={cn("flex flex-col gap-6", className)}
    >
      <SectionHeading
        eyebrow="Dettagli tecnici"
        title={<span id="caratteristiche-auto">Caratteristiche auto</span>}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <h3 className="text-[20px] leading-[22px] font-bold text-muted-foreground">
              {group.title}
            </h3>
            <ul className="flex flex-col items-start gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1 rounded-[20px] border border-navy-200 bg-white py-1 pr-[14px] pl-[9px] text-base leading-5.5 text-navy"
                >
                  <Image
                    src="/icons/scheda/check.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
