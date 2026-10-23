import Image from "next/image"

import {
  ContactForm,
  type ContactFormWhatsapp,
} from "@/components/contact/contact-form"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/section-heading"
import { quoteIntro } from "@/lib/copy"
import type { SiteContact } from "@/lib/site"
import { cn } from "@workspace/ui/lib/utils"

function contactDetails(contact: SiteContact) {
  return [
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
}

export type ContactDetailKey = "phone" | "email" | "locations"

/** Phone / e-mail / locations list with icons (Figma "Frame 419"). */
export function ContactDetails({
  contact,
  items = ["phone", "email", "locations"],
  className,
}: {
  contact: SiteContact
  /** Which rows to show (the Contatti page splits the locations out). */
  items?: ContactDetailKey[]
  className?: string
}) {
  return (
    <dl className={cn("flex flex-col gap-ds-4", className)}>
      {contactDetails(contact)
        .filter((detail) => items.includes(detail.key as ContactDetailKey))
        .map((detail) => (
          <div key={detail.label} className="flex items-center gap-6">
            <Image src={detail.icon} alt="" width={24} height={24} />
            <div>
              <dt className="mb-[3px] text-caption text-muted-foreground uppercase">
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

/** "Contatti" eyebrow + "Richiedi un preventivo gratuito". */
function QuoteHeading() {
  return (
    <SectionHeading
      eyebrow="Contatti"
      title={
        <>
          Richiedi un <br className="md:hidden" />
          preventivo gratuito
        </>
      }
    />
  )
}

/** Quote heading + intro text + contact details. */
export function ContactInfo({
  contact,
  className,
}: {
  contact: SiteContact
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-ds-5", className)}>
      <div className="flex flex-col gap-ds-4">
        <QuoteHeading />
        <p className="text-body text-muted-foreground">{quoteIntro}</p>
      </div>
      <ContactDetails contact={contact} />
    </div>
  )
}

/** White card wrapping the contact form (Figma "Frame 424"). */
export function ContactFormCard({
  whatsapp = "button",
  whatsappHref,
  className,
}: {
  whatsapp?: ContactFormWhatsapp
  /** wa.me link from the site settings. */
  whatsappHref: string
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
      <ContactForm whatsapp={whatsapp} whatsappHref={whatsappHref} />
    </div>
  )
}

export type ContactSectionVariant = "default" | "vehicle"

/**
 * "Contatti" section (quote heading + form), shared by every page that ends
 * with a quote request.
 * - variant "default": homepage / Chi siamo (Figma 61:3384); "vehicle": scheda
 *   auto (87:9861), adds the "Oppure contattaci su Whatsapp" block.
 * - info "full": intro text + contact details next to the form; "heading": the
 *   heading only (Contatti page 101:10785, which shows the details above).
 * - `className` / `cardClassName` take the Figma-measured paddings of pages
 *   whose frames differ (e.g. 96px nested frames on the formula pages).
 */
export function ContactSection({
  contact,
  variant = "default",
  info = "full",
  id = "contatti",
  className,
  cardClassName,
}: {
  /** Business details from the site settings. */
  contact: SiteContact
  variant?: ContactSectionVariant
  info?: "full" | "heading"
  id?: string
  className?: string
  cardClassName?: string
}) {
  return (
    <Section id={id} layout="split" className={className}>
      {info === "full" ? <ContactInfo contact={contact} /> : <QuoteHeading />}
      <ContactFormCard
        whatsappHref={contact.whatsapp}
        whatsapp={variant === "vehicle" ? "block" : "button"}
        className={cardClassName}
      />
    </Section>
  )
}
