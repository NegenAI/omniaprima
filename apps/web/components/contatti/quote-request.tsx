import { ContactFormCard } from "@/components/contact/contact-section"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@workspace/ui/lib/utils"

/**
 * "Contatti / Richiedi un preventivo gratuito" + form card (Figma 101:10785).
 * Unlike the shared ContactSection it has no intro text or contact details:
 * the Contatti page shows those in its opening section.
 */
export function QuoteRequest({ className }: { className?: string }) {
  return (
    <section
      id="preventivo"
      className={cn("bg-secondary py-12 md:py-ds-8", className)}
    >
      <div className="container grid gap-ds-5 lg:grid-cols-2 lg:items-start lg:gap-ds-7">
        <SectionHeading
          eyebrow="Contatti"
          title={
            <>
              Richiedi un <br className="md:hidden" />
              preventivo gratuito
            </>
          }
        />
        <ContactFormCard />
      </div>
    </section>
  )
}
