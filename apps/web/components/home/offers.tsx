import { FeaturedOffers } from "@/components/home/featured-offers"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/section-heading"
import type { Formula, Vehicle } from "@/lib/vehicles"

/** Homepage "Le nostre proposte" (Figma 26:516). */
export function Offers({
  vehicles,
}: {
  /** Featured vehicles of each formula. */
  vehicles: Record<Formula, Vehicle[]>
}) {
  return (
    <Section
      id="proposte"
      className="relative pt-[105px] pb-[105px]"
      containerClassName="flex flex-col items-center gap-ds-7"
    >
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
      <FeaturedOffers vehicles={vehicles} />
    </Section>
  )
}
