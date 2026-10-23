import { Section } from "@/components/layout/section"
import { ContactDetails } from "@/components/contact/contact-section"
import { LocationsMap } from "@/components/contatti/locations-map"
import { SectionHeading } from "@/components/section-heading"
import { quoteIntro } from "@/lib/copy"
import type { SiteContact } from "@/lib/site"
import { cn } from "@workspace/ui/lib/utils"

/**
 * Contatti page opening (Figma 87:9505): "Contattaci" + phone/e-mail, then
 * "Dove Trovarci" with the locations and the map.
 * Mobile offsets: the first text sits 55px under the header (Figma 163 - 108)
 * and the map ends 10px above the quote section (Figma 964 - 954).
 */
export function ContattiIntro({
  contact,
  className,
}: {
  contact: SiteContact
  className?: string
}) {
  return (
    <Section
      className={cn("pt-[55px] pb-2.5 md:pb-2.5", className)}
      layout="split"
      containerClassName="gap-ds-7 lg:gap-x-ds-7"
    >
      <div className="flex flex-col gap-ds-5">
        <div className="flex flex-col gap-ds-4">
          <SectionHeading as="h1" eyebrow="Contatti" title="Contattaci" />
          <p className="text-body text-muted-foreground">{quoteIntro}</p>
        </div>
        <ContactDetails contact={contact} items={["phone", "email"]} />
      </div>

      {/* Mobile: heading, locations and map stacked 24px apart; desktop: map in the right column */}
      <div className="flex flex-col gap-ds-5 lg:contents">
        <div className="flex flex-col gap-ds-5 lg:col-start-1">
          <h2 className="text-h3 text-muted-foreground">Dove Trovarci</h2>
          <ContactDetails contact={contact} items={["locations"]} />
        </div>
        <LocationsMap className="lg:col-start-2 lg:row-span-2 lg:row-start-1" />
      </div>
    </Section>
  )
}
