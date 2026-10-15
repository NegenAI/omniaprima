import Image from "next/image"

import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { cn } from "@workspace/ui/lib/utils"

export type IncludedService = {
  title: string
  /** 36×36 Figma row icon in /public/icons/accordion. */
  icon: string
  body: string
}

// Copy and icons from Figma component set "Accordion" (42:587): closed rows
// as placed in "Servizi Inclusi" (Lungo Termine 9:5 → 54:1618, Scheda auto
// 87:9624 → 87:9845), bodies from the matching open variants.
export const includedServices: IncludedService[] = [
  {
    title: "Manutenzione",
    icon: "/icons/accordion/manutenzione.svg",
    body: "Tagliandi, revisioni e interventi ordinari sono già inclusi nel canone mensile. Non dovrai preoccuparti di scadenze o costi imprevisti: ci pensiamo noi a mantenere la tua auto sempre efficiente.",
  },
  {
    title: "Incendio e furto",
    icon: "/icons/accordion/incendio-furto.svg",
    body: "La tua vettura è coperta contro danni da incendio ed eventi accidentali, oltre che contro il rischio di furto. Guida con la massima tranquillità, in ogni situazione.",
  },
  {
    title: "RCA",
    icon: "/icons/accordion/rca.svg",
    body: "La Responsabilità Civile Auto è compresa nel canone: nessun costo aggiuntivo da gestire, nessuna scadenza da ricordare. La copertura assicurativa obbligatoria è già inclusa nel tuo pacchetto.",
  },
  {
    title: "KASKO",
    icon: "/icons/accordion/kasko.svg",
    body: "Protezione completa per la tua auto anche in caso di danni causati da te stesso o da eventi non imputabili a terzi. Un livello di copertura superiore, pensato per la massima serenità di guida.",
  },
  {
    title: "Consegna a domicilio",
    icon: "/icons/accordion/consegna-domicilio.svg",
    body: "La tua nuova auto arriva direttamente a casa o in ufficio, pronta all'uso. Un servizio pensato per farti risparmiare tempo fin dal primo giorno.",
  },
  {
    title: "Assicurazione Conducente",
    icon: "/icons/accordion/assicurazione-conducente.svg",
    body: "Una tutela dedicata a chi è alla guida, con copertura in caso di infortunio. La sicurezza personale diventa parte integrante del tuo noleggio.",
  },
  {
    title: "Pronta Consegna",
    icon: "/icons/accordion/pronta-consegna.svg",
    body: "Vetture disponibili in tempi brevissimi, senza le lunghe attese tipiche dell'acquisto tradizionale. La tua nuova auto arriva quando ne hai davvero bisogno.",
  },
  {
    title: "Ritiro Usato",
    icon: "/icons/accordion/ritiro-usato.svg",
    body: "Hai già un'auto? Ce ne occupiamo noi: valutiamo e ritiriamo il tuo veicolo usato, semplificando il passaggio al noleggio a lungo termine.",
  },
  {
    title: "Soccorso Stradale",
    icon: "/icons/accordion/soccorso-stradale.svg",
    body: "Assistenza attiva 24 ore su 24, ovunque tu sia. In caso di guasto o imprevisto, non sei mai solo sulla strada.",
  },
]

type ServicesIncludedProps = {
  /**
   * Which Figma usage to reproduce. Both are a navy section with 48px vertical
   * padding; only the heading → accordion gap differs:
   *  - "formula": Lungo Termine page (9:5), 24px gap (808px tall section).
   *  - "vehicle": Scheda auto (87:9624), 10px gap (794px tall section).
   */
  variant?: "formula" | "vehicle"
  services?: IncludedService[]
  /** Values (titles) of the rows open on first render. */
  defaultValue?: string[]
  className?: string
}

/**
 * "TUTTO COMPRESO / Servizi Inclusi": navy section with the "separated"
 * Accordion (white card, rows split by 1px gaps).
 *
 * Mobile (390px Figma frame): heading 350px at x=20, accordion 352px at x=19
 * (it bleeds 1px past the 20px gutters). Desktop: heading in a left column,
 * accordion in a wider right column.
 */
export function ServicesIncluded({
  variant = "formula",
  services = includedServices,
  defaultValue,
  className,
}: ServicesIncludedProps) {
  return (
    <Section
      id="servizi-inclusi"
      tone="navy"
      className={className}
      containerClassName={cn(
        "flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,640px)] lg:items-start lg:gap-ds-7",
        variant === "vehicle" ? "gap-2.5 md:gap-ds-5" : "gap-ds-5"
      )}
    >
      <SectionHeading
        tone="dark"
        eyebrow="Tutto compreso"
        title="Servizi Inclusi"
        className="lg:sticky lg:top-28"
      />

      <Accordion
        variant="separated"
        defaultValue={defaultValue}
        className="-mx-px w-auto md:mx-0"
      >
        {services.map((service) => (
          <AccordionItem key={service.title} value={service.title}>
            <AccordionTrigger
              icon={<Image src={service.icon} alt="" width={36} height={36} />}
            >
              {service.title}
            </AccordionTrigger>
            <AccordionContent>{service.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
