import Image from "next/image"

import {
  ContactForm,
  type ContactFormWhatsapp,
} from "@/components/contact/contact-form"
import { SectionHeading } from "@/components/section-heading"
import { contact } from "@/lib/site"
import { cn } from "@workspace/ui/lib/utils"

const details = [
  {
    key: "phone",
    label: "Telefono",
    icon: "/icons/call.svg",
    content: (
      <a href={contact.phone.href} className="hover:underline">
        {contact.phone.label}
      </a>
    ),
  },
  {
    key: "email",
    label: "Email",
    icon: "/icons/mail.svg",
    content: (
      <a href={contact.email.href} className="hover:underline">
        {contact.email.label}
      </a>
    ),
  },
  {
    key: "locations",
    label: "Sedi",
    icon: "/icons/location.svg",
    content: contact.locations.map((location) => (
      <span key={location.town} className="block">
        {location.town}, {location.street}
      </span>
    )),
  },
]

export type ContactDetailKey = "phone" | "email" | "locations"

/** Phone / e-mail / locations list with icons (Figma "Frame 419"). */
export function ContactDetails({
  items = ["phone", "email", "locations"],
  className,
}: {
  /** Which rows to show (the Contatti page splits the locations out). */
  items?: ContactDetailKey[]
  className?: string
}) {
  return (
    <dl className={cn("flex flex-col gap-ds-4", className)}>
      {details
        .filter((detail) => items.includes(detail.key as ContactDetailKey))
        .map((detail) => (
          <div key={detail.label} className="flex items-center gap-6">
            <Image src={detail.icon} alt="" width={24} height={24} />
            <div>
              <dt className="mb-[3px] text-sm leading-4 text-muted-foreground uppercase">
                {detail.label}
              </dt>
              <dd className="text-base leading-5.5 text-foreground">
                {detail.content}
              </dd>
            </div>
          </div>
        ))}
    </dl>
  )
}

/** "Contatti" eyebrow + "Richiedi un preventivo gratuito" + intro text + contact details. */
export function ContactInfo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-ds-5", className)}>
      <div className="flex flex-col gap-ds-4">
        <SectionHeading
          eyebrow="Contatti"
          title={
            <>
              Richiedi un <br className="md:hidden" />
              preventivo gratuito
            </>
          }
        />
        <p className="text-body text-muted-foreground">
          Raccontaci di cosa hai bisogno: ti ricontattiamo entro 24 ore con la
          soluzione più adatta.
        </p>
      </div>
      <ContactDetails />
    </div>
  )
}

/** White card wrapping the contact form (Figma "Frame 424"). */
export function ContactFormCard({
  whatsapp = "button",
  className,
}: {
  whatsapp?: ContactFormWhatsapp
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-card bg-white px-5 pt-12 pb-[30px] md:p-ds-6",
        // Scheda auto card (87:9881) has a taller bottom inset: 1203 - 48 - 1098 = 57px.
        whatsapp === "block" && "pb-[57px]",
        className
      )}
    >
      <ContactForm whatsapp={whatsapp} />
    </div>
  )
}

export type ContactSectionVariant = "default" | "vehicle"

/**
 * "Contatti" section (info + form), shared by every page that ends with a quote request.
 * - "default": homepage / Chi siamo (Figma 61:3384)
 * - "vehicle": scheda auto (Figma 87:9861), adds the "Oppure contattaci su Whatsapp" block
 */
export function ContactSection({
  variant = "default",
  id = "contatti",
  className,
}: {
  variant?: ContactSectionVariant
  id?: string
  className?: string
}) {
  return (
    <section id={id} className={cn("bg-secondary py-12 md:py-ds-8", className)}>
      <div className="container grid gap-ds-5 lg:grid-cols-2 lg:items-start lg:gap-ds-7">
        <ContactInfo />
        <ContactFormCard
          whatsapp={variant === "vehicle" ? "block" : "button"}
        />
      </div>
    </section>
  )
}
